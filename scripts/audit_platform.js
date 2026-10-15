const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   AUDITORÍA GENERAL DE LA PLATAFORMA LIDERPRO');
console.log('====================================================\n');

// 1. Audit Products Data
const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const productsContent = fs.readFileSync(productsPath, 'utf8');

const categoryMatches = [...productsContent.matchAll(/"category":\s*"([^"]+)"/g)];
const catCounts = {};
categoryMatches.forEach(m => {
  catCounts[m[1]] = (catCounts[m[1]] || 0) + 1;
});

console.log('1. INVENTARIO DE PRODUCTOS');
console.log('   Total de productos registrados:', categoryMatches.length);
console.log('   Desglose por categoría:');
for (const [cat, count] of Object.entries(catCounts)) {
  console.log(`     - ${cat}: ${count} productos`);
}

// 2. Audit Images on Disk
const publicDir = path.join(__dirname, '..', 'public');
function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFilesRecursively(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const allImages = getFilesRecursively(path.join(publicDir, 'images'));
const heavyImages = [];
let totalImageBytes = 0;

allImages.forEach(file => {
  const stat = fs.statSync(file);
  totalImageBytes += stat.size;
  if (stat.size > 200 * 1024) {
    heavyImages.push({
      file: path.relative(publicDir, file).replace(/\\/g, '/'),
      sizeKB: (stat.size / 1024).toFixed(1)
    });
  }
});

console.log('\n2. AUDITORÍA DE ARCHIVOS DE IMÁGENES');
console.log(`   Total de imágenes en /public/images: ${allImages.length}`);
console.log(`   Peso total de imágenes: ${(totalImageBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   Imágenes mayores a 200 KB (candidatas a compresión): ${heavyImages.length}`);
heavyImages.sort((a, b) => b.sizeKB - a.sizeKB);
heavyImages.slice(0, 10).forEach(h => {
  console.log(`     - ${h.file} (${h.sizeKB} KB)`);
});

// 3. Audit Internal Routes & Links
const routes = [
  '/',
  '/catalogo',
  '/productos',
  '/baterias',
  '/lubricantes',
  '/filtros',
  '/envios',
  '/b2b',
  '/sucursales',
  '/contacto',
  '/emergencia-bateria',
  '/guias',
  '/encuentra-tu-producto'
];

function scanCodeForLinks(dir, results = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      scanCodeForLinks(full, results);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const hrefMatches = [...content.matchAll(/href=["'](\/[^"'#?]*)["']/g)];
      hrefMatches.forEach(m => {
        results.push({ file: path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/'), href: m[1] });
      });
    }
  });
  return results;
}

const appLinks = scanCodeForLinks(path.join(__dirname, '..', 'src', 'app'));
const compLinks = scanCodeForLinks(path.join(__dirname, '..', 'src', 'components'));
const allLinks = [...appLinks, ...compLinks];

const validPaths = new Set([
  '/',
  '/catalogo',
  '/productos',
  '/baterias',
  '/lubricantes',
  '/filtros',
  '/envios',
  '/b2b',
  '/sucursales',
  '/contacto',
  '/emergencia-bateria',
  '/guias',
  '/encuentra-tu-producto',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
]);

const brokenLinks = [];
allLinks.forEach(l => {
  if (l.href.startsWith('/images/')) {
    const local = path.join(publicDir, l.href.slice(1));
    if (!fs.existsSync(local)) {
      brokenLinks.push({ ...l, reason: 'Image file does not exist' });
    }
  } else if (!validPaths.has(l.href) && !l.href.startsWith('/productos/') && !l.href.startsWith('/guias/')) {
    brokenLinks.push({ ...l, reason: 'Route not found' });
  }
});

console.log('\n3. AUDITORÍA DE ENLACES INTERNOS');
console.log(`   Total de enlaces internos analizados: ${allLinks.length}`);
console.log(`   Enlaces rotos o rutas inexistentes: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  brokenLinks.forEach(b => {
    console.log(`     - [${b.file}] -> ${b.href} (${b.reason})`);
  });
}

// 4. Inconsistencies Check
console.log('\n4. VERIFICACIÓN DE DISCREPANCIAS Y COHERENCIA DE MARCA');
const brandTerms = [
  { term: 'Despacho Pedernales / Quito', issue: 'Discrepancia de sede: Quito es punto de enlace o courier, no bodega matriz.' },
  { term: '89 lubricantes', issue: 'Conteo desactualizado de lubricantes en texto.' },
];

brandTerms.forEach(item => {
  const foundIn = [];
  function searchTerms(dir) {
    fs.readdirSync(dir).forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) {
        searchTerms(full);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes(item.term)) {
          foundIn.push(path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/'));
        }
      }
    });
  }
  searchTerms(path.join(__dirname, '..', 'src'));
  if (foundIn.length > 0) {
    console.log(`   ⚠ "${item.term}": encontrado en ${foundIn.join(', ')} -> ${item.issue}`);
  }
});

console.log('\n====================================================');
console.log('   FIN DE LA AUDITORÍA');
console.log('====================================================');
