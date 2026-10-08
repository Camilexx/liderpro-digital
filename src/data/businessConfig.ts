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
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "LiderPro",
  slogan: "El producto correcto para tu vehículo. Sin adivinar.",
  heroHeadline: "El producto correcto para tu vehículo. Sin adivinar.",
  heroSubtitle:
    "Encuentra baterías, lubricantes y repuestos automotrices de calidad especializada, con asesoría técnica real y envíos a todo Ecuador.",
  supportingProposition:
    "Calidad especializada, asesoría técnica real y envíos a todo Ecuador. Verificamos la compatibilidad exacta antes de comprar para que evites errores.",
  supportAvailability: {
    status: "PENDING_VERIFICATION",
    label: "Atención comercial y asesoría técnica activa",
    description: "Horario comercial extendido con respuesta ágil por WhatsApp.",
  },
  legalNotice:
    "Operación comercial independiente bajo el modelo y estándares de LiderPro, con conexión operativa directa con la planta principal. Centros de atención y distribución técnica en Pedernales (Manabí) y Quito (Pichincha) con cobertura nacional.",
  relationshipStatus:
    "Operación independiente LiderPro con enlace operativo directo con planta principal.",
  locations: {
    pedernales: {
      name: "LiderPro Pedernales — Centro Estratégico Manabí",
      city: "Pedernales",
      province: "Manabí",
      region: "Costa",
      role: "Atención directa, despacho rápido y cobertura para Manabí y perfil costero.",
      address: "Av. Principal y Acceso Comercial (Punto Autorizado)",
      phone: "+593 98 188 1515",
      whatsapp: "593981881515",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: true,
      features: [
        "Despacho coordinado para Manabí y Costa",
        "Diagnóstico y prueba de baterías en local",
        "Retiro en punto físico habilitado",
        "Asesoría técnica automotriz directa",
      ],
    },
    quito: {
      name: "LiderPro Quito — Red de Atención Sierra",
      city: "Quito",
      province: "Pichincha",
      region: "Sierra",
      role: "Atención comercial, coordinación logística y soporte para Pichincha y Sierra.",
      address: "Sector Estratégico Norte / Centro Logístico",
      phone: "+593 98 188 1515",
      whatsapp: "593981881515",
      hours: "Lunes a Viernes: 08:30 – 17:30 | Sábados: 09:00 – 13:00",
      isStrategicHub: true,
      features: [
        "Distribución y enlace interprovincial",
        "Atención para flotas y talleres",
        "Retiro coordinado previa confirmación",
        "Soporte especializado para altura y Sierra",
      ],
    },
  },
  shipping: {
    primaryMessage: "Envíos a nivel nacional",
    subMessage: "Tiempos de entrega según destino y operador*",
    disclaimer:
      "*Tiempo de tránsito sujeto a disponibilidad de producto, cobertura de la transportadora, ciudad de destino y confirmación con tu asesor técnico.",
    zones: [
      "Manabí y Costa (Coordinación desde Pedernales)",
      "Pichincha y Sierra (Coordinación desde Quito)",
      "Guayas, Azuay y principales capitales de provincia",
      "Oriente y zonas especiales (Bajo confirmación de cobertura)",
    ],
  },
  whatsappMasterNumber: "593981881515", // Master official number
};
