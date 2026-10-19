export type ApplicationType = "autos" | "camionetas" | "pesado" | "motos";

export type ProductCategory =
  | "baterias"
  | "lubricantes"
  | "filtros"
  | "refrigerantes"
  | "frenos"
  | "bujias"
  | "aditivos";

export interface ProductVariant {
  sku: string;
  name: string;
  presentation: string;
  volume?: string;
  stock: number;
  imageUrl: string;
  barcode?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  applicationType: ApplicationType;
  volume?: string | null;
  plates?: string | null;
  shortSpec: string;
  specifications: Record<string, string>;
  fullSpecs: Record<string, string>;
  description: string;
  priceEstimate?: string | null;
  priceNote: string;
  warranty: string;
  commercialStatus: "VERIFIED" | "REFERENCE" | "PENDING_VERIFICATION";
  inStock: boolean;
  stockStatusText: string;
  dispatchIndicator: string;
  primaryOriginRecommendation: "Pedernales" | "Quito" | "Nacional";
  imageUrl: string;
  variants?: ProductVariant[];
  compatibleVehicles: {
    make: string;
    model: string;
    yearRange: string;
    engine?: string;
  }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  isBestSeller?: boolean;
}

export const OFFICIAL_BRANDS = [
  { name: "BATERÍAS ECUADOR", logoUrl: "/images/brands/baterias-ecuador.png", origin: "Línea Oficial Nacional", specialty: "Arranque & Alta Durabilidad" },
  { name: "BOSCH", logoUrl: "/images/brands/bosch.png", origin: "Tecnología Alemana", specialty: "Baterías S4 PowerFrame" },
  { name: "MANNOL", logoUrl: "/images/brands/mannol.png", origin: "Ingeniería Alemana", specialty: "Sintéticos, Coolant & Aditivos" },
  { name: "AROIL", logoUrl: "/images/brands/aroil.png", origin: "Alta Rotación Ecuador", specialty: "Super 40, 15W-40 & Canecas" },
  { name: "MOBIL", logoUrl: "/images/brands/mobil.png", origin: "ExxonMobil Global", specialty: "Mobil Delvac & Mobil 1" },
  { name: "MOTUL", logoUrl: "/images/brands/motul.png", origin: "Especialista Francés", specialty: "Motos 4T Ester & Rendimiento" },
  { name: "VALVOLINE", logoUrl: "/images/brands/valvoline.png", origin: "Líder Americano", specialty: "Valvodiesel & Protección SAE" },
  { name: "AMALIE", logoUrl: "/images/brands/amalie.png", origin: "Fórmula Americana", specialty: "Synthetic Blend Multigrado" },
  { name: "ADVANCE", logoUrl: "/images/brands/advance.png", origin: "Filtración Automotriz", specialty: "Filtros de Aceite, Aire & Combustible" },
  { name: "ATE", logoUrl: "/images/brands/ate.png", origin: "Equipo Original Alemán", specialty: "Fluidos de Freno DOT 3 & DOT 4" },
  { name: "NGK", logoUrl: "/images/brands/ngk.png", origin: "Líder en Encendido", specialty: "Bujías Platino & Cobre" },
  { name: "DENSO", logoUrl: "/images/brands/denso.png", origin: "Equipo Original Japonés", specialty: "Bujías de Precisión OEM" },
  { name: "BARDAHL", logoUrl: "/images/brands/bardahl.png", origin: "Aditivos Profesionales", specialty: "Tratamiento B1, B2 & Antifricción" },
  { name: "ABRO", logoUrl: "/images/brands/abro.png", origin: "Fórmula Americana", specialty: "Químicos & Refrigerantes USA" },
  { name: "SIMONIZ", logoUrl: "/images/brands/simoniz.png", origin: "Cuidado Automotriz", specialty: "Ceras, Siliconas & Shampoo" },
  { name: "AREON", logoUrl: "/images/brands/areon.png", origin: "Perfumería Europea", specialty: "Aromas Black Crystal & New Car" }
];

