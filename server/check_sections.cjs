const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite', sqlite3.OPEN_READONLY);

const all = (sql, p=[]) => new Promise((res,rej) => db.all(sql, p, (e,r)=>{ e?rej(e):res(r); }));

async function main() {
    // All categories
    const cats = await all("SELECT category_id, category_name, sort_order FROM categories ORDER BY sort_order, category_id");
    console.log('\n=== CATEGORIES ===');
    cats.forEach(c => console.log(`  [${c.category_id}] ${c.category_name} (sort:${c.sort_order})`));

    // Products in each category we care about
    const targetNames = ['frappe','matcha','hot coffee','cold drink'];
    const targetCats = cats.filter(c => targetNames.some(n => c.category_name.toLowerCase().includes(n)));
    
    for (const cat of targetCats) {
        const prods = await all(`
            SELECT p.product_id, p.product_name, COALESCE(p.sort_order, p.product_id) as so, s.size_name, pp.price
            FROM products p
            JOIN product_prices pp ON p.product_id = pp.product_id
            JOIN sizes s ON pp.size_id = s.size_id
            WHERE p.category_id = ?
            ORDER BY so, p.product_id, s.size_id
        `, [cat.category_id]);

        console.log(`\n=== [${cat.category_id}] ${cat.category_name} ===`);
        let lastId = null;
        for (const p of prods) {
            if (p.product_id !== lastId) {
                console.log(`  [${p.product_id}|so:${p.so}] ${p.product_name}`);
                lastId = p.product_id;
            }
            console.log(`    → ${p.size_name}: ${p.price}`);
        }
    }

    db.close();
}

main().catch(console.error);
