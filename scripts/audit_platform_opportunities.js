const fs = require('fs');
const path = require('path');

console.log('=== LIDERPRO DIGITAL: AUDITORÍA INSTITUCIONAL GLOBAL ===\n');

// 1. Audit Products Data
const productsFile = fs.readFileSync('src/data/products.ts', 'utf8');
const idMatches = [];
const regex = /["']?id["']?\s*:\s*["']([^"']+)["']/g;
let m;
while ((m = regex.exec(productsFile)) !== null) {
  idMatches.push(m[1]);
}
console.log('1. Catálogo de Productos:');
console.log(`   - Total productos activos: ${idMatches.length}`);

// Image Coverage
const imgRegex = /["']?imageUrl["']?\s*:\s*["']([^"']+)["']/g;
const imgUrls = [];
while ((m = imgRegex.exec(productsFile)) !== null) {
  imgUrls.push(m[1]);
}
const uniqueImgs = Array.from(new Set(imgUrls));
let missingImages = [];
uniqueImgs.forEach(img => {
  const local = path.join('public', img.replace(/^\//, ''));
  if (!fs.existsSync(local)) {
    missingImages.push(img);
  }
});
console.log(`   - Total URLs de imagen únicas: ${uniqueImgs.length}`);
console.log(`   - Imágenes presentes en disco: ${uniqueImgs.length - missingImages.length}`);
console.log(`   - Imágenes que requieren archivo físico o fallback: ${missingImages.length}`);
if (missingImages.length > 0) {
  console.log('   - Ejemplos de imágenes faltantes:', missingImages.slice(0, 5));
}

// 2. Audit Routes & App Pages
console.log('\n2. Rutas y Páginas del Sistema:');
const appDir = 'src/app';
const getRoutes = (dir, prefix = '') => {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('_') && !entry.name.startsWith('.')) {
        routes = routes.concat(getRoutes(path.join(dir, entry.name), `${prefix}/${entry.name}`));
      }
    } else if (entry.name === 'page.tsx') {
      routes.push(prefix || '/');
    }
  }
  return routes;
};
const routes = getRoutes(appDir);
console.log(`   - Total páginas (rutas) existentes: ${routes.length}`);
routes.sort().forEach(r => console.log(`     * ${r}`));

// 3. Legal & Institutional Trust Pages Check
console.log('\n3. Páginas Institucionales de Confianza y Cumplimiento:');
const legalPages = [
  { path: '/terminos', name: 'Términos y Condiciones' },
  { path: '/privacidad', name: 'Políticas de Privacidad & Protección de Datos' },
  { path: '/garantias', name: 'Políticas de Garantía Oficial & Devoluciones' },
  { path: '/sri', name: 'Información Tributaria & Facturación SRI' },
  { path: '/preguntas-frecuentes', name: 'Centro de Ayuda / FAQs Centralizado' },
];
legalPages.forEach(lp => {
  const exists = routes.includes(lp.path);
  console.log(`   - ${lp.name} (${lp.path}): ${exists ? 'EXISTS' : 'FALTA CREAR'}`);
});

// 4. SEO & Schema Markup Check
console.log('\n4. Auditoría de SEO & Datos Estructurados (Schema.org / JSON-LD):');
const layoutFile = fs.readFileSync('src/app/layout.tsx', 'utf8');
const hasJsonLd = layoutFile.includes('application/ld+json') || productsFile.includes('application/ld+json');
console.log(`   - Global Schema.org JSON-LD en layout.tsx: ${hasJsonLd ? 'PRESENTE' : 'FALTA IMPLEMENTAR (AutoPartsStore / Organization)'}`);
console.log(`   - OpenGraph / Twitter Cards en layout.tsx: ${layoutFile.includes('openGraph') ? 'PRESENTE' : 'PARCIAL'}`);

// 5. Commercial Features & Conversion Flow Check
console.log('\n5. Herramientas Comerciales y de Conversión:');
const hasCart = fs.existsSync('src/components/QuoteBasket.tsx') || fs.existsSync('src/components/Cart.tsx');
console.log(`   - Carrito / Cotizador Multiproducto (Quote Basket para flotas y talleres): ${hasCart ? 'PRESENTE' : 'FALTA (Actualmente cotiza 1 producto a la vez vía WhatsApp)'}`);

const hasDirectCall = layoutFile.includes('tel:');
console.log(`   - Botón directo de llamada telefónica PBX / Celular en mobile: ${hasDirectCall ? 'PRESENTE' : 'OPORTUNIDAD DE MEJORA'}`);

// 6. Navigation & Footer Coverage Check
console.log('\n6. Navegación y Footer:');
const headerFile = fs.existsSync('src/components/Header.tsx') ? fs.readFileSync('src/components/Header.tsx', 'utf8') : '';
const footerFile = fs.existsSync('src/components/Footer.tsx') ? fs.readFileSync('src/components/Footer.tsx', 'utf8') : '';
console.log(`   - Header: ${headerFile ? 'Analizado' : 'No encontrado'}`);
console.log(`   - Footer: ${footerFile ? 'Analizado' : 'No encontrado'}`);
