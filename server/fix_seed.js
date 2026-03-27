const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'seed.sql');
let content = fs.readFileSync(seedPath, 'utf8');

// 1. Translations fixes
content = content.replace(/'V Cola ', 12/g, "'V Cola | في كولا', 12");
content = content.replace(/'V7 ', 12/g, "'V7 | في 7', 12");
content = content.replace(/'C4 ', 12/g, "'C4 | سي 4', 12");
content = content.replace(/'V60 Ice ', 7/g, "'V60 Ice | في 60 مثلج', 7");
content = content.replace(/'V60 Hot ', 7/g, "'V60 Hot | في 60 ساخن', 7");

// 2. Duplicate Removal (Cheese Croissant #2 and price #130)
content = content.replace(/,\r?\n\('Cheese Croissant \| كرواسون جبنة', 14,  'كرواسون طازج محشو بجبنة بيضاء كريمية، بقوام هش من الخارج وطري من الداخل ', NULL\)/g, "");
content = content.replace(/,\r?\n\(130,2,45\)/g, "");

// Ensure the last row has a semicolon since we removed 130
content = content.replace(/\(129, 2, 50\);?/g, "(129, 2, 50);");

// 3. Image Mapping
const imagesDir = path.join(__dirname, '../images/products');
const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];

const productRegex = /\('([^']+)', (\d+), '([^']+)', NULL\)/g;

content = content.replace(productRegex, (match, name, category, desc) => {
    // extract English name before the pipe
    const englishName = name.split('|')[0].trim();
    
    // Find best image match
    const bestMatch = imageFiles.find(file => {
        const fileBaseName = path.parse(file).name.toLowerCase();
        const enLower = englishName.toLowerCase();
        
        return fileBaseName === enLower || 
               name.toLowerCase().includes(fileBaseName) ||
               enLower.includes(fileBaseName);
    });

    const finalPath = bestMatch ? `/images/products/${bestMatch}` : `/images/products/default.jpg`;
    
    return `('${name}', ${category}, '${desc}', '${finalPath}')`;
});

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Seed modifications completed!');
