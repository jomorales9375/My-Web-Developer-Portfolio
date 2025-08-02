#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate a random version number
const version = Date.now();

// Function to update version in HTML files
function updateVersionInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update CSS version
        content = content.replace(
            /href="styles\.css(\?v=[^"]*)?"/g,
            `href="styles.css?v=${version}"`
        );
        
        // Update JS version
        content = content.replace(
            /src="script\.js(\?v=[^"]*)?"/g,
            `src="script.js?v=${version}"`
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${filePath} with version ${version}`);
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Update all HTML files
const htmlFiles = ['index.html', 'about.html', 'portfolio.html', 'contact.html'];

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        updateVersionInFile(file);
    }
});

console.log('\n🎉 All files updated! Browser cache will be refreshed.');
console.log('💡 Tip: Run this script whenever you make changes to CSS or JS files.'); 