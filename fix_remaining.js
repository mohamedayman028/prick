const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database.sqlite');
const wasmPath = path.join(__dirname, 'server', 'sql-wasm.wasm');
const imagesDir = path.join(__dirname, 'client', 'public', 'images', 'products');

async function fixImages() {
    const SQL = await initSqlJs({ locateFile: () => wasmPath });
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);
    
    // Get all files
    const allFiles = fs.readdirSync(imagesDir);
    
    // Get products
    const res = db.exec("SELECT product_id, product_name, image_url FROM products");
    if (res.length === 0) return;
    
    let updated = 0;
    res[0].values.forEach(row => {
        const id = row[0];
        const nameEn = row[1].split('|')[0].trim();
        const currentImg = row[2];
        
        const imgPathPng = path.join(imagesDir, currentImg);
        const imgPathJpg = path.join(imagesDir, currentImg.replace('.png', '.jpg'));
        const imgPathJpeg = path.join(imagesDir, currentImg.replace('.png', '.jpeg'));
        
        let exists = fs.existsSync(imgPathPng) || fs.existsSync(imgPathJpg) || fs.existsSync(imgPathJpeg);
        
        if (!exists) {
            // Find a match
            // Strategy 1: exact match with any extension
            let match = allFiles.find(f => f.replace(/\.(png|jpg|jpeg)$/, '') === currentImg.replace(/\.(png|jpg|jpeg)$/, ''));
            
            // Strategy 2: substring match based on englishName
            if (!match) {
                 const searchStr = nameEn.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().split(' ').filter(w => w.length>2);
                 match = allFiles.find(f => {
                     const fLower = f.toLowerCase();
                     return searchStr.every(s => fLower.includes(s));
                 });
            }
            // Strategy 3: fallback just the first word
            if (!match) {
                 const firstWord = nameEn.split(' ')[0].toLowerCase();
                 // avoiding overly broad matches if possible, but worth a try
                 match = allFiles.find(f => f.toLowerCase().includes(firstWord) && !f.includes('Smoothie') && !f.includes('Shake'));
            }
            
            if (match) {
                console.log(`Fixing [${id}] ${nameEn}: ${currentImg} -> ${match}`);
                db.run("UPDATE products SET image_url = ? WHERE product_id = ?", [match, id]);
                updated++;
            } else {
                console.log(`Still missing for [${id}] ${nameEn}`);
            }
        } else {
             // For the existing files, make sure we use the EXTENSION that actually exists
             // so the frontend doesn't rely on the hacky handleImageError
             if (!fs.existsSync(imgPathPng) && fs.existsSync(imgPathJpg)) {
                 db.run("UPDATE products SET image_url = ? WHERE product_id = ?", [currentImg.replace('.png', '.jpg'), id]);
                 updated++;
             }
        }
    });

    // Save changes
    if (updated > 0) {
        fs.writeFileSync(dbPath, Buffer.from(db.export()));
        console.log(`Updated ${updated} images in DB`);
    } else {
        console.log("No updates needed");
    }
}
fixImages().catch(console.error);
