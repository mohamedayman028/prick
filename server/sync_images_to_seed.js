const fs = require('fs');
const path = require('path');

const SEED_PATH = path.join(__dirname, 'seed.sql');
const IMAGES_DIR = path.join(__dirname, '..', 'client', 'public', 'images', 'products');

function sync() {
    console.log('--- Starting Image-to-Seed Sync ---');
    
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error('Images directory not found:', IMAGES_DIR);
        return;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    let seedContent = fs.readFileSync(SEED_PATH, 'utf8');

    // Create a map of normalized names to actual filenames
    // e.g. "espresso" -> "Espresso.png"
    const fileMap = {};
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const nameBase = path.parse(file).name.toLowerCase().trim();
            fileMap[nameBase] = file;
        }
    });

    console.log(`Found ${Object.keys(fileMap).length} valid images in directory.`);

    // Regex to find INSERT INTO products values
    // Matches: ('Product Name | Arabic', ID, 'Description', 'image.png')
    // We want to capture the Product Name and the current image_url
    const productRegex = /\('([^'|]+)[^']*'[^,]*,\s*\d+,\s*'[^']*',\s*'([^']*)'\)/g;

    let matchCount = 0;
    const updatedContent = seedContent.replace(productRegex, (match, productName, currentImg) => {
        const normalizedProdName = productName.trim().toLowerCase();
        
        // 1. Try exact match with normalized name
        let bestMatch = fileMap[normalizedProdName];
        
        // 2. Try matching the current filename if it exists
        if (!bestMatch && currentImg && currentImg !== 'default.jpg' && currentImg !== 'default-coffee.png') {
             const currentBase = path.parse(currentImg).name.toLowerCase().trim();
             if (fileMap[currentBase]) {
                 bestMatch = fileMap[currentBase];
             }
        }

        if (bestMatch && bestMatch !== currentImg) {
            console.log(`Updating ${productName.trim()}: ${currentImg} -> ${bestMatch}`);
            matchCount++;
            // Reconstruct the line with the new image URL
            return match.replace(`'${currentImg}'`, `'${bestMatch}'`);
        }

        return match;
    });

    if (matchCount > 0) {
        fs.writeFileSync(SEED_PATH, updatedContent, 'utf8');
        console.log(`--- Sync Complete: Updated ${matchCount} links in seed.sql ---`);
    } else {
        console.log('--- Sync Complete: No changes needed ---');
    }
}

sync();
