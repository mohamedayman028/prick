/**
 * apply_updates_3.cjs
 * ====================
 * Changes:
 * 1. White Frappe [166] → 115
 * 2. Hot Matcha [41] → 115
 * 3. Hot Coffee: Turkish Coffee [9] → last before Espresso
 *    (sort_order just before Espresso [1] so:10, Espresso stays last with Turkish before it)
 * 4. Cold Drinks: Delete V Cola [86], V7 [87], Double Dare [88], C4 [90] entirely
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const run = (sql, p=[]) => new Promise((res,rej) => db.run(sql, p, function(e){ e?rej(e):res(this); }));
const all = (sql, p=[]) => new Promise((res,rej) => db.all(sql, p, (e,r)=>{ e?rej(e):res(r); }));

async function applyUpdates() {
    try {
        await run('BEGIN TRANSACTION');

        // ============================================================
        // 1. White Frappe [166] → 115
        // ============================================================
        console.log('\n=== 1. White Frappe price ===');
        const wfRes = await run('UPDATE product_prices SET price = 115 WHERE product_id = 166');
        console.log(`  White Frappe [166] → 115 (${wfRes.changes} rows updated)`);

        // ============================================================
        // 2. Hot Matcha [41] → 115
        // ============================================================
        console.log('\n=== 2. Hot Matcha price ===');
        const hmRes = await run('UPDATE product_prices SET price = 115 WHERE product_id = 41');
        console.log(`  Hot Matcha [41] → 115 (${hmRes.changes} rows updated)`);

        // ============================================================
        // 3. Hot Coffee ordering:
        //    - Turkish Coffee [9] → sort_order = 98 (second to last)
        //    - Espresso [1] → sort_order = 99 (last)
        //    All other products keep their current sort_order (which are lower numbers)
        //    Current sort_orders: Turkish=1, Espresso=10 → need Turkish=98, Espresso=99
        // ============================================================
        console.log('\n=== 3. Hot Coffee ordering ===');
        // First let's see current max sort_order among hot coffee products
        const hcProds = await all(`
            SELECT product_id, product_name, COALESCE(sort_order, product_id) as so 
            FROM products 
            WHERE category_id = 1 
            ORDER BY so
        `);
        console.log('  Current hot coffee products:');
        hcProds.forEach(p => console.log(`    [${p.product_id}|so:${p.so}] ${p.product_name}`));

        // Set all other hot coffee products to sequential sort_orders 1-N
        // excluding Turkish [9] and Espresso [1]
        const others = hcProds.filter(p => p.product_id !== 9 && p.product_id !== 1);
        let sortIdx = 1;
        for (const p of others) {
            await run('UPDATE products SET sort_order = ? WHERE product_id = ?', [sortIdx, p.product_id]);
            sortIdx++;
        }
        // Turkish Coffee just before last
        await run('UPDATE products SET sort_order = ? WHERE product_id = 9', [sortIdx]);
        sortIdx++;
        // Espresso last
        await run('UPDATE products SET sort_order = ? WHERE product_id = 1', [sortIdx]);

        console.log(`  Turkish Coffee [9] → sort_order = ${sortIdx - 1}`);
        console.log(`  Espresso [1] → sort_order = ${sortIdx}`);

        // ============================================================
        // 4. Delete from Cold Drinks: V Cola [86], V7 [87], Double Dare [88], C4 [90]
        // ============================================================
        console.log('\n=== 4. Cold Drinks: remove products ===');
        const toDelete = [86, 87, 88, 90];
        const toDeleteNames = {86: 'V Cola', 87: 'V7', 88: 'Double Dare', 90: 'C4'};
        for (const pid of toDelete) {
            await run('DELETE FROM product_prices WHERE product_id = ?', [pid]);
            const delRes = await run('DELETE FROM products WHERE product_id = ?', [pid]);
            console.log(`  Deleted ${toDeleteNames[pid]} [${pid}] (${delRes.changes} row)`);
        }

        await run('COMMIT');

        // ============================================================
        // VERIFICATION
        // ============================================================
        console.log('\n=== VERIFICATION ===');

        const frappe = await all(`
            SELECT p.product_id, p.product_name, s.size_name, pp.price
            FROM products p JOIN product_prices pp ON p.product_id=pp.product_id JOIN sizes s ON pp.size_id=s.size_id
            WHERE p.category_id = 4 ORDER BY p.product_id, s.size_id
        `);
        console.log('\nFrappe section:');
        frappe.forEach(p => console.log(`  [${p.product_id}] ${p.product_name} → ${p.size_name}: ${p.price}`));

        const matcha = await all(`
            SELECT p.product_id, p.product_name, s.size_name, pp.price
            FROM products p JOIN product_prices pp ON p.product_id=pp.product_id JOIN sizes s ON pp.size_id=s.size_id
            WHERE p.category_id = 5 ORDER BY p.product_id, s.size_id
        `);
        console.log('\nMatcha section:');
        matcha.forEach(p => console.log(`  [${p.product_id}] ${p.product_name} → ${p.size_name}: ${p.price}`));

        const hotCoffee = await all(`
            SELECT p.product_id, p.product_name, COALESCE(p.sort_order, p.product_id) as so, s.size_name, pp.price
            FROM products p JOIN product_prices pp ON p.product_id=pp.product_id JOIN sizes s ON pp.size_id=s.size_id
            WHERE p.category_id = 1 ORDER BY so, p.product_id, s.size_id
        `);
        console.log('\nHot Coffee section (ordered):');
        let lastId = null;
        for (const p of hotCoffee) {
            if (p.product_id !== lastId) {
                console.log(`  [${p.product_id}|so:${p.so}] ${p.product_name}`);
                lastId = p.product_id;
            }
            console.log(`    → ${p.size_name}: ${p.price}`);
        }

        const cold = await all(`
            SELECT p.product_id, p.product_name, s.size_name, pp.price
            FROM products p JOIN product_prices pp ON p.product_id=pp.product_id JOIN sizes s ON pp.size_id=s.size_id
            WHERE p.category_id = 12 ORDER BY p.product_id, s.size_id
        `);
        console.log('\nCold Drinks section:');
        cold.forEach(p => console.log(`  [${p.product_id}] ${p.product_name} → ${p.size_name}: ${p.price}`));

        console.log('\n✅ All updates applied!');
    } catch (err) {
        await run('ROLLBACK').catch(()=>{});
        console.error('❌ Error:', err);
    } finally {
        db.close(() => console.log('DB closed.'));
    }
}

applyUpdates();