export const PRODUCTS: Product[] = [
  {
    "id": "prod-078AA-1531",
    "sku": "078AA-1531",
    "slug": "advance-advance-filtro-aire-ty-hilux-2-7l-fi-16-078aa-1531",
    "name": "ADVANCE FILTRO AIRE TY HILUX 2.7L FI 16-21 HILUX 2.4L DI 16-21, FORTUNER 2.7L FI 16-21 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AA-1531. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AA-1531",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AA-1531",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE TY HILUX 2.7L FI 16-21 HILUX 2.4L DI 16-21, FORTUNER 2.7L FI 16-21 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AA-1531.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Toyota",
        "model": "FORTUNER",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AA-1531 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AA-3040",
    "sku": "078AA-3040",
    "slug": "advance-advance-filtro-aire-jac-pick-up-t6-2-0-1-078aa-3040",
    "name": "ADVANCE FILTRO AIRE JAC PICK UP T6 2.0 17- 19 GASOLINA (PREM AIP1068 XTRAG AP-164) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AA-3040. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AA-3040",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AA-3040",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE JAC PICK UP T6 2.0 17- 19 GASOLINA (PREM AIP1068 XTRAG AP-164) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AA-3040.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AA-3040 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-10086",
    "sku": "080AA-10086",
    "slug": "advance-advance-filtro-aire-hy-tucson-2-0l-04-10-080aa-10086",
    "name": "ADVANCE FILTRO AIRE HY TUCSON 2.0L 04-10, KIA SPORTAGE ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-10086. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-10086",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-10086",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY TUCSON 2.0L 04-10, KIA SPORTAGE ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-10086.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "SPORTAGE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-10086 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-10088",
    "sku": "080AA-10088",
    "slug": "advance-advance-filtro-aire-hy-accent-1-4-1-6-ri-080aa-10088",
    "name": "ADVANCE FILTRO AIRE HY ACCENT 1.4-1.6 RIO XCITE (XTRAG AP-111 RED 28113-1G000) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-10088. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-10088",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-10088",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY ACCENT 1.4-1.6 RIO XCITE (XTRAG AP-111 RED 28113-1G000) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-10088.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "ACCENT",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-10088 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-10286",
    "sku": "080AA-10286",
    "slug": "advance-advance-filtro-aire-sz-gran-vitara-sz-2-080aa-10286",
    "name": "ADVANCE FILTRO AIRE SZ GRAN VITARA SZ 2.0 2.7 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-10286. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-10286",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-10286",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE SZ GRAN VITARA SZ 2.0 2.7 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-10286.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-10286 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-10699",
    "sku": "080AA-10699",
    "slug": "advance-advance-filtro-aire-kia-soul-12-soluto-080aa-10699",
    "name": "ADVANCE FILTRO AIRE KIA SOUL /12- SOLUTO/XCITE/VERNA /20- ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-10699. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-10699",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-10699",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA SOUL /12- SOLUTO/XCITE/VERNA /20- ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-10699.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "SOUL",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "SOLUTO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-10699 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-10891",
    "sku": "080AA-10891",
    "slug": "advance-advance-filtro-aire-ch-joy-aa-10891-a-080aa-10891",
    "name": "ADVANCE FILTRO AIRE CH JOY - AA- 10891 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-10891. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-10891",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-10891",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH JOY - AA- 10891 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-10891.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "JOY",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-10891 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11071",
    "sku": "080AA-11071",
    "slug": "advance-advance-filtro-aire-ch-spark-gt-2011-be-080aa-11071",
    "name": "ADVANCE FILTRO AIRE CH SPARK GT 2011, BEAT - (PREM AIP777 MIL MK-92369, RED 96827723) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11071. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11071",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11071",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH SPARK GT 2011, BEAT - (PREM AIP777 MIL MK-92369, RED 96827723) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11071.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11071 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11077",
    "sku": "080AA-11077",
    "slug": "advance-advance-filtro-aire-ch-luv-dmax-2-4-gas-080aa-11077",
    "name": "ADVANCE FILTRO AIRE CH LUV DMAX 2.4 GAS. TRAILBLAZER /15- (CILINDRICO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11077. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11077",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11077",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH LUV DMAX 2.4 GAS. TRAILBLAZER /15- (CILINDRICO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11077.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11077 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11085",
    "sku": "080AA-11085",
    "slug": "advance-advance-filtro-aire-zotye-t600-advance-080aa-11085",
    "name": "ADVANCE FILTRO AIRE ZOTYE T600 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11085. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11085",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11085",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE ZOTYE T600 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11085.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Zotye",
        "model": "T600",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11085 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11113",
    "sku": "080AA-11113",
    "slug": "advance-advance-filtro-aire-dongfeng-rich-6-2020-080aa-11113",
    "name": "ADVANCE FILTRO AIRE DONGFENG RICH 6 2020 - AA-11113 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11113. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11113",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11113",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE DONGFENG RICH 6 2020 - AA-11113 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11113.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11113 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11652",
    "sku": "080AA-11652",
    "slug": "advance-advance-filtro-aire-rn-logan-ii-1-4-1-6-080aa-11652",
    "name": "ADVANCE FILTRO AIRE RN LOGAN II 1.4, 1.6 (14-16) 2019, SANDERO 1.4 1.6 (14-16), 165469466R ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11652. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11652",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11652",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE RN LOGAN II 1.4, 1.6 (14-16) 2019, SANDERO 1.4 1.6 (14-16), 165469466R ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11652.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11652 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11654",
    "sku": "080AA-11654",
    "slug": "advance-advance-filtro-aire-rn-logan-1-6-16-sa-080aa-11654",
    "name": "ADVANCE FILTRO AIRE RN LOGAN 1.6 /16- SANDERO STEPWAY 1.6 /16- DUSTER 1.6-2.0 /16- ADVANCE PANELADO 165460",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11654. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11654",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11654",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE RN LOGAN 1.6 /16- SANDERO STEPWAY 1.6 /16- DUSTER 1.6-2.0 /16- ADVANCE PANELADO 165460 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11654.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11654 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-11674",
    "sku": "080AA-11674",
    "slug": "advance-advance-filtro-aire-fd-ranger-nueva-2-5-080aa-11674",
    "name": "ADVANCE FILTRO AIRE FD RANGER NUEVA 2.5 MZ BT50 NUEVA (RED AIP892 XTRAG SR-2072 RED 1WA013Z40) (CIL) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-11674. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-11674",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-11674",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE FD RANGER NUEVA 2.5 MZ BT50 NUEVA (RED AIP892 XTRAG SR-2072 RED 1WA013Z40) (CIL) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-11674.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-11674 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-1380",
    "sku": "080AA-1380",
    "slug": "advance-advance-filtro-aire-ch-cruze-1-8-10-16-080aa-1380",
    "name": "ADVANCE FILTRO AIRE CH CRUZE 1.8 /10-16 / CH ORLANDO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-1380. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-1380",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-1380",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH CRUZE 1.8 /10-16 / CH ORLANDO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-1380.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-1380 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-1485",
    "sku": "080AA-1485",
    "slug": "advance-advance-filtro-aire-ch-spark-moderno-200-080aa-1485",
    "name": "ADVANCE FILTRO AIRE CH SPARK MODERNO 2006-07 (PANEL) (MK-91485) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-1485. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-1485",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-1485",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH SPARK MODERNO 2006-07 (PANEL) (MK-91485) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-1485.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-1485 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-2070",
    "sku": "080AA-2070",
    "slug": "advance-advance-filtro-aire-hy-accent-rb-kia-rio-080aa-2070",
    "name": "ADVANCE FILTRO AIRE HY ACCENT RB KIA RIO (PREM AIP837 RED 28113-1R100) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-2070. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-2070",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-2070",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY ACCENT RB KIA RIO (PREM AIP837 RED 28113-1R100) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-2070.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "ACCENT",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-2070 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-2217",
    "sku": "080AA-2217",
    "slug": "advance-advance-filtro-aire-ch-sail-advance-080aa-2217",
    "name": "ADVANCE FILTRO AIRE CH SAIL ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-2217. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-2217",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-2217",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH SAIL ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-2217.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-2217 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-25006",
    "sku": "080AA-25006",
    "slug": "advance-advance-filtro-aire-great-wall-poer-2-0t-080aa-25006",
    "name": "ADVANCE FILTRO AIRE GREAT WALL POER 2.0T DIESEL 2022 - AA-25006 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-25006. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-25006",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-25006",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE GREAT WALL POER 2.0T DIESEL 2022 - AA-25006 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-25006.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-25006 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-25011",
    "sku": "080AA-25011",
    "slug": "advance-advance-filtro-advance-aire-tank-300-2-0-080aa-25011",
    "name": "ADVANCE FILTRO ADVANCE AIRE TANK 300 2.0T, 500 2.0T - AA- 25011",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-25011. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-25011",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-25011",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE TANK 300 2.0T, 500 2.0T - AA- 25011 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-25011.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-25011 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-25040",
    "sku": "080AA-25040",
    "slug": "advance-advance-filtro-aire-ns-x-trail-14-qashq-080aa-25040",
    "name": "ADVANCE FILTRO AIRE NS X-TRAIL /14 QASHQAI 2.0 /15- RN KOLEOS ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-25040. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-25040",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-25040",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE NS X-TRAIL /14 QASHQAI 2.0 /15- RN KOLEOS ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-25040.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-25040 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-25128",
    "sku": "080AA-25128",
    "slug": "advance-advance-filtro-aire-mz-bt50-2-5-turbo-di-080aa-25128",
    "name": "ADVANCE FILTRO AIRE MZ BT50 2.5 TURBO DIESEL B2500 GALANT GAS 2000 DIESEL 4X2 (MIL MK-9021) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-25128. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-25128",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-25128",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE MZ BT50 2.5 TURBO DIESEL B2500 GALANT GAS 2000 DIESEL 4X2 (MIL MK-9021) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-25128.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-25128 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-2659",
    "sku": "080AA-2659",
    "slug": "advance-advance-filtro-aire-ch-luv-dmax-3-0-14-080aa-2659",
    "name": "ADVANCE FILTRO AIRE CH LUV DMAX 3.0 /14- PANELADO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-2659. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-2659",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-2659",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH LUV DMAX 3.0 /14- PANELADO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-2659.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-2659 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-2662",
    "sku": "080AA-2662",
    "slug": "advance-advance-filtro-advance-aire-chevrolet-d-080aa-2662",
    "name": "ADVANCE FILTRO ADVANCE AIRE CHEVROLET D-MAX 2.0T DIESEL 2025 CJ X 24 - AA-2662",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-2662. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-2662",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "7 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-2662",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "7 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE CHEVROLET D-MAX 2.0T DIESEL 2025 CJ X 24 - AA-2662 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "7 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-2662.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-2662 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 7 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-28115",
    "sku": "080AA-28115",
    "slug": "advance-advance-filtro-aire-hy-tucson-all-new-2-080aa-28115",
    "name": "ADVANCE FILTRO AIRE HY TUCSON ALL NEW 2.0 SANTA FE 2.5 SONATA 2.0 KIA SORENTO 3.5 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-28115. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-28115",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-28115",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY TUCSON ALL NEW 2.0 SANTA FE 2.5 SONATA 2.0 KIA SORENTO 3.5 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-28115.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Hyundai",
        "model": "SANTA FE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-28115 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-28130",
    "sku": "080AA-28130",
    "slug": "advance-advance-filtro-aire-hy-bus-county-hd65-080aa-28130",
    "name": "ADVANCE FILTRO AIRE HY BUS COUNTY, HD65, HD72 , HD78 SELLO RADIAL (CILINDRICO) ADVANCE (MK-94190)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-28130. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-28130",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-28130",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY BUS COUNTY, HD65, HD72 , HD78 SELLO RADIAL (CILINDRICO) ADVANCE (MK-94190) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-28130.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-28130 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-3603",
    "sku": "080AA-3603",
    "slug": "advance-advance-filtro-aire-kia-grand-pregio-200-080aa-3603",
    "name": "ADVANCE FILTRO AIRE KIA GRAND PREGIO 2006-2012 (CILINDRICO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-3603. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-3603",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-3603",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA GRAND PREGIO 2006-2012 (CILINDRICO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-3603.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "PREGIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-3603 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-38240",
    "sku": "080AA-38240",
    "slug": "advance-advance-filtro-aire-great-wall-wingle-5-080aa-38240",
    "name": "ADVANCE FILTRO AIRE GREAT WALL WINGLE 5 2.0 DIESEL 19, WINGLE 7 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-38240. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-38240",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-38240",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE GREAT WALL WINGLE 5 2.0 DIESEL 19, WINGLE 7 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-38240.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-38240 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-4000",
    "sku": "080AA-4000",
    "slug": "advance-advance-filtro-aire-kia-picanto-r-10-17-080aa-4000",
    "name": "ADVANCE FILTRO AIRE KIA PICANTO R /10-17 (28113-1Y100) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-4000. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-4000",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-4000",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA PICANTO R /10-17 (28113-1Y100) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-4000.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-4000 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-4309",
    "sku": "080AA-4309",
    "slug": "advance-advance-filtro-aire-ns-sentra-b-15-almer-080aa-4309",
    "name": "ADVANCE FILTRO AIRE NS SENTRA B-15 ALMERA MURANO PATHFINDER 3.0/CH SCROSS (16546-0Z000) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-4309. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-4309",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-4309",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE NS SENTRA B-15 ALMERA MURANO PATHFINDER 3.0/CH SCROSS (16546-0Z000) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-4309.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-4309 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-4939",
    "sku": "080AA-4939",
    "slug": "advance-advance-filtro-aire-ch-rodeo-2-6-redond-080aa-4939",
    "name": "ADVANCE FILTRO AIRE CH RODEO 2.6 (REDONDO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-4939. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-4939",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-4939",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH RODEO 2.6 (REDONDO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-4939.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-4939 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-51943",
    "sku": "080AA-51943",
    "slug": "advance-advance-filtro-aire-ch-luv-dmax-2-4-dmax-080aa-51943",
    "name": "ADVANCE FILTRO AIRE CH LUV DMAX 2.4 DMAX 3.5 GASOLINA / MT L200 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-51943. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-51943",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-51943",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH LUV DMAX 2.4 DMAX 3.5 GASOLINA / MT L200 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-51943.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-51943 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-54661",
    "sku": "080AA-54661",
    "slug": "advance-advance-filtro-advance-aire-nissan-x-tra-080aa-54661",
    "name": "ADVANCE FILTRO ADVANCE AIRE NISSAN X-TRAIL E-POWER 1.5 VC TURBO(E-4ORCE T33) QASHQAI 1.3T CAJA X 24 - AA- 54",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-54661. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-54661",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-54661",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE NISSAN X-TRAIL E-POWER 1.5 VC TURBO(E-4ORCE T33) QASHQAI 1.3T CAJA X 24 - AA- 54 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-54661.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-54661 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-5827",
    "sku": "080AA-5827",
    "slug": "advance-advance-filtro-aire-vw-golf-jetta-sk-oct-080aa-5827",
    "name": "ADVANCE FILTRO AIRE VW GOLF JETTA SK OCTAVIA AUDI A3 1.8T - AA-5827 ADVANCE (MK-5827)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-5827. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-5827",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-5827",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE VW GOLF JETTA SK OCTAVIA AUDI A3 1.8T - AA-5827 ADVANCE (MK-5827) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-5827.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "JETTA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Volkswagen",
        "model": "GOL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-5827 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-5903",
    "sku": "080AA-5903",
    "slug": "advance-advance-filtro-aire-mz-bt50-ty-hilux-2-5-080aa-5903",
    "name": "ADVANCE FILTRO AIRE MZ BT50 TY HILUX 2.5-2.7 /-09 / FORTUNERJAC 2.8 (CILINDRICO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-5903. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-5903",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-5903",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE MZ BT50 TY HILUX 2.5-2.7 /-09 / FORTUNERJAC 2.8 (CILINDRICO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-5903.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Toyota",
        "model": "FORTUNER",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-5903 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6000",
    "sku": "080AA-6000",
    "slug": "advance-advance-filtro-aire-kia-picanto-new-2017-080aa-6000",
    "name": "ADVANCE FILTRO AIRE KIA PICANTO NEW 2017 (RED 28113-G6000 XTRAGUARD CA-G6000) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6000. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6000",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6000",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA PICANTO NEW 2017 (RED 28113-G6000 XTRAGUARD CA-G6000) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6000.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6000 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6012",
    "sku": "080AA-6012",
    "slug": "advance-advance-filtro-aire-isuzu-npr-3-9-turbo-080aa-6012",
    "name": "ADVANCE FILTRO AIRE ISUZU NPR 3,9 TURBO NHR NKR 8941560520 (CILINDRICO) ADVANCE (MK-5070)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6012. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6012",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6012",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE ISUZU NPR 3,9 TURBO NHR NKR 8941560520 (CILINDRICO) ADVANCE (MK-5070) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6012.png",
    "compatibleVehicles": [
      {
        "make": "Isuzu",
        "model": "ISUZU",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NHR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6012 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6127",
    "sku": "080AA-6127",
    "slug": "advance-advance-filtro-aire-ch-d-max-2-5-3-5-tdi-080aa-6127",
    "name": "ADVANCE FILTRO AIRE CH D-MAX 2.5 3.5 TDI (AA-6127/SR-550/AIP682/8-97147860910) (CILINDRICO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6127. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6127",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6127",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH D-MAX 2.5 3.5 TDI (AA-6127/SR-550/AIP682/8-97147860910) (CILINDRICO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6127.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6127 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6558",
    "sku": "080AA-6558",
    "slug": "advance-advance-filtro-aire-mz-bt-50-gasolina-22-080aa-6558",
    "name": "ADVANCE FILTRO AIRE MZ BT-50 GASOLINA 2200 INY FD RANGER 2.2 2.6 2008 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6558. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6558",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6558",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE MZ BT-50 GASOLINA 2200 INY FD RANGER 2.2 2.6 2008 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6558.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT-50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6558 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6664",
    "sku": "080AA-6664",
    "slug": "advance-advance-filtro-aire-ch-vitara-1-6-97-01-080aa-6664",
    "name": "ADVANCE FILTRO AIRE CH VITARA 1.6 /97-01 (CUADRADO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6664. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6664",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6664",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH VITARA 1.6 /97-01 (CUADRADO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6664.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6664 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-6900",
    "sku": "080AA-6900",
    "slug": "advance-advance-filtro-aire-ns-sentra-b14-rn-dus-080aa-6900",
    "name": "ADVANCE FILTRO AIRE NS SENTRA B14 RN DUSTER ADVANCE (PREM AIP515 XTRAG AP-103 RED 16546-73C10)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-6900. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-6900",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-6900",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE NS SENTRA B14 RN DUSTER ADVANCE (PREM AIP515 XTRAG AP-103 RED 16546-73C10) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-6900.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-6900 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-7617",
    "sku": "080AA-7617",
    "slug": "advance-advance-filtro-aire-ch-vitara-spts-iny-a-080aa-7617",
    "name": "ADVANCE FILTRO AIRE CH VITARA SPTS INY ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-7617. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-7617",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-7617",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH VITARA SPTS INY ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-7617.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-7617 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-8067",
    "sku": "080AA-8067",
    "slug": "advance-advance-filtro-aire-ch-rodeo-3-2-troope-080aa-8067",
    "name": "ADVANCE FILTRO AIRE CH RODEO 3.2, TROOPER 3.2, LUV 2.2, 2.3, 3.2 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-8067. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-8067",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-8067",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH RODEO 3.2, TROOPER 3.2, LUV 2.2, 2.3, 3.2 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-8067.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-8067 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-8069",
    "sku": "080AA-8069",
    "slug": "advance-advance-filtro-aire-ch-gran-vitara-3ptas-080aa-8069",
    "name": "ADVANCE FILTRO AIRE CH GRAN VITARA 3PTAS(PREM AIP513 XTRAG WA-8069 RED 25311970) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-8069. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-8069",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-8069",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH GRAN VITARA 3PTAS(PREM AIP513 XTRAG WA-8069 RED 25311970) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-8069.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-8069 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-8078",
    "sku": "080AA-8078",
    "slug": "advance-advance-filtro-aire-sz-gran-vitara-sz-2-080aa-8078",
    "name": "ADVANCE FILTRO AIRE SZ GRAN VITARA SZ 2.4 78K00 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-8078. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-8078",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-8078",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE SZ GRAN VITARA SZ 2.4 78K00 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-8078.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-8078 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-8590",
    "sku": "080AA-8590",
    "slug": "advance-advance-filtro-aire-hy-tucson-ix-kia-spo-080aa-8590",
    "name": "ADVANCE FILTRO AIRE HY TUCSON IX KIA SPORTAGE R 11-12 CRETA - (MK-29766 PREM AIP767 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-8590. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-8590",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-8590",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY TUCSON IX KIA SPORTAGE R 11-12 CRETA - (MK-29766 PREM AIP767 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-8590.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "SPORTAGE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-8590 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-8964",
    "sku": "080AA-8964",
    "slug": "advance-advance-filtro-aire-rn-logan-sandero-dus-080aa-8964",
    "name": "ADVANCE FILTRO AIRE RN LOGAN/SANDERO/DUSTER/MEGANE ADVANCE C1858/1",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-8964. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-8964",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-8964",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE RN LOGAN/SANDERO/DUSTER/MEGANE ADVANCE C1858/1 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-8964.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-8964 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9100",
    "sku": "080AA-9100",
    "slug": "advance-advance-filtro-aire-kia-rio-x-line-18-g-080aa-9100",
    "name": "ADVANCE FILTRO AIRE KIA RIO X LINE /18 GT LIMITED SPORT ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9100. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9100",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9100",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA RIO X LINE /18 GT LIMITED SPORT ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9100.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9100 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9102",
    "sku": "080AA-9102",
    "slug": "advance-advance-filtro-aire-great-wall-wingle-2-080aa-9102",
    "name": "ADVANCE FILTRO AIRE GREAT WALL WINGLE /22 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9102. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9102",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9102",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE GREAT WALL WINGLE /22 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9102.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9102 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9110",
    "sku": "080AA-9110",
    "slug": "advance-advance-filtro-aire-zx-auto-grand-tiger-080aa-9110",
    "name": "ADVANCE FILTRO AIRE ZX AUTO-GRAND TIGER-WINGLE ADVANCE A38010 1109101-K08-A1",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9110. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9110",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9110",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE ZX AUTO-GRAND TIGER-WINGLE ADVANCE A38010 1109101-K08-A1 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9110.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9110 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9123",
    "sku": "080AA-9123",
    "slug": "advance-advance-filtro-aire-chery-tiggo-2-pro-1-080aa-9123",
    "name": "ADVANCE FILTRO AIRE CHERY TIGGO 2 PRO 1.5L - AA-9123 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9123. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9123",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9123",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CHERY TIGGO 2 PRO 1.5L - AA-9123 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9123.png",
    "compatibleVehicles": [
      {
        "make": "Chery",
        "model": "TIGGO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9123 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9124",
    "sku": "080AA-9124",
    "slug": "advance-advance-filtro-aire-chery-arrizo-5-1-5-080aa-9124",
    "name": "ADVANCE FILTRO AIRE CHERY ARRIZO 5 1.5 - AA- 9124 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9124. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9124",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9124",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CHERY ARRIZO 5 1.5 - AA- 9124 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9124.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9124 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9322",
    "sku": "080AA-9322",
    "slug": "advance-advance-filtro-aire-ch-sail-1-5l-17-21-080aa-9322",
    "name": "ADVANCE FILTRO AIRE CH SAIL 1.5L 17-21 (AA-9322, AIP1018, AP143, 90799322) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9322. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9322",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9322",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH SAIL 1.5L 17-21 (AA-9322, AIP1018, AP143, 90799322) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9322.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9322 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9392",
    "sku": "080AA-9392",
    "slug": "advance-advance-filtro-aire-kia-cerato-1-6-05-09-080aa-9392",
    "name": "ADVANCE FILTRO AIRE KIA CERATO 1.6 05-09 HY ELANTRA 1.6 00-06 CUUPE TIBURON 02-08 - AA9392 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9392. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9392",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9392",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA CERATO 1.6 05-09 HY ELANTRA 1.6 00-06 CUUPE TIBURON 02-08 - AA9392 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9392.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9392 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9476",
    "sku": "080AA-9476",
    "slug": "advance-advance-filtro-advance-aire-chevrolet-ca-080aa-9476",
    "name": "ADVANCE FILTRO ADVANCE AIRE CHEVROLET CAVALIER 2019 CJ X 24 - AA-9476",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9476. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9476",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9476",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE CHEVROLET CAVALIER 2019 CJ X 24 - AA-9476 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9476.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9476 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9632",
    "sku": "080AA-9632",
    "slug": "advance-advance-filtro-aire-hy-getz-1-3-2002-adv-080aa-9632",
    "name": "ADVANCE FILTRO AIRE HY GETZ 1.3 2002 ADVANCE (MK-24086)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9632. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9632",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9632",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE HY GETZ 1.3 2002 ADVANCE (MK-24086) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9632.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "GETZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9632 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9800",
    "sku": "080AA-9800",
    "slug": "advance-advance-filtro-aire-vw-jetta-iv-2-0-11-080aa-9800",
    "name": "ADVANCE FILTRO AIRE VW JETTA IV 2.0 /11, SK OCTAVIA 1.4 -2.0 FSI /07 (CILINDRICO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9800. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9800",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9800",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE VW JETTA IV 2.0 /11, SK OCTAVIA 1.4 -2.0 FSI /07 (CILINDRICO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9800.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "JETTA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9800 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9856",
    "sku": "080AA-9856",
    "slug": "advance-advance-filtro-aire-isuzu-npr-11-19-nhr-080aa-9856",
    "name": "ADVANCE FILTRO AIRE ISUZU NPR 11-19 NHR REWARD 11-18 NMR 11-14 NQR 11-18 NLR 11-18 JAC HFC1035 (CIL) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9856. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9856",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9856",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE ISUZU NPR 11-19 NHR REWARD 11-18 NMR 11-14 NQR 11-18 NLR 11-18 JAC HFC1035 (CIL) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9856.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "HFC",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Isuzu",
        "model": "ISUZU",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NHR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9856 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-9902",
    "sku": "080AA-9902",
    "slug": "advance-advance-filtro-aire-ch-aveo-chy-taxi-adv-080aa-9902",
    "name": "ADVANCE FILTRO AIRE CH AVEO CHY TAXI ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-9902. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-9902",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-9902",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE CH AVEO CHY TAXI ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-9902.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "AVEO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-9902 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AA-994",
    "sku": "080AA-994",
    "slug": "advance-advance-filtro-aire-rn-logan-sandero-080aa-994",
    "name": "ADVANCE FILTRO AIRE RN LOGAN, SANDERO - AA-994 ADVANCE (MK-9074)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AA-994. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AA-994",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AA-994",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE RN LOGAN, SANDERO - AA-994 ADVANCE (MK-9074) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AA-994.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AA-994 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-081AA-1132",
    "sku": "081AA-1132",
    "slug": "advance-advance-filtro-aire-kia-cerato-13-hy-e-081aa-1132",
    "name": "ADVANCE FILTRO AIRE KIA CERATO /13- HY ELANTRA 1.6 /07-11 I30 1.6 /09-10 KOUP 2.0 /10-17 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 081AA-1132. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "081AA-1132",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "081AA-1132",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO AIRE KIA CERATO /13- HY ELANTRA 1.6 /07-11 I30 1.6 /09-10 KOUP 2.0 /10-17 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/081AA-1132.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 081AA-1132 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-FILTRO_AIRE_080AA-3038",
    "sku": "FILTRO AIRE 080AA-3038",
    "slug": "advance-advance-filtro-advance-aire-jac-t9-2-0-2-filtro-aire-080aa-3038",
    "name": "ADVANCE FILTRO ADVANCE AIRE JAC T9 2.0 2025 - AA-3038",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: FILTRO AIRE 080AA-3038. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "FILTRO AIRE 080AA-3038",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "FILTRO AIRE 080AA-3038",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE JAC T9 2.0 2025 - AA-3038 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/FILTRO_AIRE_080AA-3038.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto FILTRO AIRE 080AA-3038 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-10127",
    "sku": "078AO-10127",
    "slug": "advance-advance-filtro-aceite-kia-pregio-h-100-t-078ao-10127",
    "name": "ADVANCE FILTRO ACEITE KIA PREGIO H 100 TERRACAN CARNIVAL DIESEL K2700 H-350 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-10127. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-10127",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-10127",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE KIA PREGIO H 100 TERRACAN CARNIVAL DIESEL K2700 H-350 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-10127.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "PREGIO",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "K2700",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-10127 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-1539",
    "sku": "078AO-1539",
    "slug": "advance-advance-filtro-aceite-ch-d-max-3-0-02-16-078ao-1539",
    "name": "ADVANCE FILTRO ACEITE CH D-MAX 3.0 02-16 D-MAX 2.5 02-12, FD ESCAPE 2.0 01-04 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-1539. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-1539",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-1539",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH D-MAX 3.0 02-16 D-MAX 2.5 02-12, FD ESCAPE 2.0 01-04 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-1539.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Ford",
        "model": "ESCAPE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-1539 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-2",
    "sku": "078AO-2",
    "slug": "advance-advance-filtro-aceite-fd-f150-escape-exp-078ao-2",
    "name": "ADVANCE FILTRO ACEITE FD F150-ESCAPE-EXPLORER V8 INY. WINGLE DIESEL 2.0 (PH-820) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE FD F150-ESCAPE-EXPLORER V8 INY. WINGLE DIESEL 2.0 (PH-820) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Ford",
        "model": "F150",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Ford",
        "model": "ESCAPE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Ford",
        "model": "EXPLORER",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-2841",
    "sku": "078AO-2841",
    "slug": "advance-advance-filtro-aceite-ch-sail-van-n200-n-078ao-2841",
    "name": "ADVANCE FILTRO ACEITE CH SAIL/VAN N200-N300/SPARK GT/BEAT PREMIER (10000KM) (SH4444) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2841. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2841",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2841",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH SAIL/VAN N200-N300/SPARK GT/BEAT PREMIER (10000KM) (SH4444) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2841.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2841 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-078AO-2849",
    "sku": "078AO-2849",
    "slug": "advance-advance-filtro-aceite-mz-1-6-2-0-2-2-2-6-078ao-2849",
    "name": "ADVANCE FILTRO ACEITE MZ 1.6-2.0-2.2-2.6/BT50 GAS/FD COURIER 2.0-2.2 WINGLE 5 GAS ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2849. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2849",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "11 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2849",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "11 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE MZ 1.6-2.0-2.2-2.6/BT50 GAS/FD COURIER 2.0-2.2 WINGLE 5 GAS ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "11 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2849.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2849 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 11 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-078AO-2863",
    "sku": "078AO-2863",
    "slug": "advance-advance-filtro-aceite-ch-luv-2-5-diesel-078ao-2863",
    "name": "ADVANCE FILTRO ACEITE CH LUV 2.5 DIESEL/GREAT WALL/HAVAL H5 2.5/WINGLE 2.8/CAMION JACK (PH7325) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2863. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2863",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2863",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH LUV 2.5 DIESEL/GREAT WALL/HAVAL H5 2.5/WINGLE 2.8/CAMION JACK (PH7325) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2863.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "HAVAL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2863 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-2870",
    "sku": "078AO-2870",
    "slug": "advance-advance-filtro-aceite-mercedes-190-sk-fa-078ao-2870",
    "name": "ADVANCE FILTRO ACEITE MERCEDES 190 SK FABIA I FELICIA SUPER B VW CROSSFOX GOL GOLF POLO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2870. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2870",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2870",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE MERCEDES 190 SK FABIA I FELICIA SUPER B VW CROSSFOX GOL GOLF POLO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2870.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "GOL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2870 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-2879",
    "sku": "078AO-2879",
    "slug": "advance-advance-filtro-aceite-ns-navara-jeep-l-078ao-2879",
    "name": "ADVANCE FILTRO ACEITE NS NAVARA, JEEP. LAND ROVER. LADA, DODGE, FIAT ANTIGUOS (PH-43) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-2879. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-2879",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-2879",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE NS NAVARA, JEEP. LAND ROVER. LADA, DODGE, FIAT ANTIGUOS (PH-43) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-2879.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-2879 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-4967",
    "sku": "078AO-4967",
    "slug": "advance-advance-filtro-aceite-ch-spark-life-1-0l-078ao-4967",
    "name": "ADVANCE FILTRO ACEITE CH SPARK LIFE 1.0L 06-19/TY RAV 4/CHANGAN ALSVIN 1.5L ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-4967. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-4967",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-4967",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH SPARK LIFE 1.0L 06-19/TY RAV 4/CHANGAN ALSVIN 1.5L ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-4967.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-4967 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-50710",
    "sku": "078AO-50710",
    "slug": "advance-advance-filtro-aceite-ch-luv-d-max-14-078ao-50710",
    "name": "ADVANCE FILTRO ACEITE CH LUV D-MAX /14- ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-50710. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-50710",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-50710",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH LUV D-MAX /14- ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-50710.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-50710 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AO-7317",
    "sku": "078AO-7317",
    "slug": "advance-advance-filtro-aceite-fiat-palio-fiorino-078ao-7317",
    "name": "ADVANCE FILTRO ACEITE FIAT PALIO FIORINO CIVIC ACCORD KIA I10 CERATO (PH2867) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-7317. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-7317",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-7317",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE FIAT PALIO FIORINO CIVIC ACCORD KIA I10 CERATO (PH2867) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-7317.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-7317 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-078AO-8",
    "sku": "078AO-8",
    "slug": "advance-advance-filtro-aceite-fd-dodge-ty-stout-078ao-8",
    "name": "ADVANCE FILTRO ACEITE FD/DODGE/TY STOUT/HILUX/LAND CRUISER/MZ BT50 DIESEL PH-8 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AO-8. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AO-8",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AO-8",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE FD/DODGE/TY STOUT/HILUX/LAND CRUISER/MZ BT50 DIESEL PH-8 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AO-8.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AO-8 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-079AOE-10246",
    "sku": "079AOE-10246",
    "slug": "advance-advance-filtro-aceite-ch-cruze-1-8l-tr-079aoe-10246",
    "name": "ADVANCE FILTRO ACEITE CH CRUZE 1.8L / TRACKER 1.8L 16V 13-19 / (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 079AOE-10246. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "079AOE-10246",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "079AOE-10246",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH CRUZE 1.8L / TRACKER 1.8L 16V 13-19 / (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/079AOE-10246.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 079AOE-10246 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1",
    "sku": "080AO-1",
    "slug": "advance-advance-filtro-aceite-mz-bt-50-diesel-ad-080ao-1",
    "name": "ADVANCE FILTRO ACEITE MZ BT-50 DIESEL ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE MZ BT-50 DIESEL ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT-50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1051",
    "sku": "080AO-1051",
    "slug": "advance-advance-filtro-advance-aceite-chevrolet-080ao-1051",
    "name": "ADVANCE FILTRO ADVANCE ACEITE CHEVROLET D-MAX 2.0T DIESEL 2025 - AO-1051 24.00 UNIDAD 5,00",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1051. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1051",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1051",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE CHEVROLET D-MAX 2.0T DIESEL 2025 - AO-1051 24.00 UNIDAD 5,00 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1051.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1051 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-10600",
    "sku": "080AO-10600",
    "slug": "advance-advance-filtro-aceite-vw-tiguan-2-0-07-080ao-10600",
    "name": "ADVANCE FILTRO ACEITE VW TIGUAN 2.0 /07- AMAROK GAS. PASSAT 1.8 /07- AUDI 2.0 CON ROSCA MACHO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-10600. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-10600",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-10600",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE VW TIGUAN 2.0 /07- AMAROK GAS. PASSAT 1.8 /07- AUDI 2.0 CON ROSCA MACHO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-10600.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-10600 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1302",
    "sku": "080AO-1302",
    "slug": "advance-advance-filtro-aceite-mt-canter-fuso-hin-080ao-1302",
    "name": "ADVANCE FILTRO ACEITE MT CANTER/FUSO/HINO FB-FC/HD 55/HD 65 C161 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1302. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1302",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1302",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE MT CANTER/FUSO/HINO FB-FC/HD 55/HD 65 C161 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1302.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1302 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1314",
    "sku": "080AO-1314",
    "slug": "advance-advance-filtro-aceite-hino-fb1817-fd222-080ao-1314",
    "name": "ADVANCE FILTRO ACEITE HINO FB1817, FD2220, FD2320, FE3020, SG3320, SG3325 (ADVANCE)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1314. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1314",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1314",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE HINO FB1817, FD2220, FD2320, FE3020, SG3320, SG3325 (ADVANCE) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1314.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1314 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1318",
    "sku": "080AO-1318",
    "slug": "advance-advance-filtro-aceite-hino-dutro-09-adv-080ao-1318",
    "name": "ADVANCE FILTRO ACEITE HINO DUTRO /09 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1318. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1318",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1318",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE HINO DUTRO /09 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1318.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1318 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1321",
    "sku": "080AO-1321",
    "slug": "advance-advance-filtro-aceite-hino-300-dutro-07-080ao-1321",
    "name": "ADVANCE FILTRO ACEITE HINO 300 DUTRO 07-12 300 EURO DUTRO 512 616 616DC 716 816 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1321. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1321",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1321",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE HINO 300 DUTRO 07-12 300 EURO DUTRO 512 616 616DC 716 816 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1321.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1321 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1513",
    "sku": "080AO-1513",
    "slug": "advance-advance-filtro-aceite-iz-ftr-fsr-fvr-98-080ao-1513",
    "name": "ADVANCE FILTRO ACEITE IZ FTR FSR FVR 98/99 ( SAKURA C1513 / HARD 8-94396-375-4) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1513. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1513",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1513",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE IZ FTR FSR FVR 98/99 ( SAKURA C1513 / HARD 8-94396-375-4) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1513.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet Isuzu",
        "model": "FTR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1513 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-1522",
    "sku": "080AO-1522",
    "slug": "advance-advance-filtro-aceite-isz-npr-nkr-98-mot-080ao-1522",
    "name": "ADVANCE FILTRO ACEITE ISZ NPR NKR 98-MOTOR 4B ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "motos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-1522. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-1522",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-1522",
      "Fabricante": "ADVANCE",
      "Aplicación": "Motos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE ISZ NPR NKR 98-MOTOR 4B ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-1522.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-1522 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-2801",
    "sku": "080AO-2801",
    "slug": "advance-advance-filtro-aceite-great-wall-wingle-080ao-2801",
    "name": "ADVANCE FILTRO ACEITE GREAT WALL WINGLE 2.8 DIESEL MAHINDRA PICK UP SCORPIO JAC HFC 1040K M20 1.5 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-2801. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-2801",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-2801",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE GREAT WALL WINGLE 2.8 DIESEL MAHINDRA PICK UP SCORPIO JAC HFC 1040K M20 1.5 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-2801.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "JAC",
        "model": "HFC",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-2801 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-2825",
    "sku": "080AO-2825",
    "slug": "advance-advance-filtro-aceite-dt1-2-1-5-ns-sentr-080ao-2825",
    "name": "ADVANCE FILTRO ACEITE DT1.2-1.5 NS SENTRA /92-98 TY /68-84 HILUX STOUT NS DATSUN ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-2825. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-2825",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-2825",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE DT1.2-1.5 NS SENTRA /92-98 TY /68-84 HILUX STOUT NS DATSUN ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-2825.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-2825 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-2841ST",
    "sku": "080AO-2841ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-2841st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLE CAVALIER, GROOVE, SAIL, N2",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-2841ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-2841ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "7 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-2841ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "7 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLE CAVALIER, GROOVE, SAIL, N2 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "7 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-2841ST.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-2841ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 7 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-2849ST",
    "sku": "080AO-2849ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-2849st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) JAC T8 MAZDA 1.6 1.8 B2000 - 1.600",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-2849ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-2849ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "11 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-2849ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "11 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) JAC T8 MAZDA 1.6 1.8 B2000 - 1.600 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "11 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-2849ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-2849ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 11 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-2870ST",
    "sku": "080AO-2870ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-2870st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) AUDI, SKODA, VOLKSWAGEN (DOBLE VALV",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-2870ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-2870ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-2870ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) AUDI, SKODA, VOLKSWAGEN (DOBLE VALV con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-2870ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-2870ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3387",
    "sku": "080AO-3387",
    "slug": "advance-advance-filtro-aceite-ch-aveo-corsa-optr-080ao-3387",
    "name": "ADVANCE FILTRO ACEITE CH AVEO/CORSA/OPTRA/LUV 2.2-2.4/DMAX (PH-2862) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3387. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3387",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3387",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH AVEO/CORSA/OPTRA/LUV 2.2-2.4/DMAX (PH-2862) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3387.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "AVEO",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3387 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3387ST",
    "sku": "080AO-3387ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-3387st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, DAEWOO, FIAT - AO-3387ST",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3387ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3387ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3387ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, DAEWOO, FIAT - AO-3387ST con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3387ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3387ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3593",
    "sku": "080AO-3593",
    "slug": "advance-advance-filtro-aceite-ch-luv-3-2-dmax-3-080ao-3593",
    "name": "ADVANCE FILTRO ACEITE CH LUV 3.2/DMAX 3.5/HY/KIA/TUCSON/SPORTAGE/GREAT WALL/TROOPER ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3593. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3593",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3593",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH LUV 3.2/DMAX 3.5/HY/KIA/TUCSON/SPORTAGE/GREAT WALL/TROOPER ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3593.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "SPORTAGE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3593 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3593ST",
    "sku": "080AO-3593ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-3593st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, GREAT WALL, HYUNDAI, KIA",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3593ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3593ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3593ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, GREAT WALL, HYUNDAI, KIA con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3593ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3593ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3614",
    "sku": "080AO-3614",
    "slug": "advance-advance-filtro-aceite-ch-forsa-i-ii-gran-080ao-3614",
    "name": "ADVANCE FILTRO ACEITE CH FORSA I-II/GRAND VITARA/JINMY/VITARA/DAIHATSU TERIOS 1.3 (PH966B) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3614. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3614",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3614",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH FORSA I-II/GRAND VITARA/JINMY/VITARA/DAIHATSU TERIOS 1.3 (PH966B) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3614.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3614 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-3614ST",
    "sku": "080AO-3614ST",
    "slug": "advance-advance-filtro-advance-aire-medio-filtra-080ao-3614st",
    "name": "ADVANCE FILTRO ADVANCE AIRE MEDIO FILTRANTE 100 SINTETICO 15000 KM. CHERY CHEVROLET DONGFENG FAW FORD JETOUR",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3614ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3614ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3614ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE AIRE MEDIO FILTRANTE 100 SINTETICO 15000 KM. CHERY CHEVROLET DONGFENG FAW FORD JETOUR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3614ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3614ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3675",
    "sku": "080AO-3675",
    "slug": "advance-advance-filtro-aceite-ch-trailblazer-sil-080ao-3675",
    "name": "ADVANCE FILTRO ACEITE CH TRAILBLAZER-SILVERADO 2000-CHEYENNE 2000 (PLB3675) ADVANCE PH-59 PH3429A",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3675. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3675",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3675",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH TRAILBLAZER-SILVERADO 2000-CHEYENNE 2000 (PLB3675) ADVANCE PH-59 PH3429A con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3675.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3675 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3830",
    "sku": "080AO-3830",
    "slug": "advance-advance-filtro-advance-aceite-mitsubishi-080ao-3830",
    "name": "ADVANCE FILTRO ADVANCE ACEITE MITSUBISHI CANTER, HYUNDAI HD55, HD65, HD72, HD78 DOBLE FILTRACION C- 5816 CAJ",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3830. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3830",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3830",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE MITSUBISHI CANTER, HYUNDAI HD55, HD65, HD72, HD78 DOBLE FILTRACION C- 5816 CAJ con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3830.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3830 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-3985",
    "sku": "080AO-3985",
    "slug": "advance-advance-filtro-aceite-rn-clio-scenic-meg-080ao-3985",
    "name": "ADVANCE FILTRO ACEITE RN CLIO/SCENIC/MEGANE/LOGAN/TWINGO CON TUERCA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-3985. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-3985",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-3985",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE RN CLIO/SCENIC/MEGANE/LOGAN/TWINGO CON TUERCA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-3985.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-3985 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-4386ST",
    "sku": "080AO-4386ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-4386st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) SUZUKI GRAND VITARA SZ, NEXT, TOYOT",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-4386ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-4386ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-4386ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) SUZUKI GRAND VITARA SZ, NEXT, TOYOT con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-4386ST.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-4386ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-4952",
    "sku": "080AO-4952",
    "slug": "advance-advance-filtro-advance-aceite-mg-zotye-080ao-4952",
    "name": "ADVANCE FILTRO ADVANCE ACEITE MG, ZOTYE T600 1.5, CHEVROLET TAHOE, SILVERADO, TRAIL BLAZER EXT - AO-4952",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-4952. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-4952",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-4952",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE MG, ZOTYE T600 1.5, CHEVROLET TAHOE, SILVERADO, TRAIL BLAZER EXT - AO-4952 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-4952.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Zotye",
        "model": "T600",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-4952 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-500-1",
    "sku": "080AO-500-1",
    "slug": "advance-advance-filtro-advance-aceite-ford-edge-080ao-500-1",
    "name": "ADVANCE FILTRO ADVANCE ACEITE FORD EDGE, EXPLORER, EXPEDITION, F-150 CAJA X 40 - AO-500/1",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-500-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-500-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-500-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE FORD EDGE, EXPLORER, EXPEDITION, F-150 CAJA X 40 - AO-500/1 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-500-1.png",
    "compatibleVehicles": [
      {
        "make": "Ford",
        "model": "EXPLORER",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-500-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-500ST",
    "sku": "080AO-500ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-500st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, FORD, JMC, JAC - AO-500S",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-500ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-500ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-500ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET, FORD, JMC, JAC - AO-500S con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-500ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-500ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-50710-1",
    "sku": "080AO-50710-1",
    "slug": "advance-advance-filtro-advance-aceite-chevrolet-080ao-50710-1",
    "name": "ADVANCE FILTRO ADVANCE ACEITE CHEVROLET DMAX 2014 CAJA X 40- AO-50710/1",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-50710-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-50710-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-50710-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE CHEVROLET DMAX 2014 CAJA X 40- AO-50710/1 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-50710-1.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-50710-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-5190",
    "sku": "080AO-5190",
    "slug": "advance-advance-filtro-aceite-ch-nhr-nkr-m26x1-080ao-5190",
    "name": "ADVANCE FILTRO ACEITE CH NHR, NKR M26X1,5 DUAL (8-94360427-1) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-5190. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-5190",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-5190",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE CH NHR, NKR M26X1,5 DUAL (8-94360427-1) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-5190.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet Isuzu",
        "model": "NHR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-5190 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-6102",
    "sku": "080AO-6102",
    "slug": "advance-advance-filtro-advance-aceite-ud-trucks-080ao-6102",
    "name": "ADVANCE FILTRO ADVANCE ACEITE UD TRUCKS FD6T (C-270, C12.00 6102, UJ1034, SC270) - AO-6100",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-6102. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-6102",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-6102",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE UD TRUCKS FD6T (C-270, C12.00 6102, UJ1034, SC270) - AO-6100 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-6102.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-6102 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-6607",
    "sku": "080AO-6607",
    "slug": "advance-advance-filtro-aceite-fiat-uno-fire-1-3-080ao-6607",
    "name": "ADVANCE FILTRO ACEITE FIAT UNO FIRE 1.3 HONDA ACCORD 2.3 ATOS PRIME 1.1 KIA CERATO FORTE 1.6 TIIDA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-6607. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-6607",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-6607",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE FIAT UNO FIRE 1.3 HONDA ACCORD 2.3 ATOS PRIME 1.1 KIA CERATO FORTE 1.6 TIIDA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-6607.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-6607 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-6607ST",
    "sku": "080AO-6607ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-6607st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) HYUNDAI, KIA, FOTON, GREAT WALL, HA",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-6607ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-6607ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-6607ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) HYUNDAI, KIA, FOTON, GREAT WALL, HA con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-6607ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-6607ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-080AO-667-1",
    "sku": "080AO-667-1",
    "slug": "advance-advance-filtro-advance-aceite-ph49a-lf6-080ao-667-1",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (PH49A,LF667,C-5510,LFP3191, PSL417)OIL FILTER CATERPILLAR, MACK, SCANIA, VOLV",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-667-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-667-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-667-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (PH49A,LF667,C-5510,LFP3191, PSL417)OIL FILTER CATERPILLAR, MACK, SCANIA, VOLV con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-667-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-667-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-7317ST",
    "sku": "080AO-7317ST",
    "slug": "advance-advance-filtro-advance-aceite-medio-fil-080ao-7317st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) GREAT WALL,HYUNDAI, KIA, MITSUBISHI",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-7317ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-7317ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-7317ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) GREAT WALL,HYUNDAI, KIA, MITSUBISHI con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-7317ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-7317ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-9566",
    "sku": "080AO-9566",
    "slug": "advance-advance-filtro-aceite-ty-hilux-2-7-fortu-080ao-9566",
    "name": "ADVANCE FILTRO ACEITE TY HILUX 2.7 FORTUNER 2.7 ADVANCE (ML-20004)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-9566. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-9566",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-9566",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE TY HILUX 2.7 FORTUNER 2.7 ADVANCE (ML-20004) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-9566.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Toyota",
        "model": "FORTUNER",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-9566 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AO-9617",
    "sku": "080AO-9617",
    "slug": "advance-advance-filtro-aceite-dongfeng-df-140-df-080ao-9617",
    "name": "ADVANCE FILTRO ACEITE DONGFENG DF 140 DFM 210 FD CARGO 815E (ML-55081) C-5713 LF645 HPH-9617/ ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AO-9617. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AO-9617",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AO-9617",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE DONGFENG DF 140 DFM 210 FD CARGO 815E (ML-55081) C-5713 LF645 HPH-9617/ ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AO-9617.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AO-9617 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-11651ST",
    "sku": "080AOE-11651ST",
    "slug": "advance-advance-filtro-advance-aceite-elemento-080aoe-11651st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15.000 KM.) FORD RANGER, MAZDA BT50 E",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-11651ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-11651ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-11651ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15.000 KM.) FORD RANGER, MAZDA BT50 E con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-11651ST.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-11651ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-11724ST",
    "sku": "080AOE-11724ST",
    "slug": "advance-advance-filtro-advance-aceite-elemento-080aoe-11724st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET TRAILBLAZER 2.8",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-11724ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-11724ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-11724ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) CHEVROLET TRAILBLAZER 2.8 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-11724ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-11724ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-1501",
    "sku": "080AOE-1501",
    "slug": "advance-advance-filtro-aceite-isuzu-npr-nml-2-nm-080aoe-1501",
    "name": "ADVANCE FILTRO ACEITE ISUZU NPR NML 2 NMR (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-1501. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-1501",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-1501",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE ISUZU NPR NML 2 NMR (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-1501.png",
    "compatibleVehicles": [
      {
        "make": "Isuzu",
        "model": "ISUZU",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-1501 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-486ST",
    "sku": "080AOE-486ST",
    "slug": "advance-advance-filtro-advance-aceite-elemento-080aoe-486st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) HAVAL ALL NEW H6 2.0T 2022",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-486ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-486ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-486ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) HAVAL ALL NEW H6 2.0T 2022 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-486ST.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "HAVAL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-486ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-9229-1",
    "sku": "080AOE-9229-1",
    "slug": "advance-advance-filtro-advance-aceite-elementoja-080aoe-9229-1",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTOJAC HFC 1140 7.8L, HFC 1160 7.8L, HFC 1180 7.8L - AOE9229/1",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-9229-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-9229-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-9229-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTOJAC HFC 1140 7.8L, HFC 1160 7.8L, HFC 1180 7.8L - AOE9229/1 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-9229-1.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "HFC",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-9229-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-9496ST",
    "sku": "080AOE-9496ST",
    "slug": "advance-advance-filtro-advance-aceite-elemento-080aoe-9496st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) VOLKSWAGEN BORA, JETTA, SK",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-9496ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-9496ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-9496ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15000 KM.) VOLKSWAGEN BORA, JETTA, SK con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-9496ST.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "BORA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Volkswagen",
        "model": "JETTA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-9496ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-9540",
    "sku": "080AOE-9540",
    "slug": "advance-advance-filtro-aceite-ns-urvan-diesel-n-080aoe-9540",
    "name": "ADVANCE FILTRO ACEITE NS URVAN DIESEL, NS FRONTIER (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-9540. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-9540",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-9540",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ACEITE NS URVAN DIESEL, NS FRONTIER (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-9540.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-9540 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AOE-9974ST",
    "sku": "080AOE-9974ST",
    "slug": "advance-advance-filtro-advance-aceite-elemento-080aoe-9974st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15.000 KM.) GREAT WALL POER 2.0T DIES",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AOE-9974ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AOE-9974ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AOE-9974ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE ELEMENTO (MEDIO FILTRANTE 100% SINTETICO 15.000 KM.) GREAT WALL POER 2.0T DIES con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AOE-9974ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AOE-9974ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-AO-3985ST",
    "sku": "AO-3985ST",
    "slug": "advance-advance-filtro-advance-aceite-sandero-st-ao-3985st",
    "name": "ADVANCE FILTRO ADVANCE ACEITE SANDERO STEPWAY;SSANGYONG TIVOLI 1.6 CON TUERCA - AO-3985ST",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: AO-3985ST. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "AO-3985ST",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "AO-3985ST",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE ACEITE SANDERO STEPWAY;SSANGYONG TIVOLI 1.6 CON TUERCA - AO-3985ST con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/AO-3985ST.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto AO-3985ST es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AC-1401",
    "sku": "078AC-1401",
    "slug": "advance-advance-filtro-cabina-ch-gran-vitara-1-6-078ac-1401",
    "name": "ADVANCE FILTRO CABINA CH GRAN VITARA 1.6-2.0 /03-15 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AC-1401. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AC-1401",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AC-1401",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH GRAN VITARA 1.6-2.0 /03-15 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AC-1401.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AC-1401 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AC-30020",
    "sku": "078AC-30020",
    "slug": "advance-advance-filtro-cabina-vw-bora-jetta-tigu-078ac-30020",
    "name": "ADVANCE FILTRO CABINA VW BORA JETTA TIGUAN SK FABIA 1.AC-30020,2 1.4 16V 1.4 8V SUPERB OCTAVIA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AC-30020. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AC-30020",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AC-30020",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA VW BORA JETTA TIGUAN SK FABIA 1.AC-30020,2 1.4 16V 1.4 8V SUPERB OCTAVIA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AC-30020.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "BORA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Volkswagen",
        "model": "JETTA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AC-30020 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-_4418",
    "sku": "080AC- 4418",
    "slug": "advance-advance-filtro-cabina-chery-tiggo-2-pro-080ac-4418",
    "name": "ADVANCE FILTRO CABINA CHERY TIGGO 2 PRO 1.5 2023 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC- 4418. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC- 4418",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC- 4418",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CHERY TIGGO 2 PRO 1.5 2023 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-_4418.png",
    "compatibleVehicles": [
      {
        "make": "Chery",
        "model": "TIGGO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC- 4418 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-10245-2",
    "sku": "080AC-10245-2",
    "slug": "advance-advance-filtro-cabina-hy-getz-2-compone-080ac-10245-2",
    "name": "ADVANCE FILTRO CABINA HY GETZ (2 COMPONENTES) - AC-10245- 2 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-10245-2. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-10245-2",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-10245-2",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA HY GETZ (2 COMPONENTES) - AC-10245- 2 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-10245-2.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "GETZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-10245-2 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-11105",
    "sku": "080AC-11105",
    "slug": "advance-advance-filtro-advance-cabina-zotye-t600-080ac-11105",
    "name": "ADVANCE FILTRO ADVANCE CABINA ZOTYE T600 - AC-11105",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-11105. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-11105",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-11105",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE CABINA ZOTYE T600 - AC-11105 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-11105.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Zotye",
        "model": "T600",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-11105 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-1114",
    "sku": "080AC-1114",
    "slug": "advance-advance-filtro-cabina-ty-yaris-corolla-h-080ac-1114",
    "name": "ADVANCE FILTRO CABINA TY YARIS-COROLLA-HIGHLANDER ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-1114. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-1114",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-1114",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA TY YARIS-COROLLA-HIGHLANDER ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-1114.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "YARIS",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Toyota",
        "model": "COROLLA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-1114 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-12775",
    "sku": "080AC-12775",
    "slug": "advance-advance-filtro-advance-cabina-subaru-for-080ac-12775",
    "name": "ADVANCE FILTRO ADVANCE CABINA SUBARU FORESTER 2.0L, WRX 2.T - AC-12775",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-12775. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-12775",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-12775",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE CABINA SUBARU FORESTER 2.0L, WRX 2.T - AC-12775 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-12775.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-12775 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-14050",
    "sku": "080AC-14050",
    "slug": "advance-advance-filtro-cabina-ch-gran-vitara-sz-080ac-14050",
    "name": "ADVANCE FILTRO CABINA CH GRAN VITARA SZ (XTRAG AC-108 RED 95861-64J00) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-14050. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-14050",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-14050",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH GRAN VITARA SZ (XTRAG AC-108 RED 95861-64J00) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-14050.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-14050 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-14051",
    "sku": "080AC-14051",
    "slug": "advance-advance-filtro-cabina-ch-grand-vitara-sz-080ac-14051",
    "name": "ADVANCE FILTRO CABINA CH GRAND VITARA SZ NEXT 2.0, 2.4 /15-19 MARCO DE PLASTICO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-14051. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-14051",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-14051",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH GRAND VITARA SZ NEXT 2.0, 2.4 /15-19 MARCO DE PLASTICO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-14051.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "SZ",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-14051 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-17140",
    "sku": "080AC-17140",
    "slug": "advance-advance-filtro-cabina-fd-ranger-mz-bt50-080ac-17140",
    "name": "ADVANCE FILTRO CABINA FD RANGER MZ BT50 2015 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-17140. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-17140",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-17140",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA FD RANGER MZ BT50 2015 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-17140.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-17140 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-18120",
    "sku": "080AC-18120",
    "slug": "advance-advance-filtro-cabina-ch-luv-dmax-3-0-1-080ac-18120",
    "name": "ADVANCE FILTRO CABINA CH LUV DMAX 3.0 /14 X-TRAIL CLASSIC L200 ASX OUTLANDER ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-18120. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-18120",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-18120",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH LUV DMAX 3.0 /14 X-TRAIL CLASSIC L200 ASX OUTLANDER ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-18120.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-18120 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-22010",
    "sku": "080AC-22010",
    "slug": "advance-advance-filtro-cabina-ch-dmax-diesel-2-5-080ac-22010",
    "name": "ADVANCE FILTRO CABINA CH DMAX DIESEL 2.5-3.0 /05 VERSA /17-18 - AC22010 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-22010. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-22010",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-22010",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH DMAX DIESEL 2.5-3.0 /05 VERSA /17-18 - AC22010 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-22010.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-22010 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-25091",
    "sku": "080AC-25091",
    "slug": "advance-advance-filtro-cabina-ns-frontier-np300-080ac-25091",
    "name": "ADVANCE FILTRO CABINA NS FRONTIER NP300 2,5 2019, DONGFENG RICH 6 - AC-25091 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-25091. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-25091",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-25091",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA NS FRONTIER NP300 2,5 2019, DONGFENG RICH 6 - AC-25091 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-25091.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-25091 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-2807",
    "sku": "080AC-2807",
    "slug": "advance-advance-filtro-cabina-hy-tucson-ix-2-0-080ac-2807",
    "name": "ADVANCE FILTRO CABINA HY TUCSON IX 2.0/ KIA CERATO 1.6/16- SPORTAGE ACTIVE /12- CERATO 97133-2E200 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-2807. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-2807",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-2807",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA HY TUCSON IX 2.0/ KIA CERATO 1.6/16- SPORTAGE ACTIVE /12- CERATO 97133-2E200 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-2807.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "SPORTAGE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-2807 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-2808",
    "sku": "080AC-2808",
    "slug": "advance-advance-filtro-cabina-hy-i10-grand-i10-k-080ac-2808",
    "name": "ADVANCE FILTRO CABINA HY I10 GRAND I10 KIA PICANTO CH SPARK ADVANCE (MC-94242)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-2808. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-2808",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-2808",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA HY I10 GRAND I10 KIA PICANTO CH SPARK ADVANCE (MC-94242) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-2808.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-2808 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-28151",
    "sku": "080AC-28151",
    "slug": "advance-advance-filtro-cabina-hy-santa-fe-2-7-20-080ac-28151",
    "name": "ADVANCE FILTRO CABINA HY SANTA FE 2.7 2006-2001, 2.4 09-12 - AC-28110 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-28151. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-28151",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-28151",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA HY SANTA FE 2.7 2006-2001, 2.4 09-12 - AC-28110 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-28151.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "SANTA FE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-28151 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-28160",
    "sku": "080AC-28160",
    "slug": "advance-advance-filtro-cabina-hy-accent-iii-1-4-080ac-28160",
    "name": "ADVANCE FILTRO CABINA HY ACCENT III 1.4, 1.6 2005-2010 - AC-28160 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-28160. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-28160",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-28160",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA HY ACCENT III 1.4, 1.6 2005-2010 - AC-28160 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-28160.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "ACCENT",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-28160 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-28261",
    "sku": "080AC-28261",
    "slug": "advance-advance-filtro-cabina-kia-rio-x-line-gt-080ac-28261",
    "name": "ADVANCE FILTRO CABINA KIA RIO X LINE, GT , SELTOS 2020 - CRETA 2022 AC-28261 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-28261. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-28261",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-28261",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA KIA RIO X LINE, GT , SELTOS 2020 - CRETA 2022 AC-28261 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-28261.png",
    "compatibleVehicles": [
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-28261 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-4403-2",
    "sku": "080AC-4403-2",
    "slug": "advance-advance-filtro-cabina-great-wall-wingle-080ac-4403-2",
    "name": "ADVANCE FILTRO CABINA GREAT WALL WINGLE 7/20- ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-4403-2. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-4403-2",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-4403-2",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA GREAT WALL WINGLE 7/20- ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-4403-2.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-4403-2 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-4408",
    "sku": "080AC-4408",
    "slug": "advance-advance-filtro-cabina-jetour-x70-1-5t-x-080ac-4408",
    "name": "ADVANCE FILTRO CABINA JETOUR X70 1.5T, X70 COUPE 1.6T - AC-4408 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-4408. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-4408",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-4408",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA JETOUR X70 1.5T, X70 COUPE 1.6T - AC-4408 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-4408.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-4408 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-4412",
    "sku": "080AC-4412",
    "slug": "advance-advance-filtro-cabina-great-wall-poer-2-080ac-4412",
    "name": "ADVANCE FILTRO CABINA GREAT WALL POER 2.0 GASOLINA DIESEL - AC- 4412 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-4412. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-4412",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-4412",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA GREAT WALL POER 2.0 GASOLINA DIESEL - AC- 4412 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-4412.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-4412 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-4426",
    "sku": "080AC-4426",
    "slug": "advance-advance-filtro-advance-cabina-ac-18120-080ac-4426",
    "name": "ADVANCE FILTRO ADVANCE CABINA (AC-18120) MG 5 1.5, CHEVROLET LUV D-MAX 3.0 2014, X-TRAIL CLASSIC, L200, ASX,",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-4426. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-4426",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-4426",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE CABINA (AC-18120) MG 5 1.5, CHEVROLET LUV D-MAX 3.0 2014, X-TRAIL CLASSIC, L200, ASX, con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-4426.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-4426 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-49030",
    "sku": "080AC-49030",
    "slug": "advance-advance-filtro-cabina-great-wall-wingle-080ac-49030",
    "name": "ADVANCE FILTRO CABINA GREAT WALL WINGLE 2.2 2.4 2.8 10- ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-49030. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-49030",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-49030",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA GREAT WALL WINGLE 2.2 2.4 2.8 10- ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-49030.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-49030 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-65210",
    "sku": "080AC-65210",
    "slug": "advance-advance-filtro-cabina-ch-orlando-cruze-s-080ac-65210",
    "name": "ADVANCE FILTRO CABINA CH ORLANDO CRUZE SPARK GT TRACKER CAVALIER - AC-65210 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-65210. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-65210",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-65210",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH ORLANDO CRUZE SPARK GT TRACKER CAVALIER - AC-65210 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-65210.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-65210 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-65220",
    "sku": "080AC-65220",
    "slug": "advance-advance-filtro-cabina-ch-spark-gt-2017-b-080ac-65220",
    "name": "ADVANCE FILTRO CABINA CH SPARK GT 2017 BEAT ACTIVE 2019 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-65220. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-65220",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-65220",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH SPARK GT 2017 BEAT ACTIVE 2019 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-65220.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-65220 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-65340",
    "sku": "080AC-65340",
    "slug": "advance-advance-filtro-cabina-ch-trail-blazer-2-080ac-65340",
    "name": "ADVANCE FILTRO CABINA CH TRAIL BLAZER 2.8 LTZ 17- COLORADO - AC-65340 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-65340. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-65340",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-65340",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH TRAIL BLAZER 2.8 LTZ 17- COLORADO - AC-65340 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-65340.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-65340 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AC-9858",
    "sku": "080AC-9858",
    "slug": "advance-advance-filtro-cabina-ch-sail-advance-080ac-9858",
    "name": "ADVANCE FILTRO CABINA CH SAIL ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AC-9858. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AC-9858",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AC-9858",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO CABINA CH SAIL ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AC-9858.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AC-9858 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AFP-012",
    "sku": "078AFP-012",
    "slug": "advance-advance-filtro-combustible-universal-adv-078afp-012",
    "name": "ADVANCE FILTRO COMBUSTIBLE UNIVERSAL ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AFP-012. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AFP-012",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AFP-012",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE UNIVERSAL ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AFP-012.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AFP-012 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AFP-079",
    "sku": "078AFP-079",
    "slug": "advance-advance-filtro-combustible-vw-golf-jett-078afp-079",
    "name": "ADVANCE FILTRO COMBUSTIBLE VW GOLF, JETTA, SK OCTAVIA - CHERY TIGGO 2, FULLWIN 2012, ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AFP-079. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AFP-079",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AFP-079",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE VW GOLF, JETTA, SK OCTAVIA - CHERY TIGGO 2, FULLWIN 2012, ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AFP-079.png",
    "compatibleVehicles": [
      {
        "make": "Volkswagen",
        "model": "JETTA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Volkswagen",
        "model": "GOL",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chery",
        "model": "TIGGO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AFP-079 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AFP-179",
    "sku": "078AFP-179",
    "slug": "advance-advance-filtro-combustible-great-wall-ha-078afp-179",
    "name": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL HAVAL H5/WINGLE 2.0/HY TUCSON DIESEL/JINBEI/MAHINDRA/ZX AUTO G ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AFP-179. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AFP-179",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AFP-179",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL HAVAL H5/WINGLE 2.0/HY TUCSON DIESEL/JINBEI/MAHINDRA/ZX AUTO G ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AFP-179.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "TUCSON",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "HAVAL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AFP-179 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-078AFP-5138",
    "sku": "078AFP-5138",
    "slug": "advance-advance-filtro-combustible-ch-nhr-npr-078afp-5138",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH NHR, NPR, D-MAX2.5-3.0, GREAT WALL WINGLE DIESEL 2.0,2.8/ HINO GD GH ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AFP-5138. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AFP-5138",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AFP-5138",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH NHR, NPR, D-MAX2.5-3.0, GREAT WALL WINGLE DIESEL 2.0,2.8/ HINO GD GH ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AFP-5138.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NHR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AFP-5138 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-078AFP-523",
    "sku": "078AFP-523",
    "slug": "advance-advance-filtro-combustible-ch-gran-vitar-078afp-523",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH GRAN VITARA 3-5 PTAS MZ 323 (MF-5982 PREM FLP368 RED 15410-65D00 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 078AFP-523. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "078AFP-523",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "078AFP-523",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH GRAN VITARA 3-5 PTAS MZ 323 (MF-5982 PREM FLP368 RED 15410-65D00 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/078AFP-523.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "GRAN VITARA",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 078AFP-523 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-079AFE-1509",
    "sku": "079AFE-1509",
    "slug": "advance-advance-filtro-combustible-ch-nmr-ftr-fv-079afe-1509",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH NMR-FTR-FVR-NQR-NPR(2014) (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 079AFE-1509. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "079AFE-1509",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "079AFE-1509",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH NMR-FTR-FVR-NQR-NPR(2014) (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/079AFE-1509.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "FTR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 079AFE-1509 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-079AFE-268",
    "sku": "079AFE-268",
    "slug": "advance-advance-filtro-combustible-ty-hilux-2-7-079afe-268",
    "name": "ADVANCE FILTRO COMBUSTIBLE TY HILUX 2.7 DIESEL HIACE 3.0 (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 079AFE-268. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "079AFE-268",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "079AFE-268",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE TY HILUX 2.7 DIESEL HIACE 3.0 (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/079AFE-268.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 079AFE-268 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-079AFP-1511",
    "sku": "079AFP-1511",
    "slug": "advance-advance-filtro-combustible-ch-dmax-3-0-d-079afp-1511",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH DMAX 3.0 DIESEL /-13 TRAMPA DE AGUA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 079AFP-1511. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "079AFP-1511",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "079AFP-1511",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH DMAX 3.0 DIESEL /-13 TRAMPA DE AGUA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/079AFP-1511.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 079AFP-1511 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFE-15130",
    "sku": "080AFE-15130",
    "slug": "advance-advance-filtro-combustible-isuzu-frr-fsr-080afe-15130",
    "name": "ADVANCE FILTRO COMBUSTIBLE ISUZU FRR FSR FTR FVR - SERIES FORWARD 11- 19 MT134S 17-18 SEC. (ELEM) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFE-15130. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFE-15130",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFE-15130",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE ISUZU FRR FSR FTR FVR - SERIES FORWARD 11- 19 MT134S 17-18 SEC. (ELEM) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFE-15130.png",
    "compatibleVehicles": [
      {
        "make": "Isuzu",
        "model": "ISUZU",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "FTR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFE-15130 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFE-295-1",
    "sku": "080AFE-295-1",
    "slug": "advance-advance-filtro-combustible-great-wall-po-080afe-295-1",
    "name": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL POER 2.0 DIESEL 4D20M (ELEMENTO) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFE-295-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFE-295-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFE-295-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL POER 2.0 DIESEL 4D20M (ELEMENTO) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFE-295-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFE-295-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFE-296-1",
    "sku": "080AFE-296-1",
    "slug": "advance-advance-filtro-combustible-great-wall-po-080afe-296-1",
    "name": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL POER 2.0 DIESEL 4D20M 2DA GENERACION LONG LIFE FILTER ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFE-296-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFE-296-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFE-296-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL POER 2.0 DIESEL 4D20M 2DA GENERACION LONG LIFE FILTER ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFE-296-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFE-296-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFE-297",
    "sku": "080AFE-297",
    "slug": "advance-advance-filtro-advance-combustible-chevr-080afe-297",
    "name": "ADVANCE FILTRO ADVANCE COMBUSTIBLE CHEVROLET D-MAX 2.0T DIESEL 2025 CJ X 20 - AFE- 297",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFE-297. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFE-297",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFE-297",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE COMBUSTIBLE CHEVROLET D-MAX 2.0T DIESEL 2025 CJ X 20 - AFE- 297 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFE-297.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFE-297 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFE-385",
    "sku": "080AFE-385",
    "slug": "advance-advance-filtro-combustible-fd-ranger-3-2-080afe-385",
    "name": "ADVANCE FILTRO COMBUSTIBLE FD RANGER 3.2 TDCI, RANGER COURIER XL 2.2L, NEW BT-50 II 3.2 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFE-385. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFE-385",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFE-385",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE FD RANGER 3.2 TDCI, RANGER COURIER XL 2.2L, NEW BT-50 II 3.2 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFE-385.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT-50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFE-385 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFI-9303",
    "sku": "080AFI-9303",
    "slug": "advance-advance-filtro-combustible-sumergible-hy-080afi-9303",
    "name": "ADVANCE FILTRO COMBUSTIBLE SUMERGIBLE HY GETZ, MATRIX, SANTA FE 2002 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFI-9303. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFI-9303",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFI-9303",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE SUMERGIBLE HY GETZ, MATRIX, SANTA FE 2002 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFI-9303.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "GETZ",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Hyundai",
        "model": "SANTA FE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFI-9303 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFI-9307",
    "sku": "080AFI-9307",
    "slug": "advance-advance-filtro-combustible-sumergible-ki-080afi-9307",
    "name": "ADVANCE FILTRO COMBUSTIBLE SUMERGIBLE KIA RIO XCITE, NEW ACCENT (MF-48737) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFI-9307. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFI-9307",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFI-9307",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE SUMERGIBLE KIA RIO XCITE, NEW ACCENT (MF-48737) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFI-9307.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "ACCENT",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "RIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFI-9307 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-023",
    "sku": "080AFP-023",
    "slug": "advance-advance-filtro-combustible-mt-l200-sport-080afp-023",
    "name": "ADVANCE FILTRO COMBUSTIBLE MT L200 SPORTERO DIESEL LUKAS CAV926 NUEVA FOTON CS Y CS2 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-023. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-023",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-023",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE MT L200 SPORTERO DIESEL LUKAS CAV926 NUEVA FOTON CS Y CS2 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-023.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-023 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-046",
    "sku": "080AFP-046",
    "slug": "advance-advance-filtro-combustible-kia-pregio-b-080afp-046",
    "name": "ADVANCE FILTRO COMBUSTIBLE KIA PREGIO, BESTA, CARENS, H100 TERRACAN DIESEL CH NLR ADVANCE (MF-4886)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-046. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-046",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-046",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE KIA PREGIO, BESTA, CARENS, H100 TERRACAN DIESEL CH NLR ADVANCE (MF-4886) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-046.png",
    "compatibleVehicles": [
      {
        "make": "Hyundai",
        "model": "H100",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Kia",
        "model": "PREGIO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-046 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-072",
    "sku": "080AFP-072",
    "slug": "advance-advance-filtro-combustible-rn-clio-twing-080afp-072",
    "name": "ADVANCE FILTRO COMBUSTIBLE RN CLIO TWINGO MEGANE SCENIC PEUGEOT 206 BERLINGO ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-072. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-072",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-072",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE RN CLIO TWINGO MEGANE SCENIC PEUGEOT 206 BERLINGO ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-072.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-072 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-083",
    "sku": "080AFP-083",
    "slug": "advance-advance-filtro-combustible-mz-bt50-crdi-080afp-083",
    "name": "ADVANCE FILTRO COMBUSTIBLE MZ BT50 CRDI, BT-50 TDI / MT MONTERO SPORT / NS FRONTIER T ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-083. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-083",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-083",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE MZ BT50 CRDI, BT-50 TDI / MT MONTERO SPORT / NS FRONTIER T ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-083.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT-50",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-083 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-1020",
    "sku": "080AFP-1020",
    "slug": "advance-advance-filtro-combustible-mt-canter-3-5-080afp-1020",
    "name": "ADVANCE FILTRO COMBUSTIBLE MT CANTER 3.5- INTERCOOOLER HD HY HD72 (SAM SFC352 PREM FLP3 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-1020. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-1020",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-1020",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE MT CANTER 3.5- INTERCOOOLER HD HY HD72 (SAM SFC352 PREM FLP3 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-1020.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-1020 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-140",
    "sku": "080AFP-140",
    "slug": "advance-advance-filtro-combustible-great-wall-wi-080afp-140",
    "name": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL WINGLE 2.0-2.8 JAC T6 2.8 FOTON IVECO MAHINDRA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-140. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-140",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-140",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE GREAT WALL WINGLE 2.0-2.8 JAC T6 2.8 FOTON IVECO MAHINDRA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-140.png",
    "compatibleVehicles": [
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-140 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-202",
    "sku": "080AFP-202",
    "slug": "advance-advance-filtro-combustible-ns-2400-4x4-s-080afp-202",
    "name": "ADVANCE FILTRO COMBUSTIBLE NS 2400 4X4 SENTRA INY CURVO (10Y00) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-202. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-202",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-202",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE NS 2400 4X4 SENTRA INY CURVO (10Y00) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-202.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-202 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-203",
    "sku": "080AFP-203",
    "slug": "advance-advance-filtro-combustible-ch-vitara-afp-080afp-203",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH VITARA AFP-203 ADVANCE (MF-94925)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-203. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-203",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-203",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH VITARA AFP-203 ADVANCE (MF-94925) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-203.png",
    "compatibleVehicles": [
      {
        "make": "Suzuki",
        "model": "VITARA",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-203 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-31120",
    "sku": "080AFP-31120",
    "slug": "advance-advance-filtro-combustible-ty-hilux-2-7-080afp-31120",
    "name": "ADVANCE FILTRO COMBUSTIBLE TY HILUX 2.7 GAS (PUNTA A PUNTA SIN BASE) ADVANCE (MF-64951) (MF-41570)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-31120. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-31120",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-31120",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE TY HILUX 2.7 GAS (PUNTA A PUNTA SIN BASE) ADVANCE (MF-64951) (MF-41570) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-31120.png",
    "compatibleVehicles": [
      {
        "make": "Toyota",
        "model": "HILUX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-31120 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-3627",
    "sku": "080AFP-3627",
    "slug": "advance-advance-filtro-combustible-ch-nhr-npr-d-080afp-3627",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH NHR NPR D-MAX DIES DAIHATSU DELTA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-3627. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-3627",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-3627",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH NHR NPR D-MAX DIES DAIHATSU DELTA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-3627.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "D-MAX",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NHR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-3627 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-4102",
    "sku": "080AFP-4102",
    "slug": "advance-advance-filtro-combustible-foton-aumark-080afp-4102",
    "name": "ADVANCE FILTRO COMBUSTIBLE FOTON AUMARK DONGFENG FC5704 FC5504 FP586F FF42000 FF5018 ADVANCE (MF-4102)",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-4102. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-4102",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-4102",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE FOTON AUMARK DONGFENG FC5704 FC5504 FP586F FF42000 FF5018 ADVANCE (MF-4102) con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-4102.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-4102 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-4183",
    "sku": "080AFP-4183",
    "slug": "advance-advance-filtro-combustible-jac-t6-diesel-080afp-4183",
    "name": "ADVANCE FILTRO COMBUSTIBLE JAC T6 DIESEL, VLV,MAN,CASE, ROVER,/NEW HOLLAND,LINDNER,FIAT ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-4183. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-4183",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-4183",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE JAC T6 DIESEL, VLV,MAN,CASE, ROVER,/NEW HOLLAND,LINDNER,FIAT ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-4183.png",
    "compatibleVehicles": [
      {
        "make": "JAC",
        "model": "T6",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-4183 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-555",
    "sku": "080AFP-555",
    "slug": "advance-advance-filtro-combustible-ch-corsa-1-4-080afp-555",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH CORSA 1.4-1.6-1.8/DMAX 2.4-3.5/ZAFIRA/M4/GREAT WALL C30 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-555. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-555",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-555",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH CORSA 1.4-1.6-1.8/DMAX 2.4-3.5/ZAFIRA/M4/GREAT WALL C30 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-555.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "DMAX",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-555 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-5612",
    "sku": "080AFP-5612",
    "slug": "advance-advance-filtro-advance-combustible-filte-080afp-5612",
    "name": "ADVANCE FILTRO ADVANCE COMBUSTIBLE FILTER DAF, FOTON, JAC (FC-5725, SFF2241, PSC75, LFF5485) - AFP-5612",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-5612. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-5612",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-5612",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO ADVANCE COMBUSTIBLE FILTER DAF, FOTON, JAC (FC-5725, SFF2241, PSC75, LFF5485) - AFP-5612 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-5612.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-5612 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-573",
    "sku": "080AFP-573",
    "slug": "advance-advance-filtro-combustible-ch-chevytaxi-080afp-573",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH CHEVYTAXI LANOS SPARK MATIZ AVEO OPTRA ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-573. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-573",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-573",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH CHEVYTAXI LANOS SPARK MATIZ AVEO OPTRA ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-573.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SPARK",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet",
        "model": "AVEO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-573 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-704",
    "sku": "080AFP-704",
    "slug": "advance-advance-filtro-combustible-mz-bt50-gasol-080afp-704",
    "name": "ADVANCE FILTRO COMBUSTIBLE MZ BT50 GASOLINA, 2200 INY FD RANGER 2.2, 2.6 2008 (RED JE45-20-490A ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-704. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-704",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-704",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE MZ BT50 GASOLINA, 2200 INY FD RANGER 2.2, 2.6 2008 (RED JE45-20-490A ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-704.png",
    "compatibleVehicles": [
      {
        "make": "Mazda",
        "model": "BT50",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-704 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-874",
    "sku": "080AFP-874",
    "slug": "advance-advance-filtro-combustible-ch-trail-blaz-080afp-874",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH TRAIL BLAZER 5.3L ANTIGUA GASOLINA (MF-6397) - AFP-874 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-874. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-874",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-874",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH TRAIL BLAZER 5.3L ANTIGUA GASOLINA (MF-6397) - AFP-874 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-874.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-874 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-876",
    "sku": "080AFP-876",
    "slug": "advance-advance-filtro-combustible-ch-sail-1-4l-080afp-876",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH SAIL 1.4L 12-18 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-876. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-876",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-876",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH SAIL 1.4L 12-18 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-876.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-876 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-877",
    "sku": "080AFP-877",
    "slug": "advance-advance-filtro-combustible-ch-sail-1-5-2-080afp-877",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH SAIL 1.5 2018, CAVALIER 2019 (MF-72809 PREM FLP482 RED 90872178 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-877. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-877",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-877",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH SAIL 1.5 2018, CAVALIER 2019 (MF-72809 PREM FLP482 RED 90872178 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-877.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "SAIL",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-877 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFP-974",
    "sku": "080AFP-974",
    "slug": "advance-advance-filtro-combustible-ch-luv-troop-080afp-974",
    "name": "ADVANCE FILTRO COMBUSTIBLE CH LUV, TROOPER, RODEO, PEUGEOT 306, WINGLE 2.4 2.2L FI N200 ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "camionetas",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFP-974. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFP-974",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFP-974",
      "Fabricante": "ADVANCE",
      "Aplicación": "Camionetas",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CH LUV, TROOPER, RODEO, PEUGEOT 306, WINGLE 2.4 2.2L FI N200 ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFP-974.png",
    "compatibleVehicles": [
      {
        "make": "Chevrolet",
        "model": "LUV",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Great Wall",
        "model": "WINGLE",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFP-974 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-1212",
    "sku": "080AFS-1212",
    "slug": "advance-advance-filtro-combustible-camc-h08-440-080afs-1212",
    "name": "ADVANCE FILTRO COMBUSTIBLE CAMC H08 440, 380, CABEZAL 300, 14M3 MOTOR CUMMINS ISM380, FOTON AUMARK ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "motos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-1212. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-1212",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-1212",
      "Fabricante": "ADVANCE",
      "Aplicación": "Motos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE CAMC H08 440, 380, CABEZAL 300, 14M3 MOTOR CUMMINS ISM380, FOTON AUMARK ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-1212.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-1212 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-127-1",
    "sku": "080AFS-127-1",
    "slug": "advance-advance-filtro-combustible-vw-17210-mb-080afs-127-1",
    "name": "ADVANCE FILTRO COMBUSTIBLE VW 17210, MB 1721, HINO GD, GH, FC CON VALVULA (SEPARADOR) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-127-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-127-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-127-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE VW 17210, MB 1721, HINO GD, GH, FC CON VALVULA (SEPARADOR) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-127-1.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-127-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-1306",
    "sku": "080AFS-1306",
    "slug": "advance-advance-filtro-combustible-hino-gd-fuel-080afs-1306",
    "name": "ADVANCE FILTRO COMBUSTIBLE HINO GD FUEL/ R60T ( SEPARADOR) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-1306. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-1306",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-1306",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE HINO GD FUEL/ R60T ( SEPARADOR) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-1306.png",
    "compatibleVehicles": [
      {
        "make": "Hino",
        "model": "HINO",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-1306 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-193",
    "sku": "080AFS-193",
    "slug": "advance-advance-filtro-combustible-dongfeng-capt-080afs-193",
    "name": "ADVANCE FILTRO COMBUSTIBLE DONGFENG CAPTAIN E-513, E-613 (FSP0120) (SEPARADOR) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-193. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-193",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-193",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE DONGFENG CAPTAIN E-513, E-613 (FSP0120) (SEPARADOR) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-193.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-193 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-194-1",
    "sku": "080AFS-194-1",
    "slug": "advance-advance-filtro-combustible-rich-6-2-5cc-080afs-194-1",
    "name": "ADVANCE FILTRO COMBUSTIBLE RICH 6 2.5CC DIESEL 20 - (SEPARADOR) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "autos",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-194-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-194-1",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-194-1",
      "Fabricante": "ADVANCE",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE RICH 6 2.5CC DIESEL 20 - (SEPARADOR) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-194-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-194-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-080AFS-7912",
    "sku": "080AFS-7912",
    "slug": "advance-advance-filtro-combustible-isuzu-nkr-nmr-080afs-7912",
    "name": "ADVANCE FILTRO COMBUSTIBLE ISUZU NKR NMR NPR NQR MERCEDEZ SERIES REWARD /11 (SEPARADOR) ADVANCE",
    "brand": "ADVANCE",
    "category": "filtros",
    "applicationType": "pesado",
    "volume": null,
    "shortSpec": "Producto original ADVANCE. Código OEM / Referencia: 080AFS-7912. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "080AFS-7912",
      "Marca": "ADVANCE",
      "Tipo": "Filtro Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "080AFS-7912",
      "Fabricante": "ADVANCE",
      "Aplicación": "Pesado",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "ADVANCE FILTRO COMBUSTIBLE ISUZU NKR NMR NPR NQR MERCEDEZ SERIES REWARD /11 (SEPARADOR) ADVANCE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/080AFS-7912.png",
    "compatibleVehicles": [
      {
        "make": "Isuzu",
        "model": "ISUZU",
        "yearRange": "Línea Compatible"
      },
      {
        "make": "Chevrolet Isuzu",
        "model": "NPR",
        "yearRange": "Línea Compatible"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ADVANCE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 080AFS-7912 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN4011-1",
    "sku": "012MN4011-1",
    "slug": "mannol-mannol-refrigerante-azul-vida-util-3-a-os-012mn4011-1",
    "name": "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS",
    "brand": "MANNOL",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 3 presentaciones (1 Litro, Bidón (5 Litros), Caneca (20 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros), Caneca (20 Litros)",
      "Stock Total": "22 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros), Caneca (20 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros), Caneca (20 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "22 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN4011-1.png",
    "variants": [
      {
        "sku": "012MN4011-1",
        "name": "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS AG 11 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 18,
        "imageUrl": "/images/products/012MN4011-1.png",
        "barcode": "4036021157689"
      },
      {
        "sku": "012MN4011-5",
        "name": "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS AG 11 4/5LT",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 3,
        "imageUrl": "/images/products/012MN4011-5.png",
        "barcode": "4036021157740"
      },
      {
        "sku": "012MN4011-20",
        "name": "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS AG 11 CAN 20/1 LT",
        "presentation": "Caneca (20 Litros)",
        "volume": "20.0L",
        "stock": 1,
        "imageUrl": "/images/products/012MN4011-20.png",
        "barcode": "4036021163840"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, Bidón (5 Litros), Caneca (20 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN4012-1",
    "sku": "012MN4012-1",
    "slug": "mannol-mannol-refrigerante-rojo-vida-util-5-a-os-012mn4012-1",
    "name": "MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS",
    "brand": "MANNOL",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 3 presentaciones (1 Litro, Bidón (5 Litros), Caneca (20 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros), Caneca (20 Litros)",
      "Stock Total": "23 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros), Caneca (20 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros), Caneca (20 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "23 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN4012-1.png",
    "variants": [
      {
        "sku": "012MN4012-1",
        "name": "MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS AF12+ 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 17,
        "imageUrl": "/images/products/012MN4012-1.png",
        "barcode": "4036021157696"
      },
      {
        "sku": "012MN4012-5",
        "name": "MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS AF12+ 4/5LT",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 5,
        "imageUrl": "/images/products/012MN4012-5.png",
        "barcode": "4036021157757"
      },
      {
        "sku": "012MN4012-20",
        "name": "MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS AF12+ CAN 20/1 LT",
        "presentation": "Caneca (20 Litros)",
        "volume": "20.0L",
        "stock": 1,
        "imageUrl": "/images/products/012MN4012-20.png",
        "barcode": "4036021163949"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL REFRIGERANTE ROJO VIDA UTIL 5 AÑOS tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, Bidón (5 Litros), Caneca (20 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN4013-1",
    "sku": "012MN4013-1",
    "slug": "mannol-mannol-refrigerante-verde-vida-util-3-a-os-012mn4013-1",
    "name": "MANNOL REFRIGERANTE VERDE VIDA UTIL 3 AÑOS",
    "brand": "MANNOL",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, Bidón (5 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros)",
      "Stock Total": "24 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL REFRIGERANTE VERDE VIDA UTIL 3 AÑOS distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN4013-1.png",
    "variants": [
      {
        "sku": "012MN4013-1",
        "name": "MANNOL REFRIGERANTE VERDE VIDA UTIL 3 AÑOS AG 13 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN4013-1.png",
        "barcode": "4036021157702"
      },
      {
        "sku": "012MN4013-5",
        "name": "MANNOL REFRIGERANTE VERDE VIDA UTIL 3 AÑOS AG 13 4/5LT",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 4,
        "imageUrl": "/images/products/012MN4013-5.png",
        "barcode": "4036021157764"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL REFRIGERANTE VERDE VIDA UTIL 3 AÑOS tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, Bidón (5 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN4016-1",
    "sku": "012MN4016-1",
    "slug": "mannol-mannol-refrigerante-naranja-vida-util-5-a-os-012mn4016-1",
    "name": "MANNOL REFRIGERANTE NARANJA VIDA UTIL 5 AÑOS",
    "brand": "MANNOL",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, Bidón (5 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros)",
      "Stock Total": "22 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL REFRIGERANTE NARANJA VIDA UTIL 5 AÑOS distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "22 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN4016-1.png",
    "variants": [
      {
        "sku": "012MN4016-1",
        "name": "MANNOL CJ X 20 LT REFRIGERANTE NARANJA DEXCOOLANT 50/50 VIDA UTIL 5 AÑOS 20/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 17,
        "imageUrl": "/images/products/012MN4016-1.png",
        "barcode": "4036021141169"
      },
      {
        "sku": "012MN4016-5",
        "name": "MANNOL REFRIGERANTE NARANJA DEXCOOLANT 50/50 VIDA UTIL 5 AÑOS 4/5LT",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 5,
        "imageUrl": "/images/products/012MN4016-5.png",
        "barcode": "4036021541167"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL REFRIGERANTE NARANJA VIDA UTIL 5 AÑOS tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, Bidón (5 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7104-1",
    "sku": "012MN7104-1",
    "slug": "mannol-mannol-ts-4-shpd-15w40-extra-012mn7104-1",
    "name": "MANNOL TS-4 SHPD 15W40 EXTRA",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 4 presentaciones (1 Litro, Bidón (5 Litros), Caneca (10 Litros), Caneca (20 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros), Caneca (10 Litros), Caneca (20 Litros)",
      "Stock Total": "34 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros), Caneca (10 Litros), Caneca (20 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL TS-4 SHPD 15W40 EXTRA distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros), Caneca (10 Litros), Caneca (20 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "34 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7104-1.png",
    "variants": [
      {
        "sku": "012MN7104-1",
        "name": "MANNOL TS-4 SHPD 15W40 EXTRA 20/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 16,
        "imageUrl": "/images/products/012MN7104-1.png",
        "barcode": "4036021106755"
      },
      {
        "sku": "012MN7104-5A",
        "name": "MANNOL TS-4 SHPD 15W40 EXTRA 4/5LT GL.",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 8,
        "imageUrl": "/images/products/012MN7104-5A.png",
        "barcode": "4036021256757"
      },
      {
        "sku": "012MN7104-10A",
        "name": "MANNOL TS-4 SHPD 15W40 EXTRA CAN 10 LT",
        "presentation": "Caneca (10 Litros)",
        "volume": "10.0L",
        "stock": 2,
        "imageUrl": "/images/products/012MN7104-10A.png",
        "barcode": "4036021146713"
      },
      {
        "sku": "012MN7104-20A",
        "name": "MANNOL TS-4 SHPD 15W40 EXTRA 20/1 CAN",
        "presentation": "Caneca (20 Litros)",
        "volume": "20.0L",
        "stock": 8,
        "imageUrl": "/images/products/012MN7104-20A.png",
        "barcode": "4036021166445"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 4 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL TS-4 SHPD 15W40 EXTRA tienen en stock?",
        "answer": "Disponemos de 4 presentaciones oficiales: 1 Litro, Bidón (5 Litros), Caneca (10 Litros), Caneca (20 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7404-1A",
    "sku": "012MN7404-1A",
    "slug": "mannol-mannol-safari-20w50-012mn7404-1a",
    "name": "MANNOL SAFARI 20W50",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "20 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL SAFARI 20W50 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7404-1A.png",
    "variants": [
      {
        "sku": "012MN7404-1A",
        "name": "MANNOL SAFARI 20W50 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 14,
        "imageUrl": "/images/products/012MN7404-1A.png",
        "barcode": "4036021106151"
      },
      {
        "sku": "012MN7404-4A",
        "name": "MANNOL SAFARI 20W50 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 6,
        "imageUrl": "/images/products/012MN7404-4A.png",
        "barcode": "4036021406152"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL SAFARI 20W50 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7501-1",
    "sku": "012MN7501-1",
    "slug": "mannol-mannol-classic-10w40-012mn7501-1",
    "name": "MANNOL CLASSIC 10W40",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "25 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL CLASSIC 10W40 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "25 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7501-1.png",
    "variants": [
      {
        "sku": "012MN7501-1",
        "name": "MANNOL CLASSIC 10W40 12/1 LT METÁLICO",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 19,
        "imageUrl": "/images/products/012MN7501-1.png",
        "barcode": "4036021101200"
      },
      {
        "sku": "012MN7501-4",
        "name": "MANNOL CLASSIC 10W40 4/1 GL METÁLICO",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 6,
        "imageUrl": "/images/products/012MN7501-4.png",
        "barcode": "4036021404202"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL CLASSIC 10W40 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7512-1A",
    "sku": "012MN7512-1A",
    "slug": "mannol-mannol-special-plus-10w30-012mn7512-1a",
    "name": "MANNOL SPECIAL PLUS 10W30",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "18 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL SPECIAL PLUS 10W30 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7512-1A.png",
    "variants": [
      {
        "sku": "012MN7512-1A",
        "name": "MANNOL CJ X 20 LT SPECIAL PLUS 10W30 20/1  LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 8,
        "imageUrl": "/images/products/012MN7512-1A.png",
        "barcode": "4036021102108"
      },
      {
        "sku": "012MN7512-4A",
        "name": "MANNOL SPECIAL PLUS 10W30 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 10,
        "imageUrl": "/images/products/012MN7512-4A.png",
        "barcode": "4036021402109"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL SPECIAL PLUS 10W30 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7709-1",
    "sku": "012MN7709-1",
    "slug": "mannol-mannol-toyota-lexus-o-e-m-5w30-met-lico-012mn7709-1",
    "name": "MANNOL TOYOTA LEXUS O.E.M 5W30 METÁLICO",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "24 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL TOYOTA LEXUS O.E.M 5W30 METÁLICO distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7709-1.png",
    "variants": [
      {
        "sku": "012MN7709-1",
        "name": "MANNOL TOYOTA LEXUS O.E.M 5W30 12/1 LT METÁLICO",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN7709-1.png",
        "barcode": "4036021101538"
      },
      {
        "sku": "012MN7709-4",
        "name": "MANNOL TOYOTA LEXUS O.E.M 5W30 4/1 GL METÁLICO",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7709-4.png",
        "barcode": "4036021401539"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL TOYOTA LEXUS O.E.M 5W30 METÁLICO tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7713-1",
    "sku": "012MN7713-1",
    "slug": "mannol-mannol-hyundai-kia-o-e-m-5w30-met-lico-012mn7713-1",
    "name": "MANNOL HYUNDAI KIA O.E.M 5W30 METÁLICO",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "21 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL HYUNDAI KIA O.E.M 5W30 METÁLICO distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "21 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7713-1.png",
    "variants": [
      {
        "sku": "012MN7713-1",
        "name": "MANNOL HYUNDAI KIA O.E.M 5W30 12/1 LT. METÁLICO",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 17,
        "imageUrl": "/images/products/012MN7713-1.png",
        "barcode": "4036021101477"
      },
      {
        "sku": "012MN7713-4",
        "name": "MANNOL HYUNDAI KIA O.E.M 5W30 4/1 GL. METÁLICO",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7713-4.png",
        "barcode": "4036021401485"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL HYUNDAI KIA O.E.M 5W30 METÁLICO tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7720-1",
    "sku": "012MN7720-1",
    "slug": "mannol-mannol-ceramic-5w30-012mn7720-1",
    "name": "MANNOL CERAMIC 5W30",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "10 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL CERAMIC 5W30 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7720-1.png",
    "variants": [
      {
        "sku": "012MN7720-1",
        "name": "MANNOL CERAMIC 5W30 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 6,
        "imageUrl": "/images/products/012MN7720-1.png",
        "barcode": "4036021957623"
      },
      {
        "sku": "012MN7720-4",
        "name": "MANNOL CERAMIC 5W30 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7720-4.png",
        "barcode": "4036021757629"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL CERAMIC 5W30 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN7812-1",
    "sku": "012MN7812-1",
    "slug": "mannol-mannol-4takt-motorbike-10w40-012mn7812-1",
    "name": "MANNOL 4TAKT MOTORBIKE 10W40",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7812-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7812-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "23 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7812-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "23 unid. listas para entrega"
    },
    "description": "MANNOL 4TAKT MOTORBIKE 10W40 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "23 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7812-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7812-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 23 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7814-1",
    "sku": "012MN7814-1",
    "slug": "mannol-mannol-4takt-motorbike-10w50-012mn7814-1",
    "name": "MANNOL 4TAKT MOTORBIKE 10W50",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7814-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7814-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "19 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7814-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "19 unid. listas para entrega"
    },
    "description": "MANNOL 4TAKT MOTORBIKE 10W50 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "19 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7814-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7814-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 19 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7832",
    "sku": "012MN7832",
    "slug": "mannol-mannol-powerbike-15w50-met-lico-012mn7832",
    "name": "MANNOL POWERBIKE 15W50 METÁLICO",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7832. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7832",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "35 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7832",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "35 unid. listas para entrega"
    },
    "description": "MANNOL POWERBIKE 15W50 METÁLICO con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "35 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7832.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7832 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 35 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7904-1",
    "sku": "012MN7904-1",
    "slug": "mannol-mannol-diesel-turbo-5w40-012mn7904-1",
    "name": "MANNOL DIESEL TURBO 5W40",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, Bidón (5 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros)",
      "Stock Total": "24 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL DIESEL TURBO 5W40 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7904-1.png",
    "variants": [
      {
        "sku": "012MN7904-1",
        "name": "MANNOL DIESEL TURBO 5W40 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN7904-1.png",
        "barcode": "4036021101101"
      },
      {
        "sku": "012MN7904-5",
        "name": "MANNOL DIESEL TURBO 5W40 4/5LT",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7904-5.png",
        "barcode": "4036021505107"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL DIESEL TURBO 5W40 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, Bidón (5 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7906-1A",
    "sku": "012MN7906-1A",
    "slug": "mannol-mannol-energy-ultra-jp-5w20-012mn7906-1a",
    "name": "MANNOL ENERGY ULTRA JP 5W20",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "24 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL ENERGY ULTRA JP 5W20 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7906-1A.png",
    "variants": [
      {
        "sku": "012MN7906-1A",
        "name": "MANNOL ENERGY ULTRA JP 5W20 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN7906-1A.png",
        "barcode": "4036021101583"
      },
      {
        "sku": "012MN7906-4A",
        "name": "MANNOL ENERGY ULTRA JP 5W20 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7906-4A.png",
        "barcode": "4036021401584"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL ENERGY ULTRA JP 5W20 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7909-1",
    "sku": "012MN7909-1",
    "slug": "mannol-mannol-diesel-tdi-5w30-012mn7909-1",
    "name": "MANNOL DIESEL TDI 5W30",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, Bidón (5 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, Bidón (5 Litros)",
      "Stock Total": "10 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, Bidón (5 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL DIESEL TDI 5W30 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, Bidón (5 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7909-1.png",
    "variants": [
      {
        "sku": "012MN7909-1",
        "name": "MANNOL DIESEL TDI 5W30 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 6,
        "imageUrl": "/images/products/012MN7909-1.png",
        "barcode": "4036021101361"
      },
      {
        "sku": "012MN7909-5",
        "name": "MANNOL DIESEL TDI 5W30 4/5LT GL",
        "presentation": "Bidón (5 Litros)",
        "volume": "5.0L",
        "stock": 4,
        "imageUrl": "/images/products/012MN7909-5.png",
        "barcode": "4036021501369"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL DIESEL TDI 5W30 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, Bidón (5 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN7914-1A",
    "sku": "012MN7914-1A",
    "slug": "mannol-mannol-energy-formula-jp-5w30-met-lico-012mn7914-1a",
    "name": "MANNOL ENERGY FORMULA JP 5W30 METÁLICO",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "27 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL ENERGY FORMULA JP 5W30 METÁLICO distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "27 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7914-1A.png",
    "variants": [
      {
        "sku": "012MN7914-1A",
        "name": "MANNOL ENERGY FORMULA JP 5W30 12/1 LT METÁLICO",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN7914-1A.png",
        "barcode": "4036021101439"
      },
      {
        "sku": "012MN7914-4A",
        "name": "MANNOL ENERGY FORMULA JP 5W30 4/1 GL METÁLICO",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 7,
        "imageUrl": "/images/products/012MN7914-4A.png",
        "barcode": "4036021401430"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL ENERGY FORMULA JP 5W30 METÁLICO tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7924-1",
    "sku": "012MN7924-1",
    "slug": "mannol-mannol-for-chinese-cars-5w30-012mn7924-1",
    "name": "MANNOL FOR CHINESE CARS 5W30",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "23 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL FOR CHINESE CARS 5W30 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "23 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7924-1.png",
    "variants": [
      {
        "sku": "012MN7924-1",
        "name": "MANNOL FOR CHINESE CARS 5W30 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 20,
        "imageUrl": "/images/products/012MN7924-1.png",
        "barcode": "4036021109244"
      },
      {
        "sku": "012MN7924-4",
        "name": "MANNOL FOR CHINESE CARS 5W30 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 3,
        "imageUrl": "/images/products/012MN7924-4.png",
        "barcode": "4036021309248"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL FOR CHINESE CARS 5W30 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8101-1A",
    "sku": "012MN8101-1A",
    "slug": "mannol-mannol-fwd-75w85-gl4-012mn8101-1a",
    "name": "MANNOL FWD 75W85 GL4",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "22 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL FWD 75W85 GL4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "22 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8101-1A.png",
    "variants": [
      {
        "sku": "012MN8101-1A",
        "name": "MANNOL FWD 75W85 GL4 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 18,
        "imageUrl": "/images/products/012MN8101-1A.png",
        "barcode": "4036021104362"
      },
      {
        "sku": "012MN8101-4",
        "name": "MANNOL FWD 75W85 GL4 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN8101-4.png",
        "barcode": "4036021404363"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL FWD 75W85 GL4 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8105-4",
    "sku": "012MN8105-4",
    "slug": "mannol-mannol-hypoid-lsd-85w140-gl5-ls-deslizamiento-limitado-012mn8105-4",
    "name": "MANNOL HYPOID LSD 85W140 GL5 LS (DESLIZAMIENTO LIMITADO)",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Galón (3.78L)",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Galón (3.78L), Caneca (20 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Galón (3.78L), Caneca (20 Litros)",
      "Stock Total": "5 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Galón (3.78L), Caneca (20 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL HYPOID LSD 85W140 GL5 LS (DESLIZAMIENTO LIMITADO) distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Galón (3.78L), Caneca (20 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8105-4.png",
    "variants": [
      {
        "sku": "012MN8105-4",
        "name": "MANNOL HYPOID LSD 85W140 GL5 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN8105-4.png",
        "barcode": "4036021401010"
      },
      {
        "sku": "012MN8105-20",
        "name": "MANNOL HYPOID LSD 85W140 GL5 LS (DESLIZAMIENTO LIMITADO) CAN 20/1 LT",
        "presentation": "Caneca (20 Litros)",
        "volume": "20.0L",
        "stock": 1,
        "imageUrl": "/images/products/012MN8105-20.png",
        "barcode": "4036021162294"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL HYPOID LSD 85W140 GL5 LS (DESLIZAMIENTO LIMITADO) tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Galón (3.78L), Caneca (20 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN8106-1",
    "sku": "012MN8106-1",
    "slug": "mannol-mannol-hypoid-getriebeoel-80w90-gl4-gl5-ls-deslizamiento-limitado-012mn8106-1",
    "name": "MANNOL HYPOID GETRIEBEOEL 80W90 GL4 GL5 LS (DESLIZAMIENTO LIMITADO)",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "20 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL HYPOID GETRIEBEOEL 80W90 GL4 GL5 LS (DESLIZAMIENTO LIMITADO) distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8106-1.png",
    "variants": [
      {
        "sku": "012MN8106-1",
        "name": "MANNOL HYPOID GETRIEBEOEL 80W90 GL4 GL5 LS (DESLIZAMIENTO LIMITADO) 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 18,
        "imageUrl": "/images/products/012MN8106-1.png",
        "barcode": "4036021101064"
      },
      {
        "sku": "012MN8106-4",
        "name": "MANNOL HYPOID GETRIEBEOEL 80W90 GL4 GL5 LS (DESLIZAMIENTO LIMITADO) 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 2,
        "imageUrl": "/images/products/012MN8106-4.png",
        "barcode": "4036021401065"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL HYPOID GETRIEBEOEL 80W90 GL4 GL5 LS (DESLIZAMIENTO LIMITADO) tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8107-4",
    "sku": "012MN8107-4",
    "slug": "mannol-mannol-universal-getriebeoel-80w90-gl4-012mn8107-4",
    "name": "MANNOL UNIVERSAL GETRIEBEOEL 80W90 GL4",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Galón (3.78L)",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Galón (3.78L), Caneca (20 Litros)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Galón (3.78L), Caneca (20 Litros)",
      "Stock Total": "3 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Galón (3.78L), Caneca (20 Litros)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL UNIVERSAL GETRIEBEOEL 80W90 GL4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Galón (3.78L), Caneca (20 Litros)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8107-4.png",
    "variants": [
      {
        "sku": "012MN8107-4",
        "name": "MANNOL UNIVERSAL GETRIEBEOEL 80W90 GL4 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 2,
        "imageUrl": "/images/products/012MN8107-4.png",
        "barcode": "4036021401805"
      },
      {
        "sku": "012MN8107-20",
        "name": "MANNOL UNIVERSAL GETRIEBEOEL 80W90 GL4 CAN 20/1 LT",
        "presentation": "Caneca (20 Litros)",
        "volume": "20.0L",
        "stock": 1,
        "imageUrl": "/images/products/012MN8107-20.png",
        "barcode": "4036021161792"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL UNIVERSAL GETRIEBEOEL 80W90 GL4 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Galón (3.78L), Caneca (20 Litros). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN8108-1",
    "sku": "012MN8108-1",
    "slug": "mannol-mannol-transm-basic-plus-75w90-gl4-012mn8108-1",
    "name": "MANNOL TRANSM. BASIC PLUS 75W90 GL4",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "22 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL TRANSM. BASIC PLUS 75W90 GL4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "22 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8108-1.png",
    "variants": [
      {
        "sku": "012MN8108-1",
        "name": "MANNOL TRANSM. BASIC PLUS 75W90 GL4 + 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 18,
        "imageUrl": "/images/products/012MN8108-1.png",
        "barcode": "4036021104157"
      },
      {
        "sku": "012MN8108-4",
        "name": "MANNOL TRANSM. BASIC PLUS 75W90 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/012MN8108-4.png",
        "barcode": "4036021404653"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL TRANSM. BASIC PLUS 75W90 GL4 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8115-1",
    "sku": "012MN8115-1",
    "slug": "mannol-mannol-o-e-m-mtf-3-75w-metalico-012mn8115-1",
    "name": "MANNOL O.E.M MTF-3 75W METALICO",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8115-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8115-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "20 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8115-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "20 unid. listas para entrega"
    },
    "description": "MANNOL O.E.M MTF-3 75W METALICO con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8115-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8115-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 20 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8202-1",
    "sku": "012MN8202-1",
    "slug": "mannol-mannol-dct-fluid-cajas-doble-embrague-012mn8202-1",
    "name": "MANNOL DCT FLUID CAJAS DOBLE EMBRAGUE",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8202-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8202-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "20 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8202-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "20 unid. listas para entrega"
    },
    "description": "MANNOL DCT FLUID CAJAS DOBLE EMBRAGUE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8202-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8202-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 20 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8206-1",
    "sku": "012MN8206-1",
    "slug": "mannol-mannol-atf-dexron-iii-012mn8206-1",
    "name": "MANNOL ATF DEXRON III",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8206-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8206-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "19 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8206-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "19 unid. listas para entrega"
    },
    "description": "MANNOL ATF DEXRON III con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "19 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8206-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8206-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 19 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8207-1",
    "sku": "012MN8207-1",
    "slug": "mannol-mannol-atf-dexron-vi-012mn8207-1",
    "name": "MANNOL ATF DEXRON VI",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8207-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8207-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "20 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8207-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "20 unid. listas para entrega"
    },
    "description": "MANNOL ATF DEXRON VI con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8207-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8207-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 20 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8220-1",
    "sku": "012MN8220-1",
    "slug": "mannol-mannol-cvt-nissan-ns-3-012mn8220-1",
    "name": "MANNOL CVT NISSAN NS-3",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8220-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8220-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "20 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8220-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "20 unid. listas para entrega"
    },
    "description": "MANNOL CVT NISSAN NS-3 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8220-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8220-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 20 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8222-1",
    "sku": "012MN8222-1",
    "slug": "mannol-mannol-atf-ulv-012mn8222-1",
    "name": "MANNOL ATF ULV",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8222-1. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8222-1",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "20 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8222-1",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "20 unid. listas para entrega"
    },
    "description": "MANNOL ATF ULV con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "20 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8222-1.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8222-1 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 20 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-MN2201-20",
    "sku": "MN2201-20",
    "slug": "mannol-mannol-hydro-hv-iso-32-longlife-mn2201-20",
    "name": "MANNOL HYDRO HV ISO 32 LONGLIFE",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Caneca (20 Litros)",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: MN2201-20. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "MN2201-20",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "1 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "MN2201-20",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "1 unid. listas para entrega"
    },
    "description": "MANNOL HYDRO HV ISO 32 LONGLIFE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/MN2201-20.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto MN2201-20 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 1 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-MN2501-20",
    "sku": "MN2501-20",
    "slug": "mannol-mannol-multifarm-stou-10w-30-mn2501-20",
    "name": "MANNOL MULTIFARM STOU 10W-30",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Caneca (20 Litros)",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: MN2501-20. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "MN2501-20",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "MN2501-20",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "MANNOL MULTIFARM STOU 10W-30 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/MN2501-20.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto MN2501-20 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN7105-20",
    "sku": "012MN7105-20",
    "slug": "mannol-mannol-ts-5-uhpd-10w40-012mn7105-20",
    "name": "MANNOL TS-5 UHPD 10W40",
    "brand": "MANNOL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Caneca (20 Litros)",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7105-20. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7105-20",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7105-20",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "MANNOL TS-5 UHPD 10W40 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7105-20.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7105-20 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-015MD12-15W40",
    "sku": "015MD12-15W40",
    "slug": "mobil-mobil-delvac-mx-15w40-015md12-15w40",
    "name": "MOBIL DELVAC MX 15W40",
    "brand": "MOBIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MOBIL. Disponible en 4 presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MOBIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Stock Total": "26 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MOBIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MOBIL DELVAC MX 15W40 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "26 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/015MD12-15W40.png",
    "variants": [
      {
        "sku": "015MD12-15W40",
        "name": "MOBIL DELVAC MX 15W40 12/1",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 18,
        "imageUrl": "/images/products/015MD12-15W40.png",
        "barcode": "7751673002404"
      },
      {
        "sku": "01504MD04-15W40",
        "name": "MOBIL DELVAC MX 15W40 4/1 GL (GALON 4/1 LT)",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/01504MD04-15W40.png",
        "barcode": "7751673002411"
      },
      {
        "sku": "015MD2.5-15W40",
        "name": "MOBIL DELVAC MX 15W40 2.5",
        "presentation": "Media Caneca (2.5 Gal)",
        "volume": "9.5L",
        "stock": 2,
        "imageUrl": "/images/products/015MD2_5-15W40.png",
        "barcode": "7751673002428"
      },
      {
        "sku": "015MD5-15W40",
        "name": "MOBIL DELVAC MX 15W40 CANECA 5GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 2,
        "imageUrl": "/images/products/015MD5-15W40.png",
        "barcode": "7751673002435"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 4 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MOBIL DELVAC MX 15W40 tienen en stock?",
        "answer": "Disponemos de 4 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-015MD-513002_5",
    "sku": "015MD-513002.5",
    "slug": "mobil-mobil-delvac-1300-sup-15w40-015md-513002-5",
    "name": "MOBIL DELVAC 1300 SUP 15W40",
    "brand": "MOBIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Media Caneca (2.5 Gal)",
    "shortSpec": "Línea oficial MOBIL. Disponible en 2 presentaciones (Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MOBIL",
      "Presentaciones": "Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Stock Total": "3 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MOBIL Automotive",
      "Presentaciones Disponibles": "Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MOBIL DELVAC 1300 SUP 15W40 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/015MD-513002_5.png",
    "variants": [
      {
        "sku": "015MD-513002.5",
        "name": "MOBIL DELVAC 1300 SUP 15W40 CAN 2.5/1 GL",
        "presentation": "Media Caneca (2.5 Gal)",
        "volume": "9.5L",
        "stock": 2,
        "imageUrl": "/images/products/015MD-513002_5.png",
        "barcode": "7751673002381"
      },
      {
        "sku": "015MD-51300",
        "name": "MOBIL DELVAC 1300 SUP 15W40 CAN 5/1",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 1,
        "imageUrl": "/images/products/015MD-51300.png",
        "barcode": "7751673002398"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MOBIL DELVAC 1300 SUP 15W40 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: Media Caneca (2.5 Gal), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-015MS12-10W30",
    "sku": "015MS12-10W30",
    "slug": "mobil-mobil-10w30-semi-sintetico-015ms12-10w30",
    "name": "MOBIL 10W30 SEMI SINTETICO",
    "brand": "MOBIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MOBIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MOBIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "28 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MOBIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MOBIL 10W30 SEMI SINTETICO distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "28 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/015MS12-10W30.png",
    "variants": [
      {
        "sku": "015MS12-10W30",
        "name": "MOBIL 10W30 SEMI SINTETICO 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 13,
        "imageUrl": "/images/products/015MS12-10W30.png",
        "barcode": "7751673001308"
      },
      {
        "sku": "015MS04-10W30",
        "name": "MOBIL 10W30 SEMI SINTETICO 4/1 GL.",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 15,
        "imageUrl": "/images/products/015MS04-10W30.png",
        "barcode": "7751673001292"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MOBIL 10W30 SEMI SINTETICO tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-015MS12-20W50",
    "sku": "015MS12-20W50",
    "slug": "mobil-mobil-20w50-semi-sintetico-015ms12-20w50",
    "name": "MOBIL 20W50 SEMI SINTETICO",
    "brand": "MOBIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial MOBIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MOBIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "16 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "MOBIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MOBIL 20W50 SEMI SINTETICO distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "16 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/015MS12-20W50.png",
    "variants": [
      {
        "sku": "015MS12-20W50",
        "name": "MOBIL 20W50 SEMI SINTETICO 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/015MS12-20W50.png",
        "barcode": "7751673001322"
      },
      {
        "sku": "015MS04-20W50",
        "name": "MOBIL 20W50 SEMI SINTETICO 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/015MS04-20W50.png",
        "barcode": "7751673001315"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MOBIL 20W50 SEMI SINTETICO tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR00030",
    "sku": "0368AR00030",
    "slug": "aroil-aroil-racing-10w30-sn-0368ar00030",
    "name": "AROIL RACING 10W30 SN",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "27 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL RACING 10W30 SN distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "27 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR00030.png",
    "variants": [
      {
        "sku": "0368AR00030",
        "name": "AROIL RACING 10W30 SN 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 22,
        "imageUrl": "/images/products/0368AR00030.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR00001",
        "name": "AROIL RACING 10W30 SN 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 5,
        "imageUrl": "/images/products/0368AR00001.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL RACING 10W30 SN tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR00031",
    "sku": "0368AR00031",
    "slug": "aroil-aroil-racing-20w50-sn-0368ar00031",
    "name": "AROIL RACING 20W50 SN",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "15 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL RACING 20W50 SN distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "15 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR00031.png",
    "variants": [
      {
        "sku": "0368AR00031",
        "name": "AROIL RACING 20W50 SN 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 11,
        "imageUrl": "/images/products/0368AR00031.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR00005",
        "name": "AROIL RACING 20W50 SN 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/0368AR00005.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL RACING 20W50 SN tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR00032",
    "sku": "0368AR00032",
    "slug": "aroil-aroil-super-40-sl-cf-0368ar00032",
    "name": "AROIL SUPER 40 SL/CF",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "33 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL SUPER 40 SL/CF distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "33 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR00032.png",
    "variants": [
      {
        "sku": "0368AR00032",
        "name": "AROIL SUPER 40 SL/CF 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 31,
        "imageUrl": "/images/products/0368AR00032.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR00009",
        "name": "AROIL SUPER 40 SL/CF 6/1 GL.",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR00009.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL SUPER 40 SL/CF tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR10031",
    "sku": "0368AR10031",
    "slug": "aroil-aroil-15w40-ci-4-0368ar10031",
    "name": "AROIL 15W40 CI-4",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 4 presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Stock Total": "25 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 15W40 CI-4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "25 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR10031.png",
    "variants": [
      {
        "sku": "0368AR10031",
        "name": "AROIL 15W40 CI-4 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 16,
        "imageUrl": "/images/products/0368AR10031.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR10001",
        "name": "AROIL 15W40 CI-4 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 5,
        "imageUrl": "/images/products/0368AR10001.png",
        "barcode": ""
      },
      {
        "sku": "0368AR10002",
        "name": "AROIL 15W40 CI-4 MEDIA CANECA 2.5 GL",
        "presentation": "Media Caneca (2.5 Gal)",
        "volume": "9.5L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR10002.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR10003",
        "name": "AROIL 15W40 CI-4 BLD CAN 5 GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR10003.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 4 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 15W40 CI-4 tienen en stock?",
        "answer": "Disponemos de 4 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR10032",
    "sku": "0368AR10032",
    "slug": "aroil-aroil-25w60-cf-0368ar10032",
    "name": "AROIL 25W60 CF",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 4 presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Stock Total": "33 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 25W60 CF distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "33 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR10032.png",
    "variants": [
      {
        "sku": "0368AR10032",
        "name": "AROIL 25W60 CF 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/0368AR10032.png",
        "barcode": ""
      },
      {
        "sku": "0368AR10008",
        "name": "AROIL 25W60 CF 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 12,
        "imageUrl": "/images/products/0368AR10008.png",
        "barcode": ""
      },
      {
        "sku": "0368AR10009",
        "name": "AROIL 25W60 CF CAN 2.5 GL",
        "presentation": "Media Caneca (2.5 Gal)",
        "volume": "9.5L",
        "stock": 1,
        "imageUrl": "/images/products/0368AR10009.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR10010",
        "name": "AROIL 25W60 CF CAN 5GL.",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 8,
        "imageUrl": "/images/products/0368AR10010.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 4 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 25W60 CF tienen en stock?",
        "answer": "Disponemos de 4 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Media Caneca (2.5 Gal), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR10016",
    "sku": "0368AR10016",
    "slug": "aroil-aroil-diesel-40-cf-0368ar10016",
    "name": "AROIL DIESEL 40 CF",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Caneca (5 Galones / 19L)",
    "shortSpec": "Producto original AROIL. Código OEM / Referencia: 0368AR10016. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "0368AR10016",
      "Marca": "AROIL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "16 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "0368AR10016",
      "Fabricante": "AROIL",
      "Aplicación": "Autos",
      "Disponibilidad": "16 unid. listas para entrega"
    },
    "description": "AROIL DIESEL 40 CF con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "16 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR10016.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AROIL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 0368AR10016 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 16 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR30003",
    "sku": "0368AR30003",
    "slug": "aroil-aroil-4t-20w50-sl-jaso-ma2-0368ar30003",
    "name": "AROIL 4T 20W50 SL JASO MA2",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro",
    "shortSpec": "Producto original AROIL. Código OEM / Referencia: 0368AR30003. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "0368AR30003",
      "Marca": "AROIL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "0368AR30003",
      "Fabricante": "AROIL",
      "Aplicación": "Motos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "AROIL 4T 20W50 SL JASO MA2 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR30003.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AROIL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 0368AR30003 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-0368AR40038",
    "sku": "0368AR40038",
    "slug": "aroil-aroil-75w85-gl-5-0368ar40038",
    "name": "AROIL 75W85 GL-5",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "15 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 75W85 GL-5 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "15 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40038.png",
    "variants": [
      {
        "sku": "0368AR40038",
        "name": "AROIL 75W85 GL-5 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 10,
        "imageUrl": "/images/products/0368AR40038.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR40001",
        "name": "AROIL 75W85 GL-5 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 5,
        "imageUrl": "/images/products/0368AR40001.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 75W85 GL-5 tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR40039",
    "sku": "0368AR40039",
    "slug": "aroil-aroil-80w90-gl-5-0368ar40039",
    "name": "AROIL 80W90 GL-5",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 3 presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Stock Total": "14 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 80W90 GL-5 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "14 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40039.png",
    "variants": [
      {
        "sku": "0368AR40039",
        "name": "AROIL 80W90 GL-5 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 10,
        "imageUrl": "/images/products/0368AR40039.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR40005",
        "name": "AROIL 80W90 GL-5 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 1,
        "imageUrl": "/images/products/0368AR40005.png",
        "barcode": ""
      },
      {
        "sku": "0368AR40006",
        "name": "AROIL 80W90 GL-5 CAN 5GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 3,
        "imageUrl": "/images/products/0368AR40006.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 80W90 GL-5 tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR40040",
    "sku": "0368AR40040",
    "slug": "aroil-aroil-85w140-gl-5-0368ar40040",
    "name": "AROIL 85W140 GL-5",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 3 presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Stock Total": "17 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 85W140 GL-5 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "17 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40040.png",
    "variants": [
      {
        "sku": "0368AR40040",
        "name": "AROIL 85W140 GL-5 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 10,
        "imageUrl": "/images/products/0368AR40040.png",
        "barcode": ""
      },
      {
        "sku": "0368AR40009",
        "name": "AROIL 85W140 GL-5 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 5,
        "imageUrl": "/images/products/0368AR40009.png",
        "barcode": ""
      },
      {
        "sku": "0368AR40010",
        "name": "AROIL 85W140 GL- CAN 5GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR40010.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 85W140 GL-5 tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR40041",
    "sku": "0368AR40041",
    "slug": "aroil-aroil-90-gl-4-0368ar40041",
    "name": "AROIL 90 GL-4",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 3 presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Stock Total": "18 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 90 GL-4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40041.png",
    "variants": [
      {
        "sku": "0368AR40041",
        "name": "AROIL 90 GL-4 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/0368AR40041.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR40013",
        "name": "AROIL 90 GL-4 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/0368AR40013.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR40014",
        "name": "AROIL 90 GL-4 CAN 5GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR40014.png",
        "barcode": "0"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 90 GL-4 tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR40042",
    "sku": "0368AR40042",
    "slug": "aroil-aroil-140-gl-4-0368ar40042",
    "name": "AROIL 140 GL-4",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AROIL. Disponible en 3 presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AROIL",
      "Presentaciones": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Stock Total": "18 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AROIL Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AROIL 140 GL-4 distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40042.png",
    "variants": [
      {
        "sku": "0368AR40042",
        "name": "AROIL 140 GL-4 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 10,
        "imageUrl": "/images/products/0368AR40042.png",
        "barcode": "0"
      },
      {
        "sku": "0368AR40017",
        "name": "AROIL 140 GL-4 6/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 6,
        "imageUrl": "/images/products/0368AR40017.png",
        "barcode": ""
      },
      {
        "sku": "0368AR40018",
        "name": "AROIL 140 GL-4 CAN 5 GL",
        "presentation": "Caneca (5 Galones / 19L)",
        "volume": "19.0L",
        "stock": 2,
        "imageUrl": "/images/products/0368AR40018.png",
        "barcode": ""
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AROIL 140 GL-4 tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: 1 Litro, 1 Galón (3.78L), Caneca (5 Galones / 19L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR40045",
    "sku": "0368AR40045",
    "slug": "aroil-aroil-atf-diii-0368ar40045",
    "name": "AROIL ATF DIII",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original AROIL. Código OEM / Referencia: 0368AR40045. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "0368AR40045",
      "Marca": "AROIL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "43 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "0368AR40045",
      "Fabricante": "AROIL",
      "Aplicación": "Autos",
      "Disponibilidad": "43 unid. listas para entrega"
    },
    "description": "AROIL ATF DIII con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "43 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR40045.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AROIL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 0368AR40045 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 43 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-0368AR60026",
    "sku": "0368AR60026",
    "slug": "aroil-aroil-tracfluid-10w30-0368ar60026",
    "name": "AROIL TRACFLUID 10W30",
    "brand": "AROIL",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "Caneca (5 Galones / 19L)",
    "shortSpec": "Producto original AROIL. Código OEM / Referencia: 0368AR60026. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "0368AR60026",
      "Marca": "AROIL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "0368AR60026",
      "Fabricante": "AROIL",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "AROIL TRACFLUID 10W30 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/0368AR60026.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AROIL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 0368AR60026 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-016AM-75676-56",
    "sku": "016AM-75676-56",
    "slug": "amalie-amalie-10w30-synt-blend-sn-016am-75676-56",
    "name": "AMALIE 10W30 SYNT BLEND SN",
    "brand": "AMALIE",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AMALIE. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AMALIE",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "15 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AMALIE Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AMALIE 10W30 SYNT BLEND SN distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "15 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/016AM-75676-56.png",
    "variants": [
      {
        "sku": "016AM-75676-56",
        "name": "AMALIE 10W30 SYNT BLEND SN 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/016AM-75676-56.png",
        "barcode": "657699756765"
      },
      {
        "sku": "016AM-75677-36",
        "name": "AMALIE 10W30 SYNT BLEND SN 4/1 GL.",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 3,
        "imageUrl": "/images/products/016AM-75677-36.png",
        "barcode": "657699756772"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AMALIE 10W30 SYNT BLEND SN tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-016AM-75696-56",
    "sku": "016AM-75696-56",
    "slug": "amalie-amalie-20w50-synt-blend-sn-016am-75696-56",
    "name": "AMALIE 20W50 SYNT BLEND SN",
    "brand": "AMALIE",
    "category": "lubricantes",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial AMALIE. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "AMALIE",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "16 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "AMALIE Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "AMALIE 20W50 SYNT BLEND SN distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "16 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/016AM-75696-56.png",
    "variants": [
      {
        "sku": "016AM-75696-56",
        "name": "AMALIE 20W50 SYNT BLEND SN 12/1 LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/016AM-75696-56.png",
        "barcode": "657699756963"
      },
      {
        "sku": "016AM-75697-36",
        "name": "AMALIE 20W50 SYNT BLEND SN 4/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 4,
        "imageUrl": "/images/products/016AM-75697-36.png",
        "barcode": "657699756970"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de AMALIE 20W50 SYNT BLEND SN tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-01001012",
    "sku": "01001012",
    "slug": "motul-motul-moto-5000-10w40-semisintetico-amba-01001012",
    "name": "MOTUL MOTO 5000 10W40 SEMISINTETICO AMBAR",
    "brand": "MOTUL",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MOTUL. Código OEM / Referencia: 01001012. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "01001012",
      "Marca": "MOTUL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "01001012",
      "Fabricante": "MOTUL",
      "Aplicación": "Motos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "MOTUL MOTO 5000 10W40 SEMISINTETICO AMBAR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/01001012.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MOTUL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 01001012 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-01098960",
    "sku": "01098960",
    "slug": "motul-motul-moto-5100-15w50-semisintetico-este-01098960",
    "name": "MOTUL MOTO 5100 15W50 SEMISINTETICO ESTER AMBAR",
    "brand": "MOTUL",
    "category": "lubricantes",
    "applicationType": "motos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MOTUL. Código OEM / Referencia: 01098960. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "01098960",
      "Marca": "MOTUL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "01098960",
      "Fabricante": "MOTUL",
      "Aplicación": "Motos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MOTUL MOTO 5100 15W50 SEMISINTETICO ESTER AMBAR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/01098960.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MOTUL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 01098960 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-038LUB-D1540-0025",
    "sku": "038LUB-D1540-0025",
    "slug": "valvoline-valvoline-valvodiesel-sae-15w40-api-ch4-038lub-d1540-0025",
    "name": "VALVOLINE VALVODIESEL SAE 15W40 API CH4",
    "brand": "VALVOLINE",
    "category": "lubricantes",
    "applicationType": "pesado",
    "volume": "1 Litro",
    "shortSpec": "Producto original VALVOLINE. Código OEM / Referencia: 038LUB-D1540-0025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "038LUB-D1540-0025",
      "Marca": "VALVOLINE",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "038LUB-D1540-0025",
      "Fabricante": "VALVOLINE",
      "Aplicación": "Pesado",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "VALVOLINE VALVODIESEL SAE 15W40 API CH4 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/038LUB-D1540-0025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por VALVOLINE",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 038LUB-D1540-0025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-038LUB-PC2050-0025",
    "sku": "038LUB-PC2050-0025",
    "slug": "valvoline-valvoline-classic-sae-20w50-sp-038lub-pc2050-0025",
    "name": "VALVOLINE CLASSIC SAE 20W50 SP",
    "brand": "VALVOLINE",
    "category": "lubricantes",
    "applicationType": "pesado",
    "volume": "1 Litro",
    "shortSpec": "Línea oficial VALVOLINE. Disponible en 2 presentaciones (1 Litro, 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "VALVOLINE",
      "Presentaciones": "1 Litro, 1 Galón (3.78L)",
      "Stock Total": "10 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Lubricantes",
      "Línea": "VALVOLINE Automotive",
      "Presentaciones Disponibles": "1 Litro, 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "VALVOLINE CLASSIC SAE 20W50 SP distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Litro, 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/038LUB-PC2050-0025.png",
    "variants": [
      {
        "sku": "038LUB-PC2050-0025",
        "name": "VALVOLINE CAJA LITRO 12/1 LT CLASSIC SAE 20W50 SP",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 9,
        "imageUrl": "/images/products/038LUB-PC2050-0025.png",
        "barcode": ""
      },
      {
        "sku": "038LUB-PC2050-0100",
        "name": "VALVOLINE  20W50 CLASSIC SP 3/1 GL",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 1,
        "imageUrl": "/images/products/038LUB-PC2050-0100.png",
        "barcode": ""
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de VALVOLINE CLASSIC SAE 20W50 SP tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Litro, 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN6145",
    "sku": "012MN6145",
    "slug": "mannol-mannol-limpiador-protector-uv3-cockpit-c-012mn6145",
    "name": "MANNOL LIMPIADOR PROTECTOR UV3 COCKPIT CARE APPLE",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN6145. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN6145",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN6145",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR PROTECTOR UV3 COCKPIT CARE APPLE con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN6145.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN6145 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN6149",
    "sku": "012MN6149",
    "slug": "mannol-mannol-limpiador-protector-uv3-cockpit-c-012mn6149",
    "name": "MANNOL LIMPIADOR PROTECTOR UV3 COCKPIT CARE VAINILLA",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN6149. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN6149",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "15 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN6149",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "15 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR PROTECTOR UV3 COCKPIT CARE VAINILLA con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "15 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN6149.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN6149 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 15 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN7901",
    "sku": "012MN7901",
    "slug": "mannol-mannol-grasa-chain-lube-para-cadenas-200-012mn7901",
    "name": "MANNOL GRASA CHAIN LUBE PARA CADENAS 200ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 200 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7901. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7901",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7901",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL GRASA CHAIN LUBE PARA CADENAS 200ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7901.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7901 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN7904",
    "sku": "012MN7904",
    "slug": "mannol-mannol-chain-cleaner-limpiador-de-cade-012mn7904",
    "name": "MANNOL CHAIN CLEANER / LIMPIADOR DE CADENAS 400ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 400 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN7904. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN7904",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "24 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN7904",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "24 unid. listas para entrega"
    },
    "description": "MANNOL CHAIN CLEANER / LIMPIADOR DE CADENAS 400ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN7904.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN7904 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 24 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8028-08",
    "sku": "012MN8028-08",
    "slug": "mannol-mannol-grasa-de-litio-multiuso-800-grs-e-012mn8028-08",
    "name": "MANNOL GRASA DE LITIO MULTIUSO 800 GRS EP2",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Tarrina 800 g",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8028-08. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8028-08",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "24 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8028-08",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "24 unid. listas para entrega"
    },
    "description": "MANNOL GRASA DE LITIO MULTIUSO 800 GRS EP2 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8028-08.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8028-08 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 24 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN8029-08",
    "sku": "012MN8029-08",
    "slug": "mannol-mannol-grasa-lc-2-alta-temperatura-4-5-kg-012mn8029-08",
    "name": "MANNOL GRASA LC-2 ALTA TEMPERATURA 4.5 KG",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Tarrina 800 g",
    "shortSpec": "Línea oficial MANNOL. Disponible en 3 presentaciones (Tarrina 800 g, Tarrina 4.5 kg, Caneca (16-18 kg)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "Tarrina 800 g, Tarrina 4.5 kg, Caneca (16-18 kg)",
      "Stock Total": "3 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Aditivos",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "Tarrina 800 g, Tarrina 4.5 kg, Caneca (16-18 kg)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL GRASA LC-2 ALTA TEMPERATURA 4.5 KG distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (Tarrina 800 g, Tarrina 4.5 kg, Caneca (16-18 kg)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8029-08.png",
    "variants": [
      {
        "sku": "012MN8029-08",
        "name": "MANNOL GRASA LC-2 ALTA TEMPERATURA 800 GR",
        "presentation": "Tarrina 800 g",
        "volume": "800ml",
        "stock": 1,
        "imageUrl": "/images/products/012MN8029-08.png",
        "barcode": "0"
      },
      {
        "sku": "012MN8029",
        "name": "MANNOL GRASA LC-2 ALTA TEMPERATURA 4.5 KG",
        "presentation": "Tarrina 4.5 kg",
        "volume": "4.5L",
        "stock": 1,
        "imageUrl": "/images/products/012MN8029.png",
        "barcode": "4036021802947"
      },
      {
        "sku": "012MN8116",
        "name": "MANNOL GRASA LC-2 ALTA TEMPERATURA 18 KG",
        "presentation": "Caneca (16-18 kg)",
        "volume": "18.0L",
        "stock": 1,
        "imageUrl": "/images/products/012MN8116.png",
        "barcode": ""
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 3 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL GRASA LC-2 ALTA TEMPERATURA 4.5 KG tienen en stock?",
        "answer": "Disponemos de 3 presentaciones oficiales: Tarrina 800 g, Tarrina 4.5 kg, Caneca (16-18 kg). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN8121",
    "sku": "012MN8121",
    "slug": "mannol-mannol-grasa-blanca-spray-450gr-012mn8121",
    "name": "MANNOL GRASA BLANCA SPRAY 450GR",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN8121. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN8121",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "11 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN8121",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "11 unid. listas para entrega"
    },
    "description": "MANNOL GRASA BLANCA SPRAY 450GR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "11 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN8121.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN8121 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 11 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9009-045",
    "sku": "012MN9009-045",
    "slug": "mannol-mannol-motor-flush-professional-ester-012mn9009-045",
    "name": "MANNOL MOTOR FLUSH PROFESSIONAL + ESTER 450 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "motos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9009-045. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9009-045",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "11 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9009-045",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "11 unid. listas para entrega"
    },
    "description": "MANNOL MOTOR FLUSH PROFESSIONAL + ESTER 450 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "11 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9009-045.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9009-045 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 11 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9201",
    "sku": "012MN9201",
    "slug": "mannol-mannol-kit-limpiador-de-catalizador-500m-012mn9201",
    "name": "MANNOL KIT LIMPIADOR DE CATALIZADOR 500ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 500 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9201. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9201",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9201",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "MANNOL KIT LIMPIADOR DE CATALIZADOR 500ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9201.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9201 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9202-045",
    "sku": "012MN9202-045",
    "slug": "mannol-mannol-aditivo-limpiador-de-catalizador-012mn9202-045",
    "name": "MANNOL ADITIVO LIMPIADOR DE CATALIZADOR 450 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9202-045. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9202-045",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9202-045",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "MANNOL ADITIVO LIMPIADOR DE CATALIZADOR 450 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9202-045.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9202-045 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9423-025",
    "sku": "012MN9423-025",
    "slug": "mannol-mannol-oil-leak-stop-250-ml-012mn9423-025",
    "name": "MANNOL OIL LEAK STOP 250 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9423-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9423-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9423-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL OIL LEAK STOP 250 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9423-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9423-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9669",
    "sku": "012MN9669",
    "slug": "mannol-mannol-liquido-encendido-ether-450ml-012mn9669",
    "name": "MANNOL LIQUIDO ENCENDIDO ETHER 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9669. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9669",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9669",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL LIQUIDO ENCENDIDO ETHER 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9669.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9669 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9672",
    "sku": "012MN9672",
    "slug": "mannol-mannol-limpiador-de-zapatas-embragues-ca-012mn9672",
    "name": "MANNOL LIMPIADOR DE ZAPATAS EMBRAGUES CADENAS 600ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9672. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9672",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "47 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9672",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "47 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE ZAPATAS EMBRAGUES CADENAS 600ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "47 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9672.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9672 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 47 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9673",
    "sku": "012MN9673",
    "slug": "mannol-mannol-limpiador-de-neum-ticos-en-espuma-012mn9673",
    "name": "MANNOL LIMPIADOR DE NEUMÁTICOS EN ESPUMA 650 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 650 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9673. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9673",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9673",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE NEUMÁTICOS EN ESPUMA 650 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9673.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9673 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9770",
    "sku": "012MN9770",
    "slug": "mannol-mannol-limpiador-carburador-600-ml-012mn9770",
    "name": "MANNOL LIMPIADOR CARBURADOR 600 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9770. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9770",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "49 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9770",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "49 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR CARBURADOR 600 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "49 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9770.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9770 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 49 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9822",
    "sku": "012MN9822",
    "slug": "mannol-mannol-super-goma-gel-3gr-012mn9822",
    "name": "MANNOL SUPER GOMA GEL 3GR",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9822. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9822",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9822",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL SUPER GOMA GEL 3GR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9822.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9822 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9829-025",
    "sku": "012MN9829-025",
    "slug": "mannol-mannol-aditivo-ceramo-ester-250-ml-012mn9829-025",
    "name": "MANNOL ADITIVO CERAMO ESTER 250 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9829-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9829-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "4 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9829-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "4 unid. listas para entrega"
    },
    "description": "MANNOL ADITIVO CERAMO ESTER 250 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9829-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9829-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 4 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9873",
    "sku": "012MN9873",
    "slug": "mannol-mannol-limpiador-cuerpo-de-aceleraci-n-012mn9873",
    "name": "MANNOL LIMPIADOR CUERPO DE ACELERACIÓN / MARIPOSA 400ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 400 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9873. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9873",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9873",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR CUERPO DE ACELERACIÓN / MARIPOSA 400ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9873.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9873 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9893",
    "sku": "012MN9893",
    "slug": "mannol-mannol-limpiador-de-contactos-electronic-012mn9893",
    "name": "MANNOL LIMPIADOR DE CONTACTOS ELECTRONICO 450 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9893. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9893",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "8 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9893",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "8 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE CONTACTOS ELECTRONICO 450 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "8 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9893.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9893 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 8 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9897",
    "sku": "012MN9897",
    "slug": "mannol-mannol-tratamiento-de-bandas-200m-012mn9897",
    "name": "MANNOL TRATAMIENTO DE BANDAS 200M",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9897. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9897",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9897",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL TRATAMIENTO DE BANDAS 200M con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9897.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9897 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9900",
    "sku": "012MN9900",
    "slug": "mannol-mannol-motor-flush-350-ml-012mn9900",
    "name": "MANNOL MOTOR FLUSH 350 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "motos",
    "volume": "Envase 350 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9900. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9900",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9900",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL MOTOR FLUSH 350 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9900.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9900 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9902-01",
    "sku": "012MN9902-01",
    "slug": "mannol-mannol-aditivo-caja-autom-tica-100ml-par-012mn9902-01",
    "name": "MANNOL ADITIVO CAJA AUTOMÁTICA 100ML PARA 4 LITROS",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "1 Litro",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9902-01. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9902-01",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9902-01",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL ADITIVO CAJA AUTOMÁTICA 100ML PARA 4 LITROS con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9902-01.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9902-01 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9906",
    "sku": "012MN9906",
    "slug": "mannol-mannol-llanta-doctor-450ml-012mn9906",
    "name": "MANNOL LLANTA DOCTOR 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9906. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9906",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9906",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LLANTA DOCTOR 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9906.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9906 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9909",
    "sku": "012MN9909",
    "slug": "mannol-mannol-tratamiento-anticorrosion-anticor-012mn9909",
    "name": "MANNOL TRATAMIENTO ANTICORROSION ANTICOR 1L ()",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9909. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9909",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9909",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL TRATAMIENTO ANTICORROSION ANTICOR 1L () con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9909.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9909 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9911",
    "sku": "012MN9911",
    "slug": "mannol-mannol-silicon-gris-85gr-012mn9911",
    "name": "MANNOL SILICON GRIS 85GR",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Tubo 85 g",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9911. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9911",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "18 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9911",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "18 unid. listas para entrega"
    },
    "description": "MANNOL SILICON GRIS 85GR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9911.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9911 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 18 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9923-025",
    "sku": "012MN9923-025",
    "slug": "mannol-mannol-aditivo-sellador-fuga-direcci-n-h-012mn9923-025",
    "name": "MANNOL ADITIVO SELLADOR FUGA DIRECCIÓN HIDRÁULICA 250 ML ()",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9923-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9923-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9923-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL ADITIVO SELLADOR FUGA DIRECCIÓN HIDRÁULICA 250 ML () con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9923-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9923-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9927",
    "sku": "012MN9927",
    "slug": "mannol-mannol-trabapernos-fijacion-fuerte-10m-012mn9927",
    "name": "MANNOL TRABAPERNOS (FIJACION FUERTE) 10ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Gotero 10 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9927. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9927",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9927",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "MANNOL TRABAPERNOS (FIJACION FUERTE) 10ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9927.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9927 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9929-045",
    "sku": "012MN9929-045",
    "slug": "mannol-mannol-ester-additive-tratamiento-de-aceite-450-ml-y-1lt-012mn9929-045",
    "name": "MANNOL ESTER ADDITIVE / TRATAMIENTO DE ACEITE 450 ML Y 1LT",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (Envase 450 ml, 1 Litro) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "Envase 450 ml, 1 Litro",
      "Stock Total": "18 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Aditivos",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "Envase 450 ml, 1 Litro",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL ESTER ADDITIVE / TRATAMIENTO DE ACEITE 450 ML Y 1LT distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (Envase 450 ml, 1 Litro) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9929-045.png",
    "variants": [
      {
        "sku": "012MN9929-045",
        "name": "MANNOL ESTER ADDITIVE / TRATAMIENTO DE ACEITE 450 ML",
        "presentation": "Envase 450 ml",
        "volume": "450ml",
        "stock": 6,
        "imageUrl": "/images/products/012MN9929-045.png",
        "barcode": "4036021992914"
      },
      {
        "sku": "012MN9929-1",
        "name": "MANNOL ESTER ADDITIVE / TRATAMIENTO DE ACEITE 1LT",
        "presentation": "1 Litro",
        "volume": "1.0L",
        "stock": 12,
        "imageUrl": "/images/products/012MN9929-1.png",
        "barcode": ""
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL ESTER ADDITIVE / TRATAMIENTO DE ACEITE 450 ML Y 1LT tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: Envase 450 ml, 1 Litro. Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9930-01",
    "sku": "012MN9930-01",
    "slug": "mannol-mannol-diesel-ester-additive-100ml-y-250ml-012mn9930-01",
    "name": "MANNOL DIESEL ESTER ADDITIVE 100ML Y 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 100 ml",
    "shortSpec": "Línea oficial MANNOL. Disponible en 2 presentaciones (Envase 100 ml, Envase 250 ml) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "MANNOL",
      "Presentaciones": "Envase 100 ml, Envase 250 ml",
      "Stock Total": "15 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Aditivos",
      "Línea": "MANNOL Automotive",
      "Presentaciones Disponibles": "Envase 100 ml, Envase 250 ml",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "MANNOL DIESEL ESTER ADDITIVE 100ML Y 250ML distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (Envase 100 ml, Envase 250 ml) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "15 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9930-01.png",
    "variants": [
      {
        "sku": "012MN9930-01",
        "name": "MANNOL DIESEL ESTER ADDITIVE 100ML",
        "presentation": "Envase 100 ml",
        "volume": "100ml",
        "stock": 5,
        "imageUrl": "/images/products/012MN9930-01.png",
        "barcode": "4036021299303"
      },
      {
        "sku": "012MN9930-025",
        "name": "MANNOL DIESEL ESTER ADDITIVE 250ML",
        "presentation": "Envase 250 ml",
        "volume": "250ml",
        "stock": 10,
        "imageUrl": "/images/products/012MN9930-025.png",
        "barcode": "4036021199313"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de MANNOL DIESEL ESTER ADDITIVE 100ML Y 250ML tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: Envase 100 ml, Envase 250 ml. Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9931",
    "sku": "012MN9931",
    "slug": "mannol-mannol-limpiador-de-tapiceria-650ml-012mn9931",
    "name": "MANNOL LIMPIADOR DE TAPICERIA 650ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 650 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9931. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9931",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9931",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE TAPICERIA 650ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9931.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9931 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9939-05",
    "sku": "012MN9939-05",
    "slug": "mannol-mannol-burning-booster-mejorador-de-co-012mn9939-05",
    "name": "MANNOL BURNING BOOSTER / MEJORADOR DE COMBUSTION 500ML METALICO",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 500 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9939-05. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9939-05",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9939-05",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL BURNING BOOSTER / MEJORADOR DE COMBUSTION 500ML METALICO con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9939-05.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9939-05 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9943",
    "sku": "012MN9943",
    "slug": "mannol-mannol-motor-life-extender-reparador-4-012mn9943",
    "name": "MANNOL MOTOR LIFE EXTENDER / REPARADOR 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "motos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9943. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9943",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "7 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9943",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "7 unid. listas para entrega"
    },
    "description": "MANNOL MOTOR LIFE EXTENDER / REPARADOR 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "7 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9943.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9943 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 7 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9944",
    "sku": "012MN9944",
    "slug": "mannol-mannol-limpiador-de-cuero-450ml-012mn9944",
    "name": "MANNOL LIMPIADOR DE CUERO 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9944. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9944",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9944",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE CUERO 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9944.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9944 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9950-025",
    "sku": "012MN9950-025",
    "slug": "mannol-mannol-benzin-ester-additive-pl-stico-25-012mn9950-025",
    "name": "MANNOL BENZIN ESTER ADDITIVE PLÁSTICO 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9950-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9950-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9950-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL BENZIN ESTER ADDITIVE PLÁSTICO 250ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9950-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9950-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9954-045",
    "sku": "012MN9954-045",
    "slug": "mannol-mannol-super-benzin-octane-plus-6-450m-012mn9954-045",
    "name": "MANNOL SUPER BENZIN OCTANE PLUS + 6 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9954-045. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9954-045",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9954-045",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "MANNOL SUPER BENZIN OCTANE PLUS + 6 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9954-045.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9954-045 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9955-045",
    "sku": "012MN9955-045",
    "slug": "mannol-mannol-super-diesel-cetane-plus-4-45-012mn9955-045",
    "name": "MANNOL SUPER DIESEL (CETANE PLUS + 4) 450ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 450 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9955-045. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9955-045",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9955-045",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "MANNOL SUPER DIESEL (CETANE PLUS + 4) 450ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9955-045.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9955-045 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9956-025",
    "sku": "012MN9956-025",
    "slug": "mannol-mannol-diesel-jet-cleaner-250ml-012mn9956-025",
    "name": "MANNOL DIESEL JET CLEANER 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9956-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9956-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "24 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9956-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "24 unid. listas para entrega"
    },
    "description": "MANNOL DIESEL JET CLEANER 250ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "24 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9956-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9956-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 24 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9957-025",
    "sku": "012MN9957-025",
    "slug": "mannol-mannol-injector-cleaner-gasolina-250ml-012mn9957-025",
    "name": "MANNOL INJECTOR CLEANER GASOLINA 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9957-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9957-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9957-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "MANNOL INJECTOR CLEANER GASOLINA 250ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9957-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9957-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9958",
    "sku": "012MN9958",
    "slug": "mannol-mannol-dpf-cleaner-metal-400ml-012mn9958",
    "name": "MANNOL DPF CLEANER METAL 400ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 400 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9958. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9958",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9958",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL DPF CLEANER METAL 400ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9958.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9958 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9965",
    "sku": "012MN9965",
    "slug": "mannol-mannol-limpiador-radiador-250-ml-012mn9965",
    "name": "MANNOL LIMPIADOR RADIADOR 250 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9965. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9965",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9965",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR RADIADOR 250 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9965.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9965 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9966-025",
    "sku": "012MN9966-025",
    "slug": "mannol-mannol-sellador-de-fugas-para-radiador-2-012mn9966-025",
    "name": "MANNOL SELLADOR DE FUGAS PARA RADIADOR 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9966-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9966-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9966-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "MANNOL SELLADOR DE FUGAS PARA RADIADOR 250ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9966-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9966-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9968-025",
    "sku": "012MN9968-025",
    "slug": "mannol-mannol-sellador-de-fugas-caja-de-cambios-012mn9968-025",
    "name": "MANNOL SELLADOR DE FUGAS CAJA DE CAMBIOS 250ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9968-025. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9968-025",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "5 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9968-025",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "5 unid. listas para entrega"
    },
    "description": "MANNOL SELLADOR DE FUGAS CAJA DE CAMBIOS 250ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "5 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9968-025.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9968-025 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 5 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9971",
    "sku": "012MN9971",
    "slug": "mannol-mannol-limpiador-de-aire-acondicionado-5-012mn9971",
    "name": "MANNOL LIMPIADOR DE AIRE ACONDICIONADO 520 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Aerosol 520 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9971. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9971",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9971",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR DE AIRE ACONDICIONADO 520 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9971.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9971 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-012MN9973",
    "sku": "012MN9973",
    "slug": "mannol-mannol-limpiador-externo-de-motor-spray-012mn9973",
    "name": "MANNOL LIMPIADOR EXTERNO DE MOTOR SPRAY 500 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "motos",
    "volume": "Spray 500 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9973. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9973",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9973",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIADOR EXTERNO DE MOTOR SPRAY 500 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9973.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9973 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9974",
    "sku": "012MN9974",
    "slug": "mannol-mannol-limpia-vidrios-500ml-012mn9974",
    "name": "MANNOL LIMPIA VIDRIOS 500ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Spray 500 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9974. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9974",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9974",
      "Fabricante": "MANNOL",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "MANNOL LIMPIA VIDRIOS 500ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9974.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9974 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-012MN9990",
    "sku": "012MN9990",
    "slug": "mannol-mannol-aditivo-motor-dr-350-ml-012mn9990",
    "name": "MANNOL ADITIVO MOTOR DR. 350 ML",
    "brand": "MANNOL",
    "category": "aditivos",
    "applicationType": "motos",
    "volume": "Envase 350 ml",
    "shortSpec": "Producto original MANNOL. Código OEM / Referencia: 012MN9990. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "012MN9990",
      "Marca": "MANNOL",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "18 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "012MN9990",
      "Fabricante": "MANNOL",
      "Aplicación": "Motos",
      "Disponibilidad": "18 unid. listas para entrega"
    },
    "description": "MANNOL ADITIVO MOTOR DR. 350 ML con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "18 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/012MN9990.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por MANNOL",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 012MN9990 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 18 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-10270_03_017",
    "sku": "10270.03.017",
    "slug": "abro-abro-lubricante-penetrante-ab-80-10oz-10270-03-017",
    "name": "ABRO LUBRICANTE PENETRANTE AB-80 10OZ",
    "brand": "ABRO",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Aerosol 10 oz",
    "shortSpec": "Producto original ABRO. Código OEM / Referencia: 10270.03.017. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "10270.03.017",
      "Marca": "ABRO",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "10 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "10270.03.017",
      "Fabricante": "ABRO",
      "Aplicación": "Autos",
      "Disponibilidad": "10 unid. listas para entrega"
    },
    "description": "ABRO LUBRICANTE PENETRANTE AB-80 10OZ con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "10 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/10270_03_017.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ABRO",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 10270.03.017 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 10 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-102EC-502LT",
    "sku": "102EC-502LT",
    "slug": "abro-abro-refrigerante-rojo-galon-102ec-502lt",
    "name": "ABRO REFRIGERANTE ROJO GALON",
    "brand": "ABRO",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Cuarto (946 ml)",
    "shortSpec": "Línea oficial ABRO. Disponible en 2 presentaciones (1 Cuarto (946 ml), 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "ABRO",
      "Presentaciones": "1 Cuarto (946 ml), 1 Galón (3.78L)",
      "Stock Total": "19 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "ABRO Automotive",
      "Presentaciones Disponibles": "1 Cuarto (946 ml), 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "ABRO REFRIGERANTE ROJO GALON distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Cuarto (946 ml), 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "19 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/102EC-502LT.png",
    "variants": [
      {
        "sku": "102EC-502LT",
        "name": "ABRO REFRIGERANTE ROJO CUARTO",
        "presentation": "1 Cuarto (946 ml)",
        "volume": "946ml",
        "stock": 10,
        "imageUrl": "/images/products/102EC-502LT.png",
        "barcode": "7862102030971"
      },
      {
        "sku": "102EC-502",
        "name": "ABRO REFRIGERANTE ROJO GALON",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 9,
        "imageUrl": "/images/products/102EC-502.png",
        "barcode": "790920015559"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de ABRO REFRIGERANTE ROJO GALON tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Cuarto (946 ml), 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-102EC-503LT",
    "sku": "102EC-503LT",
    "slug": "abro-abro-refrigerante-verde-galon-102ec-503lt",
    "name": "ABRO REFRIGERANTE VERDE GALON",
    "brand": "ABRO",
    "category": "refrigerantes",
    "applicationType": "autos",
    "volume": "1 Cuarto (946 ml)",
    "shortSpec": "Línea oficial ABRO. Disponible en 2 presentaciones (1 Cuarto (946 ml), 1 Galón (3.78L)) con stock en Bodega Pedernales.",
    "specifications": {
      "Marca": "ABRO",
      "Presentaciones": "1 Cuarto (946 ml), 1 Galón (3.78L)",
      "Stock Total": "43 unidades",
      "Origen": "Distribución Matriz LiderPro"
    },
    "fullSpecs": {
      "Categoría": "Refrigerantes",
      "Línea": "ABRO Automotive",
      "Presentaciones Disponibles": "1 Cuarto (946 ml), 1 Galón (3.78L)",
      "Garantía": "Garantía Oficial de Fábrica y LiderPro"
    },
    "description": "ABRO REFRIGERANTE VERDE GALON distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones (1 Cuarto (946 ml), 1 Galón (3.78L)) para talleres y flotas en Manabí y a nivel nacional.",
    "priceNote": "Consultar precio mayorista o unitario vía WhatsApp con factura SRI",
    "warranty": "Garantía oficial de autenticidad",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "43 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/102EC-503LT.png",
    "variants": [
      {
        "sku": "102EC-503LT",
        "name": "ABRO REFRIGERANTE VERDE CUARTO",
        "presentation": "1 Cuarto (946 ml)",
        "volume": "946ml",
        "stock": 26,
        "imageUrl": "/images/products/102EC-503LT.png",
        "barcode": "790920015658"
      },
      {
        "sku": "102EC-503",
        "name": "ABRO REFRIGERANTE VERDE GALON",
        "presentation": "1 Galón (3.78L)",
        "volume": "3.78L",
        "stock": 17,
        "imageUrl": "/images/products/102EC-503.png",
        "barcode": "7862102032678"
      }
    ],
    "compatibleVehicles": [
      {
        "make": "Universal",
        "model": "Línea Multimarca y Talleres",
        "yearRange": "Todos los años"
      }
    ],
    "features": [
      "Presentación intercambiable en 2 tamaños unificados",
      "Fórmula certificada de máxima pureza y durabilidad",
      "Despacho verificado desde Bodega Matriz Pedernales",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Qué presentaciones de ABRO REFRIGERANTE VERDE GALON tienen en stock?",
        "answer": "Disponemos de 2 presentaciones oficiales: 1 Cuarto (946 ml), 1 Galón (3.78L). Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp."
      },
      {
        "question": "¿Realizan envíos a otras ciudades del país?",
        "answer": "Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-102SS822",
    "sku": "102SS822",
    "slug": "abro-abro-super-sellador-de-blocks-ss-822-102ss822",
    "name": "ABRO SUPER SELLADOR DE BLOCKS SS-822",
    "brand": "ABRO",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original ABRO. Código OEM / Referencia: 102SS822. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "102SS822",
      "Marca": "ABRO",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "102SS822",
      "Fabricante": "ABRO",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "ABRO SUPER SELLADOR DE BLOCKS SS-822 con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/102SS822.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ABRO",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 102SS822 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-15170_03_039",
    "sku": "15170.03.039",
    "slug": "abro-abro-cinta-empaque-transparente-48x80yds-15170-03-039",
    "name": "ABRO CINTA EMPAQUE TRANSPARENTE 48X80yds",
    "brand": "ABRO",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original ABRO. Código OEM / Referencia: 15170.03.039. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "15170.03.039",
      "Marca": "ABRO",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "12 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "15170.03.039",
      "Fabricante": "ABRO",
      "Aplicación": "Autos",
      "Disponibilidad": "12 unid. listas para entrega"
    },
    "description": "ABRO CINTA EMPAQUE TRANSPARENTE 48X80yds con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "12 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/15170_03_039.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por ABRO",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 15170.03.039 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 12 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-1213027CH",
    "sku": "1213027CH",
    "slug": "simoniz-simoniz-uv3-chicle-250-cc-1213027ch",
    "name": "SIMONIZ UV3 CHICLE 250 CC.",
    "brand": "SIMONIZ",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original SIMONIZ. Código OEM / Referencia: 1213027CH. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "1213027CH",
      "Marca": "SIMONIZ",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "1213027CH",
      "Fabricante": "SIMONIZ",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "SIMONIZ UV3 CHICLE 250 CC. con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/1213027CH.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por SIMONIZ",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 1213027CH es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-1213027CT",
    "sku": "1213027CT",
    "slug": "simoniz-simoniz-uv3-citrus-250-cc-1213027ct",
    "name": "SIMONIZ UV3 CITRUS 250 CC.",
    "brand": "SIMONIZ",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original SIMONIZ. Código OEM / Referencia: 1213027CT. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "1213027CT",
      "Marca": "SIMONIZ",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "9 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "1213027CT",
      "Fabricante": "SIMONIZ",
      "Aplicación": "Autos",
      "Disponibilidad": "9 unid. listas para entrega"
    },
    "description": "SIMONIZ UV3 CITRUS 250 CC. con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "9 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/1213027CT.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por SIMONIZ",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 1213027CT es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 9 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "prod-1213027PT",
    "sku": "1213027PT",
    "slug": "simoniz-simoniz-uv3-picadura-tabaco-250-cc-1213027pt",
    "name": "SIMONIZ UV3 PICADURA TABACO 250 CC.",
    "brand": "SIMONIZ",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original SIMONIZ. Código OEM / Referencia: 1213027PT. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "1213027PT",
      "Marca": "SIMONIZ",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "2 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "1213027PT",
      "Fabricante": "SIMONIZ",
      "Aplicación": "Autos",
      "Disponibilidad": "2 unid. listas para entrega"
    },
    "description": "SIMONIZ UV3 PICADURA TABACO 250 CC. con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/1213027PT.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por SIMONIZ",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 1213027PT es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 2 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-1213027SP",
    "sku": "1213027SP",
    "slug": "simoniz-simoniz-uv3-carro-nuevo-250-cc-1213027sp",
    "name": "SIMONIZ UV3 CARRO NUEVO 250 CC.",
    "brand": "SIMONIZ",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 250 ml",
    "shortSpec": "Producto original SIMONIZ. Código OEM / Referencia: 1213027SP. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "1213027SP",
      "Marca": "SIMONIZ",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "1213027SP",
      "Fabricante": "SIMONIZ",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "SIMONIZ UV3 CARRO NUEVO 250 CC. con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/1213027SP.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por SIMONIZ",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 1213027SP es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-1214020",
    "sku": "1214020",
    "slug": "simoniz-simoniz-cera-300gr-siempre-nuevo-1214020",
    "name": "SIMONIZ CERA 300GR SIEMPRE NUEVO",
    "brand": "SIMONIZ",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Envase 300 ml",
    "shortSpec": "Producto original SIMONIZ. Código OEM / Referencia: 1214020. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "1214020",
      "Marca": "SIMONIZ",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "3 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "1214020",
      "Fabricante": "SIMONIZ",
      "Aplicación": "Autos",
      "Disponibilidad": "3 unid. listas para entrega"
    },
    "description": "SIMONIZ CERA 300GR SIEMPRE NUEVO con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/1214020.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por SIMONIZ",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 1214020 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 3 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-122APC06",
    "sku": "122APC06",
    "slug": "areon-areon-perfume-black-crystal-122apc06",
    "name": "AREON PERFUME BLACK CRYSTAL",
    "brand": "AREON",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original AREON. Código OEM / Referencia: 122APC06. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "122APC06",
      "Marca": "AREON",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "122APC06",
      "Fabricante": "AREON",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "AREON PERFUME BLACK CRYSTAL con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/122APC06.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AREON",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 122APC06 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-122APC11",
    "sku": "122APC11",
    "slug": "areon-areon-perfume-new-car-122apc11",
    "name": "AREON PERFUME NEW CAR",
    "brand": "AREON",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original AREON. Código OEM / Referencia: 122APC11. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "122APC11",
      "Marca": "AREON",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "6 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "122APC11",
      "Fabricante": "AREON",
      "Aplicación": "Autos",
      "Disponibilidad": "6 unid. listas para entrega"
    },
    "description": "AREON PERFUME NEW CAR con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "6 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/122APC11.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AREON",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 122APC11 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 6 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "prod-122PACKMA60",
    "sku": "122PACKMA60",
    "slug": "areon-areon-mon-display-60-pcs-mix-fragancias-122packma60",
    "name": "AREON MON DISPLAY 60 PCS MIX FRAGANCIAS",
    "brand": "AREON",
    "category": "aditivos",
    "applicationType": "autos",
    "volume": "Presentación Estándar",
    "shortSpec": "Producto original AREON. Código OEM / Referencia: 122PACKMA60. Stock disponible en Pedernales.",
    "specifications": {
      "Código / SKU": "122PACKMA60",
      "Marca": "AREON",
      "Tipo": "Producto Automotriz",
      "Stock Actual": "29 unidades",
      "Bodega": "Pedernales Matriz"
    },
    "fullSpecs": {
      "Referencia Comercial": "122PACKMA60",
      "Fabricante": "AREON",
      "Aplicación": "Autos",
      "Disponibilidad": "29 unid. listas para entrega"
    },
    "description": "AREON MON DISPLAY 60 PCS MIX FRAGANCIAS con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
    "priceNote": "Cotización inmediata por WhatsApp con factura SRI",
    "warranty": "Garantía oficial de fábrica",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "29 unidades en Bodega Pedernales",
    "dispatchIndicator": "Despacho Inmediato",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/122PACKMA60.png",
    "compatibleVehicles": [
      {
        "make": "Multimarca",
        "model": "Vehículos y Flotas",
        "yearRange": "Consulte según especificación"
      }
    ],
    "features": [
      "Calidad OEM garantizada por AREON",
      "Construcción de alta resistencia y durabilidad",
      "Entrega inmediata en Pedernales y envíos a todo Ecuador",
      "Factura comercial autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Este producto 122PACKMA60 es compatible con mi vehículo?",
        "answer": "Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío."
      },
      {
        "question": "¿Tienen stock para retiro inmediato en tienda física?",
        "answer": "Sí, disponemos de 29 unidades en nuestro local matriz de Pedernales listo para entrega inmediata."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-02724HPIS4",
    "sku": "02724HPIS4",
    "slug": "bosch-bater-a-bosch-24-hp-i-s4-64amp-602438-02724hpis4",
    "name": "Batería Bosch 24 HP I S4 64AMP 602438",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "64 Ah",
    "shortSpec": "Batería Bosch 24 HP I S4 64AMP 602438 con tecnología de libre mantenimiento. 64 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "64 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 24 HP I S4 64AMP 602438 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-02724HPS4",
    "sku": "02724HPS4",
    "slug": "bosch-bater-a-bosch-24-hp-s4-64amp-602434-02724hps4",
    "name": "Batería Bosch 24 HP S4 64AMP 602434",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "64 Ah",
    "shortSpec": "Batería Bosch 24 HP S4 64AMP 602434 con tecnología de libre mantenimiento. 64 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "64 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 24 HP S4 64AMP 602434 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-02727HPIS4",
    "sku": "02727HPIS4",
    "slug": "bosch-bater-a-bosch-27-hp-i-s4-85amp-602738-02727hpis4",
    "name": "Batería Bosch 27 HP I S4 85AMP 602738",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "85 Ah",
    "shortSpec": "Batería Bosch 27 HP I S4 85AMP 602738 con tecnología de libre mantenimiento. 85 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "85 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 27 HP I S4 85AMP 602738 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-02727HPS4",
    "sku": "02727HPS4",
    "slug": "bosch-bater-a-bosch-27-hp-s4-88amp-602732-02727hps4",
    "name": "Batería Bosch 27 HP S4 88AMP 602732",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "88 Ah",
    "shortSpec": "Batería Bosch 27 HP S4 88AMP 602732 con tecnología de libre mantenimiento. 88 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "88 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 27 HP S4 88AMP 602732 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-02734HPS4",
    "sku": "02734HPS4",
    "slug": "bosch-bater-a-bosch-34-hp-s4-70amp-603432-02734hps4",
    "name": "Batería Bosch 34 HP S4 70AMP 603432",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "70 Ah",
    "shortSpec": "Batería Bosch 34 HP S4 70AMP 603432 con tecnología de libre mantenimiento. 70 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "70 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 34 HP S4 70AMP 603432 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-02742FES3",
    "sku": "02742FES3",
    "slug": "bosch-bater-a-bosch-42-fe-s3-45amp-304222-02742fes3",
    "name": "Batería Bosch 42 FE S3 45AMP 304222",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "45 Ah",
    "shortSpec": "Batería Bosch 42 FE S3 45AMP 304222 con tecnología de libre mantenimiento. 45 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "45 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 42 FE S3 45AMP 304222 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-02742HPIS4",
    "sku": "02742HPIS4",
    "slug": "bosch-bater-a-bosch-42-hp-i-s4-55amp-604236-02742hpis4",
    "name": "Batería Bosch 42 HP I S4 55AMP 604236",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "55 Ah",
    "shortSpec": "Batería Bosch 42 HP I S4 55AMP 604236 con tecnología de libre mantenimiento. 55 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "55 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "4 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 42 HP I S4 55AMP 604236 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-0277B6548",
    "sku": "0277B6548",
    "slug": "bosch-bater-a-bosch-b65-mp-i-s5-sellada-0277b6548",
    "name": "Batería Bosch B65 MP I S5 SELLADA",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "12V Alta Potencia",
    "shortSpec": "Batería Bosch B65 MP I S5 SELLADA con tecnología de libre mantenimiento. 12V Alta Potencia, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "12V Alta Potencia",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch B65 MP I S5 SELLADA disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-027N40FES4",
    "sku": "027N40FES4",
    "slug": "bosch-bater-a-bosch-n40-fe-s4-43amp-614022-027n40fes4",
    "name": "Batería Bosch N40 FE S4 43AMP 614022",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "43 Ah",
    "shortSpec": "Batería Bosch N40 FE S4 43AMP 614022 con tecnología de libre mantenimiento. 43 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "43 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch N40 FE S4 43AMP 614022 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-027NS40FEFS4",
    "sku": "027NS40FEFS4",
    "slug": "bosch-bater-a-bosch-ns40-fe-f-s4-604023-027ns40fefs4",
    "name": "Batería Bosch NS40 FE F S4 604023",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "12V Alta Potencia",
    "shortSpec": "Batería Bosch NS40 FE F S4 604023 con tecnología de libre mantenimiento. 12V Alta Potencia, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "12V Alta Potencia",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch NS40 FE F S4 604023 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-027NS40FEIFS4",
    "sku": "027NS40FEIFS4",
    "slug": "bosch-bater-a-bosch-ns40-fe-i-f-s4-42amp-604027-027ns40feifs4",
    "name": "Batería Bosch NS40 FE I F S4 42AMP 604027",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "42 Ah",
    "shortSpec": "Batería Bosch NS40 FE I F S4 42AMP 604027 con tecnología de libre mantenimiento. 42 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "42 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch NS40 FE I F S4 42AMP 604027 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03024-FE",
    "sku": "03024-FE",
    "slug": "bater-as-ecuador-bater-a-ecuador-24-fe-full-equipo-65-amp-03024-fe",
    "name": "Batería Ecuador 24 FE FULL EQUIPO 65 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "65 Ah",
    "shortSpec": "Batería Ecuador 24 FE FULL EQUIPO 65 AMP con tecnología de libre mantenimiento. 65 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "65 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 24 FE FULL EQUIPO 65 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03024-FE-I",
    "sku": "03024-FE-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-24-fe-i-full-equipo-65-amp-03024-fe-i",
    "name": "Batería Ecuador 24 FE I FULL EQUIPO 65 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "65 Ah",
    "shortSpec": "Batería Ecuador 24 FE I FULL EQUIPO 65 AMP con tecnología de libre mantenimiento. 65 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "65 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 24 FE I FULL EQUIPO 65 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03024-HP-I",
    "sku": "03024-HP-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-24-hp-i-high-power-85-amp-03024-hp-i",
    "name": "Batería Ecuador 24 HP I HIGH POWER 85 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "85 Ah",
    "shortSpec": "Batería Ecuador 24 HP I HIGH POWER 85 AMP con tecnología de libre mantenimiento. 85 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "85 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "4 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 24 HP I HIGH POWER 85 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03027-FE",
    "sku": "03027-FE",
    "slug": "bater-as-ecuador-bater-a-ecuador-27-fe-full-equipo-80-amp-03027-fe",
    "name": "Batería Ecuador 27 FE FULL EQUIPO 80 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "80 Ah",
    "shortSpec": "Batería Ecuador 27 FE FULL EQUIPO 80 AMP con tecnología de libre mantenimiento. 80 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "80 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 27 FE FULL EQUIPO 80 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03027-FE-I",
    "sku": "03027-FE-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-27-fe-i-full-equipo-80-amp-03027-fe-i",
    "name": "Batería Ecuador 27 FE I FULL EQUIPO 80 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "80 Ah",
    "shortSpec": "Batería Ecuador 27 FE I FULL EQUIPO 80 AMP con tecnología de libre mantenimiento. 80 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "80 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 27 FE I FULL EQUIPO 80 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03027-HP",
    "sku": "03027-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-27-hp-high-power-95-amp-03027-hp",
    "name": "Batería Ecuador 27 HP HIGH POWER 95 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "95 Ah",
    "shortSpec": "Batería Ecuador 27 HP HIGH POWER 95 AMP con tecnología de libre mantenimiento. 95 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "95 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "3 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 27 HP HIGH POWER 95 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03027-HP-I",
    "sku": "03027-HP-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-27-hp-i-high-power-95-amp-03027-hp-i",
    "name": "Batería Ecuador 27 HP I HIGH POWER 95 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "95 Ah",
    "shortSpec": "Batería Ecuador 27 HP I HIGH POWER 95 AMP con tecnología de libre mantenimiento. 95 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "95 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "4 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 27 HP I HIGH POWER 95 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03031-SHD",
    "sku": "03031-SHD",
    "slug": "bater-as-ecuador-bater-a-ecuador-31-shd-super-heavy-duty-105-amp-03031-shd",
    "name": "Batería Ecuador 31 SHD SUPER HEAVY DUTY 105 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "105 Ah",
    "shortSpec": "Batería Ecuador 31 SHD SUPER HEAVY DUTY 105 AMP con tecnología de libre mantenimiento. 105 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "105 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 31 SHD SUPER HEAVY DUTY 105 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03034-FE",
    "sku": "03034-FE",
    "slug": "bater-as-ecuador-bater-a-ecuador-34-fe-full-equipo-65-amp-03034-fe",
    "name": "Batería Ecuador 34 FE FULL EQUIPO 65 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "65 Ah",
    "shortSpec": "Batería Ecuador 34 FE FULL EQUIPO 65 AMP con tecnología de libre mantenimiento. 65 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "65 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 34 FE FULL EQUIPO 65 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03034-FE-I",
    "sku": "03034-FE-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-34-fe-i-full-equipo-65-amp-03034-fe-i",
    "name": "Batería Ecuador 34 FE I FULL EQUIPO 65 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "65 Ah",
    "shortSpec": "Batería Ecuador 34 FE I FULL EQUIPO 65 AMP con tecnología de libre mantenimiento. 65 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "65 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 34 FE I FULL EQUIPO 65 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03034-HP",
    "sku": "03034-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-34-hp-high-power-80-amp-03034-hp",
    "name": "Batería Ecuador 34 HP HIGH POWER 80 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "80 Ah",
    "shortSpec": "Batería Ecuador 34 HP HIGH POWER 80 AMP con tecnología de libre mantenimiento. 80 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "80 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 34 HP HIGH POWER 80 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03034-HP-I",
    "sku": "03034-HP-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-34-hp-i-high-power-80-amp-03034-hp-i",
    "name": "Batería Ecuador 34 HP I HIGH POWER 80 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "80 Ah",
    "shortSpec": "Batería Ecuador 34 HP I HIGH POWER 80 AMP con tecnología de libre mantenimiento. 80 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "80 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 34 HP I HIGH POWER 80 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03036-HP",
    "sku": "03036-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-36-hp-high-power-50-amp-03036-hp",
    "name": "Batería Ecuador 36 HP HIGH POWER 50 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "50 Ah",
    "shortSpec": "Batería Ecuador 36 HP HIGH POWER 50 AMP con tecnología de libre mantenimiento. 50 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "50 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 36 HP HIGH POWER 50 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03042-FE",
    "sku": "03042-FE",
    "slug": "bater-as-ecuador-bater-a-ecuador-42-fe-full-equipo-55-amp-03042-fe",
    "name": "Batería Ecuador 42 FE FULL EQUIPO 55 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "55 Ah",
    "shortSpec": "Batería Ecuador 42 FE FULL EQUIPO 55 AMP con tecnología de libre mantenimiento. 55 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "55 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 42 FE FULL EQUIPO 55 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03042-HP",
    "sku": "03042-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-42-hp-high-power-62-amp-03042-hp",
    "name": "Batería Ecuador 42 HP HIGH POWER 62 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "62 Ah",
    "shortSpec": "Batería Ecuador 42 HP HIGH POWER 62 AMP con tecnología de libre mantenimiento. 62 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "62 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 42 HP HIGH POWER 62 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03042-HP-I",
    "sku": "03042-HP-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-42-hp-i-high-power-62-amp-03042-hp-i",
    "name": "Batería Ecuador 42 HP I HIGH POWER 62 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "62 Ah",
    "shortSpec": "Batería Ecuador 42 HP I HIGH POWER 62 AMP con tecnología de libre mantenimiento. 62 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "62 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "4 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 42 HP I HIGH POWER 62 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "4 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-03055-HD",
    "sku": "03055-HD",
    "slug": "bater-as-ecuador-bater-a-ecuador-55-hd-14pl-63amp-servicio-publico-03055-hd",
    "name": "Batería Ecuador 55 HD 14PL 63AMP SERVICIO PUBLICO",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "63 Ah",
    "shortSpec": "Batería Ecuador 55 HD 14PL 63AMP SERVICIO PUBLICO con tecnología de libre mantenimiento. 63 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "63 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 55 HD 14PL 63AMP SERVICIO PUBLICO disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03055-HD-I",
    "sku": "03055-HD-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-55-hd-i-14pl-63amp-servicio-publico-03055-hd-i",
    "name": "Batería Ecuador 55 HD I 14PL 63AMP SERVICIO PUBLICO",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "63 Ah",
    "shortSpec": "Batería Ecuador 55 HD I 14PL 63AMP SERVICIO PUBLICO con tecnología de libre mantenimiento. 63 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "63 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 55 HD I 14PL 63AMP SERVICIO PUBLICO disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03065-HP",
    "sku": "03065-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-65-hp-high-power-65-amp-03065-hp",
    "name": "Batería Ecuador 65 HP HIGH POWER 65 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "65 Ah",
    "shortSpec": "Batería Ecuador 65 HP HIGH POWER 65 AMP con tecnología de libre mantenimiento. 65 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "65 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 65 HP HIGH POWER 65 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-03066-HP",
    "sku": "03066-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-66-hp-high-power-84-amp-03066-hp",
    "name": "Batería Ecuador 66 HP HIGH POWER 84 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "camionetas",
    "plates": "84 Ah",
    "shortSpec": "Batería Ecuador 66 HP HIGH POWER 84 AMP con tecnología de libre mantenimiento. 84 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "84 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador 66 HP HIGH POWER 84 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-030N100-SHD-I",
    "sku": "030N100-SHD-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-n100-shd-i-super-heavy-duty-104-amp-030n100-shd-i",
    "name": "Batería Ecuador N100 SHD I SUPER HEAVY DUTY  104 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "104 Ah",
    "shortSpec": "Batería Ecuador N100 SHD I SUPER HEAVY DUTY  104 AMP con tecnología de libre mantenimiento. 104 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "104 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador N100 SHD I SUPER HEAVY DUTY  104 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-030N150-SHD",
    "sku": "030N150-SHD",
    "slug": "bater-as-ecuador-bater-a-ecuador-n150-shd-super-heavy-duty-160-amp-030n150-shd",
    "name": "Batería Ecuador N150 SHD SUPER HEAVY DUTY 160 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "pesado",
    "plates": "160 Ah",
    "shortSpec": "Batería Ecuador N150 SHD SUPER HEAVY DUTY 160 AMP con tecnología de libre mantenimiento. 160 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "160 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador N150 SHD SUPER HEAVY DUTY 160 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-030N40-FE-I",
    "sku": "030N40-FE-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-n40-fe-i-full-equipo-45-amp-030n40-fe-i",
    "name": "Batería Ecuador N40 FE I FULL EQUIPO 45 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "45 Ah",
    "shortSpec": "Batería Ecuador N40 FE I FULL EQUIPO 45 AMP con tecnología de libre mantenimiento. 45 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "45 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador N40 FE I FULL EQUIPO 45 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-030N40-HP",
    "sku": "030N40-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-n40-hp-high-power-50-amp-030n40-hp",
    "name": "Batería Ecuador N40 HP HIGH POWER 50 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "50 Ah",
    "shortSpec": "Batería Ecuador N40 HP HIGH POWER 50 AMP con tecnología de libre mantenimiento. 50 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "50 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador N40 HP HIGH POWER 50 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-030N40-HP-I",
    "sku": "030N40-HP-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-n40-hp-i-high-power-50-amp-030n40-hp-i",
    "name": "Batería Ecuador N40 HP I HIGH POWER 50 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "50 Ah",
    "shortSpec": "Batería Ecuador N40 HP I HIGH POWER 50 AMP con tecnología de libre mantenimiento. 50 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "50 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador N40 HP I HIGH POWER 50 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-030NS40-FE",
    "sku": "030NS40-FE",
    "slug": "bater-as-ecuador-bater-a-ecuador-ns40-fe-full-equipo-42-amp-030ns40-fe",
    "name": "Batería Ecuador NS40 FE FULL EQUIPO 42 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "42 Ah",
    "shortSpec": "Batería Ecuador NS40 FE FULL EQUIPO 42 AMP con tecnología de libre mantenimiento. 42 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "42 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador NS40 FE FULL EQUIPO 42 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-030NS40-FE-I",
    "sku": "030NS40-FE-I",
    "slug": "bater-as-ecuador-bater-a-ecuador-ns40-fe-i-full-equipo-42-amp-030ns40-fe-i",
    "name": "Batería Ecuador NS40 FE I FULL EQUIPO 42 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "42 Ah",
    "shortSpec": "Batería Ecuador NS40 FE I FULL EQUIPO 42 AMP con tecnología de libre mantenimiento. 42 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "42 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "1 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador NS40 FE I FULL EQUIPO 42 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "1 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": false
  },
  {
    "id": "bat-030NS40-HP",
    "sku": "030NS40-HP",
    "slug": "bater-as-ecuador-bater-a-ecuador-ns40-hp-high-power-45-amp-030ns40-hp",
    "name": "Batería Ecuador NS40 HP HIGH POWER 45 AMP",
    "brand": "BATERÍAS ECUADOR",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "45 Ah",
    "shortSpec": "Batería Ecuador NS40 HP HIGH POWER 45 AMP con tecnología de libre mantenimiento. 45 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BATERÍAS ECUADOR",
      "Capacidad / Potencia": "45 Ah",
      "Garantía": "Garantía Nacional 15 a 18 meses",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "2 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power Selección Oficial",
      "Tecnología": "Placas Reforzadas Heavy Duty",
      "Garantía Certificada": "Garantía Nacional 15 a 18 meses",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Ecuador NS40 HP HIGH POWER 45 AMP disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "Garantía Nacional 15 a 18 meses",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "2 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/baterias-ecuador-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial Garantía Nacional 15 a 18 meses",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  },
  {
    "id": "bat-42HPS4",
    "sku": "42HPS4",
    "slug": "bosch-bater-a-bosch-42-hp-s4-55amp-604232-42hps4",
    "name": "Batería Bosch 42 HP S4 55AMP 604232",
    "brand": "BOSCH",
    "category": "baterias",
    "applicationType": "autos",
    "plates": "55 Ah",
    "shortSpec": "Batería Bosch 42 HP S4 55AMP 604232 con tecnología de libre mantenimiento. 55 Ah, arranque confiable en frío.",
    "specifications": {
      "Marca": "BOSCH",
      "Capacidad / Potencia": "55 Ah",
      "Garantía": "18 meses / 40.000 Km",
      "Tipo de Borne": "Estándar Automotriz (Izquierdo / Derecho según código)",
      "Stock": "3 unidades en Pedernales"
    },
    "fullSpecs": {
      "Línea": "High Power / S4",
      "Tecnología": "PowerFrame Alemana",
      "Garantía Certificada": "18 meses / 40.000 Km",
      "Origen": "Distribución Autorizada LiderPro"
    },
    "description": "Batería Bosch 42 HP S4 55AMP 604232 disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
    "priceNote": "Precio preferencial entregando batería usada (Plan Eco-Valor SRI)",
    "warranty": "18 meses / 40.000 Km",
    "commercialStatus": "VERIFIED",
    "inStock": true,
    "stockStatusText": "3 unidades disponibles en Bodega Pedernales",
    "dispatchIndicator": "Entrega & Instalación Inmediata",
    "primaryOriginRecommendation": "Pedernales",
    "imageUrl": "/images/products/bosch-s4-real.png",
    "compatibleVehicles": [
      {
        "make": "Línea Nacional",
        "model": "Autos, Camionetas y Flotas según amperaje",
        "yearRange": "12V"
      }
    ],
    "features": [
      "Diseño profesional institucional según modelo real en tienda",
      "Garantía oficial 18 meses / 40.000 Km",
      "Diagnóstico y prueba de alternador sin costo en local",
      "Facturación electrónica autorizada por el SRI"
    ],
    "faqs": [
      {
        "question": "¿Reciben mi batería vieja como parte de pago?",
        "answer": "Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado."
      },
      {
        "question": "¿La instalación tiene costo adicional?",
        "answer": "La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales."
      }
    ],
    "isBestSeller": true
  }
];
