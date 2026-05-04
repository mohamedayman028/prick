const fs = require('fs');
let content = fs.readFileSync('seed.sql', 'utf8');

// The user requested Warm Drinks to be EXACTLY:
// Tea (شاي) | Medium: 50
// Tea with Milk | Medium: 60 (kept from current DB)
// Hot Chocolate (هوت شوكليت) | Small: 85, Medium: 94
// Hot Cider | Medium: 65, Large: 70
// Sahlab | Medium: 60, Large: 65

// Replace the Warm Drinks products block
const warmDrinksProducts = `INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Tea | شاي', 2, 'شاي أسود فاخر محضر طازجاً.', 'Tea.png'),
('Tea with Milk | شاي بالحليب', 2, 'شاي كلاسيكي ممزوج بالحليب الناعم.', 'Tea with Milk.png'),
('Hot Chocolate | هوت شوكلت', 2, 'شوكولاتة غنية وحليب مبخر دافئ.', 'Hot Chocolate.png'),
('Hot Cider | هوت سيدر', 2, 'سيدر تفاح دافئ مع لمسة قرفة.', 'Hot Cider.png'),
('Sahlab | سحلب', 2, 'مشروب السحلب التقليدي بالمكسرات.', 'Sahlab.png');`;

content = content.replace(/INSERT INTO products \([^\)]+\) VALUES\s*\n\('Tea \| شاي'[^;]+'Sahlab\.png'\);/, warmDrinksProducts);

// Now replace the Warm Drinks prices block
const warmDrinksPrices = `INSERT INTO product_prices (product_id, size_id, price) VALUES
({WD_1}, 2, 50),
({WD_2}, 2, 60),
({WD_3}, 1, 85), ({WD_3}, 2, 94),
({WD_4}, 2, 65), ({WD_4}, 3, 70),
({WD_5}, 2, 60), ({WD_5}, 3, 65);`;

content = content.replace(/INSERT INTO product_prices \(product_id, size_id, price\) VALUES\s*\n\(16, 2, 50\)[^;]+;/, warmDrinksPrices);

// Specialty Coffee: 6 products
const specCoffeePrices = `INSERT INTO product_prices (product_id, size_id, price) VALUES
({SC_1}, 2, 160),
({SC_2}, 2, 150),
({SC_3}, 2, 150),
({SC_4}, 2, 160),
({SC_5}, 2, 170),
({SC_6}, 2, 180);`;
content = content.replace(/INSERT INTO product_prices \(product_id, size_id, price\) VALUES\s*\n\(45, 2, 160\)[^;]*\(46, 2, 180\);/s, specCoffeePrices);

// Extras: 8 products
const extrasPrices = `INSERT INTO product_prices (product_id, size_id, price) VALUES
({EX_1}, 1, 35), ({EX_1}, 2, 40),
({EX_2}, 1, 35), ({EX_2}, 2, 40),
({EX_3}, 1, 35), ({EX_3}, 2, 40),
({EX_4}, 2, 45),
({EX_5}, 2, 45),
({EX_6}, 2, 35),
({EX_7}, 2, 45),
({EX_8}, 2, 45);`;
content = content.replace(/INSERT INTO product_prices \(product_id, size_id, price\) VALUES\s*\n\(45, 1, 35\)[^;]*\(48, 2, 45\);/s, extrasPrices);

// Now sequentially assign product_id to ALL products
let currentId = 1;
let priceMap = new Map(); // Old ID -> New ID

const productBlocks = [...content.matchAll(/(INSERT INTO products [^;]+;)/gs)];
const priceBlocks = [...content.matchAll(/(INSERT INTO product_prices [^;]+;)/gs)];

if (productBlocks.length !== priceBlocks.length) {
    console.error('Mismatch block counts:', productBlocks.length, priceBlocks.length);
    process.exit(1);
}

let resultContent = content;

for (let i = 0; i < productBlocks.length; i++) {
    const pBlock = productBlocks[i][0];
    const prBlock = priceBlocks[i][0];
    
    const productLines = pBlock.split('\n');
    let newPBlock = productLines[0].replace('product_name', 'product_id, product_name') + '\n';
    
    let expectedIds = [];
    if (!prBlock.includes('{WD_1}') && !prBlock.includes('{SC_1}') && !prBlock.includes('{EX_1}')) {
        const ids = [...prBlock.matchAll(/\((\d+),/g)].map(m => parseInt(m[1]));
        const uniqueIds = [...new Set(ids)].sort((a,b)=>a-b);
        expectedIds = uniqueIds;
    }
    
    let prodCount = 0;
    for (let j = 1; j < productLines.length; j++) {
        let line = productLines[j];
        if (line.trim() === '') continue;
        let match = line.match(/^\((.*)\)(;|,)$/);
        if (match) {
            newPBlock += '(' + currentId + ', ' + match[1] + ')' + match[2] + '\n';
            
            if (expectedIds.length > prodCount) {
                priceMap.set(expectedIds[prodCount], currentId);
            }
            
            if (prBlock.includes('{WD_1}')) priceMap.set('{WD_' + (prodCount+1) + '}', currentId);
            if (prBlock.includes('{SC_1}')) priceMap.set('{SC_' + (prodCount+1) + '}', currentId);
            if (prBlock.includes('{EX_1}')) priceMap.set('{EX_' + (prodCount+1) + '}', currentId);
            
            currentId++;
            prodCount++;
        } else {
            newPBlock += line + '\n';
        }
    }
    
    resultContent = resultContent.replace(pBlock, newPBlock.trim());
    
    let newPrBlock = prBlock;
    if (prBlock.includes('{WD_1}') || prBlock.includes('{SC_1}') || prBlock.includes('{EX_1}')) {
        for (let [oldId, newId] of priceMap.entries()) {
            if (typeof oldId === 'string') {
                newPrBlock = newPrBlock.replace(new RegExp(oldId.replace('{','\\{').replace('}','\\}'), 'g'), newId);
            }
        }
    } else {
        newPrBlock = newPrBlock.replace(/\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, p1, p2, p3) => {
            const oldId = parseInt(p1);
            const newId = priceMap.get(oldId) || oldId;
            return `(${newId}, ${p2}, ${p3})`;
        });
    }
    
    resultContent = resultContent.replace(prBlock, newPrBlock);
}

fs.writeFileSync('seed.sql', resultContent);
console.log('Seed SQL fixed successfully.');
