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
      "Evita empujar el carro repetidamente si tiene transmisión automática o catalizador moderno. Comunícate con nuestro servicio de atención técnica LiderPro para verificar la batería correcta con código de polaridad y amperaje.",
    recommendedCategory: "baterias",
    metaDescription:
      "Guía técnica para identificar por qué tu vehículo no enciende en Ecuador. Síntomas de batería agotada vs alternador y soluciones recomendadas.",
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
      "El número antes de la 'W' (Winter/Invierno) indica la fluidez en frío: un '5W' fluye con alta rapidez tanto en mañanas frías de Quito (Sierra) como al arrancar en Pedernales (Costa). El segundo número ('30') mide la protección térmica cuando el motor alcanza 100°C. Si pones un 20W-50 en un motor diseñado para tolerancias estrechas de 5W-30, los impulsadores hidráulicos y la cadena de distribución sufrirán desgaste prematuro.",
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
  {
    slug: "que-bateria-necesita-chevrolet-dmax-toyota-hilux",
    title: "¿Qué batería necesita una camioneta Chevrolet D-Max o Toyota Hilux?",
    subtitle: "Especificaciones exactas de amperaje, CCA y polaridad para camionetas diésel en Costa y Sierra.",
    category: "baterias",
    readTime: "4 min de lectura",
    problem:
      "Instalar una batería estándar de auto liviano (Grupo 24 o 42) en una camioneta diésel de alta compresión provoca arranques lentos en frío, sobrecalentamiento de bornes y sulfatación prematura de placas.",
    explanation:
      "Los motores diésel de la Chevrolet D-Max (4JJ1/RZ4E) y Toyota Hilux (1KD/2GD/1GD) requieren una corriente de arranque en frío mínima de 650 a 850 CCA (Cold Cranking Amps) debido a su relación de compresión de hasta 16:1. El tamaño BCI de equipo original es Grupo 27 / 27R o Grupo 34 con capacidad de 85Ah a 95Ah (gama High Power o Super Heavy Duty). Una batería subdimensionada fallará rápidamente bajo el esfuerzo de arranque en mañanas frías de la Sierra o jornadas de trabajo pesado en el agro costero.",
    solution:
      "En LiderPro equipamos Baterías Ecuador High Power Grupo 27/34 (95Ah) o Bosch S4 / S5 High Power con aleación de plata y rejillas PowerFrame. Incluimos comprobación computarizada del alternador y bornes en nuestro Hub Pedernales y despacho asegurado a nivel nacional.",
    recommendedCategory: "baterias",
    metaDescription:
      "Especificaciones de batería para Chevrolet D-Max y Toyota Hilux en Ecuador: Grupo BCI 27, CCA requerido, amperios hora y recomendaciones de fábrica.",
  },
  {
    slug: "refrigerante-verde-rojo-azul-diferencias",
    title: "Refrigerante Verde, Rojo o Azul: ¿Cuáles son las diferencias reales?",
    subtitle: "Por qué el color no siempre define la química y cómo la mezcla incorrecta corroe radiadores y bombas de agua.",
    category: "mantenimiento",
    readTime: "5 min de lectura",
    problem:
      "Rellenar el depósito con agua común de la llave o mezclar refrigerantes de diferentes colores crea sedimentos gelatinosos que obstruyen el termostato y pican la culata de aluminio del motor.",
    explanation:
      "El color es solo un tinte comercial elegido por cada fabricante. Lo fundamental es la química del paquete de aditivos: los refrigerantes tradicionales verdes suelen ser de tecnología inorgánica (IAT, vida útil de 1 a 2 años o 40,000 km), mientras que los rojos, rosados o violetas utilizan ácidos orgánicos de larga duración (OAT / Si-OAT como Mannol AF12+ o Motul Inugel, vida útil hasta 5 años o 250,000 km). Si mezclas IAT con OAT, los inhibidores de corrosión reaccionan entre sí y se neutralizan, acelerando la cavitación térmica en climas cálidos.",
    solution:
      "Usa siempre refrigerante prediluido 50/50 con agua desmineralizada de grado automotriz o concentrado diluido con agua destilada. En LiderPro suministramos refrigerantes orgánicos certificados Mannol AF12+ Longlife y Motul en formatos de cuarto, galón y caneca.",
    recommendedCategory: "lubricantes",
    metaDescription:
      "Guía técnica sobre diferencias entre refrigerantes verdes, rojos y azules en Ecuador: tecnología IAT vs OAT, prevención de corrosión y selección correcta.",
  },
  {
    slug: "mantenimiento-flotas-pesadas-camaroneras-ecuador",
    title: "Mantenimiento Preventivo para Flotas Pesadas y Sector Camaronero",
    subtitle: "Protocolo técnico de lubricación diésel, filtración de alta eficiencia y baterías en ambientes salinos de operación 24/7.",
    category: "mantenimiento",
    readTime: "6 min de lectura",
    problem:
      "En piscinas camaroneras y flotas de transporte pesado de Manabí y Guayas, la brisa marina, el polvo salino y jornadas continuas de bombeo de 18 horas degradan aceites y bornes eléctricos al doble de velocidad.",
    explanation:
      "Los motores estacionarios de bombas de agua (John Deere, Cummins, Perkins) y camiones de carga (Hino, Isuzu, Freightliner) sufren corrosión galvánica y acumulación de agua por condensación en el diésel. Requieren aceites de alto TBN (Total Base Number) para neutralizar los compuestos ácidos del azufre, filtros de combustible con separador coalescente de agua (Advance / Donaldson) y baterías Super Heavy Duty (Grupo 31 de 1000 CA o N150) con anclaje antivibración.",
    solution:
      "LiderPro ofrece suministro corporativo B2B programado con canecas de 20L y tambores de 55 galones de Mobil Delvac, Mannol y Castrol, filtros de alta retención de micras y baterías Baterías Ecuador 31 SHD con garantía de fábrica y facturación electrónica autorizada por el SRI.",
    recommendedCategory: "b2b",
    metaDescription:
      "Plan de mantenimiento preventivo para flotas diésel y camaroneras en Ecuador: lubricación con alto TBN, filtros separadores y baterías de alto rendimiento.",
  },
];
