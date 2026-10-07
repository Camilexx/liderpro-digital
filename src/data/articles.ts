export interface EducationalArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: "baterias" | "lubricantes" | "mantenimiento";
  readTime: string;
  problem: string;
  explanation: string;
  solution: string;
  recommendedCategory: string;
  metaDescription: string;
}

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    slug: "por-que-mi-carro-no-prende",
    title: "¿Por qué mi carro no prende? Diagnóstico rápido paso a paso",
    subtitle: "Aprende a diferenciar si el fallo es de la batería, el motor de arranque o el alternador sin ser mecánico.",
    category: "baterias",
    readTime: "4 min de lectura",
    problem:
      "Giras la llave o presionas el botón de encendido y solo escuchas un chasquido ('clic-clic') o las luces del tablero parpadean de forma tenue.",
    explanation:
      "En el 80% de los casos en Ecuador, este síntoma se debe a una batería descargada o al final de su vida útil (que en promedio dura entre 18 y 24 meses en nuestras condiciones de clima y tráfico). Si las luces encienden con fuerza pero el motor no gira, el problema podría ser el motor de arranque.",
    solution:
      "Evita empujar el carro repetidamente si tiene transmisión automática o catalizador moderno. Comunícate de inmediato con nuestro servicio de atención rápida LiderPro para verificar la batería correcta con código de polaridad y amperaje.",
    recommendedCategory: "baterias",
    metaDescription:
      "Guía técnica para identificar por qué tu vehículo no enciende en Ecuador. Síntomas de batería agotada vs alternador y solución inmediata.",
  },
  {
    slug: "que-significa-aceite-5w30",
    title: "¿Qué significa 5W-30? Guía práctica para elegir la viscosidad correcta",
    subtitle: "Todo lo que necesitas saber sobre aceites multigrado en la Costa y en la Sierra.",
    category: "lubricantes",
    readTime: "5 min de lectura",
    problem:
      "Comprar un aceite muy grueso 'porque el carro ya tiene 100,000 km' es uno de los mitos más dañinos en los talleres automotrices.",
    explanation:
      "El número antes de la 'W' (Winter/Invierno) indica la fluidez en frío: un '5W' fluye con rapidez inmediata tanto en mañanas frías de Quito (Sierra) como al arrancar en Pedernales (Costa). El segundo número ('30') mide la protección térmica cuando el motor alcanza 100°C. Si pones un 20W-50 en un motor diseñado para tolerancias estrechas de 5W-30, los impulsadores hidráulicos y la cadena de distribución sufrirán desgaste prematuro.",
    solution:
      "Consulta siempre el manual del fabricante o escribe a nuestros especialistas LiderPro con el año y kilometraje de tu vehículo para asignarte la fórmula sintética o semisintética exacta.",
    recommendedCategory: "lubricantes",
    metaDescription:
      "Explicación clara de qué significa 5W-30, diferencias con 10W-30 y 20W-50, y cómo elegir el aceite ideal para tu motor en Ecuador.",
  },
  {
    slug: "cada-cuanto-cambiar-el-aceite",
    title: "¿Cada cuánto cambiar el aceite de motor según tu uso real?",
    subtitle: "Diferencias clave entre manejo en carretera y tráfico pesado en ciudades de Ecuador.",
    category: "lubricantes",
    readTime: "3 min de lectura",
    problem:
      "Muchos conductores se guían solo por los 5,000 km sin considerar las horas que el motor pasa encendido en semáforos, cuestas o altas temperaturas.",
    explanation:
      "Las condiciones de manejo severas (como trancones urbanos o caminos con polvo) degradan los aditivos antioxidantes del aceite más rápido que el kilometraje puro. Un aceite 100% sintético API SP ofrece hasta 8,000 a 10,000 km de protección confiable.",
    solution:
      "Reemplaza siempre el filtro de aceite en cada cambio y monitorea el nivel en la varilla cada 1,500 km.",
    recommendedCategory: "filtros",
    metaDescription:
      "Frecuencia recomendada de cambio de aceite y filtro en Ecuador según tipo de lubricante (mineral vs sintético) y condiciones de ruta.",
  },
  {
    slug: "que-bateria-necesita-un-chevrolet-sail",
    title: "¿Qué batería necesita exactamente un Chevrolet Sail?",
    subtitle: "Medidas, polaridad y amperaje recomendado para uno de los autos más populares del país.",
    category: "baterias",
    readTime: "3 min de lectura",
    problem:
      "Comprar una batería con los bornes invertidos o con altura incorrecta puede provocar cortocircuitos o forzar los cables del borne positivo.",
    explanation:
      "El Chevrolet Sail (1.4L y 1.5L) utiliza comúnmente una batería tamaño NS60L (borne izquierdo) de 45Ah a 55Ah con mínimo 420 a 480 CCA para asegurar un arranque óptimo.",
    solution:
      "En LiderPro contamos con stock permanente de baterías NS60L probadas y listas para instalación en Pedernales y despacho a Quito y provincias.",
    recommendedCategory: "baterias",
    metaDescription:
      "Especificaciones de batería para Chevrolet Sail en Ecuador: NS60L, amperios, CCA y consejos de instalación segura.",
  },
];
