export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: "baterias" | "lubricantes" | "filtros" | "refrigerantes" | "frenos" | "bujias" | "aditivos";
  shortSpec: string;
  fullSpecs: Record<string, string>;
  description: string;
  priceEstimate?: string;
  priceNote: string;
  warranty: string;
  inStock: boolean;
  stockStatusText: string;
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
}

export const PRODUCTS: Product[] = [
  {
    id: "bat-001",
    sku: "LP-BAT-NS60L-55",
    slug: "bateria-liderpro-ns60l-55ah",
    name: "Batería Automotriz Sellada NS60L 55Ah / 480 CCA",
    brand: "LiderPro Power Series",
    category: "baterias",
    shortSpec: "12V 55Ah • 480 CCA • Bornes Izquierda (L) • Libre Mantenimiento",
    fullSpecs: {
      "Voltaje": "12V",
      "Capacidad (20h)": "55 Ah",
      "CCA (-18°C)": "480 A",
      "Tecnología": "Calcio-Plata Sellada (Libre de mantenimiento)",
      "Polaridad": "Izquierda (-/+)",
      "Dimensiones": "238 x 129 x 227 mm",
      "Garantía": "15 Meses con cobertura nacional",
    },
    description:
      "Batería sellada con aleación plomo-calcio-plata de alta resistencia a ciclos térmicos. Diseñada para arranques confiables tanto en el nivel del mar como a gran altura.",
    priceEstimate: "$74.00",
    priceNote: "Precio referencial (precio final con entrega/instalación y entrega de batería usada puede variar)",
    warranty: "15 Meses de garantía técnica directa",
    inStock: true,
    stockStatusText: "Disponible en Pedernales y Quito",
    primaryOriginRecommendation: "Pedernales",
    imageUrl: "/images/products/battery-ns60.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Sail", yearRange: "2012-2022", engine: "1.4L / 1.5L" },
      { make: "Chevrolet", model: "Aveo Family / Emotion", yearRange: "2008-2018", engine: "1.5L / 1.6L" },
      { make: "Toyota", model: "Yaris", yearRange: "2006-2021", engine: "1.3L / 1.5L" },
      { make: "Nissan", model: "Tiida", yearRange: "2007-2018", engine: "1.6L / 1.8L" },
      { make: "Kia", model: "Rio", yearRange: "2012-2020", engine: "1.4L / 1.6L" },
    ],
    features: [
      "Tecnología alemana en formulación de rejillas",
      "Ojo visor hidrómetro para control visual de carga",
      "Arranque en frío superior (480 CCA certificados)",
      "Soporte anti-vibración para carreteras exigentes",
    ],
    faqs: [
      {
        question: "¿Incluye entrega a domicilio e instalación?",
        answer: "En el perímetro urbano de Pedernales y puntos coordinados de Quito ofrecemos servicio de chequeo e instalación previa cita por WhatsApp.",
      },
      {
        question: "¿Qué garantía tiene este producto?",
        answer: "Cuenta con 15 meses de garantía contra defectos de fabricación con respaldo de la red LiderPro.",
      },
    ],
  },
  {
    id: "bat-002",
    sku: "LP-BAT-DIN66-660",
    slug: "bateria-liderpro-din66-660cca",
    name: "Batería Automotriz Norma Europea DIN 66 (66Ah / 600 CCA)",
    brand: "LiderPro Heavy Duty",
    category: "baterias",
    shortSpec: "12V 66Ah • 600 CCA • Caja Baja DIN • Libre Mantenimiento",
    fullSpecs: {
      "Voltaje": "12V",
      "Capacidad": "66 Ah",
      "CCA (-18°C)": "600 A",
      "Norma": "DIN 66 / LN2",
      "Polaridad": "Derecha (- / + invertido estándar europeo)",
      "Garantía": "18 Meses nacional",
    },
    description:
      "Formato europeo bajo perfil con alta reserva de energía para vehículos con alta demanda eléctrica y computadoras de a bordo exigentes.",
    priceEstimate: "$98.00",
    priceNote: "Precio referencial sujeto a validación de entrega de batería usada",
    warranty: "18 Meses de garantía técnica",
    inStock: true,
    stockStatusText: "Stock confirmado en Quito y Pedernales",
    primaryOriginRecommendation: "Quito",
    imageUrl: "/images/products/battery-din66.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Tracker Turbo", yearRange: "2020-2024", engine: "1.2L Turbo" },
      { make: "Renault", model: "Duster", yearRange: "2013-2023", engine: "1.6L / 2.0L" },
      { make: "Volkswagen", model: "Gol / Polo", yearRange: "2010-2022", engine: "1.6L" },
      { make: "Hyundai", model: "Tucson", yearRange: "2010-2020", engine: "2.0L" },
      { make: "Kia", model: "Sportage Active", yearRange: "2009-2021", engine: "2.0L" },
    ],
    features: [
      "Apta para SUVs y motores con sistemas electrónicos modernos",
      "Alta reserva de ciclo profundo para tráfico pesado",
      "Resistencia a sobrecargas y temperaturas extremas",
    ],
    faqs: [
      {
        question: "¿Cómo confirmo si le sirve a mi SUV?",
        answer: "Envíanos foto de tu batería actual por WhatsApp o indícanos marca, año y cilindraje para confirmar dimensiones exactas.",
      },
    ],
  },
  {
    id: "lub-001",
    sku: "LP-LUB-5W30-SYN",
    slug: "aceite-motor-sintetico-5w30-api-sp-liderpro",
    name: "Aceite 100% Sintético 5W-30 API SP / ILSAC GF-6A (Galón)",
    brand: "LiderPro Formula Pro",
    category: "lubricantes",
    shortSpec: "Viscosidad 5W-30 • 100% Sintético • Norma API SP • Presentación Galón (3.785 L)",
    fullSpecs: {
      "Viscosidad": "SAE 5W-30",
      "Base": "100% Sintética Grupo III+",
      "Norma API": "API SP / Resource Conserving",
      "Certificación": "ILSAC GF-6A / GM dexos1 Gen 3 compatible",
      "Volumen": "3.785 Litros (1 Galón)",
      "Intervalo sugerido": "7,500 – 10,000 km según condiciones de manejo",
    },
    description:
      "Lubricante formulado para máxima protección contra el pre-encendido a baja velocidad (LSPI) en motores modernos turboalimentados y de inyección directa.",
    priceEstimate: "$28.50",
    priceNote: "Precio unitario galón (consultar promociones por combo con filtro)",
    warranty: "Garantía de originalidad y lote certificado de fábrica",
    inStock: true,
    stockStatusText: "Disponible para envío inmediato",
    primaryOriginRecommendation: "Nacional",
    imageUrl: "/images/products/oil-5w30.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Sail", yearRange: "2015-2023", engine: "1.5L" },
      { make: "Chevrolet", model: "Tracker Turbo", yearRange: "2020-2024", engine: "1.2L Turbo" },
      { make: "Kia", model: "Sportage", yearRange: "2016-2024", engine: "2.0L" },
      { make: "Hyundai", model: "Creta", yearRange: "2017-2023", engine: "1.6L" },
      { make: "Toyota", model: "Corolla", yearRange: "2010-2022", engine: "1.8L" },
    ],
    features: [
      "Protección contra desgaste en frío al encender el motor",
      "Economía de combustible verificada ILSAC GF-6A",
      "Dispersión de hollín y limpieza interna de válvulas",
    ],
    faqs: [
      {
        question: "¿Este aceite sirve para climas calientes como la Costa?",
        answer: "Sí, el índice '30' a temperatura de operación mantiene una película protectora robusta incluso en calor extremo, mientras el '5W' asegura lubricación inmediata al arranque.",
      },
    ],
  },
  {
    id: "lub-002",
    sku: "LP-LUB-15W40-DIESEL",
    slug: "aceite-motor-15w40-ci4-heavy-duty",
    name: "Aceite Motor Diésel Heavy Duty 15W-40 API CI-4 Plus (Galón)",
    brand: "LiderPro FleetMaster",
    category: "lubricantes",
    shortSpec: "Viscosidad 15W-40 • Diésel Trabajo Pesado • API CI-4+ / SL • 1 Galón",
    fullSpecs: {
      "Viscosidad": "SAE 15W-40",
      "Aplicación": "Motores Diésel turbo y aspirados",
      "Norma": "API CI-4 / CH-4 / CG-4 / SL",
      "Presentación": "Galón (3.785 L) y Cuñete (19 L)",
    },
    description:
      "Aceite de alta resistencia térmica para camionetas, furgones y flotas de trabajo comercial e interprovincial en Ecuador.",
    priceEstimate: "$24.00",
    priceNote: "Precio galón referencial (consultar por volumen para flotas)",
    warranty: "Autenticidad certificada",
    inStock: true,
    stockStatusText: "Stock para flotas y talleres disponible",
    primaryOriginRecommendation: "Pedernales",
    imageUrl: "/images/products/oil-15w40.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "D-Max", yearRange: "2006-2022", engine: "2.5L / 3.0L Diésel" },
      { make: "Toyota", model: "Hilux", yearRange: "2005-2020", engine: "2.5L / 3.0L D4D" },
      { make: "Nissan", model: "Frontier", yearRange: "2008-2021", engine: "2.5L Diésel" },
    ],
    features: [
      "Control avanzado de lodos y acidez por combustibles con azufre",
      "Resistencia extrema para transporte de carga y rutas costeras/montaña",
    ],
    faqs: [],
  },
  {
    id: "fil-001",
    sku: "LP-FIL-ACE-CS101",
    slug: "filtro-aceite-blindado-alta-eficiencia-liderpro",
    name: "Filtro de Aceite Blindado de Alta Eficiencia (Spin-On)",
    brand: "LiderPro Filters",
    category: "filtros",
    shortSpec: "Filtración sintética 99% a 20 micras • Válvula anti-drenaje de silicona",
    fullSpecs: {
      "Tipo": "Metálico blindado tipo roscado",
      "Válvula Bypass": "Tarada a especificación OEM",
      "Medio filtrante": "Microfibra celulosa resinada",
    },
    description:
      "Filtro con empaque sellador de alta temperatura que previene fugas y retiene partículas abrasivas microscópicas.",
    priceEstimate: "$5.50 - $8.00",
    priceNote: "Precio varía según rosca y aplicación del vehículo",
    warranty: "Garantía contra defectos de sellado",
    inStock: true,
    stockStatusText: "Todas las aplicaciones más comunes en stock",
    primaryOriginRecommendation: "Nacional",
    imageUrl: "/images/products/filter-oil.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Sail", yearRange: "2012-2022", engine: "1.4L / 1.5L" },
      { make: "Chevrolet", model: "Aveo Family", yearRange: "2008-2018", engine: "1.5L" },
      { make: "Kia", model: "Rio", yearRange: "2012-2020", engine: "1.4L" },
      { make: "Hyundai", model: "Accent", yearRange: "2012-2020", engine: "1.4L" },
    ],
    features: [
      "Retención de partículas de carbón y viruta metálica",
      "Válvula de alivio que garantiza flujo constante aún en frío",
    ],
    faqs: [],
  },
  {
    id: "ref-001",
    sku: "LP-REF-OAT-5050",
    slug: "refrigerante-organico-oat-5050-liderpro",
    name: "Refrigerante Orgánico Listo para Usar 50/50 OAT (Galón Rojo/Rosa)",
    brand: "LiderPro ThermoShield",
    category: "refrigerantes",
    shortSpec: "Tecnología OAT • Premezclado 50/50 • Punto de ebullición +129°C con tapa a presión",
    fullSpecs: {
      "Concentración": "50% Etilenglicol / 50% Agua desmineralizada",
      "Tecnología": "Ácidos Orgánicos (OAT) Libre de nitritos, boratos y fosfatos",
      "Protección aluminio": "Máxima protección contra cavitación en bomba de agua",
      "Color": "Rosa / Rojo fluorescente para detección de fugas",
      "Durabilidad": "Hasta 5 años o 100,000 km",
    },
    description:
      "Refrigerante anticongelante y antioxidante para sistemas modernos con radiadores de aluminio y componentes plásticos de alta temperatura.",
    priceEstimate: "$14.50",
    priceNote: "Precio unitario galón",
    warranty: "Fórmula de grado industrial",
    inStock: true,
    stockStatusText: "En stock permanente",
    primaryOriginRecommendation: "Nacional",
    imageUrl: "/images/products/coolant-oat.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Sail", yearRange: "2012-2023", engine: "1.4L / 1.5L" },
      { make: "Toyota", model: "Yaris / Hilux", yearRange: "2005-2023", engine: "Varios" },
      { make: "Kia", model: "Sportage", yearRange: "2010-2023", engine: "2.0L" },
      { make: "Nissan", model: "Versa", yearRange: "2012-2023", engine: "1.6L" },
    ],
    features: [
      "No requiere agregar agua: viene listo con agua desionizada",
      "Evita sobrecalentamiento en cuestas de la Sierra y trancones costeros",
      "Protección anticorrosión en bloque y culata",
    ],
    faqs: [],
  },
  {
    id: "fre-001",
    sku: "LP-FRE-CER-044",
    slug: "pastillas-freno-ceramicas-premium-liderpro",
    name: "Pastillas de Freno Cerámicas Premium Ultra-Silenciosas",
    brand: "LiderPro BrakeTech",
    category: "frenos",
    shortSpec: "Compuesto Cerámico • Ranuradas y biseladas • Incluye láminas antirruido",
    fullSpecs: {
      "Material": "Cerámica de fricción con microfibras de cobre",
      "Polvo residual": "Muy bajo (mantiene aros limpios)",
      "Ruido": "Coeficiente acústico reducido con shims amortiguadores",
      "Resistencia térmica": "Hasta 550°C sin fatiga (fade-resistant)",
    },
    description:
      "Juego de pastillas de freno para eje delantero, formuladas para una frenada progresiva y segura sin chirridos ni desgaste prematuro del disco.",
    priceEstimate: "$22.00 - $35.00",
    priceNote: "Precio varía según modelo de vehículo",
    warranty: "Garantía de adaptación exacta OEM",
    inStock: true,
    stockStatusText: "Consultar aplicación por modelo exacto",
    primaryOriginRecommendation: "Quito",
    imageUrl: "/images/products/brake-pads.jpg",
    compatibleVehicles: [
      { make: "Chevrolet", model: "Sail", yearRange: "2012-2020", engine: "1.4L / 1.5L" },
      { make: "Kia", model: "Sportage Active", yearRange: "2008-2020", engine: "2.0L" },
      { make: "Hyundai", model: "Tucson", yearRange: "2010-2019", engine: "2.0L" },
      { make: "Renault", model: "Duster", yearRange: "2012-2021", engine: "1.6L / 2.0L" },
    ],
    features: [
      "Frenada confiable en bajadas pronunciadas de la Sierra",
      "No raya los discos de freno",
      "Excelente respuesta en lluvia y carreteras húmedas",
    ],
    faqs: [],
  },
];
