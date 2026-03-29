const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database.sqlite');
const wasmPath = path.join(__dirname, 'server', 'sql-wasm.wasm');
const imagesDir = path.join(__dirname, 'client', 'public', 'images', 'products');

async function run() {
    const SQL = await initSqlJs({ locateFile: () => wasmPath });
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);
    
    const res = db.exec("SELECT product_id, product_name, image_url FROM products");
    if (res.length > 0) {
        let missing = [];
        res[0].values.forEach(row => {
            const id = row[0];
            const name = row[1];
            const imgUrl = row[2];
            
            const imgPathPng = path.join(imagesDir, imgUrl);
            const imgPathJpg = path.join(imagesDir, imgUrl.replace('.png', '.jpg'));
            const imgPathJpeg = path.join(imagesDir, imgUrl.replace('.png', '.jpeg'));
            
            if (!fs.existsSync(imgPathPng) && !fs.existsSync(imgPathJpg) && !fs.existsSync(imgPathJpeg)) {
                missing.push({ id, name, imgUrl });
            }
        });
        fs.writeFileSync('missing_images.json', JSON.stringify(missing, null, 2));
    }
}
run().catch(console.error);
