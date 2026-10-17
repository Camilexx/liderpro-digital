export interface FAQItem {
  id: string;
  category: "envios" | "pagos" | "garantias" | "b2b" | "horarios";
  categoryLabel: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  // Envíos
  {
    id: "env-1",
    category: "envios",
    categoryLabel: "Envíos y Rutas",
    question: "¿A qué ciudades de Ecuador realizan envíos?",
    answer:
      "Despachamos a las 24 provincias del país desde nuestra Sede Central en Pedernales (Manabí). Contamos con rutas directas con entrega en 24h hacia Quito, Santo Domingo, Manta, Portoviejo, Esmeraldas y Guayaquil. Para el resto de ciudades (Ambato, Cuenca, Loja, etc.), la entrega toma de 24h a 48h hábiles por transporte interprovincial o courier.",
  },
  {
    id: "env-2",
    category: "envios",
    categoryLabel: "Envíos y Rutas",
    question: "¿Cómo garantizan que las baterías y lubricantes no se dañen ni derramen en el viaje?",
    answer:
      "Aplicamos un protocolo estricto de embalaje técnico: los lubricantes y refrigerantes se envían con precinto de fábrica y film termorretráctil de seguridad. Las baterías viajan ancladas en posición vertical con protectores de bornes plásticos que evitan cualquier arco eléctrico o rozamiento durante el transporte.",
  },
  {
    id: "env-3",
    category: "envios",
    categoryLabel: "Envíos y Rutas",
    question: "¿Cómo rastreo el envío de mi pedido?",
    answer:
      "Una vez que el despacho es entregado en la empresa de transporte o courier en Pedernales, te enviamos inmediatamente por WhatsApp la foto de la guía física de remisión con el número de rastreo y los datos del transportista.",
  },

  // Pagos y Facturación
  {
    id: "pago-1",
    category: "pagos",
    categoryLabel: "Pagos y Facturación",
    question: "¿Cuáles son las formas de pago aceptadas?",
    answer:
      "Aceptamos transferencias bancarias directas e interbancarias a cuentas corrientes de Banco Pichincha, Banco Guayaquil y Banco del Pacífico. También recibimos pagos móviles instantáneos mediante DeUna, y efectivo directamente en nuestro mostrador del Hub Central de Pedernales.",
  },
  {
    id: "pago-2",
    category: "pagos",
    categoryLabel: "Pagos y Facturación",
    question: "¿Entregan factura electrónica autorizada por el SRI?",
    answer:
      "Sí, el 100% de nuestras ventas se respaldan con Factura Electrónica legalmente autorizada por el Servicio de Rentas Internas (SRI). Al confirmar tu pedido, nos proporcionas tu RUC o Cédula y correo electrónico; los archivos XML y RIDE (PDF) se envían de forma automática a tu bandeja de entrada.",
  },
  {
    id: "pago-3",
    category: "pagos",
    categoryLabel: "Pagos y Facturación",
    question: "¿Aceptan comprobantes de retención para empresas?",
    answer:
      "Sí, si tu empresa es Agente de Retención designado por el SRI, recibimos comprobantes de retención electrónica dentro del plazo reglamentario de 5 días hábiles a través de nuestro correo oficial de facturación.",
  },

  // Garantías
  {
    id: "gar-1",
    category: "garantias",
    categoryLabel: "Garantías y Calidad",
    question: "¿Qué garantía tienen las baterías automotrices?",
    answer:
      "Todas nuestras baterías Baterías Ecuador y Bosch cuentan con 12 meses de garantía directa de fábrica que cubre defectos internos de fabricación y corte de celdas. Entregamos el acumulador con su fecha de fabricación reciente y comprobación computarizada de voltaje.",
  },
  {
    id: "gar-2",
    category: "garantias",
    categoryLabel: "Garantías y Calidad",
    question: "¿Cómo sé si el fallo de mi vehículo es la batería o el alternador?",
    answer:
      "En nuestro Hub Central de Pedernales realizamos un diagnóstico computarizado gratuito con analizador digital de conductancia. En 30 segundos verificamos la corriente de arranque en frío (CCA), la vida útil de las placas y el voltaje de carga del alternador (que debe situarse entre 13.8V y 14.5V).",
  },
  {
    id: "gar-3",
    category: "garantias",
    categoryLabel: "Garantías y Calidad",
    question: "¿Qué pasa si un producto llega con algún defecto físico?",
    answer:
      "Si al recibir el paquete notas algún golpe o anomalía en el empaque, contáctanos inmediatamente antes de firmar la guía con el transportista para activar la cobertura de transporte y coordinar el reemplazo sin costo adicional.",
  },

  // B2B y Flotas
  {
    id: "b2b-1",
    category: "b2b",
    categoryLabel: "Flotas y Sector Camaronero",
    question: "¿Tienen precios al por mayor para talleres mecánicos y empresas?",
    answer:
      "Sí, disponemos de escalas comerciales de precio mayorista para talleres mecánicos, centros de lubricación, cooperativas de transporte y almacenes de repuestos, con descuentos progresivos por volumen y cajas master.",
  },
  {
    id: "b2b-2",
    category: "b2b",
    categoryLabel: "Flotas y Sector Camaronero",
    question: "¿Disponen de presentaciones industriales como canecas de 20L y tambores de 55 galones?",
    answer:
      "Sí, mantenemos stock permanente en nuestra bodega matriz de Pedernales de canecas de 20 litros (5 galones) y tambores de 55 galones (208L) de marcas líderes como Mobil Delvac, Mannol y Castrol, ideales para flotas diésel y motores de bombeo en piscinas camaroneras.",
  },
  {
    id: "b2b-3",
    category: "b2b",
    categoryLabel: "Flotas y Sector Camaronero",
    question: "¿Cómo abastecen al sector camaronero de la zona norte de Manabí y Esmeraldas?",
    answer:
      "Ofrecemos entrega programada en ruta hacia zonas de Cojimíes, Chamanga, Muisne, Jama y San Vicente, facilitando el suministro de Baterías Grupo 31 (1000 CA) de alta descarga y lubricantes diésel de alto TBN para motores estacionarios continuos.",
  },

  // Horarios y Ubicación
  {
    id: "hor-1",
    category: "horarios",
    categoryLabel: "Horarios y Sedes",
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "Nuestro mostrador técnico y bodega matriz en Pedernales atienden de Lunes a Sábado de 08:00 a 18:00 de forma continua. Nuestro canal de atención por WhatsApp permanece activo para emergencias y cotizaciones los 7 días de la semana.",
  },
  {
    id: "hor-2",
    category: "horarios",
    categoryLabel: "Horarios y Sedes",
    question: "¿Puedo retirar mi pedido personalmente en Pedernales?",
    answer:
      "Sí, puedes retirar tus repuestos directamente en nuestro Hub Central de Pedernales (Zona Comercial Automotriz), donde además te brindamos asesoría técnica personalizada y prueba de batería en sitio.",
  },
];
