const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const all = (sql, params = []) => new Promise((res, rej) =>
    db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
);

async function exportMenuData() {
    try {
        const categories = await all("SELECT * FROM categories ORDER BY sort_order ASC, category_id ASC");
        const products = await all(`
            SELECT p.*, pp.price, s.size_name 
            FROM products p
            JOIN product_prices pp ON p.product_id = pp.product_id
            JOIN sizes s ON pp.size_id = s.size_id
            ORDER BY COALESCE(p.sort_order, p.product_id) ASC, p.product_id ASC, s.size_id ASC
        `);

        const catMap = [];

        for (const c of categories) {
            const catProds = {};
            const prodsForCat = products.filter(p => p.category_id === c.category_id);

            for (const p of prodsForCat) {
                if (!catProds[p.product_id]) {
                    catProds[p.product_id] = {
                        id: p.product_id,
                        name: p.product_name,
                        description_ar: p.description_ar || "",
                        imageUrl: p.image_url || "",
                        items: []
                    };
                }
                catProds[p.product_id].items.push({
                    size: p.size_name,
                    price: p.price
                });
            }

            const prodList = Object.values(catProds);
            if (prodList.length > 0) {
                catMap.push({
                    category_id: c.category_id,
                    category_name: c.category_name,
                    sort_order: c.sort_order,
                    products: prodList
                });
            }
        }

        const jsContent = `export const FALLBACK_CATEGORIES = ${JSON.stringify(catMap, null, 4)};\n`;
        const menuDataPath = path.join(__dirname, '..', 'menuData.js');
        fs.writeFileSync(menuDataPath, jsContent, 'utf8');
        console.log('✅ Exported menuData.js successfully!');
    } catch (err) {
        console.error('Error exporting menuData.js:', err);
    } finally {
        db.close();
    }
}

exportMenuData();
