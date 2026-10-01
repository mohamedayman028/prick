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

async function main() {
    try {
        await run('BEGIN EXCLUSIVE TRANSACTION');

        // Find Dessert category ID
        const catRow = await get("SELECT category_id FROM categories WHERE LOWER(category_name) LIKE '%dessert%' LIMIT 1");
        const dessertCatId = catRow ? catRow.category_id : 13;
        console.log(`Dessert Category ID: ${dessertCatId}`);

        // Target 14 items specification
        const targetDesserts = [
            { id: 97,  name: 'Pistachio Cheesecake | تشيز كيك بستاشيو',               price: 130, descAr: 'تشيز كيك غني بزبدة وشوكولاتة الفستق.', img: 'Pistachio Cheesecake.png' },
            { id: 93,  name: 'Classic Cheesecake | تشيز كيك كلاسيك',                  price: 95,  descAr: 'تشيز كيك كلاسيك ناعمة وغنية.', img: 'Classic Cheesecake.png' },
            { id: 98,  name: 'Nutella Cheesecake | تشيز كيك نوتيلا',                  price: 104, descAr: 'تشيز كيك بحشوة وطبقة شوكولاتة النوتيلا.', img: 'Nutella Cheesecake.png' },
            { id: 186, name: 'Nutella Donut | دونات نوتيلا',                          price: 70,  descAr: 'دونات بحشوة النوتيلا الكريمية.', img: 'Nutella Donut.png' },
            { id: 121, name: 'Cookies | كوكيز',                                       price: 75,  descAr: 'كوكيز مقرمشة ومحشوة.', img: 'Cookies.png' },
            { id: 101, name: 'San Sebastian Cheesecake | سان سباستيان كلاسيك',        price: 95,  descAr: 'كيكة سان سباستيان الإسبانية الكلاسيكية.', img: 'San Sebastian Cheesecake.png' },
            { id: 102, name: 'Lotus San Sebastian Cheesecake | سان سباستيان لوتس',    price: 130, descAr: 'سان سباستيان مع صوص وتوبينج اللوتس.', img: 'Lotus San Sebastian Cheesecake.png' },
            { id: 103, name: 'Nutella San Sebastian Cheesecake | سان سباستيان نوتيلا',  price: 120, descAr: 'سان سباستيان مغطاة بصوص النوتيلا الغني.', img: 'Nutella San Sebastian Cheesecake.png' },
            { id: 104, name: 'Blueberry San Sebastian Cheesecake | سان سباستيان توت', price: 120, descAr: 'سان سباستيان مع صوص التوت الأزرق المنعش.', img: 'Blueberry San Sebastian Cheesecake.png' },
            { id: 105, name: 'Caramel San Sebastian Cheesecake | سان سباستيان كراميل',price: 120, descAr: 'سان سباستيان مغطاة بصوص الكراميل.', img: 'Caramel San Sebastian Cheesecake.png' },
            { id: 106, name: 'Pistachio San Sebastian Cheesecake | سان سباستيان بستاشيو', price: 130, descAr: 'سان سباستيان بصوص وشوكولاتة الفستق.', img: 'Pistachio San Sebastian Cheesecake.png' },
            { id: 107, name: 'Tiramisu | تيراميسو',                                   price: 120, descAr: 'حلوى التيراميسو الإيطالية بطعم القهوة.', img: 'Tiramisu.png' },
            { id: 187, name: 'Oreo Cake | أوريو كيك',                                  price: 120, descAr: 'كيكة الأوريو الكريمية اللذيذة.', img: 'Oreo Cake.png' },
            { id: 99,  name: 'Molten Cake | مولتن كيك',                               price: 120, descAr: 'مولتن كيك دافئة بحشوة الشوكولاتة الذائبة.', img: 'Molten Cake.png' }
        ];

        const targetIds = targetDesserts.map(d => d.id);

        // 1. Get all current products in Dessert category (category_id = dessertCatId)
        const currentProducts = await all("SELECT product_id, product_name FROM products WHERE category_id = ?", [dessertCatId]);
        console.log(`Current products in Dessert category (${currentProducts.length}):`);
        currentProducts.forEach(p => console.log(`  - [ID ${p.product_id}] ${p.product_name}`));

        // 2. Identify duplicate/extra products in Dessert category that are NOT in targetIds
        const extraProducts = currentProducts.filter(p => !targetIds.includes(p.product_id));
        console.log(`\nRemoving extra/duplicate products from Dessert category (${extraProducts.length}):`);
        for (const p of extraProducts) {
            console.log(`  ❌ Deleting prices and product [ID ${p.product_id}] ${p.product_name}`);
            await run("DELETE FROM product_prices WHERE product_id = ?", [p.product_id]);
            await run("DELETE FROM products WHERE product_id = ?", [p.product_id]);
        }

        // 3. Upsert/Update the 14 target products
        console.log('\nUpserting and setting prices for 14 Dessert products:');
        for (const t of targetDesserts) {
            const existing = await get("SELECT product_id FROM products WHERE product_id = ?", [t.id]);
            if (existing) {
                await run(
                    "UPDATE products SET product_name = ?, category_id = ?, description_ar = ?, image_url = ? WHERE product_id = ?",
                    [t.name, dessertCatId, t.descAr, t.img, t.id]
                );
                console.log(`  ~ Updated product info [ID ${t.id}] ${t.name}`);
            } else {
                await run(
                    "INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES (?, ?, ?, ?, ?)",
                    [t.id, t.name, dessertCatId, t.descAr, t.img]
                );
                console.log(`  + Inserted product [ID ${t.id}] ${t.name}`);
            }

            // Remove all existing prices for this product to prevent duplicate sizes/prices
            await run("DELETE FROM product_prices WHERE product_id = ?", [t.id]);
            // Insert single size M (size_id 2) with target price
            await run("INSERT INTO product_prices (product_id, size_id, price) VALUES (?, 2, ?)", [t.id, t.price]);
            console.log(`    -> Price set: size_id 2 (M) = ${t.price} EGP`);
        }

        await run('COMMIT');
        console.log('\nTransaction committed successfully.');

        // 4. Verification step
        console.log('\n================ VERIFICATION ================');
        const finalDesserts = await all(`
            SELECT p.product_id, p.product_name, c.category_name, pp.size_id, s.size_name, pp.price
            FROM products p
            JOIN categories c ON p.category_id = c.category_id
            JOIN product_prices pp ON p.product_id = pp.product_id
            JOIN sizes s ON pp.size_id = s.size_id
            WHERE p.category_id = ?
            ORDER BY p.product_id
        `, [dessertCatId]);

        console.log(`Total Dessert items in DB: ${finalDesserts.length}\n`);
        finalDesserts.forEach((r, idx) => {
            console.log(`${(idx + 1).toString().padStart(2)}. [ID ${r.product_id}] ${r.product_name} | Price: ${r.price} EGP`);
        });

    } catch (err) {
        console.error('Error during cleanup:', err);
        await run('ROLLBACK').catch(() => {});
    } finally {
        db.close();
    }
}

main();
