const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error('Cannot open DB:', err.message); process.exit(1); }
});

const run = (sql, params = []) => new Promise((res, rej) =>
    db.run(sql, params, function (err) { err ? rej(err) : res(this); })
);
const all = (sql, params = []) => new Promise((res, rej) =>
    db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
);

async function main() {
    try {
        await run('BEGIN EXCLUSIVE TRANSACTION');

        // Delete product_prices and products for product_id 186 (Nutella Donut) and 187 (Oreo Cake)
        const idsToRemove = [186, 187];
        console.log('Removing product IDs:', idsToRemove);

        for (const id of idsToRemove) {
            await run("DELETE FROM product_prices WHERE product_id = ?", [id]);
            await run("DELETE FROM products WHERE product_id = ?", [id]);
            console.log(`Deleted product ID ${id}`);
        }

        await run('COMMIT');
        console.log('Transaction committed.\n');

        // Verification
        const desserts = await all(`
            SELECT p.product_id, p.product_name, pp.price
            FROM products p
            JOIN product_prices pp ON p.product_id = pp.product_id
            WHERE p.category_id = 13
            ORDER BY p.product_id
        `);

        console.log(`Total remaining Dessert items in DB: ${desserts.length}`);
        desserts.forEach((r, idx) => {
            console.log(`  ${(idx + 1).toString().padStart(2)}. [ID ${r.product_id}] ${r.product_name} | ${r.price} EGP`);
        });

    } catch (err) {
        console.error('Error:', err);
        await run('ROLLBACK').catch(() => {});
    } finally {
        db.close();
    }
}

main();
