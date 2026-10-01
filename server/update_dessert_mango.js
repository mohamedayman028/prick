/**
 * update_dessert_mango.js
 * Updates dessert prices, adds missing dessert products, and sets Mango Shake price.
 * Run from /server folder: node update_dessert_mango.js
 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) { console.error('Cannot open DB:', err.message); process.exit(1); }
    db.configure('busyTimeout', 5000);
    console.log('Connected to database.\n');
});

const run = (sql, params = []) => new Promise((res, rej) =>
    db.run(sql, params, function (err) { err ? rej(err) : res(this); })
);
const get = (sql, params = []) => new Promise((res, rej) =>
    db.get(sql, params, (err, row) => { err ? rej(err) : res(row); })
);
const all = (sql, params = []) => new Promise((res, rej) =>
    db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
);

async function setPrice(productId, sizeId, price) {
    await run('BEGIN EXCLUSIVE TRANSACTION');
    await run('DELETE FROM product_prices WHERE product_id = ? AND size_id = ?', [productId, sizeId]);
    await run('INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)', [productId, sizeId, price]);
    await run('COMMIT');
}

async function ensureProduct(productId, name, categoryId, descAr, imageUrl) {
    const existing = await get('SELECT product_id FROM products WHERE product_id = ?', [productId]);
    if (!existing) {
        await run('BEGIN EXCLUSIVE TRANSACTION');
        await run(
            'INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES (?, ?, ?, ?, ?)',
            [productId, name, categoryId, descAr, imageUrl]
        );
        await run('COMMIT');
        console.log(`  + Inserted: [${productId}] ${name}`);
    } else {
        console.log(`  ~ Exists: [${productId}] ${name}`);
    }
}

async function main() {
    try {
        // Get Dessert category_id
        const dessertCat = await get("SELECT category_id FROM categories WHERE LOWER(category_name) LIKE '%dessert%' LIMIT 1");
        const catId = dessertCat ? dessertCat.category_id : 8; // fallback
        console.log(`Dessert category_id = ${catId}\n`);

        // ── MANGO SHAKE (129): M:119 | L:129 ────────────────────────────────
        console.log('=== Mango Shake ===');
        await setPrice(129, 2, 119);
        await setPrice(129, 3, 129);
        console.log('  Updated: Mango Shake M:119 | L:129');

        // ── DESSERT ──────────────────────────────────────────────────────────
        console.log('\n=== Dessert Items ===');

        // [93] Cheese cake (Classic Cheesecake): 95
        await setPrice(93, 2, 95);
        console.log('  Updated: Classic Cheesecake → 95');

        // [97] Cheese cake Pistachio (Pistachio Cheesecake): 130
        await setPrice(97, 2, 130);
        console.log('  Updated: Pistachio Cheesecake → 130');

        // [98] Cheese cake Nutella (Nutella Cheesecake): 104
        await setPrice(98, 2, 104);
        console.log('  Updated: Nutella Cheesecake → 104');

        // [101] San Sebastian (Classic): 95
        await setPrice(101, 2, 95);
        console.log('  Updated: San Sebastian Cheesecake (Classic) → 95');

        // [102] San Sebastian Lotus: 130
        await setPrice(102, 2, 130);
        console.log('  Updated: Lotus San Sebastian Cheesecake → 130');

        // [103] San Sebastian Nutella: 120
        await setPrice(103, 2, 120);
        console.log('  Updated: Nutella San Sebastian Cheesecake → 120');

        // [104] San Sebastian Blueberry: 120
        await setPrice(104, 2, 120);
        console.log('  Updated: Blueberry San Sebastian Cheesecake → 120');

        // [105] San Sebastian Caramel: 120
        await setPrice(105, 2, 120);
        console.log('  Updated: Caramel San Sebastian Cheesecake → 120');

        // [106] San Sebastian Pistachio: 130
        await setPrice(106, 2, 130);
        console.log('  Updated: Pistachio San Sebastian Cheesecake → 130');

        // [107] Tiramisu: 120 (single size, use size_id 2)
        // Remove old L size first, set single price
        await run('BEGIN EXCLUSIVE TRANSACTION');
        await run('DELETE FROM product_prices WHERE product_id = 107');
        await run('INSERT INTO product_prices (product_id, size_id, price) VALUES (107, 2, 120)');
        await run('COMMIT');
        console.log('  Updated: Tiramisu → 120');

        // [99] Molten Cake: 120
        await setPrice(99, 2, 120);
        console.log('  Updated: Molten Cake → 120');

        // [121] Cookies: 75 (single size)
        await run('BEGIN EXCLUSIVE TRANSACTION');
        await run('DELETE FROM product_prices WHERE product_id = 121');
        await run('INSERT INTO product_prices (product_id, size_id, price) VALUES (121, 2, 75)');
        await run('COMMIT');
        console.log('  Updated: Cookies → 75');

        // ── ADD MISSING: Nutella Donut (product_id 186) ──────────────────────
        await ensureProduct(186, 'Nutella Donut | دونات نوتيلا', catId,
            'دونات بحشوة النوتيلا الكريمية.', 'Nutella Donut.png');
        await run('BEGIN EXCLUSIVE TRANSACTION');
        await run('DELETE FROM product_prices WHERE product_id = 186');
        await run('INSERT INTO product_prices (product_id, size_id, price) VALUES (186, 2, 70)');
        await run('COMMIT');
        console.log('  Updated: Nutella Donut → 70');

        // ── ADD MISSING: Oreo Cake (product_id 187) ──────────────────────────
        await ensureProduct(187, 'Oreo Cake | أوريو كيك', catId,
            'كيكة الأوريو الكريمية اللذيذة.', 'Oreo Cake.png');
        await run('BEGIN EXCLUSIVE TRANSACTION');
        await run('DELETE FROM product_prices WHERE product_id = 187');
        await run('INSERT INTO product_prices (product_id, size_id, price) VALUES (187, 2, 120)');
        await run('COMMIT');
        console.log('  Updated: Oreo Cake → 120');

        // ── VERIFY ───────────────────────────────────────────────────────────
        console.log('\n--- Verification ---');
        const sample = await all(`
            SELECT p.product_id, p.product_name, pp.size_id, pp.price
            FROM product_prices pp
            JOIN products p ON pp.product_id = p.product_id
            WHERE pp.product_id IN (129, 93, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 121, 186, 187)
            ORDER BY pp.product_id, pp.size_id
        `);
        sample.forEach(r => console.log(`  [${r.product_id}] ${r.product_name} | size:${r.size_id} → ${r.price}`));

        console.log('\n✅ Done!');
    } catch (err) {
        console.error('❌ Error:', err.message);
        await run('ROLLBACK').catch(() => {});
    } finally {
        db.close();
    }
}

main();
