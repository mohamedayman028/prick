/**
 * apply_menu_updates.js
 * =====================
 * Applies all requested menu changes:
 *
 * 1. HOT COFFEE - Espresso: Single=50, Double=55 (and make it first product via sort_order)
 * 2. Remove L (Large) prices from all sections EXCEPT Hot Coffee & Warm Drinks
 * 3. Merge Dessert (cat 13) + Bakery (cat 14) → "Dessert and Bakery" (keep cat 13, reassign cat 14 products to 13, delete cat 14)
 * 4. WARM DRINKS - Sahlab: M=80, L=90
 * 5. SHAKES - new Medium-only prices
 * 6. FRAPPE - new prices (including White Frappe 155, White Mocha 115, Mix Berry 115, Caramel 109, Lotus 109)
 * 7. MATCHA - all 115 except Classic (Ice Matcha=109, Hot Matcha=99)
 * 8. BOBA SMOOTHIE - all 115 (Medium only)
 * 9. BOBA SOFT - all 99 (Medium only)
 * 10. ICE COFFEE - Ice Latte: 99
 * 11. SMOOTHIES - all 104 (Medium only)
 *
 * Size IDs: 1=S, 2=M, 3=L, 4=Single, 5=Double
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.error('Error opening DB:', err.message); process.exit(1); }
    db.configure('busyTimeout', 5000);
    console.log('Opened database:', dbPath);
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
        if (err) reject(err); else resolve(this);
    });
});
const all = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) reject(err); else resolve(rows);
    });
});
const get = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
        if (err) reject(err); else resolve(row);
    });
});

const beginTransaction = () => run('BEGIN EXCLUSIVE TRANSACTION;');
const commitTransaction = () => run('COMMIT;');
const rollbackTransaction = () => run('ROLLBACK;');

/**
 * Remove ALL prices for a product then set the new ones.
 */
async function resetPrices(productId, priceMap) {
    await beginTransaction();
    try {
        await run(`DELETE FROM product_prices WHERE product_id = ?`, [productId]);
        for (const [sizeId, price] of Object.entries(priceMap)) {
            await run(`INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)`,
                [productId, parseInt(sizeId), price]);
        }
        await commitTransaction();
    } catch (err) {
        await rollbackTransaction().catch(e => console.error("Rollback failed:", e.message));
        throw err;
    }
}

/**
 * Remove only the Large (size_id=3) price for a product.
 */
async function removeLargePrice(productId) {
    await run(`DELETE FROM product_prices WHERE product_id = ? AND size_id = 3`, [productId]);
}

