const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'client', 'public', 'images', 'products');

const sourceMap = {
    'Espresso.png': [
        'Macchiato.png', 'Hot Mocha.png', 'Hot White Mocha.png',
        'Nescafe.png', 'Nescafe Black.png', 'Cappuccino.png',
        'Hot Latte.png', 'Turkish Coffee.png', 'Turkish Coffee with Milk.png',
        'Nutella Coffee.png', 'Hot Lotus Latte.png', 'Spanish Latte.png',
        'Flat White.png', 'Cortado.png'
    ],
    'Oreo Shake.png': [
        'Nutella Shake.png', 'Pistachio Shake.png', 'Lotus Shake.png',
        'Caramel Shake.png', 'Peach Shake.png', 'Blueberry Shake.png',
        'Kinder Shake.png', 'KitKat Shake.png', 'Twix Shake.png',
        'Snickers Shake.png', 'Galaxy Shake.png', 'M&M Shake.png'
    ],
    'Classic Frappe.png': [
        'Caramel Frappe.png', 'Lotus Frappe.png', 'White Mocha Frappe.png'
    ],
    'Ice Matcha.png': [
        'Ice Matcha Coconut.png', 'Ice Matcha Caramel.png',
        'Hot Matcha.png', 'Hot Honey Matcha.png'
    ],
    'Cheesecake.png': [
        'Cheesecake Caramel.png', 'Cheesecake Blueberry.png',
        'Cheesecake Lotus.png', 'Cheesecake Pistachio.png',
        'Cheesecake Nutella.png', 'Molten Cake.png',
        'Molten Cake Nutella.png', 'San Sebastian.png',
        'San Sebastian Lotus.png', 'San Sebastian Nutella.png',
        'Tiramisu.png'
    ],
    'Plain Croissant.png': [
        'Chocolate Croissant.png', 'Lotus Croissant.png',
        'Pistachio Croissant.png', 'Cheese Croissant.png',
        'Turkey Croissant.png', 'Mixed Cheese Croissant.png'
    ]
};

console.log(`Checking directory: ${baseDir}`);

if (!fs.existsSync(baseDir)) {
    console.error("Base directory does not exist!");
    process.exit(1);
}

let count = 0;
for (const [src, targets] of Object.entries(sourceMap)) {
    const srcPath = path.join(baseDir, src);
    if (fs.existsSync(srcPath)) {
        targets.forEach(target => {
            try {
                fs.copyFileSync(srcPath, path.join(baseDir, target));
                console.log(`Copied ${src} to ${target}`);
                count++;
            } catch (err) {
                console.error(`Failed to copy to ${target}: ${err.message}`);
            }
        });
    } else {
        console.error(`SOURCE FILE NOT FOUND: ${src}`);
    }
}
console.log(`\nOperation complete. Copied ${count} files.`);
