const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const imgDir = path.join(__dirname, '../client/public/images/products');
const existingFiles = fs.readdirSync(imgDir);

console.log('Total files in products image dir:', existingFiles.length);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error('Cannot open DB:', err.message); process.exit(1); }
    db.configure('busyTimeout', 5000);
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

        const catRow = await get("SELECT category_id FROM categories WHERE LOWER(category_name) LIKE '%dessert%' LIMIT 1");
        const catId = catRow ? catRow.category_id : 13;

        // 14 target products with exact names user wants & matching existing images
        const targetDesserts = [
            {
                id: 93,
                name: 'Classic Cheesecake | تشيز كيك كلاسيك',
                img: 'Cheesecake.png',
                price: 95,
                desc: 'تشيز كيك كلاسيك ناعمة وغنية.'
            },
            {
                id: 97,
                name: 'Pistachio Cheesecake | تشيز كيك بستاشيو',
                img: 'Cheese cake Pistachio.png',
                price: 130,
                desc: 'تشيز كيك غني بزبدة وشوكولاتة الفستق.'
            },
            {
                id: 98,
                name: 'Nutella Cheesecake | تشيز كيك نوتيلا',
                img: 'Cheese cake Nutella.png',
                price: 104,
                desc: 'تشيز كيك بحشوة وطبقة شوكولاتة النوتيلا.'
            },
            {
                id: 186,
                name: 'Nutella Donut | دونات نوتيلا',
                img: existingFiles.includes('Nutella Donut.png') ? 'Nutella Donut.png' : 'Cheese cake Nutella.png',
                price: 70,
                desc: 'دونات بحشوة النوتيلا الكريمية.'
            },
            {
                id: 121,
                name: 'Cookies | كوكيز',
                img: 'Cookies.png',
                price: 75,
                desc: 'كوكيز مقرمشة ومحشوة.'
            },
            {
                id: 101,
                name: 'San Sebastian | سان سباستيان',
                img: existingFiles.includes('San Sebastian.png') ? 'San Sebastian.png' : 'San Sebastian Lotus.png',
                price: 95,
                desc: 'كيكة سان سباستيان الإسبانية الكلاسيكية.'
            },
            {
                id: 102,
                name: 'Lotus San Sebastian | سان سباستيان لوتس',
                img: 'San Sebastian Lotus.png',
                price: 130,
                desc: 'سان سباستيان مع صوص وتوبينج اللوتس.'
            },
            {
                id: 103,
                name: 'Nutella San Sebastian | سان سباستيان نوتيلا',
                img: 'San Sebastian Nutella.png',
                price: 120,
                desc: 'سان سباستيان مغطاة بصوص النوتيلا الغني.'
            },
            {
                id: 104,
                name: 'Blueberry San Sebastian | سان سباستيان توت',
                img: 'San Sebastian Blueberry.png',
                price: 120,
                desc: 'سان سباستيان مع صوص التوت الأزرق المنعش.'
            },
            {
                id: 105,
                name: 'Caramel San Sebastian | سان سباستيان كراميل',
                img: 'San Sebastian Caramel.png',
                price: 120,
                desc: 'سان سباستيان مغطاة بصوص الكراميل.'
            },
            {
                id: 106,
                name: 'Pistachio San Sebastian | سان سباستيان بستاشيو',
                img: 'San Sebastian Pistachio.png',
                price: 130,
                desc: 'سان سباستيان بصوص وشوكولاتة الفستق.'
            },
            {
                id: 107,
                name: 'Tiramisu | تيراميسو',
                img: 'Tiramisu.png',
                price: 120,
                desc: 'حلوى التيراميسو الإيطالية بطعم القهوة.'
            },
            {
                id: 187,
                name: 'Oreo Cake | أوريو كيك',
                img: existingFiles.includes('Oreo Cake.png') ? 'Oreo Cake.png' : 'Oreo Shake.png',
                price: 120,
                desc: 'كيكة الأوريو الكريمية اللذيذة.'
            },
            {
                id: 99,
                name: 'Molten Cake | مولتن كيك',
                img: 'Molten Cake.png',
                price: 120,
                desc: 'مولتن كيك دافئة بحشوة الشوكولاتة الذائبة.'
            }
        ];

        console.log('=== Updating Dessert Products Names & Images ===');
        for (const item of targetDesserts) {
            await run(
                "UPDATE products SET product_name = ?, category_id = ?, description_ar = ?, image_url = ? WHERE product_id = ?",
                [item.name, catId, item.desc, item.img, item.id]
            );
            await run("DELETE FROM product_prices WHERE product_id = ?", [item.id]);
            await run("INSERT INTO product_prices (product_id, size_id, price) VALUES (?, 2, ?)", [item.id, item.price]);

            const fileOK = existingFiles.includes(item.img);
            console.log(`[ID ${item.id}] ${item.name} | Image: "${item.img}" (${fileOK ? '✅ File Exists' : '❌ File Missing'}) | Price: ${item.price}`);
        }

        await run('COMMIT');
        console.log('\n✅ Transaction committed.');

    } catch (err) {
        console.error('Error:', err);
        await run('ROLLBACK').catch(() => {});
    } finally {
        db.close();
    }
}

main();
