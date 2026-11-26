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
  legalName: string;
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
      directPhone: string;
      whatsapp: string;
      directWhatsapp: string;
      hours: string;
      isStrategicHub: boolean;
      features: string[];
    };
    nacional: {
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
  pedernalesDirectNumber: string;
  pedernalesDirectPhone: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  bankTransfer: {
    status: CommercialTruthStatus;
    bank: string;
    accountType: string;
    accountNumber: string;
    idNumber: string;
    holderName: string;
    acceptedBanks: string[];
    interbankRule: string;
    verificationRule: string;
    publicInstructionsFallback: string;
  };
}

export const OFFICIAL_BANK_ACCOUNT = {
  bank: "Banco Pichincha",
  accountType: "Cuenta de Ahorros",
  accountNumber: "2216090525",
  idNumber: "1308068814",
  holderName: "ADRIAN MOSQUERA",
  interbankRule:
    "Aceptamos transferencias interbancarias ÚNICAMENTE desde bancos con convenio directo (acreditación directa/inmediata hacia esta cuenta de Banco Pichincha).",
  verificationRule:
    "NO se despacha ningún pedido ni se autoriza retiro por transferencia hasta verificar el pago con el comprobante completo (captura íntegra donde se vea fecha, monto, número de comprobante y titular).",
} as const;

export function formatOfficialBankTransferDetails(): string {
  return (
    `*Única cuenta autorizada para transferencias:*\n` +
    `• *Banco:* ${OFFICIAL_BANK_ACCOUNT.bank}\n` +
    `• *Tipo:* ${OFFICIAL_BANK_ACCOUNT.accountType}\n` +
    `• *Número:* ${OFFICIAL_BANK_ACCOUNT.accountNumber}\n` +
    `• *C.I.:* ${OFFICIAL_BANK_ACCOUNT.idNumber}\n` +
    `• *Titular:* ${OFFICIAL_BANK_ACCOUNT.holderName}\n\n` +
    `⚠️ ${OFFICIAL_BANK_ACCOUNT.interbankRule}\n` +
    `📎 *Importante:* ${OFFICIAL_BANK_ACCOUNT.verificationRule}`
  );
}

/**
 * Devuelve los datos bancarios oficiales verificados (permite override opcional por BANK_TRANSFER_DETAILS).
 */
export function getConfiguredBankTransferDetails(): string {
  if (typeof process !== "undefined" && process.env?.BANK_TRANSFER_DETAILS?.trim()) {
    return process.env.BANK_TRANSFER_DETAILS.trim();
  }
  return formatOfficialBankTransferDetails();
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "LiderPro",
  // TEMPORARY: Meta Business Verification — remove/revert after approval
  legalName: "MOSQUERA ROBLES ADRIAN RODOLFO",
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
      address: "Vía al Carmen (Frente a gasolinera Pedernales), Pedernales, Manabí",
      phone: "+593 96 748 9002",
      directPhone: "+593 98 389 3231",
      whatsapp: "593967489002",
      directWhatsapp: "593983893231",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: true,
      features: [
        "Bodega matriz de Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline y Castrol",
        "Despacho diario a nivel nacional según destino coordinado por WhatsApp",
        "Abastecimiento de canecas, tambores y Baterías Grupo 31 para camaroneras y flotas",
        "Diagnóstico eléctrico y facturación electrónica SRI inmediata",
      ],
    },
    nacional: {
      name: "Cobertura Nacional — Envíos a Todo el Ecuador (<48h)",
      city: "Todo el Ecuador",
      province: "24 Provincias",
      region: "Despacho Nacional desde Pedernales",
      role: "Envíos diarios a todo el Ecuador en menos de 48h desde nuestra sede única en Pedernales para clientes particulares, talleres y flotas.",
      address: "Despacho directo desde Pedernales por Cooperativa Interprovincial y Courier Autorizado",
      phone: "+593 96 748 9002",
      whatsapp: "593967489002",
      hours: "Lunes a Sábado: 08:00 – 18:00",
      isStrategicHub: false,
      features: [
        "Envíos a todo el Ecuador en menos de 48h desde Pedernales",
        "Protocolo de embalaje antiderrame y anclaje técnico de baterías",
        "Instalación gratuita de baterías a domicilio dentro de Pedernales",
        "Seguimiento con foto de guía de remisión y factura electrónica SRI",
      ],
    },
  },
  shipping: {
    primaryMessage: "Hub Logístico Pedernales: Envíos a Todo el Ecuador (<48h)",
    subMessage: "Transporte Interprovincial y Encomiendas a Nivel Nacional desde Pedernales",
    disclaimer:
      "Todos los despachos salen verificados desde nuestra sede única en Pedernales (Manabí) con foto de guía y protocolo de seguridad: embalaje reforzado antiderrame para lubricantes/refrigerantes y anclaje técnico para baterías selladas.",
    zones: [
      "Eje Directo (24h–48h): Santo Domingo, Manta, Portoviejo, Esmeraldas, Guayaquil y todo el país",
      "Manabí y Perfil Costero: Pedernales (instalación gratis de baterías a domicilio), Cojimíes, Jama, San Vicente, Bahía, Chone, El Carmen",
      "Sierra, Austro y Oriente: Ambato, Riobamba, Latacunga, Cuenca, Loja, Ibarra y provincias en <48h",
      "Sector Productivo y Camaronero: Despacho de canecas, tambores y baterías Grupo 31 en ruta",
    ],
  },
  whatsappMasterNumber: "593967489002",
  pedernalesDirectNumber: "593983893231",
  pedernalesDirectPhone: "+593 98 389 3231",
  socialLinks: {
    instagram: "https://www.instagram.com/liderpropedernales?srtk=MWRqOWcxd2w4YXMyeg==",
    facebook: "https://www.facebook.com/share/1CHEkuMeis/",
    tiktok: "https://www.tiktok.com/@lider.pro.pederna?_r=1&_t=ZS-9AOnTysHvDI",
  },
  bankTransfer: {
    status: "VERIFIED",
    bank: OFFICIAL_BANK_ACCOUNT.bank,
    accountType: OFFICIAL_BANK_ACCOUNT.accountType,
    accountNumber: OFFICIAL_BANK_ACCOUNT.accountNumber,
    idNumber: OFFICIAL_BANK_ACCOUNT.idNumber,
    holderName: OFFICIAL_BANK_ACCOUNT.holderName,
    acceptedBanks: ["Banco Pichincha"],
    interbankRule: OFFICIAL_BANK_ACCOUNT.interbankRule,
    verificationRule: OFFICIAL_BANK_ACCOUNT.verificationRule,
    publicInstructionsFallback: formatOfficialBankTransferDetails(),
  },
};
