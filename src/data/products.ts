export type ApplicationType = "autos" | "camionetas" | "pesado" | "motos";

export type ProductCategory =
  | "baterias"
  | "lubricantes"
  | "filtros"
  | "refrigerantes"
  | "frenos"
  | "bujias"
  | "aditivos";

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  applicationType: ApplicationType;
  volume?: string;
  plates?: string;
  shortSpec: string;
  specifications: Record<string, string>;
  fullSpecs: Record<string, string>;
  description: string;
  priceEstimate?: string;
  priceNote: string;
  warranty: string;
  commercialStatus: "VERIFIED" | "REFERENCE" | "PENDING_VERIFICATION";
  inStock: boolean;
  stockStatusText: string;
  dispatchIndicator: string;
  primaryOriginRecommendation: "Pedernales" | "Quito" | "Nacional";
  imageUrl: string;
  compatibleVehicles: {
    make: string;
    model: string;
    yearRange: string;
    engine?: string;
  }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  realStock?: number;
  rotationIndex?: number;
  dailySales?: number;
  isBestSeller?: boolean;
}

export const OFFICIAL_BRANDS = [
  { name: "BATERÍAS ECUADOR", origin: "Línea Oficial Nacional", specialty: "Energía & Arranque High Power" },
  { name: "BOSCH", origin: "Tecnología Alemana", specialty: "Baterías S4 PowerFrame" },
  { name: "MANNOL", origin: "Ingeniería Alemana", specialty: "Sintéticos 5W-30, 10W-30, Aditivos & Coolant" },
  { name: "AROIL", origin: "Alta Rotación Ecuador", specialty: "Super 40, 15W-40, 25W-60 & ATF D-III" },
  { name: "MOBIL", origin: "ExxonMobil Global", specialty: "Mobil Delvac 1300 Super & 20W-50" },
  { name: "MOTUL", origin: "Especialista Francés", specialty: "Motos 4T Technosynthese Ester" },
  { name: "ADVANCE", origin: "Filtración Automotriz", specialty: "Filtros de Aceite, Combustible & Aire" },
  { name: "ATE", origin: "Equipo Original Alemán", specialty: "Líquidos de Freno DOT 3 & DOT 4" },
  { name: "NGK", origin: "Líder en Encendido", specialty: "Bujías Platino G-Power & Cobre" },
  { name: "ABRO", origin: "Fórmula Americana", specialty: "Refrigerantes & Químicos" },
] as const;

