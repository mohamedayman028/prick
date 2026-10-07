/**
 * apply_updates_2.cjs
 * ====================
 * Changes:
 * 1. Espresso → Single:55 | Double:65 (fix)
 * 2. Turkish Coffee → First in Hot Coffee, Double:55 | Single:50
 *    - Adds sort_order column to products table if not present
 * 3. Remove Nescafe (5) + Nescafe Black (6) prices entirely (hidden from menu)
 * 4. Dessert & Bakery price updates + new products
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
    db.run(sql, params, function (err) { if (err) reject(err); else resolve(this); });
});
const all = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => { if (err) reject(err); else resolve(rows); });
});
const get = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => { if (err) reject(err); else resolve(row); });
});

const beginTx = () => run('BEGIN EXCLUSIVE TRANSACTION;');
const commitTx = () => run('COMMIT;');
const rollbackTx = () => run('ROLLBACK;').catch(() => {});

async function resetPrices(productId, priceMap) {
    await beginTx();
    try {
        await run(`DELETE FROM product_prices WHERE product_id = ?`, [productId]);
        for (const [sizeId, price] of Object.entries(priceMap)) {
            await run(`INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)`,
                [productId, parseInt(sizeId), price]);
        }
        await commitTx();
    } catch (err) { await rollbackTx(); throw err; }
}

async function ensureProduct(productId, name, categoryId, descAr, imageUrl, priceMap) {
    await beginTx();
    try {
        const existing = await all(`SELECT product_id FROM products WHERE product_id = ?`, [productId]);
        if (existing.length === 0) {
            await run(`INSERT INTO products (product_id, product_name, category_id, description_ar, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
                [productId, name, categoryId, descAr, imageUrl, productId]);
            console.log(`  + Inserted: [${productId}] ${name}`);
        } else {
            console.log(`  ~ Exists: [${productId}] ${name}`);
        }
        await commitTx();
        await resetPrices(productId, priceMap);
    } catch (err) { await rollbackTx(); throw err; }
}

async function main() {
    await run('PRAGMA foreign_keys = OFF');

    // =========================================================
    // 0. Add sort_order column to products if not present
    // =========================================================
    console.log('\n=== 0. Ensuring sort_order column on products ===');
    const cols = await all(`PRAGMA table_info(products)`);
    const hasSortOrder = cols.some(c => c.name === 'sort_order');
    if (!hasSortOrder) {
        await run(`ALTER TABLE products ADD COLUMN sort_order INTEGER DEFAULT 0`);
        // Initialize sort_order to product_id for all
        await run(`UPDATE products SET sort_order = product_id WHERE sort_order = 0`);
        console.log('  Added sort_order column');
    } else {
        console.log('  sort_order column already exists');
    }

    // =========================================================
    // 1. ESPRESSO - Fix: Single:55 | Double:65
    // =========================================================
    console.log('\n=== 1. Espresso Fix ===');
    await resetPrices(1, { 4: 55, 5: 65 });
    await run(`UPDATE products SET sort_order = 10 WHERE product_id = 1`);
    console.log('  Espresso → Single:55, Double:65');

    // =========================================================
    // 2. TURKISH COFFEE - First + prices: Double:55 | Single:50
    // =========================================================
    console.log('\n=== 2. Turkish Coffee - First + prices ===');
    // sort_order=1 makes it appear before Espresso (sort_order=10)
    await run(`UPDATE products SET sort_order = 1 WHERE product_id = 9`);
    await resetPrices(9, { 4: 50, 5: 55 });
    console.log('  Turkish Coffee → First (sort_order=1), Single:50, Double:55');

    // =========================================================
    // 3. REMOVE NESCAFE + NESCAFE BLACK from menu
    // =========================================================
    console.log('\n=== 3. Removing Nescafe from menu ===');
    await run(`DELETE FROM product_prices WHERE product_id IN (5, 6)`);
    console.log('  Removed all prices for Nescafe [5] and Nescafe Black [6] — hidden from menu');

    // =========================================================
    // 4. DESSERT AND BAKERY - Price updates
    // =========================================================
    console.log('\n=== 4. Dessert and Bakery ===');

    // San Sebastian / Cheesecake سادة → 95
    // Product 93 = Classic Cheesecake, Product 101 = San Sebastian (plain)
    await resetPrices(93, { 2: 95 });
    console.log('  Classic Cheesecake [93] → 95');
    await resetPrices(101, { 2: 95 });
    console.log('  San Sebastian [101] → 95');

    // Lotus → 110 (products 96 and 102)
    // Product 96 = Cheese cake Lotus (may or may not be in server DB - let's check, use resetPrices safely)
    await resetPrices(102, { 2: 110 });
    console.log('  Lotus San Sebastian [102] → 110');

    // Nutella → 110 (products 98 and 103)
    await resetPrices(98, { 2: 110 });
    console.log('  Nutella Cheesecake [98] → 110');
    await resetPrices(103, { 2: 110 });
    console.log('  Nutella San Sebastian [103] → 110');

    // Blueberry → 110 (product 104)
    await resetPrices(104, { 2: 110 });
    console.log('  Blueberry San Sebastian [104] → 110');

    // Strawberry → 110 (need to add if missing)
    const strawberrySS = await get(`SELECT product_id FROM products WHERE product_name LIKE '%Strawberry%' AND category_id = 13`);
    if (!strawberrySS) {
        const maxId = await get(`SELECT MAX(product_id) as m FROM products`);
        const newId = maxId.m + 1;
        await ensureProduct(newId, 'Strawberry San Sebastian | سان سباستيان فراولة', 13,
            'كيكة سان سباستيان مع صوص الفراولة الطازجة.', 'San Sebastian Strawberry.png',
            { 2: 110 });
    } else {
        await resetPrices(strawberrySS.product_id, { 2: 110 });
        console.log(`  Strawberry SS/Cheesecake [${strawberrySS.product_id}] → 110`);
    }

    // Pistachio → 120 (products 97 and 106)
    await resetPrices(97, { 2: 120 });
    console.log('  Pistachio Cheesecake [97] → 120');
    await resetPrices(106, { 2: 120 });
    console.log('  Pistachio San Sebastian [106] → 120');

    // Molten Cake → 104
    await resetPrices(99, { 2: 104 });
    console.log('  Molten Cake [99] → 104');

    // Tiramisu → 90
    await resetPrices(107, { 2: 90 });
    console.log('  Tiramisu [107] → 90');

    // =========================================================
    // 5. CROISSANTS - Price updates
    // =========================================================
    console.log('\n=== 5. Croissants ===');

    // Plain Croissant [108] → 70
    await resetPrices(108, { 2: 70 });
    console.log('  Plain Croissant [108] → 70');

    // Pistachio Croissant [111] → 85
    await resetPrices(111, { 2: 85 });
    console.log('  Pistachio Croissant [111] → 85');

    // Smoked Turkey Croissant [113] = كرواسون تركي → 100
    await resetPrices(113, { 2: 100 });
    console.log('  Smoked Turkey Croissant [113] = كرواسون تركي → 100');

    // كرواسون رومي = Luncheon/Turkey - check if exists or add
    // In Arabic: رومي = a type of Egyptian cheese/turkey breast
    // Let's check for "Luncheon" croissant or "رومي" croissant
    const romiCroissant = await get(`SELECT product_id FROM products WHERE product_name LIKE '%Romi%' OR product_name LIKE '%رومي%'`);
    if (!romiCroissant) {
        // Add new كرواسون رومي
        const maxId = await get(`SELECT MAX(product_id) as m FROM products`);
        const newId = maxId.m + 1;
        await beginTx();
        try {
            await run(`INSERT INTO products (product_id, product_name, category_id, description_ar, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
                [newId, 'Romi Croissant | كرواسون رومي', 13,
                'كرواسون محشو بجبنة الرومي الكريمية.', 'Romi Croissant.png', newId]);
            await commitTx();
            await resetPrices(newId, { 2: 90 });
            console.log(`  + Added Romi Croissant [${newId}] → 90`);
        } catch (err) { await rollbackTx(); throw err; }
    } else {
        await resetPrices(romiCroissant.product_id, { 2: 90 });
        console.log(`  Romi Croissant [${romiCroissant.product_id}] → 90`);
    }

    // كرواسون نوتيلا - check if exists
    const nutellaCroissant = await get(`SELECT product_id FROM products WHERE product_name LIKE '%Nutella Croissant%' OR product_name LIKE '%كرواسون نوتيلا%'`);
    if (!nutellaCroissant) {
        const maxId = await get(`SELECT MAX(product_id) as m FROM products`);
        const newId = maxId.m + 1;
        await beginTx();
        try {
            await run(`INSERT INTO products (product_id, product_name, category_id, description_ar, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
                [newId, 'Nutella Croissant | كرواسون نوتيلا', 13,
                'كرواسون محشو بشوكولاتة النوتيلا اللذيذة.', 'Nutella Croissant.png', newId]);
            await commitTx();
            await resetPrices(newId, { 2: 75 });
            console.log(`  + Added Nutella Croissant [${newId}] → 75`);
        } catch (err) { await rollbackTx(); throw err; }
    } else {
        await resetPrices(nutellaCroissant.product_id, { 2: 75 });
        console.log(`  Nutella Croissant [${nutellaCroissant.product_id}] → 75`);
    }

    // =========================================================
    // 6. DONUTS - New products (category 13 = Dessert and Bakery)
    // =========================================================
    console.log('\n=== 6. New Donuts ===');
    const donuts = [
        ['Nutella Donut | دوناتس نوتيلا', 'دوناتس محشو بشوكولاتة النوتيلا الغنية.', 'Donut Nutella.png', 75],
        ['Pistachio Donut | دوناتس بيستاشيو', 'دوناتس محشو بكريمة الفستق الفاخرة.', 'Donut Pistachio.png', 75],
        ['Blueberry Donut | دوناتس بلوبيري', 'دوناتس محشو بصوص التوت الأزرق الطازج.', 'Donut Blueberry.png', 70],
        ['White Chocolate Donut | دوناتس وايت شوكليت', 'دوناتس محشو بكريمة الشوكولاتة البيضاء.', 'Donut White Chocolate.png', 70],
    ];

    for (const [name, desc, img, price] of donuts) {
        const existing = await get(`SELECT product_id FROM products WHERE product_name = ?`, [name]);
        if (!existing) {
            const maxId = await get(`SELECT MAX(product_id) as m FROM products`);
            const newId = maxId.m + 1;
            await beginTx();
            try {
                await run(`INSERT INTO products (product_id, product_name, category_id, description_ar, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
                    [newId, name, 13, desc, img, newId]);
                await commitTx();
                await resetPrices(newId, { 2: price });
                console.log(`  + Added [${newId}] ${name} → ${price}`);
            } catch (err) { await rollbackTx(); throw err; }
        } else {
            await resetPrices(existing.product_id, { 2: price });
            console.log(`  ~ Updated [${existing.product_id}] ${name} → ${price}`);
        }
    }

    // =========================================================
    // 7. Update server.js query to ORDER BY sort_order
    // =========================================================
    // (We'll handle this separately in server.js)

    await run('PRAGMA foreign_keys = ON');

    // =========================================================
    // VERIFICATION
    // =========================================================
    console.log('\n=== VERIFICATION ===');

    const hotCoffee = await all(`SELECT p.sort_order, p.product_id, p.product_name, sz.size_name, pp.price FROM products p JOIN product_prices pp ON p.product_id=pp.product_id JOIN sizes sz ON pp.size_id=sz.size_id WHERE p.category_id=1 ORDER BY p.sort_order, p.product_id, sz.size_id`);
    console.log('\nHot Coffee (sorted):');
    hotCoffee.forEach(r => console.log(`  [${r.product_id}|so:${r.sort_order}] ${r.product_name} - ${r.size_name}:${r.price}`));

    const dessert = await all(`SELECT p.product_id, p.product_name, pp.price FROM products p JOIN product_prices pp ON p.product_id=pp.product_id WHERE p.category_id=13 AND pp.size_id=2 ORDER BY p.product_id`);
    console.log('\nDessert and Bakery:');
    dessert.forEach(r => console.log(`  [${r.product_id}] ${r.product_name} → ${r.price}`));

    console.log('\n✅ All updates applied!');
    db.close((err) => { if (err) console.error(err.message); else console.log('DB closed.'); });
}

main().catch(err => { console.error('Fatal:', err); db.close(); process.exit(1); });
