const fs = require('fs');
let sql = fs.readFileSync('server/seed.sql', 'utf8');

// 1. Update categories
sql = sql.replace(/\\('Boba', 60\\),/, "('Boba Soft', 60),");
sql = sql.replace(/\\('Mojito and Soda', 160\\);/, "('Mojito and Soda', 160),\n('Boba Milkshake', 61),\n('Boba Smoothie', 62);");

// 2. Remove BOBA products and prices
// The block has CR LF line endings, so regex matching needs to be robust
const blockPattern = /\/\* =========================\r?\nBOBA\r?\n========================= \*\/\r?\nINSERT INTO products[\s\S]*?\(48, 3, 114\);\r?\n/;

if (blockPattern.test(sql)) {
    sql = sql.replace(blockPattern, '/* BOBA CATEGORY REMOVED */\n');
} else {
    console.log('Could not find BOBA block via regex, trying literal replace.');
    const literal = `/* =========================
BOBA
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Boba Soft | بوبا سوفت', 6, 'شاي ناعم مع حبيبات البوبا الطرية.', 'default.jpg'),
('Boba Milkshake | بوبا ميلك شيك', 6, 'ميلك شيك كريمي مع حبيبات البوبا.', 'Boba Milkshake.png'),
('Boba Smoothie | بوبا سموزي', 6, 'سموثي فواكه طازج مع حبيبات البوبا.', 'Boba Smoothie.png'),
('Boba Tabioka | بوبا تابيوكا', 6, 'مشروب تقليدي مع حبات البوبا الكبيرة.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(45, 1, 84), (45, 2, 89), (45, 3, 94),
(46, 1, 99), (46, 2, 104), (46, 3, 114),
(47, 1, 89), (47, 2, 94), (47, 3, 99),
(48, 1, 104), (48, 2, 109), (48, 3, 114);`;
    sql = sql.replace(literal, '/* BOBA CATEGORY REMOVED */');
}

// 3. Decrement all product IDs >= 49 by 4 in product_prices
sql = sql.replace(/\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, p1, p2, p3) => {
    let id = parseInt(p1);
    if (id >= 49) {
        return `(${id - 4}, ${p2}, ${p3})`;
    }
    return match;
});

fs.writeFileSync('server/seed.sql', sql);
console.log('Update complete.');