export const PRODUCTS: Product[] = [
  {
    "id": "bat-ec-34hp-i",
    "sku": "03034-HP-I",
    "slug": "bateria-ecuador-34-hp-i-80-amp",
    "name": "Batería Ecuador 34 HP I High Power 80 Amp (Invertida)",
    "brand": "Baterías Ecuador",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "13 Placas (80Ah)",
    "shortSpec": "12V 80Ah • 650 CCA (-18°C) • 13 Placas • Polaridad Invertida • Sedanes y SUVs",
    "specifications": {
      "Código Bodega": "03034-HP-I",
      "Marca": "Baterías Ecuador (Línea High Power)",
      "Capacidad": "80 Amp (Ah)",
      "Voltaje": "12V",
      "Polaridad": "Invertida (Borne Izquierdo)",
      "Ubicación": "Bodega Pedernales (Disponibilidad Inmediata)"
    },
    "fullSpecs": {
      "Código Bodega": "03034-HP-I",
      "Marca": "Baterías Ecuador (Línea High Power)",
      "Capacidad": "80 Amp (Ah)",
      "Voltaje": "12V",
      "Tecnología": "Plomo-Calcio Sellada Libre de Mantenimiento",
      "Arranque en Frío": "650 CCA (-18°C)",
      "Despacho": "Despacho diario desde Hub Central Pedernales a todo el país"
    },
    "description": "Batería de alto rendimiento de la línea High Power de Baterías Ecuador. Diseñada para vehículos con alta demanda eléctrica, aire acondicionado constante y climas cálidos y salinos como Manabí y la Costa.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Aceptamos batería usada como parte de pago. Facturación electrónica SRI incluida.",
    "warranty": "Garantía de Fábrica Nacional con red de centros autorizados",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-ns60.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Cruze / Tracker / Orlando",
        "yearRange": "2012-2023",
        "engine": "1.4T / 1.8L"
      },
      {
        "make": "Kia",
        "model": "Sportage Active / Revolution",
        "yearRange": "2010-2022",
        "engine": "2.0L"
      },
      {
        "make": "Hyundai",
        "model": "Tucson IX / Santa Fe",
        "yearRange": "2010-2022",
        "engine": "2.0L / 2.4L"
      }
    ],
    "features": [
      "Línea High Power con aleación de calcio plata resistente a vibraciones",
      "Rotación comprobada en mostrador Pedernales con arranque instantáneo"
    ],
    "faqs": [
      {
        "question": "¿Cuál es la diferencia de la versión 'I'?",
        "answer": "La 'I' indica polaridad invertida en los bornes para coincidir exactamente con el cableado original de fábrica."
      }
    ],
    "realStock": 2.0,
    "rotationIndex": 3.06,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "bat-ec-42hp",
    "sku": "03042-HP",
    "slug": "bateria-ecuador-42-hp-62-amp",
    "name": "Batería Ecuador 42 HP High Power 62 Amp",
    "brand": "Baterías Ecuador",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "11 Placas (62Ah)",
    "shortSpec": "12V 62Ah • 500 CCA • 11 Placas • Compactos, Sedanes y City Cars",
    "specifications": {
      "Código Bodega": "03042-HP",
      "Marca": "Baterías Ecuador",
      "Capacidad": "62 Amp",
      "Voltaje": "12V",
      "Tecnología": "High Power Libre Mantenimiento"
    },
    "fullSpecs": {
      "Código Bodega": "03042-HP",
      "Marca": "Baterías Ecuador",
      "Capacidad": "62 Amp",
      "Voltaje": "12V",
      "Garantía": "Respaldo oficial en 24 provincias"
    },
    "description": "La batería más versátil para vehículos livianos de uso urbano e interprovincial en Ecuador. Excelente relación potencia-durabilidad.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Descuento entregando batería usada en Pedernales o en ruta.",
    "warranty": "Garantía Oficial de Fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-din66.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Sail / Aveo / Corsa / Spark GT",
        "yearRange": "2008-2024",
        "engine": "1.2L / 1.4L / 1.5L"
      },
      {
        "make": "Kia",
        "model": "Rio / Picanto / Soluto",
        "yearRange": "2012-2024",
        "engine": "1.2L / 1.4L"
      },
      {
        "make": "Hyundai",
        "model": "Grand i10 / Accent",
        "yearRange": "2012-2024",
        "engine": "1.2L / 1.4L"
      }
    ],
    "features": [
      "Índice de rotación 2.78 en Pedernales por alta demanda en taxis y particulares",
      "Placas reforzadas contra calor extremo y baches"
    ],
    "faqs": [],
    "realStock": 1.0,
    "rotationIndex": 2.78,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "bat-ec-27hp",
    "sku": "03027-HP",
    "slug": "bateria-ecuador-27-hp-95-amp",
    "name": "Batería Ecuador 27 HP High Power 95 Amp (Camionetas & 4x4)",
    "brand": "Baterías Ecuador",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "15 Placas (95Ah)",
    "shortSpec": "12V 95Ah • 750 CCA • 15 Placas Reforzadas • Chevrolet D-Max, Toyota Hilux",
    "specifications": {
      "Código Bodega": "03027-HP",
      "Marca": "Baterías Ecuador",
      "Capacidad": "95 Amp",
      "Voltaje": "12V",
      "Aplicación": "Camionetas Diésel y 4x4 Trabajo Pesado"
    },
    "fullSpecs": {
      "Código Bodega": "03027-HP",
      "Marca": "Baterías Ecuador",
      "Capacidad": "95 Amp",
      "Voltaje": "12V",
      "CCA": "750 A",
      "Tecnología": "High Power Heavy Duty"
    },
    "description": "Potencia de arranque superior para camionetas diésel con turbo y alta compresión. Ideal para flotas que operan en Manabí, Santo Domingo, Esmeraldas y rutas de montaña.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Descuento por canje de casco usado. Facturación SRI.",
    "warranty": "Garantía de Fábrica Baterías Ecuador",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (3 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-din66.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-Max 2.5 / 3.0 CRDi / Luv D-Max",
        "yearRange": "2006-2024",
        "engine": "Diésel CRDi"
      },
      {
        "make": "Toyota",
        "model": "Hilux 2.4 / 2.8 D-4D / Fortuner",
        "yearRange": "2008-2024",
        "engine": "1GD / 2GD / 1KD"
      },
      {
        "make": "Great Wall",
        "model": "Wingle 5 / Wingle 7 / Poer",
        "yearRange": "2015-2024",
        "engine": "2.0T Diésel"
      }
    ],
    "features": [
      "Batería insignia para el sector agropecuario y camaronero",
      "Soporta arranques repetidos y uso continuo de wincha/neblineros"
    ],
    "faqs": [],
    "realStock": 3.0,
    "rotationIndex": 1.79,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "bat-ec-31shd",
    "sku": "03031-SHD",
    "slug": "bateria-ecuador-31-shd-105-amp",
    "name": "Batería Ecuador 31 SHD Super Heavy Duty 105 Amp (Camaroneras & Flotas)",
    "brand": "Baterías Ecuador",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "17 Placas (105Ah)",
    "shortSpec": "12V 105Ah • 900 CCA • Grupo 31 SHD • Generadores, Camaroneras y Camiones",
    "specifications": {
      "Código Bodega": "03031-SHD",
      "Marca": "Baterías Ecuador SHD",
      "Capacidad": "105 Amp",
      "Voltaje": "12V",
      "Grupo": "Grupo 31 con Bornes Roscados / Poste"
    },
    "fullSpecs": {
      "Código Bodega": "03031-SHD",
      "Marca": "Baterías Ecuador",
      "Tipo": "Super Heavy Duty (SHD)",
      "Capacidad": "105 Amp",
      "Voltaje": "12V",
      "Resistencia": "Ciclo profundo y vibración severa"
    },
    "description": "La batería más resistente para el sector camaronero de Manabí y transporte pesado. Diseñada para motores estacionarios, bombas de agua, generadores y camiones de carga Hino, Isuzu e International.",
    "priceEstimate": "Cotización Mayorista / Directa",
    "priceNote": "Precios especiales por lote para empresas camaroneras y cooperativas.",
    "warranty": "Garantía Industrial Baterías Ecuador",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-din66.jpg",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "Serie 300 / 500 (Dutro / Ranger)",
        "yearRange": "2008-2024",
        "engine": "N04C / J08E"
      },
      {
        "make": "Chevrolet",
        "model": "Camiones FTR / FVR / NPR / NQR",
        "yearRange": "2008-2024",
        "engine": "Isuzu 4HK1 / 6HK1"
      },
      {
        "make": "Sector Productivo",
        "model": "Bombas Camaroneras & Generadores Diésel",
        "yearRange": "Todos",
        "engine": "Cummins / Perkins / Yanmar"
      }
    ],
    "features": [
      "Blindaje anticorrosión salina especial para piscinas camaroneras",
      "Alta reserva de ciclo profundo para arranques prolongados"
    ],
    "faqs": [],
    "realStock": 1.0,
    "rotationIndex": 1.76,
    "dailySales": 0.1,
    "isBestSeller": true
  },
  {
    "id": "bat-bosch-27hpi-s4",
    "sku": "02727HPIS4",
    "slug": "bateria-bosch-27-hp-i-s4-85amp",
    "name": "Batería Bosch 27 HP I S4 85 Amp (Tecnología Alemana)",
    "brand": "Bosch",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "Tecnología S4 Silver",
    "shortSpec": "12V 85Ah • 680 CCA • Rejilla Silver Power Frame • Camionetas & SUVs",
    "specifications": {
      "Código Bodega": "02727HPIS4 (602738)",
      "Marca": "Bosch S4",
      "Capacidad": "85 Amp",
      "Voltaje": "12V",
      "Tecnología": "Bosch Silver PowerFrame"
    },
    "fullSpecs": {
      "Código Bodega": "02727HPIS4",
      "Marca": "Bosch",
      "Línea": "S4 Silver",
      "Capacidad": "85 Amp",
      "Garantía": "Respaldo directo Robert Bosch"
    },
    "description": "Batería Bosch S4 con rejilla estampada patentada PowerFrame que garantiza flujo óptimo de energía, menor corrosión y vida útil prolongada bajo altas temperaturas.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Facturación SRI y entrega de certificado de garantía Bosch.",
    "warranty": "Garantía Oficial Bosch Ecuador",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (2 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-din66.jpg",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "Hilux / Fortuner / Prado",
        "yearRange": "2010-2024",
        "engine": "Gasolina y Diésel"
      },
      {
        "make": "Chevrolet",
        "model": "D-Max / Trailblazer",
        "yearRange": "2012-2024",
        "engine": "Diésel"
      },
      {
        "make": "Nissan",
        "model": "Navara / Frontier NP300",
        "yearRange": "2010-2024",
        "engine": "YD25 / YS23"
      }
    ],
    "features": [
      "Rejilla PowerFrame con tecnología alemana de máxima durabilidad",
      "Índice de rotación 1.41 en mostrador Pedernales"
    ],
    "faqs": [],
    "realStock": 2.0,
    "rotationIndex": 1.41,
    "dailySales": 0.1,
    "isBestSeller": true
  },
  {
    "id": "bat-ec-n150-shd",
    "sku": "030N150-SHD",
    "slug": "bateria-ecuador-n150-shd-160-amp",
    "name": "Batería Ecuador N150 SHD 160 Amp (Equipo Pesado & Marino)",
    "brand": "Baterías Ecuador",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "25 Placas (160Ah)",
    "shortSpec": "12V 160Ah • 1050 CCA • 25 Placas • Tractomulas, Barcos y Maquinaria Pesada",
    "specifications": {
      "Código Bodega": "030N150-SHD",
      "Marca": "Baterías Ecuador SHD",
      "Capacidad": "160 Amp",
      "Voltaje": "12V",
      "Aplicación": "Equipo Caminero, Embarcaciones y Cabezales"
    },
    "fullSpecs": {
      "Código Bodega": "030N150-SHD",
      "Marca": "Baterías Ecuador",
      "Capacidad": "160 Amp",
      "Voltaje": "12V",
      "CCA": "1050 A",
      "Resistencia": "Uso industrial severo continuo"
    },
    "description": "Máxima capacidad para maquinaria pesada Caterpillar, Komatsu, cabezales Freightliner, Kenworth y embarcaciones pesqueras/camaroneras.",
    "priceEstimate": "Cotización Industrial",
    "priceNote": "Despacho con embalaje reforzado y anclaje técnico desde Pedernales.",
    "warranty": "Garantía Industrial Nacional",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/battery-din66.jpg",
    "compatibleVehicles": [
      {
        "make": "Freightliner / Kenworth / Mack",
        "model": "Tractocamiones y Volquetas",
        "yearRange": "Todos",
        "engine": "Cummins ISX / Detroit DD15"
      },
      {
        "make": "Caterpillar / Komatsu",
        "model": "Retroexcavadoras y Tractores",
        "yearRange": "Todos",
        "engine": "Diésel Pesado"
      }
    ],
    "features": [
      "25 placas blindadas con separadores de fibra de vidrio",
      "Diseñada para resistir condiciones salinas extremas"
    ],
    "faqs": [],
    "realStock": 1.0,
    "rotationIndex": 1.09,
    "dailySales": 0.07,
    "isBestSeller": false
  },
  {
    "id": "lub-aroil-super40",
    "sku": "0368AR00032",
    "slug": "aroil-super-40-sl-cf-1-litro",
    "name": "Aceite de Motor AROIL Super 40 SL/CF (1 Litro)",
    "brand": "Aroil",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro (Envase Individual)",
    "shortSpec": "Monogrado SAE 40 • API SL/CF • Protección Antidesgaste • El #1 Más Vendido en Pedernales",
    "specifications": {
      "Código Bodega": "0368AR00032",
      "Marca": "AROIL Lubricants",
      "Viscosidad": "SAE 40",
      "Norma API": "SL/CF",
      "Presentación": "1 Litro (Caja 12 unidades disponible)",
      "Stock en Pedernales": "31 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "0368AR00032",
      "Marca": "AROIL",
      "Viscosidad": "SAE 40 Monogrado",
      "API": "SL/CF",
      "Aplicación": "Motores a gasolina y diésel ligero que requieran monogrado",
      "Origen Despacho": "Bodega Central Pedernales"
    },
    "description": "El producto con mayor volumen de salida diaria en la provincia de Manabí. Formulado con aditivos detergentes y dispersantes de alto desempeño que controlan los depósitos y mantienen la presión de aceite estable.",
    "priceEstimate": "Venta por Litro y Caja x 12",
    "priceNote": "Precio especial por caja completa de 12 litros para talleres y revendedores.",
    "warranty": "Calidad Certificada API",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (31 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-15w40.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "San Remo / Monza / Luv Clásica",
        "yearRange": "1990-2005",
        "engine": "Gasolina y Diésel"
      },
      {
        "make": "Motores Estacionarios",
        "model": "Bombas de Riego / Generadores Pequeños",
        "yearRange": "Todos",
        "engine": "4 Tiempos"
      }
    ],
    "features": [
      "Top #1 en Ventas Diarias (0.87 litros/día de promedio) en Pedernales",
      "Excelente estabilidad térmica en climas cálidos de costa"
    ],
    "faqs": [
      {
        "question": "¿Se vende por caja?",
        "answer": "Sí, disponemos de cajas de 12 litros con precio diferenciado al por mayor."
      }
    ],
    "realStock": 31.0,
    "rotationIndex": 0.73,
    "dailySales": 0.87,
    "isBestSeller": true
  },
  {
    "id": "lub-mannol-10w30-gl",
    "sku": "012MN7512-4A",
    "slug": "mannol-special-plus-10w30-galon",
    "name": "Aceite Mannol Special Plus 10W-30 Semisintético (Galón 4 Litros)",
    "brand": "Mannol",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Galón 4 Litros (4/1 GL)",
    "shortSpec": "10W-30 Semisintético • API SN Plus / ILSAC GF-5 • Tecnología Alemana • Alta Rotación",
    "specifications": {
      "Código Bodega": "012MN7512-4A",
      "Marca": "Mannol (Alemania)",
      "Viscosidad": "10W-30",
      "Norma API": "SN Plus / ILSAC GF-5",
      "Presentación": "Galón 4 Litros",
      "Rotación": "1.51 (Alta demanda)"
    },
    "fullSpecs": {
      "Código Bodega": "012MN7512-4A",
      "Marca": "Mannol Special Plus",
      "Viscosidad": "10W-30",
      "Base": "Tecnología de Síntesis HC Alemana",
      "Protección": "Reduce fricción, previene el fenómeno LSPI en motores modernos",
      "Despacho": "Hub Central Pedernales"
    },
    "description": "Lubricante premium de ingeniería alemana ideal para vehículos asiáticos y americanos modernos. Proporciona protección insuperable en arranque en frío y ahorro comprobado de combustible.",
    "priceEstimate": "Cotización Galón o Caja x 4",
    "priceNote": "Sello de originalidad alemán con código QR verificable.",
    "warranty": "Homologación Europea de Fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (10 galones)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-5w30.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Sail / Aveo / Spin / Cobalt",
        "yearRange": "2012-2024",
        "engine": "1.4L / 1.5L / 1.8L"
      },
      {
        "make": "Kia",
        "model": "Rio / Cerato / Sportage",
        "yearRange": "2010-2024",
        "engine": "1.4L / 1.6L / 2.0L"
      },
      {
        "make": "Hyundai",
        "model": "Accent / Elantra / Tucson",
        "yearRange": "2010-2024",
        "engine": "1.4L / 1.6L / 2.0L"
      },
      {
        "make": "Toyota",
        "model": "Yaris / Corolla / Avanza",
        "yearRange": "2008-2024",
        "engine": "1.3L / 1.5L / 1.8L"
      }
    ],
    "features": [
      "Top Seller con índice de rotación 1.51 en Pedernales",
      "Fórmula especial contra desgaste de levas y cadenas de distribución"
    ],
    "faqs": [],
    "realStock": 10.0,
    "rotationIndex": 1.51,
    "dailySales": 0.4,
    "isBestSeller": true
  },
  {
    "id": "lub-aroil-15w40-lt",
    "sku": "0368AR10031",
    "slug": "aroil-15w40-ci4-1-litro",
    "name": "Aceite de Motor AROIL 15W-40 CI-4 Diésel y Gasolina (1 Litro)",
    "brand": "Aroil",
    "category": "lubricantes",
    "applicationType": "camionetas",
    "volume": "1 Litro (Envase)",
    "shortSpec": "15W-40 Multigrado • API CI-4/SL • Alto Poder Dispersante de Hollín • Flotas y 4x4",
    "specifications": {
      "Código Bodega": "0368AR10031",
      "Marca": "AROIL",
      "Viscosidad": "15W-40",
      "Norma API": "CI-4 / SL",
      "Presentación": "1 Litro (Caja 12 unidades)"
    },
    "fullSpecs": {
      "Código Bodega": "0368AR10031",
      "Marca": "AROIL",
      "Viscosidad": "15W-40 Multigrado Heavy Duty",
      "API": "CI-4 / CH-4 / CG-4 / SL",
      "Aplicación": "Camionetas turbo diésel, camiones ligeros y flotas mixtas"
    },
    "description": "Lubricante de alta rotación para camionetas D-Max, Hilux, camiones Hino y maquinaria de faena. Excelente dispersión del hollín y resistencia a la oxidación a altas temperaturas de trabajo.",
    "priceEstimate": "Venta por Litro y Caja x 12",
    "priceNote": "Embalaje reforzado en paquetes de 12 para envío interprovincial.",
    "warranty": "Garantía de Lubricación API",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (16 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-15w40.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-Max 2.5 / 3.0 / Luv D-Max",
        "yearRange": "2005-2022",
        "engine": "Diésel"
      },
      {
        "make": "Toyota",
        "model": "Hilux 2KD / 1KD",
        "yearRange": "2006-2020",
        "engine": "Diésel Turbo"
      },
      {
        "make": "Hino",
        "model": "Serie 300 / Dutro",
        "yearRange": "2008-2022",
        "engine": "N04C"
      }
    ],
    "features": [
      "Venta diaria promedio de 0.40 litros en mostrador Pedernales",
      "Protege contra el desgaste corrosivo provocado por azufre en el diésel"
    ],
    "faqs": [],
    "realStock": 16.0,
    "rotationIndex": 0.79,
    "dailySales": 0.4,
    "isBestSeller": true
  },
  {
    "id": "lub-aroil-25w60-caneca",
    "sku": "0368AR10010",
    "slug": "aroil-25w60-cf-caneca-5-galones",
    "name": "Aceite AROIL 25W-60 Alto Kilometraje CF (Caneca 5 Galones)",
    "brand": "Aroil",
    "category": "lubricantes",
    "applicationType": "pesado",
    "volume": "Caneca 5 Galones (19 Litros)",
    "shortSpec": "25W-60 Alto Kilometraje • API CF/SL • Caneca 5 Galones • Rotación Récord 3.04",
    "specifications": {
      "Código Bodega": "0368AR10010",
      "Marca": "AROIL",
      "Viscosidad": "25W-60 Viscosidad Pesada",
      "Presentación": "Caneca 5 Galones (19L sellada)",
      "Rotación": "3.04 (Top Rotación)"
    },
    "fullSpecs": {
      "Código Bodega": "0368AR10010",
      "Marca": "AROIL Alto Kilometraje",
      "Viscosidad": "25W-60",
      "Presentación": "Caneca 5 Galones",
      "Aplicación": "Motores con más de 150.000 km, consumo de aceite o trabajo severo continuo"
    },
    "description": "Fórmula de alta viscosidad para motores con desgaste natural, reduciendo fugas por retenes, humo azul y manteniendo la compresión en recorridos pesados.",
    "priceEstimate": "Cotización Caneca",
    "priceNote": "Despacho asegurado por Reina del Camino, Trans Esmeraldas o transporte pesado.",
    "warranty": "Calidad Garantizada",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (8 canecas)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-15w40.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet / Ford / Toyota",
        "model": "Vehículos y Camiones Alto Kilometraje",
        "yearRange": "1995-2015",
        "engine": "Gasolina y Diésel"
      },
      {
        "make": "Sector Productivo",
        "model": "Generadores y Maquinaria en Finca",
        "yearRange": "Todos",
        "engine": "Diésel"
      }
    ],
    "features": [
      "Índice de rotación récord 3.04 en Pedernales",
      "Caneca original sellada con precinto de seguridad"
    ],
    "faqs": [],
    "realStock": 8.0,
    "rotationIndex": 3.04,
    "dailySales": 0.27,
    "isBestSeller": true
  },
  {
    "id": "lub-mannol-ts4-10lt",
    "sku": "012MN7104-10A",
    "slug": "mannol-ts-4-shpd-15w40-caneca-10lt",
    "name": "Aceite Mannol TS-4 SHPD 15W-40 Extra Diésel (Caneca 10 Litros)",
    "brand": "Mannol",
    "category": "lubricantes",
    "applicationType": "pesado",
    "volume": "Caneca 10 Litros (10 LT)",
    "shortSpec": "15W-40 SHPD • API CI-4/SL • MB 228.3 • Caneca 10L • Transporte Pesado y Camaroneras",
    "specifications": {
      "Código Bodega": "012MN7104-10A",
      "Marca": "Mannol SHPD (Super High Performance Diesel)",
      "Viscosidad": "15W-40",
      "Norma": "API CI-4 / SL, ACEA E7, MB 228.3, MAN M3275",
      "Presentación": "Caneca 10 Litros Alemana"
    },
    "fullSpecs": {
      "Código Bodega": "012MN7104-10A",
      "Marca": "Mannol TS-4 SHPD",
      "Viscosidad": "15W-40",
      "Presentación": "Caneca 10 Litros",
      "Aprobaciones": "Volvo VDS-3, Renault RLD-2, Mack EO-N, Caterpillar ECF-2"
    },
    "description": "Aceite alemán de tecnología SHPD para motores diésel de servicio pesado con turbo e intercooler. Extiende los intervalos de cambio y protege contra el pulido de camisas.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Ideal para mantenimiento programado de flotas y cooperativas de transporte.",
    "warranty": "Homologación OEM Fabricantes Europeos",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (2 canecas)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-15w40.jpg",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "Serie 500 / 700 / GH / FG / FM",
        "yearRange": "2008-2024",
        "engine": "J08E / E13C"
      },
      {
        "make": "Chevrolet",
        "model": "FTR / FVR / FVZ",
        "yearRange": "2010-2024",
        "engine": "6HK1"
      },
      {
        "make": "Mercedes-Benz / Scania",
        "model": "Buses y Cabezales",
        "yearRange": "Todos",
        "engine": "OM457 / DC13"
      }
    ],
    "features": [
      "Índice de rotación 1.98 en Pedernales para flotas interprovinciales",
      "Excelente capacidad de dispersión de hollín y neutralización ácida (TBN > 10)"
    ],
    "faqs": [],
    "realStock": 2.0,
    "rotationIndex": 1.98,
    "dailySales": 0.2,
    "isBestSeller": true
  },
  {
    "id": "lub-mobil-delvac-caneca",
    "sku": "015MD-51300",
    "slug": "mobil-delvac-1300-super-15w40-caneca-5gl",
    "name": "Aceite Mobil Delvac 1300 Super 15W-40 (Caneca 5 Galones)",
    "brand": "Mobil",
    "category": "lubricantes",
    "applicationType": "pesado",
    "volume": "Caneca 5 Galones (19 Litros)",
    "shortSpec": "15W-40 CK-4/CJ-4 • Mobil Delvac • Caneca 5 Galones • Rotación Récord 5.17",
    "specifications": {
      "Código Bodega": "015MD-51300",
      "Marca": "Mobil Delvac",
      "Viscosidad": "15W-40",
      "Norma": "API CK-4 / CJ-4 / CI-4 Plus",
      "Presentación": "Caneca 5 Galones (Sellada Mobil)",
      "Rotación": "5.17 (Máxima rotación en diésel)"
    },
    "fullSpecs": {
      "Código Bodega": "015MD-51300",
      "Marca": "Mobil Delvac 1300 Super",
      "Viscosidad": "15W-40",
      "Presentación": "Caneca 5 Galones (18.9L)",
      "Tecnología": "ExxonMobil Heavy Duty",
      "Despacho": "Bodega Pedernales a todo el país"
    },
    "description": "El lubricante para motores diésel de mayor renombre mundial. Cumple con la exigente especificación API CK-4, protegiendo filtros de partículas DPF y sistemas EGR modernos.",
    "priceEstimate": "Cotización Caneca",
    "priceNote": "Producto 100% original ExxonMobil con sello inviolable.",
    "warranty": "Garantía Oficial ExxonMobil",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-15w40.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-Max Euro 5/6 / Camiones Isuzu",
        "yearRange": "2015-2024",
        "engine": "Diésel CRDi con DPF"
      },
      {
        "make": "Toyota",
        "model": "Hilux 2.8 D-4D",
        "yearRange": "2016-2024",
        "engine": "1GD-FTV"
      },
      {
        "make": "Hino",
        "model": "Serie 300 / 500 Euro 4/5",
        "yearRange": "2015-2024",
        "engine": "N04C / J08E"
      }
    ],
    "features": [
      "Índice de rotación récord de 5.17 en mostrador Pedernales",
      "Protección contra espesamiento por oxidación en trabajo severo"
    ],
    "faqs": [],
    "realStock": 1.0,
    "rotationIndex": 5.17,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "lub-mannol-ceramic-5w30",
    "sku": "012MN7720-4",
    "slug": "mannol-ceramic-5w30-galon-4l",
    "name": "Aceite Sintético Mannol Ceramic 5W-30 (Galón 4 Litros)",
    "brand": "Mannol",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Galón 4 Litros (4/1 GL)",
    "shortSpec": "5W-30 Full Synthetic • Aditivo Cerámico Integrado • API SN Plus • Autos Modernos",
    "specifications": {
      "Código Bodega": "012MN7720-4",
      "Marca": "Mannol Ceramic",
      "Viscosidad": "5W-30",
      "Norma": "API SN Plus, ACEA C3",
      "Tecnología": "Micropartículas de Nitruro de Boro Cerámico"
    },
    "fullSpecs": {
      "Código Bodega": "012MN7720-4",
      "Marca": "Mannol",
      "Línea": "Ceramic Advanced Protection",
      "Viscosidad": "5W-30 Full Synthetic",
      "Presentación": "Galón 4 Litros",
      "Beneficio": "Capa protectora molecular autoregenerativa en cilindros y turbos"
    },
    "description": "Fórmula sintética avanzada enriquecida con nanocerámica que reduce la fricción en un 40%, soporta temperaturas extremas de turbo y disminuye el consumo de combustible.",
    "priceEstimate": "Cotización Galón",
    "priceNote": "Sello de seguridad alemán original.",
    "warranty": "Garantía de Fábrica Alemana",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (4 galones)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-5w30.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Tracker Turbo / Onix Turbo / Montana",
        "yearRange": "2020-2024",
        "engine": "1.0T / 1.2T 3 Cilindros"
      },
      {
        "make": "Kia",
        "model": "Sportage Turbo / Seltos / K3",
        "yearRange": "2020-2024",
        "engine": "1.4T / 1.6T / 2.0L"
      },
      {
        "make": "Hyundai",
        "model": "Tucson Turbo / Creta / Kona",
        "yearRange": "2020-2024",
        "engine": "1.6T / 2.0L"
      }
    ],
    "features": [
      "Índice de rotación 1.11 en Pedernales para SUVs y motores turbo modernos",
      "Evita el desgaste por arranque start-stop"
    ],
    "faqs": [],
    "realStock": 4.0,
    "rotationIndex": 1.11,
    "dailySales": 0.13,
    "isBestSeller": true
  },
  {
    "id": "lub-mannol-4t-moto",
    "sku": "012MN7812-1",
    "slug": "mannol-4takt-motorbike-10w40-litro",
    "name": "Aceite Mannol 4-Takt Motorbike 10W-40 JASO MA2 (1 Litro)",
    "brand": "Mannol",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro (20/1 LT)",
    "shortSpec": "10W-40 4 Tiempos • JASO MA2 / API SL • Para Embrague Húmedo • Stock Alto en Pedernales",
    "specifications": {
      "Código Bodega": "012MN7812-1",
      "Marca": "Mannol Motorbike",
      "Viscosidad": "10W-40",
      "Norma": "JASO MA/MA2, API SL",
      "Presentación": "1 Litro (Stock 23 unidades)"
    },
    "fullSpecs": {
      "Código Bodega": "012MN7812-1",
      "Marca": "Mannol (Alemania)",
      "Viscosidad": "10W-40 Semisintético para Motocicletas",
      "Aplicación": "Motos de reparto, delivery, paseo y cross con caja integrada y embrague bañado en aceite"
    },
    "description": "Formulado para evitar el patinaje del embrague húmedo en motocicletas de trabajo continuo. Soporta altas revoluciones de motor sin degradación térmica.",
    "priceEstimate": "Venta por Litro y Caja x 20",
    "priceNote": "Precios especiales para flotas de reparto y delivery.",
    "warranty": "Certificación JASO MA2 Oficial",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (23 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-5w30.jpg",
    "compatibleVehicles": [
      {
        "make": "Bajaj",
        "model": "Pulsar NS200 / NS160 / Boxer 150",
        "yearRange": "2015-2024",
        "engine": "150cc - 200cc"
      },
      {
        "make": "Yamaha",
        "model": "FZ 2.0 / YBR 125 / Crypton",
        "yearRange": "2012-2024",
        "engine": "115cc - 150cc"
      },
      {
        "make": "Honda",
        "model": "CB125F / CB190R / XR150L / Wave",
        "yearRange": "2014-2024",
        "engine": "110cc - 190cc"
      },
      {
        "make": "Shineray / Daytona / IGM",
        "model": "Motos Utilitarias Chinas",
        "yearRange": "Todos",
        "engine": "125cc - 250cc"
      }
    ],
    "features": [
      "Venta constante en el sector comercial y delivery de Pedernales",
      "Cambios de marcha más suaves y caja de velocidades protegida"
    ],
    "faqs": [],
    "realStock": 23.0,
    "rotationIndex": 0.19,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "lub-motul-moto5100",
    "sku": "01098960",
    "slug": "motul-moto-5100-15w50-semisintetico-ester",
    "name": "Aceite Motul 5100 15W-50 4T Semisintético Technosynthese Ester (1 Litro)",
    "brand": "Motul",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro (12/1 LT)",
    "shortSpec": "15W-50 Technosynthese Ester • JASO MA2 / API SM • Motocicletas de Alto Desempeño",
    "specifications": {
      "Código Bodega": "01098960",
      "Marca": "Motul (Francia)",
      "Viscosidad": "15W-50",
      "Tecnología": "Technosynthese con Éster",
      "Norma": "JASO MA2 M033MOT158, API SM/SL"
    },
    "fullSpecs": {
      "Código Bodega": "01098960",
      "Marca": "Motul 5100 4T",
      "Tecnología": "Éster Sintético",
      "Viscosidad": "15W-50",
      "Presentación": "1 Litro"
    },
    "description": "El lubricante francés de referencia para motociclistas exigentes. Su tecnología con Éster garantiza una película lubricante indestructible aún en tráfico pesado de costa y altas temperaturas.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Envase original sellado con tapón retráctil de seguridad.",
    "warranty": "Homologación JASO MA2 Oficial",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (12 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-5w30.jpg",
    "compatibleVehicles": [
      {
        "make": "KTM",
        "model": "Duke 200 / 250 / 390 / RC",
        "yearRange": "2015-2024",
        "engine": "200cc - 390cc"
      },
      {
        "make": "BMW / Royal Enfield",
        "model": "G310R / Himalayan / Classic 350",
        "yearRange": "2018-2024",
        "engine": "310cc - 411cc"
      },
      {
        "make": "Suzuki / Yamaha",
        "model": "Gixxer 250 / FZ25 / MT-03",
        "yearRange": "2018-2024",
        "engine": "250cc - 321cc"
      }
    ],
    "features": [
      "Tecnología de Éster para máxima respuesta al acelerador",
      "Protección anti-cizallamiento en engranajes de transmisión"
    ],
    "faqs": [],
    "realStock": 12.0,
    "rotationIndex": 0.0,
    "dailySales": 0.0,
    "isBestSeller": false
  },
  {
    "id": "lub-aroil-atf-diii",
    "sku": "0368AR40045",
    "slug": "aroil-atf-diii-1-litro",
    "name": "Aceite de Transmisión Automática AROIL ATF D-III (1 Litro)",
    "brand": "Aroil",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro (Stock 43 unidades)",
    "shortSpec": "Fluido de Transmisión Automática y Dirección Hidráulica • Dexron III / Mercon",
    "specifications": {
      "Código Bodega": "0368AR40045",
      "Marca": "AROIL",
      "Tipo": "ATF Dexron III / Mercon",
      "Stock en Pedernales": "43 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "0368AR40045",
      "Marca": "AROIL ATF",
      "Especificación": "GM Dexron III-H, Ford Mercon, Allison C-4",
      "Aplicación": "Cajas automáticas y direcciones hidráulicas asistidas"
    },
    "description": "Fluido de alta estabilidad química para transmisiones automáticas convencionales y depósitos de dirección asistida hidráulica. Previene chirridos y fugas por empaquetaduras.",
    "priceEstimate": "Venta por Litro y Caja x 12",
    "priceNote": "Gran disponibilidad de stock en bodega matriz Pedernales.",
    "warranty": "Garantía de Especificación Técnica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (43 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/oil-5w30.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet / Toyota / Hyundai / Kia",
        "model": "Sistemas de Dirección Hidráulica y Cajas Automáticas 4/5 Velocidades",
        "yearRange": "Todos",
        "engine": "Gasolina y Diésel"
      }
    ],
    "features": [
      "Stock líder en bodega matriz: 43 litros disponibles de inmediato",
      "Color rojo translúcido característico para rápida detección de fugas"
    ],
    "faqs": [],
    "realStock": 43.0,
    "rotationIndex": 0.19,
    "dailySales": 0.2,
    "isBestSeller": true
  },
  {
    "id": "chem-mannol-inyectores-diesel",
    "sku": "012MN9980",
    "slug": "mannol-limpiador-inyectores-diesel-300ml",
    "name": "Limpiador de Inyectores Diésel Mannol Diesel Jet Cleaner 300ml",
    "brand": "Mannol",
    "category": "aditivos",
    "applicationType": "camionetas",
    "volume": "Envase 300 ml",
    "shortSpec": "Tratamiento Concentrado Diésel • Limpia Toberas e Inyectores • Aumenta Cetano",
    "specifications": {
      "Código Bodega": "012MN9980",
      "Marca": "Mannol (Alemania)",
      "Capacidad": "300 ml",
      "Aplicación": "Tanques de combustible diésel (hasta 50 litros)"
    },
    "fullSpecs": {
      "Código Bodega": "012MN9980",
      "Marca": "Mannol Diesel Jet Cleaner",
      "Origen": "Alemania",
      "Efecto": "Elimina depósitos carbonosos en toberas, bomba de alta presión y cámara de combustión"
    },
    "description": "Aditivo profesional alemán de alta rotación en Pedernales. Restaura el patrón de atomización en camionetas common rail D-Max, Hilux y camiones, reduciendo humo negro y ruidos de detonación.",
    "priceEstimate": "Venta por Unidad y Caja x 24",
    "priceNote": "Uso recomendado cada 5.000 km o antes de pruebas de opacidad en RTV.",
    "warranty": "Fórmula Alemana Certificada",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (11 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-Max CRDi 2.5 / 3.0 / 2.0T",
        "yearRange": "2006-2024",
        "engine": "Diésel Common Rail"
      },
      {
        "make": "Toyota",
        "model": "Hilux / Fortuner D-4D",
        "yearRange": "2006-2024",
        "engine": "Diésel"
      },
      {
        "make": "Hino",
        "model": "Serie 300 / 500",
        "yearRange": "2008-2024",
        "engine": "Diésel"
      }
    ],
    "features": [
      "Top Seller en aditivos: venta diaria de 0.23 unidades en Pedernales",
      "Compatible con filtros DPF y catalizadores diésel"
    ],
    "faqs": [],
    "realStock": 11.0,
    "rotationIndex": 0.48,
    "dailySales": 0.23,
    "isBestSeller": true
  },
  {
    "id": "chem-mannol-carburador",
    "sku": "012MN9770",
    "slug": "mannol-limpiador-carburador-600ml",
    "name": "Limpiador de Carburador y Cuerpo de Aceleración Mannol 600ml (Aerosol)",
    "brand": "Mannol",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Aerosol 600 ml (Stock 49 unidades)",
    "shortSpec": "Spray Alta Presión 600ml • Disuelve Gomas, Carbón y Barnices al Instante",
    "specifications": {
      "Código Bodega": "012MN9770",
      "Marca": "Mannol (Alemania)",
      "Volumen": "600 ml en aerosol con cánula",
      "Stock en Pedernales": "49 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "012MN9770",
      "Marca": "Mannol Carburetor Cleaner",
      "Capacidad": "600 ml",
      "Aplicación": "Cuerpos de aceleración electrónicos, carburadores, válvulas IAC y sensores"
    },
    "description": "El aerosol más vendido en talleres mecánicos de Manabí. Disuelve residuos rebeldes de hollín, aceite recirculado por PCV y barnices en cuerpos de mariposa sin dañar componentes de aluminio.",
    "priceEstimate": "Venta por Unidad y Caja x 12",
    "priceNote": "Imprescindible en afinamientos y mantenimientos preventivos.",
    "warranty": "Eficacia Inmediata Garantizada",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (49 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Todas las Marcas",
        "model": "Autos, Camionetas y Motos con Inyección o Carburador",
        "yearRange": "Todos",
        "engine": "Todos"
      }
    ],
    "features": [
      "Stock récord de 49 unidades en bodega central Pedernales",
      "Presión de disparo potente con cánula de precisión"
    ],
    "faqs": [],
    "realStock": 49.0,
    "rotationIndex": 0.18,
    "dailySales": 0.23,
    "isBestSeller": true
  },
  {
    "id": "chem-mannol-inyectores-gasolina",
    "sku": "012MN9957-025",
    "slug": "mannol-injector-cleaner-gasolina-250ml",
    "name": "Limpiador de Inyectores Gasolina Mannol Injector Cleaner 250ml",
    "brand": "Mannol",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Tratamiento Gasolina • Limpieza Rápida de Inyectores • Rotación 2.0",
    "specifications": {
      "Código Bodega": "012MN9957-025",
      "Marca": "Mannol",
      "Capacidad": "250 ml",
      "Rotación": "2.0 (Excelente salida)"
    },
    "fullSpecs": {
      "Código Bodega": "012MN9957-025",
      "Marca": "Mannol Injector Cleaner Gasolina",
      "Origen": "Alemania",
      "Aplicación": "Para vehículos a gasolina que presenten tirones o consumo elevado"
    },
    "description": "Limpia profundamente las agujas de inyectores y válvulas de admisión, eliminando suciedad originada por combustibles de bajo octanaje.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Agregar directamente al tanque antes de llenar.",
    "warranty": "Fórmula Certificada Alemana",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Sail / Aveo / Spark / Tracker",
        "yearRange": "2008-2024",
        "engine": "Gasolina"
      },
      {
        "make": "Kia / Hyundai",
        "model": "Picanto / Rio / Tucson / Sportage",
        "yearRange": "2008-2024",
        "engine": "Gasolina"
      }
    ],
    "features": [
      "Índice de rotación 2.0 en mostrador Pedernales",
      "Mejora inmediata de la respuesta al acelerar"
    ],
    "faqs": [],
    "realStock": 2.0,
    "rotationIndex": 2.0,
    "dailySales": 0.2,
    "isBestSeller": true
  },
  {
    "id": "ref-mannol-af12-rojo-1lt",
    "sku": "012MN4012-1",
    "slug": "mannol-refrigerante-rojo-af12-1lt",
    "name": "Refrigerante Orgánico Rojo Mannol AF12+ Larga Vida 5 Años (1 Litro)",
    "brand": "Mannol",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Litro (Stock 17 unidades)",
    "shortSpec": "Tecnología OAT Orgánica • Vida Útil 5 Años • Color Rojo / Rosa • Protección Radiador Aluminio",
    "specifications": {
      "Código Bodega": "012MN4012-1",
      "Marca": "Mannol (Alemania)",
      "Tipo": "Orgánico OAT AF12+",
      "Color": "Rojo / Rosa Fluorescente",
      "Durabilidad": "5 Años / 250.000 km"
    },
    "fullSpecs": {
      "Código Bodega": "012MN4012-1",
      "Marca": "Mannol Antifreeze AF12+",
      "Normas": "VW TL 774-D/F (G12/G12+), Ford WSS-M97B44-D, GM 6277M",
      "Presentación": "1 Litro",
      "Protección": "Anticorrosivo para radiadores de aluminio y bombas de agua en clima cálido"
    },
    "description": "Refrigerante premium con tecnología de carboxilatos orgánicos. No genera sarro, previene la cavitación y mantiene la temperatura de motor constante aún bajo el fuerte sol costero.",
    "priceEstimate": "Venta por Litro y Caja x 12",
    "priceNote": "Embalaje reforzado antiderrame garantizado para encomiendas.",
    "warranty": "Garantía de Fábrica Alemana",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (17 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/coolant-oat.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Sail / D-Max / Aveo / Tracker / Onix",
        "yearRange": "2008-2024",
        "engine": "Gasolina y Diésel"
      },
      {
        "make": "Toyota",
        "model": "Hilux / Yaris / Corolla / Fortuner",
        "yearRange": "2008-2024",
        "engine": "Gasolina y Diésel"
      },
      {
        "make": "Kia / Hyundai",
        "model": "Sportage / Tucson / Rio / Accent",
        "yearRange": "2010-2024",
        "engine": "Gasolina y Diésel"
      }
    ],
    "features": [
      "Top Seller en refrigerantes en Pedernales (17 unidades en stock)",
      "Evita el recalentamiento en rutas de ascenso hacia la Sierra"
    ],
    "faqs": [],
    "realStock": 17.0,
    "rotationIndex": 0.51,
    "dailySales": 0.2,
    "isBestSeller": true
  },
  {
    "id": "ref-abro-rojo-galon",
    "sku": "102EC-502",
    "slug": "abro-refrigerante-rojo-galon",
    "name": "Refrigerante ABRO Rojo Listo para Usar (Galón 3.785 Litros)",
    "brand": "Abro",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "Galón 3.785L (Stock 9 unidades)",
    "shortSpec": "Premezclado Listo para Usar • Galón Completo • Color Rojo • Rotación 0.68",
    "specifications": {
      "Código Bodega": "102EC-502",
      "Marca": "ABRO (USA)",
      "Presentación": "Galón 3.785 Litros",
      "Color": "Rojo"
    },
    "fullSpecs": {
      "Código Bodega": "102EC-502",
      "Marca": "ABRO Premium Coolant",
      "Presentación": "1 Galón",
      "Uso": "Listo para rellenar o cambio total de circuito de refrigeración"
    },
    "description": "Galón listo para verter directamente en el radiador y depósito auxiliar. Excelente relación costo-beneficio para transporte comercial y particular.",
    "priceEstimate": "Cotización Galón",
    "priceNote": "Despacho inmediato a toda la provincia.",
    "warranty": "Calidad Americana ABRO",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (9 galones)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/coolant-oat.jpg",
    "compatibleVehicles": [
      {
        "make": "Todas las Marcas",
        "model": "Vehículos con refrigerante rojo de fábrica",
        "yearRange": "Todos",
        "engine": "Todos"
      }
    ],
    "features": [
      "Índice de rotación 0.68 en mostrador Pedernales",
      "No requiere mezclar con agua, evita incrustaciones de cal"
    ],
    "faqs": [],
    "realStock": 9.0,
    "rotationIndex": 0.68,
    "dailySales": 0.17,
    "isBestSeller": true
  },
  {
    "id": "fil-advance-combustible-dmax2025",
    "sku": "080AFE-297",
    "slug": "filtro-advance-combustible-chevrolet-dmax-20t-diesel-2025",
    "name": "Filtro Advance de Combustible Chevrolet D-Max 2.0T Diésel 2025 (AFE-297)",
    "brand": "Advance",
    "category": "filtros",
    "applicationType": "camionetas",
    "shortSpec": "Filtro Diésel Alta Eficiencia • Chevrolet D-Max 2.0T Diésel 2025 • Código AFE-297",
    "specifications": {
      "Código Bodega": "080AFE-297",
      "Marca": "Advance Filters",
      "Referencia": "AFE-297",
      "Aplicación Específica": "Chevrolet D-Max 2.0T Diésel Modelo 2024 / 2025",
      "Rotación": "0.96 (Alta demanda último modelo)"
    },
    "fullSpecs": {
      "Código Bodega": "080AFE-297",
      "Marca": "Advance Filters",
      "Tipo": "Elemento filtrante ecológico para combustible diésel",
      "Retención": "Separa microgotas de agua y partículas mayores a 2 micras para proteger inyectores piezoeléctricos"
    },
    "description": "Filtro de combustible de última generación para la nueva Chevrolet D-Max 2.0 Turbo Diésel 2025. Máxima protección para el sistema de inyección diésel common rail de alta presión.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Verificamos año exacto de tu camioneta antes del envío.",
    "warranty": "Garantía de Filtración OEM",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (5 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/filter-oil.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-Max 2.0 Turbo Diésel Intercooler",
        "yearRange": "2024-2025",
        "engine": "2.0T Diésel"
      }
    ],
    "features": [
      "Top Seller en camionetas nuevas: rotación 0.96 en Pedernales",
      "Evita daños catastróficos en la bomba de alta presión por agua en el diésel"
    ],
    "faqs": [],
    "realStock": 5.0,
    "rotationIndex": 0.96,
    "dailySales": 0.13,
    "isBestSeller": true
  },
  {
    "id": "fil-advance-aceite-aveo-dmax",
    "sku": "080AO-3387",
    "slug": "filtro-advance-aceite-aveo-corsa-optra-dmax",
    "name": "Filtro Advance de Aceite Aveo, Corsa, Optra, D-Max (PH-2862)",
    "brand": "Advance",
    "category": "filtros",
    "applicationType": "autos",
    "shortSpec": "Filtro de Aceite Blindado • Aveo / Corsa / Optra / D-Max 2.4 • Equivalente PH-2862",
    "specifications": {
      "Código Bodega": "080AO-3387",
      "Marca": "Advance Filters",
      "Referencia": "AO-3387 / PH-2862",
      "Rosca": "M18 x 1.5"
    },
    "fullSpecs": {
      "Código Bodega": "080AO-3387",
      "Marca": "Advance Filters",
      "Tipo": "Spin-On Blindado Metálico",
      "Válvula Antidrenaje": "Silicona de alta temperatura"
    },
    "description": "El filtro de aceite de mayor circulación en el parque automotor ecuatoriano. Fabricado con medio filtrante microporoso que atrapa partículas abrasivas y mantiene la lubricación constante.",
    "priceEstimate": "Venta por Unidad y Caja",
    "priceNote": "Facturación inmediata en mostrador o para envío.",
    "warranty": "Garantía de Sellado Hermético",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (6 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/filter-oil.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Aveo Family / Emotion / Activo",
        "yearRange": "2006-2020",
        "engine": "1.5L / 1.6L"
      },
      {
        "make": "Chevrolet",
        "model": "Optra / Corsa / Astra",
        "yearRange": "2002-2015",
        "engine": "1.4L / 1.6L / 1.8L"
      },
      {
        "make": "Chevrolet",
        "model": "Luv D-Max 2.4 Gasolina",
        "yearRange": "2005-2015",
        "engine": "2.4L"
      }
    ],
    "features": [
      "Top Seller con salida diaria comprobada en Pedernales",
      "Carcasa metálica reforzada resistente a picos de presión en frío"
    ],
    "faqs": [],
    "realStock": 6.0,
    "rotationIndex": 0.53,
    "dailySales": 0.13,
    "isBestSeller": true
  },
  {
    "id": "fil-advance-combustible-wingle-luv",
    "sku": "080AFP-974",
    "slug": "filtro-advance-combustible-luv-wingle-trooper",
    "name": "Filtro Advance de Combustible Great Wall Wingle 2.4, Luv, Trooper (AFP-974)",
    "brand": "Advance",
    "category": "filtros",
    "applicationType": "camionetas",
    "shortSpec": "Filtro de Gasolina en Línea • Wingle 2.4 / Luv 2.2-2.4 / Trooper / N200",
    "specifications": {
      "Código Bodega": "080AFP-974",
      "Marca": "Advance Filters",
      "Referencia": "AFP-974",
      "Ubicación": "Bodega Pedernales (8 unidades)"
    },
    "fullSpecs": {
      "Código Bodega": "080AFP-974",
      "Marca": "Advance",
      "Tipo": "Filtro de combustible metálico con conectores rápidos y rosca"
    },
    "description": "Filtro para camionetas de trabajo Great Wall Wingle y Chevrolet Luv. Atrapa impurezas del combustible protegiendo la bomba y el riel de inyectores.",
    "priceEstimate": "Cotización Directa",
    "priceNote": "Recomendado cambio cada 10.000 a 15.000 km.",
    "warranty": "Garantía de Flujo y Filtración",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (8 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/filter-oil.jpg",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "Wingle 5 / Wingle 3 Gasolina",
        "yearRange": "2010-2022",
        "engine": "2.4L Mitsubishi 4G69"
      },
      {
        "make": "Chevrolet",
        "model": "Luv 2.2 / 2.3 / Trooper / N200",
        "yearRange": "1998-2015",
        "engine": "Gasolina"
      }
    ],
    "features": [
      "Stock de 8 unidades en bodega Pedernales con rotación 0.64",
      "Conexión perfecta sin fugas ni adaptaciones"
    ],
    "faqs": [],
    "realStock": 8.0,
    "rotationIndex": 0.64,
    "dailySales": 0.13,
    "isBestSeller": true
  },
  {
    "id": "fil-advance-aceite-hino",
    "sku": "080AO-1314",
    "slug": "filtro-advance-aceite-hino-serie-300-500",
    "name": "Filtro Advance de Aceite Hino Serie 300 / 500 FB, FD, FE (AO-1314)",
    "brand": "Advance",
    "category": "filtros",
    "applicationType": "pesado",
    "shortSpec": "Filtro Diésel Pesado • Hino FB1817 / FD2220 / FE3020 • Rotación 0.97",
    "specifications": {
      "Código Bodega": "080AO-1314",
      "Marca": "Advance Filters Heavy Duty",
      "Referencia": "AO-1314",
      "Aplicación": "Camiones Hino Dutro y Ranger"
    },
    "fullSpecs": {
      "Código Bodega": "080AO-1314",
      "Marca": "Advance Heavy Duty",
      "Tipo": "Filtro de aceite de gran volumen con válvula bypass reforzada"
    },
    "description": "Filtro para camiones de carga Hino que transportan productos del mar y carga pesada entre Manabí y la Sierra. Alta capacidad de retención de partículas carbonosas.",
    "priceEstimate": "Cotización Flotas",
    "priceNote": "Descuento por media docena o docena para empresas de transporte.",
    "warranty": "Garantía de Presión Hidráulica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (3 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/filter-oil.jpg",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "FB1817 / FD2220 / FD2320 / FE3020 / SG3320",
        "yearRange": "2008-2024",
        "engine": "Diésel Pesado"
      }
    ],
    "features": [
      "Índice de rotación 0.97 en camiones pesados",
      "Soporta presión de trabajo continuo en viajes largos"
    ],
    "faqs": [],
    "realStock": 3.0,
    "rotationIndex": 0.97,
    "dailySales": 0.1,
    "isBestSeller": true
  },
  {
    "id": "brake-ate-dot3-pintas",
    "sku": "141ATE-P3",
    "slug": "ate-liquido-frenos-dot3-pintas",
    "name": "Líquido de Frenos ATE Original DOT 3 (Presentación Pinta / Medio Litro)",
    "brand": "ATE",
    "category": "frenos",
    "applicationType": "autos",
    "volume": "Envase Pinta (Stock 10 unidades)",
    "shortSpec": "DOT 3 Original ATE • Tecnología Alemana • Punto de Ebullición Seguro",
    "specifications": {
      "Código Bodega": "141ATE-P3",
      "Marca": "ATE (Continental Aftermarket)",
      "Grado": "DOT 3",
      "Stock en Pedernales": "10 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "141ATE-P3",
      "Marca": "ATE Germany",
      "Especificación": "FMVSS 116 DOT 3, SAE J1703, ISO 4925 Clase 3",
      "Punto de Ebullición Seco": "Mínimo 205°C"
    },
    "description": "Líquido de frenos de equipo original alemán formulado para evitar el 'vapor lock' en descensos prolongados de montaña y climas húmedos. No ataca las mangueras ni los sellos de goma del cáliper.",
    "priceEstimate": "Venta por Envase",
    "priceNote": "Imprescindible en cada cambio de pastillas o mantenimiento de frenos.",
    "warranty": "Garantía de Fábrica ATE Alemania",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (10 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet / Kia / Hyundai / Toyota",
        "model": "Vehículos con especificación DOT 3 de fábrica",
        "yearRange": "Todos",
        "engine": "Todos"
      }
    ],
    "features": [
      "Top Seller en líquidos de frenos en Pedernales",
      "Excelente protección anticorrosiva para bombines y módulos ABS"
    ],
    "faqs": [],
    "realStock": 10.0,
    "rotationIndex": 0.24,
    "dailySales": 0.1,
    "isBestSeller": true
  },
  {
    "id": "brake-ate-dot4-litro",
    "sku": "141ATE-G4",
    "slug": "ate-liquido-frenos-dot4-litro",
    "name": "Líquido de Frenos ATE Original DOT 4 (Envase 1 Litro)",
    "brand": "ATE",
    "category": "frenos",
    "applicationType": "autos",
    "volume": "1 Litro (Stock 9 unidades)",
    "shortSpec": "DOT 4 Alto Punto de Ebullición (+260°C) • Para Vehículos con ABS y ESP Modernos",
    "specifications": {
      "Código Bodega": "141ATE-G4",
      "Marca": "ATE (Alemania)",
      "Grado": "DOT 4",
      "Punto de Ebullición": "+260°C Seco / +165°C Húmedo"
    },
    "fullSpecs": {
      "Código Bodega": "141ATE-G4",
      "Marca": "ATE Brake Fluid DOT 4",
      "Normas": "FMVSS 116 DOT 4, SAE J1704, ISO 4925 Clase 4",
      "Presentación": "Lata metálica hermética de 1 Litro"
    },
    "description": "Fluido de alto rendimiento para vehículos modernos con control de estabilidad (ESP/VSC) y frenadas de emergencia. Lata metálica sellada para evitar la absorción de humedad ambiental.",
    "priceEstimate": "Venta por Litro",
    "priceNote": "Envase metálico que preserva las propiedades hidroscópicas.",
    "warranty": "Garantía Original ATE",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (9 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet / Toyota / Ford / Volkswagen / Kia",
        "model": "Vehículos modernos con frenos de disco en las 4 ruedas y ABS",
        "yearRange": "2010-2024",
        "engine": "Todos"
      }
    ],
    "features": [
      "Punto de ebullición superior para frenadas exigentes",
      "Lata metálica que garantiza cero absorción de humedad en la Costa"
    ],
    "faqs": [],
    "realStock": 9.0,
    "rotationIndex": 0.0,
    "dailySales": 0.0,
    "isBestSeller": false
  },
  {
    "id": "bujia-ngk-lfr5agp",
    "sku": "042LFR5AGP",
    "slug": "bujia-ngk-platino-tucson-vitara-hilux-lfr5agp",
    "name": "Bujía NGK G-Power Platino Hyundai Tucson, Vitara SZ, Toyota Hilux (LFR5AGP)",
    "brand": "NGK",
    "category": "bujias",
    "applicationType": "autos",
    "shortSpec": "Electrodo de Platino G-Power • Rosca Larga • Tucson IX / Vitara SZ 2.4 / Hilux",
    "specifications": {
      "Código Bodega": "042LFR5AGP",
      "Marca": "NGK G-Power",
      "Referencia": "LFR5AGP (Punta de Platino)",
      "Stock en Pedernales": "10 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "042LFR5AGP",
      "Marca": "NGK Spark Plugs",
      "Tipo": "Platino G-Power",
      "Beneficio": "Arranque instantáneo, menor voltaje requerido a la bobina y vida útil de 40.000 km"
    },
    "description": "Bujía de alto rendimiento con punta fina de platino para camionetas y SUVs populares en Ecuador. Reduce el consumo de combustible y mejora la aceleración.",
    "priceEstimate": "Venta por Juego (x4) o Unidad",
    "priceNote": "Verificamos la calibración adecuada antes de entregar.",
    "warranty": "Garantía Original NGK",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (10 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "Tucson IX 2.0 / Santa Fe",
        "yearRange": "2010-2022",
        "engine": "2.0L / 2.4L Gasolina"
      },
      {
        "make": "Suzuki",
        "model": "Grand Vitara SZ 2.0 / 2.4",
        "yearRange": "2008-2020",
        "engine": "J20A / J24B"
      },
      {
        "make": "Toyota",
        "model": "Hilux / Prado / Fortuner Gasolina",
        "yearRange": "2006-2022",
        "engine": "2TR-FE 2.7L"
      }
    ],
    "features": [
      "Punta de platino resistente a erosión por chispa",
      "Encendido potente aún con combustible extra o ecopaís"
    ],
    "faqs": [],
    "realStock": 10.0,
    "rotationIndex": 0.0,
    "dailySales": 0.0,
    "isBestSeller": true
  },
  {
    "id": "bujia-ngk-bkr5e",
    "sku": "043BKR5E",
    "slug": "bujia-ngk-bkr5e-aveo-sail-swift",
    "name": "Bujía NGK Cobre Chevrolet Aveo, Sail, Corsa, Swift (BKR5E)",
    "brand": "NGK",
    "category": "bujias",
    "applicationType": "autos",
    "shortSpec": "Hexágono 5/8 • Núcleo de Cobre • Chevrolet Aveo / Sail / Corsa / Daewoo",
    "specifications": {
      "Código Bodega": "043BKR5E",
      "Marca": "NGK",
      "Referencia": "BKR5E / RC-12YC",
      "Hexágono": "5/8 pulgada",
      "Stock en Pedernales": "10 unidades verificadas"
    },
    "fullSpecs": {
      "Código Bodega": "043BKR5E",
      "Marca": "NGK Brasil / Japón",
      "Tipo": "Electrodo con ranura en V (V-Power)",
      "Aplicación": "Motores 8V y 16V Chevrolet, Daewoo, Suzuki"
    },
    "description": "La bujía estándar de mayor rotación para vehículos urbanos en Ecuador. Ranura en V patentada por NGK que mejora la inflamabilidad de la mezcla.",
    "priceEstimate": "Venta por Juego (x4)",
    "priceNote": "Facturación electrónica inmediata.",
    "warranty": "Garantía de Fábrica NGK",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "Stock en Bodega Pedernales (10 unidades)",
    "dispatchIndicator": "Despacho inmediato desde Hub Central Pedernales",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/brake-pads.jpg",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "Aveo Family / Emotion / Sail 1.4 / Corsa",
        "yearRange": "2002-2020",
        "engine": "1.4L / 1.5L / 1.6L"
      },
      {
        "make": "Suzuki",
        "model": "Swift / Forza / Forsa 2",
        "yearRange": "1995-2010",
        "engine": "1.0L / 1.3L"
      }
    ],
    "features": [
      "Electrodo con ranura en V para menor consumo y encendido rápido",
      "Gran rotación en talleres de mecánica general de Pedernales"
    ],
    "faqs": [],
    "realStock": 10.0,
    "rotationIndex": 0.0,
    "dailySales": 0.0,
    "isBestSeller": true
  }
];
