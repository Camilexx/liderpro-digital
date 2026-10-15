const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsFilePath, 'utf8');

// Match "imageUrl": "..." or imageUrl: "..."
const regex = /"?imageUrl"?\s*:\s*["']([^"']+)["']/g;
let match;
let total = 0;
let missing = [];
let found = [];

while ((match = regex.exec(content)) !== null) {
  total++;
  const imgUrl = match[1];
  let localPath = imgUrl.startsWith('/') ? imgUrl.slice(1) : imgUrl;
  const fullPath = path.join(__dirname, '..', 'public', localPath);
  
  if (fs.existsSync(fullPath)) {
    found.push({ url: imgUrl, size: fs.statSync(fullPath).size });
  } else {
    missing.push(imgUrl);
  }
}

console.log('--- AUDIT PRODUCT IMAGES ---');
console.log('Total products scanned:', total);
console.log('Images found on disk:', found.length);
console.log('Images missing on disk:', missing.length);

if (missing.length > 0) {
  console.log('\nFirst 20 missing image URLs:');
  missing.slice(0, 20).forEach(m => console.log('  -', m));
} else {
  console.log('\nSUCCESS: 100% of product images exist in public directory!');
}

// Find largest images that may hurt loading speed
found.sort((a, b) => b.size - a.size);
console.log('\nTop 10 Largest Images (candidates for optimization):');
found.slice(0, 10).forEach(f => {
  console.log(`  - ${f.url} (${(f.size / 1024).toFixed(1)} KB)`);
});
