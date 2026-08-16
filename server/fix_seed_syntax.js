const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'seed.sql');
let content = fs.readFileSync(seedPath, 'utf8');

// Find blocks matching INSERT INTO products ... ;
content = content.replace(/(INSERT INTO products \([^\)]+\) VALUES)([\s\S]+?);/g, (match, insertHeader, insertValues) => {
    // 1. Clean the header: replace product_id, product_id with product_id
    const cleanHeader = insertHeader.replace(/product_id,\s*product_id,/g, 'product_id,');
    
    // 2. Clean the values: lines starting with (id, id, ...
    const cleanValues = insertValues.split('\n').map(line => {
        return line.replace(/^\s*\((\d+),\s*\1,\s*/, (valMatch, id) => {
            return `(${id}, `;
        });
    }).join('\n');
    
    return cleanHeader + cleanValues + ';';
});

fs.writeFileSync(seedPath, content, 'utf8');
console.log('SQL Seed syntax repair completed successfully!');
