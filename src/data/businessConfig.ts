export interface BusinessConfig {
  name: string;
  slogan: string;
  supportingProposition: string;
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
  slogan: "Tu vehículo. Nuestra experiencia.",
  supportingProposition:
    "Identificamos tu vehículo, verificamos la compatibilidad y te ayudamos a conseguir el producto correcto, con atención directa por WhatsApp y envíos a todo Ecuador.",
  legalNotice:
    "Operación comercial independiente bajo el modelo y estándares de LiderPro, con conexión operativa directa con la planta principal. Puntos estratégicos de atención y distribución en Pedernales (Manabí) y Quito (Pichincha).",
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
      phone: "+593 99 999 9999", // Editable placeholder
      whatsapp: "593999999999",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: true,
      features: [
        "Despacho prioritario para la Costa",
        "Diagnóstico y prueba de baterías en local",
        "Retiro en punto físico habilitado",
        "Asesoría técnica automotriz inmediata",
      ],
    },
    quito: {
      name: "LiderPro Quito — Red de Atención Sierra",
      city: "Quito",
      province: "Pichincha",
      region: "Sierra",
      role: "Atención comercial, coordinación logística y soporte para Pichincha y Sierra.",
      address: "Sector Estratégico Norte / Centro Logístico",
      phone: "+593 99 888 8888", // Editable placeholder
      whatsapp: "593998888888",
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
    subMessage: "Entrega estimada 24–48 h*",
    disclaimer:
      "*Tiempo estimado sujeto a disponibilidad de stock, cobertura de la transportadora, ciudad de destino, hora de confirmación del pedido y condiciones viales/logísticas.",
    zones: [
      "Manabí (Despacho prioritario desde Pedernales)",
      "Pichincha (Cobertura desde Quito)",
      "Costa (Guayas, El Oro, Esmeraldas, Los Ríos, Santo Domingo)",
      "Sierra (Azuay, Tungurahua, Chimborazo, Imbabura, Loja)",
      "Oriente y zonas especiales (Bajo confirmación de cobertura)",
    ],
  },
  whatsappMasterNumber: "593999999999", // Master number
};
