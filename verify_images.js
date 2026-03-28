const fs = require('fs');
const path = require('path');

async function verify() {
    console.log('--- VERIFICATION ---');
    
    // Check API response directly by querying the DB (same logic as server.js)
    const initSqlJs = require('sql.js');
    const wasmPath = path.join(__dirname, 'server', 'sql-wasm.wasm');
    const dbPath = path.join(__dirname, 'server', 'database.sqlite');

    const SQL = await initSqlJs({
        locateFile: file => wasmPath
    });

    const fileBuffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(fileBuffer);

    const query = `
        SELECT 
            p.product_id, 
            p.product_name, 
            p.image_url
        FROM products p
        LIMIT 5
    `;

    const res = db.exec(query);
    const products = res[0].values.map(v => ({ id: v[0], name: v[1], imageUrl: v[2] }));

    console.log('Sample Products from DB:');
    products.forEach(p => {
        console.log(`- ${p.name}: ${p.imageUrl}`);
        
        // Verify image existence in public folder (matching the new frontend logic)
        const fullImagePath = path.join(__dirname, 'client', 'public', 'images', 'products', p.imageUrl);
        if (fs.existsSync(fullImagePath)) {
            console.log(`  ✅ Image found at: ${fullImagePath}`);
        } else {
            console.log(`  ❌ Image NOT found at: ${fullImagePath}`);
        }
    });

    console.log('\n--- VERIFICATION COMPLETE ---');
}

verify().catch(err => {
    console.error('Verification failed:', err);
});