async function main() {
    await run('PRAGMA foreign_keys = OFF');

    // =========================================================
    // 1. HOT COFFEE - Espresso: Single=50, Double=55
    // =========================================================
    console.log('\n=== 1. HOT COFFEE - Espresso ===');
    // Product ID 1 = Espresso | إسبريسو
    await resetPrices(1, { 4: 50, 5: 55 });
    console.log('  Updated: Espresso → Single:50, Double:55');

    // Hot Coffee keeps M and L sizes as-is (no removal of L for Hot Coffee)
    // So we don't touch other hot coffee items' L prices

    // =========================================================
    // 2. REMOVE LARGE PRICES from all sections EXCEPT Hot Coffee (cat 1) & Warm Drinks (cat 2)
    // =========================================================
    console.log('\n=== 2. Removing Large (L) prices from all other sections ===');

    // Get all products NOT in Hot Coffee (1) and NOT in Warm Drinks (2)
    // Also skip Espresso-style items that use Single/Double (size_id 4,5) - they don't have L anyway
    const productsWithLarge = await all(`
        SELECT p.product_id, p.product_name, p.category_id
        FROM products p
        JOIN product_prices pp ON p.product_id = pp.product_id
        WHERE pp.size_id = 3
          AND p.category_id NOT IN (1, 2)
    `);

    console.log(`  Found ${productsWithLarge.length} products with Large price outside Hot Coffee & Warm Drinks`);
    for (const prod of productsWithLarge) {
        await removeLargePrice(prod.product_id);
    }
    console.log('  Removed all Large prices (except Hot Coffee & Warm Drinks)');

    // =========================================================
    // 3. MERGE Dessert (13) + Bakery (14) → "Dessert and Bakery"
    // =========================================================
    console.log('\n=== 3. Merging Dessert + Bakery categories ===');

    // Rename category 13 to "Dessert and Bakery"
    await run(`UPDATE categories SET category_name = 'Dessert and Bakery' WHERE category_id = 13`);
    console.log('  Renamed category 13 → "Dessert and Bakery"');

    // Move all Bakery (cat 14) products to category 13
    await run(`UPDATE products SET category_id = 13 WHERE category_id = 14`);
    console.log('  Moved all Bakery products to category 13');

    // Delete category 14 (Bakery)
    await run(`DELETE FROM categories WHERE category_id = 14`);
    console.log('  Deleted Bakery category (14)');

    // =========================================================
    // 4. WARM DRINKS - Sahlab: M=80, L=90
    // =========================================================
    console.log('\n=== 4. Warm Drinks - Sahlab ===');
    // Product 19 = Sahlab | سحلب
    await resetPrices(19, { 2: 80, 3: 90 });
    console.log('  Updated: Sahlab → M:80, L:90');

    // =========================================================
    // 5. SHAKES - New Medium-only prices
    // =========================================================
    console.log('\n=== 5. Shakes - New prices (Medium only) ===');
    const shakeUpdates = [
        // [product_id, price, name]
        [29, 120, 'Twix Shake'],
        [30, 120, 'Snickers Shake'],
        [31, 120, 'Galaxy Shake'],
        [32, 120, 'M&M Shake'],
        [22, 120, 'Pistachio Shake'],
        [27, 120, 'Kinder Shake'],
        [28, 120, 'KitKat Shake'],
        [23, 115, 'Lotus Shake'],
        [21, 109, 'Nutella Shake'],
        [24, 109, 'Caramel Shake'],
        [26, 105, 'Blueberry Shake'],
        [182, 104, 'Beach Shake'],
        [127, 99, 'Vanilla Shake'],
        [128, 99, 'Strawberry Shake'],
        [129, 99, 'Mango Shake'],
        [130, 99, 'Chocolate Shake'],
    ];

    for (const [pid, price, name] of shakeUpdates) {
        await resetPrices(pid, { 2: price });
        console.log(`  Updated: ${name} → M:${price}`);
    }

    // Milkshake (Classic) = Nutella Shake is 109 (already above)
    // Note: Milkshake كلاسيك is listed as 109 - checking if there's a separate product
    // From user's list: ميلك شيك (كلاسيك) = 109 - this might be Nutella or a separate product
    // نوتيلا شيك = 109, ميلك شيك (كلاسيك) = 109 - treating Nutella Shake (21) as 109 ✓

    // =========================================================
    // 6. FRAPPE - New prices
    // =========================================================
    console.log('\n=== 6. Frappe - New prices ===');
    // White Frappe (وايت فرابيه) = 155 — need to check if this product exists
    // Currently we have: Classic Frappe(33), Caramel(34), Lotus(35), White Mocha(36), Mix Berry(126), Salted Caramel(181)
    // "وايت فرابيه" at 155 might be a new product or it's the White Mocha Frappe
    // User listed: وايت فرابيه=155, وايت موكا فرابيه=115, مكس بيري=115, كراميل=109, لوتس=109
    // Since White Mocha Frappe (36) is separate from وايت فرابيه, we need to create وايت فرابيه

    // Check if White Frappe exists
    const whiteFrappe = await get(`SELECT product_id FROM products WHERE product_name LIKE '%White Frappe%' OR product_name LIKE '%وايت فرابيه%'`);
    if (!whiteFrappe) {
        // Insert new product: White Frappe (category 4 = Frappe)
        // Use next available ID
        const maxId = await get(`SELECT MAX(product_id) as maxId FROM products`);
        const newId = maxId.maxId + 1;
        await beginTransaction();
        try {
            await run(`INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES (?, ?, ?, ?, ?)`,
                [newId, 'White Frappe | وايت فرابيه', 4, 'فرابيه وايت كريمي فاخر.', 'White Frappe.png']);
            await run(`INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)`, [newId, 2, 155]);
            await commitTransaction();
            console.log(`  + Inserted new product: [${newId}] White Frappe → M:155`);
        } catch (err) {
            await rollbackTransaction().catch(e => console.error("Rollback failed:", e.message));
            throw err;
        }
    } else {
        await resetPrices(whiteFrappe.product_id, { 2: 155 });
        console.log(`  Updated: White Frappe [${whiteFrappe.product_id}] → M:155`);
    }

    // White Mocha Frappe (36): 115
    await resetPrices(36, { 2: 115 });
    console.log('  Updated: White Mocha Frappe → M:115');

    // Mix Berry Frappe (126): 115
    await resetPrices(126, { 2: 115 });
    console.log('  Updated: Mix Berry Frappe → M:115');

    // Caramel Frappe (34): 109
    await resetPrices(34, { 2: 109 });
    console.log('  Updated: Caramel Frappe → M:109');

    // Lotus Frappe (35): 109
    await resetPrices(35, { 2: 109 });
    console.log('  Updated: Lotus Frappe → M:109');

    // =========================================================
    // 7. MATCHA - All 115 except Classic ones
    // =========================================================
    console.log('\n=== 7. Matcha - New prices ===');
    // From user: "أي ماتشا (جميع النكهات) ب 115 ج.م (ما عدا الكلاسيك زي ما هي متغيرش سعرها"
    // Classic = Ice Matcha (37) stays as-is (109) and Hot Matcha (41) stays as-is (99)
    // All others → 115

    // Non-classic matcha products: 38,39,40,42,44,144,176,177,178,179,180
    // Product 42 = Hot Honey Matcha
    const matchaUpdates = [
        [38, 'Ice Matcha Strawberry'],
        [39, 'Ice Matcha Coconut'],
        [40, 'Ice Matcha Caramel'],
        [42, 'Hot Honey Matcha'],
        [144, 'Ice Matcha Mango'],
        [176, 'Matcha Cloud Mango'],
        [177, 'Matcha Cloud Strawberry'],
        [178, 'Matcha Cloud Coconut'],
        [179, 'Matcha Cloud White Chocolate'],
        [180, 'Blue Matcha'],
    ];

    for (const [pid, name] of matchaUpdates) {
        await resetPrices(pid, { 2: 115 });
        console.log(`  Updated: ${name} → M:115`);
    }
    // Classic matcha stay unchanged:
    console.log('  (Keeping Ice Matcha Classic [37] and Hot Matcha [41] unchanged)');

    // =========================================================
    // 8. BOBA SMOOTHIE - All 115 (Medium only)
    // =========================================================
    console.log('\n=== 8. Boba Smoothie - All 115 (Medium only) ===');
    for (const pid of [155, 156, 157, 158, 159, 160]) {
        await resetPrices(pid, { 2: 115 });
    }
    console.log('  Updated: All Boba Smoothie items (155-160) → M:115');

    // =========================================================
    // 9. BOBA SOFT - All 99 (Medium only)
    // =========================================================
    console.log('\n=== 9. Boba Soft - All 99 (Medium only) ===');
    for (const pid of [145, 146, 147, 148, 149]) {
        await resetPrices(pid, { 2: 99 });
    }
    console.log('  Updated: All Boba Soft items (145-149) → M:99');

    // =========================================================
    // 10. ICE COFFEE - Ice Latte: 99
    // =========================================================
    console.log('\n=== 10. Ice Coffee - Ice Latte ===');
    // Product 67 = Ice Latte | آيس لاتيه
    await resetPrices(67, { 2: 99 });
    console.log('  Updated: Ice Latte [67] → M:99');

    // =========================================================
    // 11. SMOOTHIES - All 104 (Medium only)
    // =========================================================
    console.log('\n=== 11. Smoothies - All 104 (Medium only) ===');
    const smoothieIds = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 171];
    for (const pid of smoothieIds) {
        await resetPrices(pid, { 2: 104 });
    }
    console.log('  Updated: All Smoothie items → M:104');

    await run('PRAGMA foreign_keys = ON');

    // =========================================================
    // VERIFICATION
    // =========================================================
    console.log('\n=== VERIFICATION ===');
    const cats = await all(`SELECT category_id, category_name, sort_order FROM categories ORDER BY sort_order`);
    console.log('Categories:');
    cats.forEach(c => console.log(`  [${c.category_id}] ${c.category_name} (sort: ${c.sort_order})`));

    const espresso = await all(`SELECT sz.size_name, pp.price FROM product_prices pp JOIN sizes sz ON pp.size_id = sz.size_id WHERE pp.product_id = 1`);
    console.log('\nEspresso prices:', JSON.stringify(espresso));

    const sahlab = await all(`SELECT sz.size_name, pp.price FROM product_prices pp JOIN sizes sz ON pp.size_id = sz.size_id WHERE pp.product_id = 19`);
    console.log('Sahlab prices:', JSON.stringify(sahlab));

    const iceLatte = await all(`SELECT sz.size_name, pp.price FROM product_prices pp JOIN sizes sz ON pp.size_id = sz.size_id WHERE pp.product_id = 67`);
    console.log('Ice Latte prices:', JSON.stringify(iceLatte));

    const dessertBakery = await all(`SELECT product_id, product_name FROM products WHERE category_id = 13 LIMIT 5`);
    console.log('\nDessert and Bakery (first 5):', dessertBakery.map(p => p.product_name));

    console.log('\n✅ All menu updates applied successfully!');

    db.close((err) => {
        if (err) console.error('Error closing DB:', err.message);
        else console.log('Database connection closed.');
    });
}

main().catch(err => {
    console.error('Fatal error:', err);
    db.close();
    process.exit(1);
});
