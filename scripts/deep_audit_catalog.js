const fs = require('fs');

const products = JSON.parse(fs.readFileSync('scripts/parsed_products.json', 'utf8'));

console.log(`Analyzing ${products.length} products...`);

const issues = [];

products.forEach(p => {
  const nameUpper = p.name.toUpperCase();
  const brandUpper = p.brand.toUpperCase();
  const cat = p.category;
  const app = p.applicationType;
  const vol = (p.volume || '').toUpperCase();
  const sku = p.sku;

  // 1. BRAND MISMATCH CHECK
  if (nameUpper.startsWith('MANNOL') && p.brand !== 'Mannol') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Mannol' });
  } else if ((nameUpper.startsWith('BATERIA ECUADOR') || nameUpper.startsWith('BATERÍA ECUADOR')) && p.brand !== 'Baterías Ecuador') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Baterías Ecuador' });
  } else if (nameUpper.startsWith('BOSCH') && p.brand !== 'Bosch') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Bosch' });
  } else if (nameUpper.startsWith('MOTUL') && p.brand !== 'Motul') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Motul' });
  } else if (nameUpper.startsWith('MOBIL') && p.brand !== 'Mobil') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Mobil' });
  } else if (nameUpper.startsWith('AROIL') && p.brand !== 'Aroil') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Aroil' });
  } else if (nameUpper.startsWith('ADVANCE') && p.brand !== 'Advance') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'Advance' });
  } else if (nameUpper.startsWith('NGK') && p.brand !== 'NGK') {
    issues.push({ sku, name: p.name, type: 'BRAND_MISMATCH', current: p.brand, expected: 'NGK' });
  }

  // 2. CATEGORY MISMATCH CHECK
  // Baterías
  const isBattery = nameUpper.includes('BATERIA') || nameUpper.includes('BATERÍA') || nameUpper.includes('BORNE') || nameUpper.includes('SOPORTE DE BATERIA') || nameUpper.includes('ECOVLBAT');
  if (isBattery && cat !== 'baterias') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'baterias', reason: 'Product is a battery or battery accessory' });
  }
  if (!isBattery && cat === 'baterias') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'other', reason: 'Product is in baterias but name does not indicate battery' });
  }

  // Filtros
  const isFilter = nameUpper.includes('FILTRO') || nameUpper.startsWith('KIT FILTRO') || sku.startsWith('080');
  if (isFilter && cat !== 'filtros') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'filtros', reason: 'Product is a filter' });
  }
  if (!isFilter && cat === 'filtros') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'other', reason: 'Product is in filtros but name does not indicate filter' });
  }

  // Bujías
  const isSparkPlug = nameUpper.includes('BUJIA') || nameUpper.includes('BUJÍA') || nameUpper.includes('SPARK PLUG');
  if (isSparkPlug && cat !== 'bujias') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'bujias', reason: 'Product is a spark plug' });
  }
  if (!isSparkPlug && cat === 'bujias') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'other', reason: 'Product is in bujias but name does not indicate spark plug' });
  }

  // Refrigerantes / Coolants
  const isCoolant = nameUpper.includes('REFRIGERANTE') || nameUpper.includes('COOLANT') || nameUpper.includes('ANTICONGELANTE');
  if (isCoolant && cat !== 'refrigerantes') {
    // Note: radiator flush is an additive, check if it's cleaner/flush
    if (!nameUpper.includes('FLUSH') && !nameUpper.includes('LIMPIADOR')) {
      issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'refrigerantes', reason: 'Product is a coolant/antifreeze' });
    }
  }
  if (!isCoolant && cat === 'refrigerantes') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'other', reason: 'Product is in refrigerantes but name does not indicate coolant' });
  }

  // Frenos / Brake fluid
  const isBrake = nameUpper.includes('LIQUIDO DE FRENO') || nameUpper.includes('LÍQUIDO DE FRENO') || nameUpper.includes('BRAKE FLUID') || (nameUpper.includes('ATE') && (nameUpper.includes('DOT 3') || nameUpper.includes('DOT 4') || nameUpper.includes('TYP 200') || nameUpper.includes('SL.6')));
  if (isBrake && cat !== 'frenos') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'frenos', reason: 'Product is a brake fluid' });
  }
  if (!isBrake && cat === 'frenos') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'other', reason: 'Product is in frenos but name does not indicate brake fluid' });
  }

  // Aditivos vs Lubricantes
  const isAdditive = (
    nameUpper.includes('ADDITIVE') ||
    nameUpper.includes('ADITIVO') ||
    nameUpper.includes('TRATAMIENTO DE ACEITE') ||
    nameUpper.includes('TRATAMIENTO MOTOR') ||
    nameUpper.includes('LIMPIADOR') ||
    nameUpper.includes('FLUSH') ||
    nameUpper.includes('OCTANE') ||
    nameUpper.includes('INJECTOR') ||
    nameUpper.includes('INYECCION') ||
    nameUpper.includes('INYECTOR') ||
    nameUpper.includes('VALVE CLEANER') ||
    nameUpper.includes('STOP LEAK') ||
    nameUpper.includes('ANTIFRICCION') ||
    nameUpper.includes('SELLADOR') ||
    nameUpper.includes('CARE') ||
    nameUpper.includes('AMBIENTADOR') ||
    nameUpper.includes('AROMATIZANTE') ||
    nameUpper.includes('SHAMPOO') ||
    nameUpper.includes('SILICONA') ||
    nameUpper.includes('CERA') ||
    nameUpper.includes('DESENGRASANTE')
  );

  if (isAdditive && cat === 'lubricantes') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'aditivos', reason: 'Product is an additive or treatment or car care' });
  }

  // Lubricantes: Motor oils, gear oils, ATF, hydraulic, 2T/4T
  const isOil = (
    nameUpper.includes('ACEITE') ||
    nameUpper.includes('10W40') ||
    nameUpper.includes('15W40') ||
    nameUpper.includes('20W50') ||
    nameUpper.includes('5W30') ||
    nameUpper.includes('5W40') ||
    nameUpper.includes('0W20') ||
    nameUpper.includes('0W30') ||
    nameUpper.includes('80W90') ||
    nameUpper.includes('85W140') ||
    nameUpper.includes('ATF') ||
    nameUpper.includes('CVT') ||
    nameUpper.includes('GEAR') ||
    nameUpper.includes('GETRIEBEOEL') ||
    nameUpper.includes('HYDRO') ||
    nameUpper.includes('HYPOID') ||
    nameUpper.includes('MULTIFARM') ||
    nameUpper.includes('VALVODIESEL') ||
    nameUpper.includes('DELVAC')
  );

  if (isOil && !isAdditive && !isCoolant && !isBrake && !isFilter && cat === 'aditivos') {
    issues.push({ sku, name: p.name, type: 'CATEGORY_MISMATCH', current: cat, expected: 'lubricantes', reason: 'Product is an engine/gear oil but marked as aditivo' });
  }

  // 3. APPLICATION TYPE MISMATCH CHECK
  // MOTOS:
  const isMotoProduct = (
    nameUpper.includes('MOTO') ||
    nameUpper.includes('4-TAKT') ||
    nameUpper.includes('4T') ||
    nameUpper.includes('2T') ||
    nameUpper.includes('SCOOTER') ||
    nameUpper.includes('MOTORBIKE')
  ) && !nameUpper.includes('AUTOMOTOR') && !nameUpper.includes('MOTOR DIESEL');

  if (isMotoProduct && app !== 'motos') {
    issues.push({ sku, name: p.name, type: 'APPLICATION_MISMATCH', current: app, expected: 'motos', reason: 'Product name specifies motorcycle (2T/4T/Moto)' });
  }
  if (!isMotoProduct && app === 'motos') {
    // verify if it is indeed for motos
    issues.push({ sku, name: p.name, type: 'APPLICATION_VERIFY', current: app, expected: 'autos/motos', reason: 'Marked as motos, verify if exclusively for motos' });
  }

  // PESADO (Heavy Duty / Trucks / Camaroneras / Machinery):
  const isHeavyDuty = (
    nameUpper.includes('SHD') ||
    nameUpper.includes('SUPER HEAVY DUTY') ||
    nameUpper.includes('N150') ||
    nameUpper.includes('N200') ||
    nameUpper.includes('31 SHD') ||
    nameUpper.includes('UHPD') ||
    nameUpper.includes('TS-5') ||
    nameUpper.includes('TS-7') ||
    nameUpper.includes('MULTIFARM') ||
    nameUpper.includes('STOU') ||
    nameUpper.includes('ISO 32') ||
    nameUpper.includes('ISO 46') ||
    nameUpper.includes('ISO 68') ||
    nameUpper.includes('CAN 20/1') ||
    nameUpper.includes('CANECA 20') ||
    nameUpper.includes('CANECA') ||
    nameUpper.includes('TAMBOR') ||
    nameUpper.includes('DELVAC') ||
    nameUpper.includes('VALVODIESEL') ||
    nameUpper.includes('HINO') ||
    nameUpper.includes('ISUZU') ||
    nameUpper.includes('JAC') ||
    nameUpper.includes('FREIGHTLINER') ||
    nameUpper.includes('MACK') ||
    nameUpper.includes('KENWORTH') ||
    nameUpper.includes('INTERNATIONAL')
  ) && !nameUpper.includes('MOTO') && !nameUpper.includes('4T');

  if (isHeavyDuty && app === 'autos') {
    issues.push({ sku, name: p.name, type: 'APPLICATION_MISMATCH', current: app, expected: 'pesado', reason: 'Industrial, heavy truck, caneca 20L, or commercial diesel fleet product marked as autos' });
  }

  // CAMIONETAS (Pickups / Large SUVs):
  const isPickupSpecific = (
    nameUpper.includes('GROUP 27') ||
    nameUpper.includes('GRUPO 27') ||
    nameUpper.includes('27 HP') ||
    nameUpper.includes('27 FE') ||
    nameUpper.includes('34 HP') ||
    nameUpper.includes('D-MAX') ||
    nameUpper.includes('HILUX') ||
    nameUpper.includes('FORTUNER') ||
    nameUpper.includes('BT-50') ||
    nameUpper.includes('L200') ||
    nameUpper.includes('FRONTIER')
  );

  if (isPickupSpecific && app === 'autos') {
    issues.push({ sku, name: p.name, type: 'APPLICATION_MISMATCH', current: app, expected: 'camionetas', reason: 'Battery or product specifically sized for pickups/heavy SUVs marked as autos' });
  }
});

console.log(`\nFound ${issues.length} potential issues to audit:\n`);
issues.forEach((iss, idx) => {
  console.log(`${idx + 1}. [${iss.sku}] (${iss.type}) Current: "${iss.current}" -> Expected: "${iss.expected}"`);
  console.log(`   Name: ${iss.name}`);
  console.log(`   Reason: ${iss.reason}\n`);
});

fs.writeFileSync('scripts/audit_issues.json', JSON.stringify(issues, null, 2));
