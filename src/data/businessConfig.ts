export type CommercialTruthStatus = "VERIFIED" | "REFERENCE" | "PENDING_VERIFICATION" | "NOT_PUBLISHABLE";

export interface CommercialDataField<T = string> {
  value: T;
  source: string;
  status: CommercialTruthStatus;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface BusinessConfig {
  name: string;
  slogan: string;
  heroHeadline: string;
  heroSubtitle: string;
  supportingProposition: string;
  supportAvailability: {
    status: CommercialTruthStatus;
    label: string;
    description: string;
  };
  legalNotice: string;
  relationshipStatus: string;
  locations: {
    pedernales: {
      name: string;
      city: string;
      province: string;
      region: string;
      role: string;
      address: string;
      phone: string;
      whatsapp: string;
      hours: string;
      isStrategicHub: boolean;
      features: string[];
    };
    quito: {
      name: string;
      city: string;
      province: string;
      region: string;
      role: string;
      address: string;
      phone: string;
      whatsapp: string;
      hours: string;
      isStrategicHub: boolean;
      features: string[];
    };
  };
  shipping: {
    primaryMessage: string;
    subMessage: string;
    disclaimer: string;
    zones: string[];
  };
  whatsappMasterNumber: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "LiderPro",
  slogan: "Distribuidor Autorizado Multimarca desde Pedernales para Todo el Ecuador.",
  heroHeadline: "Distribuidor Autorizado Multimarca para Tu Vehículo y Flota.",
  heroSubtitle:
    "Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline, Castrol y Fram. Despacho inmediato mayorista y minorista desde nuestro Hub Central en Pedernales hacia las 24 provincias.",
  supportingProposition:
    "Productos 100% originales con garantía de fábrica, facturación electrónica SRI y validación técnica por manual antes de enviar.",
  supportAvailability: {
    status: "VERIFIED",
    label: "Stock disponible en Pedernales para despacho nacional",
    description: "Atención comercial y asesoría técnica directa por WhatsApp.",
  },
  legalNotice:
    "LiderPro Ecuador opera como Distribuidor Autorizado Multimarca de lubricantes, baterías y filtros automotrices e industriales, con Hub Central de Operaciones y Despacho Mayorista/Minorista en Pedernales, Manabí, y alcance logístico diario a las 24 provincias del país.",
  relationshipStatus:
    "Distribuidor Autorizado Multimarca con Sede Central en Pedernales (Manabí) y red logística nacional.",
  locations: {
    pedernales: {
      name: "Hub Central Pedernales — Centro de Operaciones y Despacho Nacional",
      city: "Pedernales",
      province: "Manabí",
      region: "Costa / Hub Nacional",
      role: "Centro principal de acopio multimarca, mostrador técnico minorista/mayorista, atención al sector camaronero y despacho diario interprovincial.",
      address: "Sede Central Pedernales, Manabí (Zona Comercial Automotriz)",
      phone: "+593 98 188 1515",
      whatsapp: "593981881515",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: true,
      features: [
        "Bodega matriz de Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline y Castrol",
        "Despacho diario a nivel nacional según destino coordinado por WhatsApp",
        "Abastecimiento de canecas, tambores y Baterías Grupo 31 para camaroneras y flotas",
        "Diagnóstico eléctrico y facturación electrónica SRI inmediata",
      ],
    },
    quito: {
      name: "Enlace Logístico Sierra — Quito, Santo Domingo & Costa Norte",
      city: "Quito",
      province: "Pichincha",
      region: "Sierra & Enlace Interprovincial",
      role: "Ruta directa de recepción y distribución diaria para clientes, talleres y flotas en Quito, Santo Domingo, Manta, Guayaquil y Sierra centro.",
      address: "Conexión Directa Interprovincial y Courier Autorizado",
      phone: "+593 98 188 1515",
      whatsapp: "593981881515",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: true,
      features: [
        "Entrega al día siguiente en Quito, Santo Domingo, Manta y Guayaquil",
        "Protocolo de embalaje antiderrame y anclaje técnico de baterías",
        "Atención corporativa para talleres mecánicos y cooperativas",
        "Seguimiento con foto de guía de remisión por WhatsApp",
      ],
    },
  },
  shipping: {
    primaryMessage: "Hub Logístico Pedernales: Despacho Diario a las 24 Provincias",
    subMessage: "Transporte Interprovincial y Encomiendas a Nivel Nacional según Destino",
    disclaimer:
      "Todos los despachos salen verificados desde nuestra Sede Central en Pedernales (Manabí) con foto de guía y protocolo de seguridad: embalaje reforzado antiderrame para lubricantes/refrigerantes y anclaje técnico para baterías selladas.",
    zones: [
      "Eje Directo (Entrega al día siguiente): Quito, Santo Domingo, Manta, Portoviejo, Esmeraldas y Guayaquil",
      "Manabí y Perfil Costero: Cojimíes, Jama, San Vicente, Bahía, Chone, El Carmen",
      "Sierra y Austro: Ambato, Riobamba, Latacunga, Cuenca, Loja e Ibarra",
      "Sector Productivo y Camaronero: Despacho de canecas, tambores y baterías Grupo 31 en ruta",
    ],
  },
  whatsappMasterNumber: "593981881515",
  socialLinks: {
    instagram: "https://www.instagram.com/liderpropedernales?srtk=MWRqOWcxd2w4YXMyeg==",
    facebook: "https://www.facebook.com/share/1CHEkuMeis/",
    tiktok: "https://www.tiktok.com/@lider.pro.pederna?_r=1&_t=ZS-9AOnTysHvDI",
  },
};
