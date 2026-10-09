export interface HubPageSpanishContent {
  path: string;
  category: string;
  title: string;
  description: string;
  h1: string;
  badgeLabel: string;
  headings: string[];
  page_text: string;
  faqs: { question: string; answer: string }[];
}

export const HUB_PAGES_ES_CONTENT: Record<string, HubPageSpanishContent> = {
  "/world-clock": {
    path: "/world-clock",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Mundial Online — Hora Exacta en el Mundo | TimeNumbers",
    description: "Consulta la hora actual en ciudades y países de todo el mundo. Compara zonas horarias en tiempo real con un reloj mundial online sincronizado con reloj atómico.",
    h1: "Reloj Mundial — Hora Actual y Zonas Horarias del Mundo",
    badgeLabel: "Sincronización Horaria Global",
    headings: [
      "Hora exacta en múltiples ciudades y países",
      "Comparación simultánea de zonas horarias",
      "Planificación de reuniones internacionales sin errores",
      "Precisión atómica Estrato 1 y ajuste de horario de verano"
    ],
    page_text: "¿Necesitas consultar qué hora es en diferentes partes del mundo? El reloj mundial de TimeNumbers te permite supervisar la hora exacta en cientos de ciudades en una sola pantalla. Todos los relojes digitales y analógicos están sincronizados directamente con servidores de tiempo atómico de Estrato 1, eliminando el retraso de tu navegador y mostrando los segundos exactos en tiempo real.\n\nPersonaliza tu panel agregando tus ciudades preferidas como Nueva York, Londres, Madrid, Ciudad de México, Tokio o Sídney. Observa al instante si una ciudad se encuentra en horario laboral, de noche o en transición de horario de verano, facilitando la coordinación de equipos remotos y llamadas internacionales.",
    faqs: [
      {
        question: "¿Cómo funciona la sincronización del reloj mundial?",
        answer: "TimeNumbers conecta con servidores de Protocolo de Tiempo de Red (NTP) de alta precisión vinculados a relojes atómicos de cesio. Esto asegura que la hora de cada ciudad tenga una desviación inferior a 15 milisegundos respecto al Tiempo Universal Coordinado (UTC)."
      },
      {
        question: "¿Cómo agrego o quito ciudades en el reloj mundial?",
        answer: "Usa el buscador integrado para escribir el nombre de cualquier ciudad o país y pulsa 'Agregar'. Tu selección se guarda de forma segura y privada en tu navegador (LocalStorage) para que siempre esté lista cuando vuelvas."
      },
      {
        question: "¿Tiene en cuenta el reloj mundial el horario de verano (DST)?",
        answer: "Sí. Las reglas de horario de verano se calculan matemáticamente según las normativas oficiales de cada país, ajustando automáticamente la hora cuando se produce el cambio de hora en primavera y otoño."
      }
    ]
  },
  "/clock": {
    path: "/clock",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Digital Online con Segundos — Hora Exacta | TimeNumbers",
    description: "Reloj digital online en pantalla completa con segundos en tiempo real. Sincronizado con la hora atómica oficial. Ideal para sincronizar relojes y control de tiempo.",
    h1: "Reloj Digital Online — Hora Exacta con Segundos en Tiempo Real",
    badgeLabel: "Reloj Digital de Alta Precisión",
    headings: [
      "Reloj digital de pantalla completa con segundos",
      "Sincronización con la hora oficial atómica",
      "Formatos 12 horas (AM/PM) y 24 horas militar",
      "Herramienta perfecta para sincronizar relojes mecánicos y exámenes"
    ],
    page_text: "Visualiza la hora exacta en un reloj digital grande, nítido y sin distracciones. Con TimeNumbers dispones de un cronómetro digital sincronizado con la hora atómica que muestra horas, minutos y segundos fluidos en tiempo real.\n\nPuedes activar el modo de pantalla completa para convertir tu dispositivo en un reloj de pared o de mesa de trabajo, alternar entre formato de 12 horas y 24 horas con un solo clic, y verificar si el reloj de tu ordenador o teléfono tiene algún retraso con respecto a la hora civil oficial.",
    faqs: [
      {
        question: "¿Cómo de exacto es este reloj digital online?",
        answer: "Nuestro reloj se sincroniza con servidores NTP de Estrato 1 y mide la latencia de tu conexión de red para compensar cualquier desfase, ofreciendo una precisión de centésimas de segundo."
      },
      {
        question: "¿Puedo usar este reloj en pantalla completa?",
        answer: "Sí, pulsa el botón de pantalla completa para ocultar la barra de navegación y disfrutar de un reloj digital limpio y visible a distancia, ideal para aulas, conferencias o estudios."
      }
    ]
  },
  "/analog-clock": {
    path: "/analog-clock",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Analógico Online — Reloj de Agujas en Vivo | TimeNumbers",
    description: "Elegante reloj analógico online con segundero continuo suizo. Visualiza la hora exacta con esfera clásica de agujas, números romanos o arábigos.",
    h1: "Reloj Analógico Online — Esfera Clásica con Segundero Continuo",
    badgeLabel: "Horología Clásica y Segundero Suizo",
    headings: [
      "Esfera analógica de precisión y movimiento continuo",
      "Diseño clásico suizo con números arábigos y romanos",
      "Visualización en pantalla completa para escritorio",
      "Sincronización atómica milimétrica"
    ],
    page_text: "Disfruta de la elegancia atemporal del reloj de agujas con la precisión de la era digital. Nuestro reloj analógico online reproduce el movimiento continuo característico de los cronómetros mecánicos de alta gama.\n\nEs la herramienta idónea para enseñar a leer la hora a niños, decorar pantallas de trabajo o verificar la cadencia y exactitud de relojes físicos de pulsera.",
    faqs: [
      {
        question: "¿El segundero tiene movimiento continuo o a saltos?",
        answer: "El reloj analógico cuenta con un segundero de barrido suave (smooth sweep) de 60 cuadros por segundo que emula los movimientos automáticos de alta frecuencia."
      }
    ]
  },
  "/atomic-clock": {
    path: "/atomic-clock",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Atómico Online — Hora Atómica Oficial UTC | TimeNumbers",
    description: "Consulta la hora atómica oficial en tiempo real. Sincronización directa con servidores NTP de Estrato 1 y estándares de cesio UTC con medición de desfase.",
    h1: "Reloj Atómico Online — Medición de Desfase y Tiempo Exacto UTC",
    badgeLabel: "Estándar Primario de Cesio",
    headings: [
      "Tiempo Universal Coordinado (UTC) de Estrato 1",
      "Detección y cálculo de deriva del reloj de tu sistema",
      "Calibración de cronómetros y servidores",
      "Estándares internacionales BIPM e IERS"
    ],
    page_text: "El reloj atómico de TimeNumbers te conecta directamente con la base de tiempo científica mundial. Al cargar la página, realizamos un intercambio de paquetes criptográficos con servidores NTP para medir la latencia y determinar cuántos milisegundos adelanta o retrasa tu dispositivo.\n\nEs la herramienta esencial para administradores de sistemas, subastas online, astrónomos y aficionados a la relojería que requieren verificar la exactitud de su reloj.",
    faqs: [
      {
        question: "¿Qué es un reloj atómico?",
        answer: "Un reloj atómico utiliza las oscilaciones de resonancia de átomos de cesio-133 para medir el segundo con un margen de error menor a un segundo cada 100 millones de años."
      }
    ]
  },
  "/fullscreen-clock": {
    path: "/fullscreen-clock",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Pantalla Completa — Reloj Grande Online | TimeNumbers",
    description: "Reloj online a pantalla completa para escritorio, televisión y móviles. Dígitos gigantes, modo oscuro OLED y visibilidad óptima a larga distancia.",
    h1: "Reloj Online a Pantalla Completa — Dígitos Gigantes",
    badgeLabel: "Modo Kiosco y Gran Formato",
    headings: [
      "Pantalla completa inmersiva con dígitos gigantes",
      "Modo oscuro optimizado para paneles OLED",
      "Ideal para clases, gimnasios, oficinas y presentaciones",
      "Sin interrupciones ni recargas"
    ],
    page_text: "Convierte cualquier tablet, monitor o televisor en un reloj digital de gran visibilidad. Con soporte de pantalla completa nativo (tecla F11 o botón integrado), los números ocupan el ancho máximo con fuentes monoespaciadas legibles a decenas de metros.",
    faqs: [
      {
        question: "¿Cómo activo la pantalla completa?",
        answer: "Haz clic en el botón de pantalla completa o presiona la tecla 'F' en tu teclado. Para salir, presiona 'Escape'."
      }
    ]
  },
  "/world-clock-wall": {
    path: "/world-clock-wall",
    category: "Relojes y tiempo en vivo",
    title: "Muro de Relojes Mundiales — Pantalla Multizona | TimeNumbers",
    description: "Panel de control con múltiples relojes mundiales analógicos y digitales estilo sala de operaciones financieras. Supervisa Londres, Nueva York, Tokio y más.",
    h1: "Muro de Relojes Mundiales — Panel Multizona en Vivo",
    badgeLabel: "Panel de Mercados Financieros",
    headings: [
      "Muro estilo bolsa de valores con principales centros financieros",
      "Relojes analógicos y digitales simultáneos",
      "Indicadores de mercados abiertos y cerrados",
      "Personalización de capitales y husos horarios"
    ],
    page_text: "Inspirado en las salas de control y mesas de dinero de las principales firmas internacionales, el Muro de Relojes de TimeNumbers muestra en una cuadrícula coordinada la hora local, el estado de los mercados y la iluminación solar de las principales capitales financieras del planeta.",
    faqs: [
      {
        question: "¿Qué ciudades incluye el panel de mercados?",
        answer: "Por defecto muestra Nueva York, Londres, Frankfurt, Tokio, Hong Kong y Sídney, pero puedes personalizar el panel con cualquier ciudad del mundo."
      }
    ]
  },
  "/clock-accuracy": {
    path: "/clock-accuracy",
    category: "Relojes y tiempo en vivo",
    title: "Comprobar Precisión del Reloj — Test de Desfase NTP | TimeNumbers",
    description: "Comprueba si el reloj de tu ordenador o teléfono está adelantado o atrasado. Test de precisión en milisegundos con servidores atómicos NTP.",
    h1: "Comprobar Precisión de tu Reloj — Medición de Deriva y Desfase",
    badgeLabel: "Diagnóstico de Reloj del Sistema",
    headings: [
      "Medición de deriva del reloj del sistema operativo",
      "Compensación de latencia de red y ping",
      "Instrucciones para sincronizar Windows, macOS, iOS y Android",
      "Historial de estabilidad temporal"
    ],
    page_text: "¿Tu reloj tiene la hora correcta? Muchos dispositivos acumulan segundos o minutos de desvío si fallan sus protocolos de sincronización automática. Esta herramienta mide en tiempo real la diferencia exacta entre el reloj interno de tu navegador y los servidores atómicos mundiales.",
    faqs: [
      {
        question: "¿Cómo se calcula la precisión?",
        answer: "Enviamos múltiples solicitudes timestamp bidireccionales calculando el Round-Trip Time (RTT) para descartar el retardo de la red y aislar la diferencia real del reloj de tu sistema."
      }
    ]
  },
  "/stopwatch": {
    path: "/stopwatch",
    category: "Relojes y tiempo en vivo",
    title: "Cronómetro Online Gratis con Vueltas y Milésimas | TimeNumbers",
    description: "Cronómetro online gratuito y preciso con registro de vueltas (laps), milisegundos y controles de teclado. Ideal para deportes, estudio y productividad.",
    h1: "Cronómetro Online — Registro de Vueltas y Alta Precisión",
    badgeLabel: "Cronometría Digital con Milésimas",
    headings: [
      "Cronómetro digital con milisegundos y vueltas",
      "Atajos de teclado: Iniciar, Pausar y Vuelta",
      "Exportación de tiempos y tiempos parciales",
      "Modo pantalla completa para entrenamientos"
    ],
    page_text: "Un cronómetro online profesional diseñado para una respuesta instantánea. Registra tiempos de entrenamiento, carreras, sesiones de estudio o tareas de trabajo con precisión de milisegundos.\n\nPuedes controlar el cronómetro usando la barra espaciadora para iniciar y pausar, y la tecla 'L' para marcar vueltas parciales sin tocar el ratón.",
    faqs: [
      {
        question: "¿Funciona el cronómetro si cambio de pestaña?",
        answer: "Sí. El cronómetro se basa en timestamps del sistema de alta resolución (performance.now()), por lo que continúa midiendo el tiempo con exactitud absoluta aunque minimices el navegador."
      }
    ]
  },
  "/alarm": {
    path: "/alarm",
    category: "Relojes y tiempo en vivo",
    title: "Reloj Despertador Online con Alarma Gratis | TimeNumbers",
    description: "Despertador online gratis con sonido fuerte. Configura alarmas a cualquier hora, opción de repetición y modo pantalla completa para tu mesilla de noche.",
    h1: "Reloj Despertador Online — Alarma Sonora y Pantalla Nocturna",
    badgeLabel: "Alarma Sonora Web Audio",
    headings: [
      "Configuración sencilla de hora y minutos",
      "Múltiples tonos de alarma con control de volumen",
      "Función de repetición (snooze) y pantalla completa",
      "Modo nocturno con bajo brillo para dormitorios"
    ],
    page_text: "Programa una alarma online en segundos para despertar, recordar una reunión o tomar descansos. Con tonos audibles de alta fidelidad generados mediante Web Audio API, la alarma funciona de forma fiable en cualquier dispositivo.",
    faqs: [
      {
        question: "¿Sonará la alarma si el ordenador entra en reposo?",
        answer: "Para asegurar que la alarma suene correctamente, asegúrate de mantener la pantalla encendida o ajustar la configuración de suspensión de tu equipo."
      }
    ]
  },
  "/timer": {
    path: "/timer",
    category: "Relojes y tiempo en vivo",
    title: "Temporizador Online Gratis con Cuenta Regresiva | TimeNumbers",
    description: "Temporizador online gratuito con alarma y cuenta atrás. Configura horas, minutos y segundos para estudiar, cocinar, entrenar o trabajar.",
    h1: "Temporizador Online — Cuenta Regresiva con Alarma Sonora",
    badgeLabel: "Cuenta Atrás Digital Flexible",
    headings: [
      "Temporizador personalizable por horas, minutos y segundos",
      "Presets rápidos de 5, 10, 15, 20, 25 y 30 minutos",
      "Sonido de alerta al finalizar la cuenta regresiva",
      "Pantalla completa y control mediante barra espaciadora"
    ],
    page_text: "El temporizador online de TimeNumbers te ayuda a gestionar tu tiempo con la máxima sencillez. Configura fácilmente cualquier intervalo de tiempo para cocina, rutinas de ejercicio HIIT, pausas de trabajo o exámenes cronometrados.\n\nAccede a botones rápidos para cuentas atrás populares de 5 minutos, 10 minutos o 1 hora con un solo clic.",
    faqs: [
      {
        question: "¿Cómo pausar y reiniciar el temporizador?",
        answer: "Puedes pulsar el botón 'Pausar' en pantalla o presionar la barra espaciadora. El botón 'Reiniciar' devuelve el reloj al tiempo original programado."
      }
    ]
  },
  "/pomodoro": {
    path: "/pomodoro",
    category: "Relojes y tiempo en vivo",
    title: "Temporizador Pomodoro Online — Técnica de Estudio 25/5 | TimeNumbers",
    description: "Temporizador Pomodoro online gratis para estudiar y trabajar. Intervalos de 25 minutos de concentración y 5 minutos de descanso con alarmas suaves.",
    h1: "Temporizador Pomodoro Online — Concentración y Productividad",
    badgeLabel: "Método de Productividad 25/5",
    headings: [
      "Ciclos clásicos de 25 minutos de enfoque y 5 de descanso",
      "Descanso largo automático cada 4 ciclos completados",
      "Notificaciones audibles y visuales sutiles",
      "Contador de tareas completadas del día"
    ],
    page_text: "Multiplica tu rendimiento académico y laboral con la técnica Pomodoro. Trabaja en bloques intensos de 25 minutos sin distracciones seguidos de descansos reparadores de 5 minutos para mantener tu mente despejada a lo largo de la jornada.",
    faqs: [
      {
        question: "¿Qué es la técnica Pomodoro?",
        answer: "Es un método de gestión del tiempo creado por Francesco Cirillo en la década de 1980 que divide el trabajo en intervalos de 25 minutos separados por pausas breves."
      }
    ]
  },
  "/converter": {
    path: "/converter",
    category: "Conversión de Zonas Horarias",
    title: "Conversor de Zonas Horarias Online — Convertidor de Horas | TimeNumbers",
    description: "Convierte horas entre países y ciudades de todo el mundo. Compara zonas horarias con control deslizante interactivo de 24 horas y cálculo de horario de verano.",
    h1: "Conversor de Zonas Horarias — Comparador de Horas entre Países",
    badgeLabel: "Hub de Conversión Multizona",
    headings: [
      "Conversor interactivo con barra deslizante de 24 horas",
      "Comparación simultánea entre múltiples ciudades y zonas",
      "Identificación automática de horario comercial y de descanso",
      "Enlace único compartible para reuniones internacionales"
    ],
    page_text: "¿Tienes que programar una llamada entre México y España, o coordinar un equipo entre Buenos Aires, Bogotá y Nueva York? El conversor de zonas horarias de TimeNumbers simplifica el cálculo eliminando las confusiones provocadas por el horario de verano o las diferencias de huso.\n\nMueve el cursor por la línea de tiempo de 24 horas para ver cómo cambia la hora local en cada ciudad seleccionada al unísono, destacando en verde las horas normales de oficina.",
    faqs: [
      {
        question: "¿Cómo convierto la hora de un país a otro?",
        answer: "Añade las ciudades o zonas horarias que deseas comparar. Al arrastrar el control deslizante de 24 horas, todas las ciudades actualizarán su hora local simultáneamente."
      },
      {
        question: "¿Tiene en cuenta los cambios de fecha?",
        answer: "Sí. Si al convertir una hora cruzas la medianoche, el conversor indicará claramente '+1 día' o '-1 día' junto a la fecha correspondiente."
      }
    ]
  },
  "/converter/compare": {
    path: "/converter/compare",
    category: "Conversión de Zonas Horarias",
    title: "Comparador de Horas entre Ciudades — Matriz Horaria | TimeNumbers",
    description: "Compara la hora local en dos o más ciudades simultáneamente. Matriz horaria visual para encontrar las mejores horas de solapamiento y trabajo.",
    h1: "Comparador de Horas entre Ciudades — Solapamiento en Vivo",
    badgeLabel: "Matriz de Comparación Directa",
    headings: [
      "Comparación lado a lado de dos o más capitales",
      "Matriz de coincidencias horarias laborales",
      "Detección de diferencias horarias netas",
      "Sincronización con horario de verano activo"
    ],
    page_text: "Compara fácilmente las horas locales de varias metrópolis con nuestra matriz visual lado a lado. Identifica al instante cuántas horas de ventaja o desventaja tiene una localización respecto a otra.",
    faqs: [
      {
        question: "¿Cuántas ciudades puedo comparar a la vez?",
        answer: "Puedes agregar tantas ciudades como necesites para visualizar la compatibilidad horaria de tu equipo internacional."
      }
    ]
  },
  "/converter/difference": {
    path: "/converter/difference",
    category: "Conversión de Zonas Horarias",
    title: "Directorio de Diferencias Horarias entre Ciudades | TimeNumbers",
    description: "Directorio completo de diferencias horarias entre las principales ciudades del mundo. Consulta horas de diferencia, horario de verano y franjas compartidas.",
    h1: "Diferencia Horaria entre Ciudades — Directorio Completo",
    badgeLabel: "Corredores Horarios Internacionales",
    headings: [
      "Guías de diferencia horaria para más de 92 pares de ciudades",
      "Cálculo exacto de horas por delante o por detrás",
      "Impacto del horario de verano en cada par",
      "Horarios recomendados para videollamadas"
    ],
    page_text: "Explora nuestro directorio exhaustivo de diferencias horarias entre las principales capitales del mundo. Cada guía incluye relojes atómicos duales en vivo, análisis de horario de verano y consejos para coordinar llamadas de trabajo.",
    faqs: [
      {
        question: "¿Qué ciudades están disponibles?",
        answer: "Disponemos de guías detalladas para pares de alto tráfico como Madrid a Ciudad de México, Nueva York a Londres, París a Tokio, y muchas más."
      }
    ]
  },
  "/meeting-planner": {
    path: "/meeting-planner",
    category: "Conversión de Zonas Horarias",
    title: "Planificador de Reuniones Internacionales — Horario Global | TimeNumbers",
    description: "Planifica reuniones entre países sin confusiones. Encuentra horas de trabajo comunes entre participantes de diferentes zonas horarias con un gráfico visual.",
    h1: "Planificador de Reuniones Internacionales — Solapamiento de Equipos",
    badgeLabel: "Coordinación de Equipos Remotos",
    headings: [
      "Búsqueda automática de franjas de solapamiento laboral",
      "Visualización en colores: verde (oficina), naranja (alerta), gris (noche)",
      "Soporte para equipos globales en 4 o más continentes",
      "Exportación directa a Google Calendar, Outlook y enlaces web"
    ],
    page_text: "Coordinar una llamada entre participantes en América, Europa y Asia puede ser un laberinto de husos horarios. Nuestro planificador de reuniones genera una línea de 24 horas coloreada que identifica de un vistazo la ventana ideal donde nadie tenga que conectarse a medianoche.",
    faqs: [
      {
        question: "¿Qué significan los colores en el planificador?",
        answer: "El verde indica horario laboral estándar (9:00 a 17:00), el naranja franjas tempranas o tardías aceptables, y el gris horas de descanso nocturno."
      }
    ]
  },
  "/overlap-calculator": {
    path: "/overlap-calculator",
    category: "Conversión de Zonas Horarias",
    title: "Calculadora de Solapamiento Horario para Equipos Remotos | TimeNumbers",
    description: "Calcula las horas de trabajo compartidas entre miembros de un equipo distribuidos en diferentes zonas horarias. Optimiza la colaboración síncrona.",
    h1: "Calculadora de Solapamiento de Horarios — Trabajo Remoto",
    badgeLabel: "Optimización de Trabajo Síncrono",
    headings: [
      "Cálculo de horas coincidentes de oficina entre ciudades",
      "Optimización de calendarios para empresas distribuidas",
      "Minimización del agotamiento por reuniones a deshora",
      "Matriz de colaboración síncrona y asíncrona"
    ],
    page_text: "El éxito de un equipo remoto depende de saber cuándo se puede colaborar en tiempo real y cuándo recurrir a la comunicación asíncrona. Esta calculadora cuantifica el número exacto de horas de solapamiento entre distintas sedes corporativas.",
    faqs: [
      {
        question: "¿Cuántas horas de solapamiento son recomendables?",
        answer: "La mayoría de las empresas distribuidas buscan entre 2 y 4 horas de solapamiento diario para reuniones de equipo y resolución de incidencias en vivo."
      }
    ]
  },
  "/jet-lag-calculator": {
    path: "/jet-lag-calculator",
    category: "Conversión de Zonas Horarias",
    title: "Calculadora de Jet Lag y Adaptación de Vuelo | TimeNumbers",
    description: "Calcula el impacto del desfase horario al viajar y planifica tu adaptación de sueño y luz solar. Consejos para minimizar el jet lag según tus husos horarios.",
    h1: "Calculadora de Jet Lag — Protocolo de Adaptación Circadiana",
    badgeLabel: "Cronobiología y Viajes Internacionales",
    headings: [
      "Estimación de días necesarios para recuperar el ritmo circadiano",
      "Protocolo de exposición a la luz solar según la dirección del vuelo",
      "Ajuste gradual de horarios de sueño previo al viaje",
      "Recomendaciones de hidratación y cafeína"
    ],
    page_text: "Viajar a través de varios husos horarios desestabiliza nuestro reloj biológico. Nuestra calculadora de jet lag evalúa la dirección del vuelo (este u oeste) y el número de husos cruzados para proponerte un plan científico de exposición a la luz y descanso.",
    faqs: [
      {
        question: "¿Por qué el jet lag hacia el este es más difícil?",
        answer: "Viajar hacia el este requiere adelantar el reloj interno (acortar el día), lo cual va contra la tendencia natural del ciclo circadiano humano de durar algo más de 24 horas."
      }
    ]
  },
  "/cities": {
    path: "/cities",
    category: "Geografía y Zonas Horarias",
    title: "Directorio de Ciudades del Mundo — Hora Local y Población | TimeNumbers",
    description: "Directorio de más de 500 grandes metrópolis mundiales. Consulta la hora actual exacta, zona horaria IANA, coordenadas y país de cada ciudad.",
    h1: "Directorio Mundial de Ciudades — Hora Exacta y Husos Horarios",
    badgeLabel: "Directorio Geográfico Global",
    headings: [
      "Buscador de hora en más de 500 metrópolis mundiales",
      "Fichas completas con zona horaria, coordenadas y huso IANA",
      "Navegación por continentes y países",
      "Acceso directo a relojes locales y calculadoras solares"
    ],
    page_text: "Accede al catálogo global de ciudades de TimeNumbers. Encuentra al instante la hora en Nueva York, Madrid, Buenos Aires, Ciudad de México, Bogotá, Lima, Tokio o cualquier otra gran ciudad con información horológica verificada.",
    faqs: [
      {
        question: "¿Qué datos se muestran para cada ciudad?",
        answer: "Cada página de ciudad ofrece reloj en vivo con segundos, zona horaria IANA, estado de horario de verano, salida y puesta de sol, y comparaciones con otras capitales."
      }
    ]
  },
  "/countries": {
    path: "/countries",
    category: "Geografía y Zonas Horarias",
    title: "Países del Mundo y sus Zonas Horarias — Directorio | TimeNumbers",
    description: "Consulta todos los países del mundo, sus capitales, códigos telefónicos y las zonas horarias que abarcan. Guía completa de husos horarios por nación.",
    h1: "Países del Mundo — Husos Horarios, Capitales y Códigos",
    badgeLabel: "Atlas Político y Husos Horarios",
    headings: [
      "Listado completo de naciones soberanas y territorios",
      "Países con múltiples zonas horarias (Rusia, EE. UU., Canadá)",
      "Normativas de horario de verano por país",
      "Prefijos telefónicos y enlaces a sus principales ciudades"
    ],
    page_text: "Descubre cómo se dividen los husos horarios a nivel nacional. Desde países de un solo huso como España, Colombia o Argentina, hasta naciones que abarcan múltiples zonas como México, Estados Unidos o Brasil.",
    faqs: [
      {
        question: "¿Qué país tiene más zonas horarias?",
        answer: "Francia cuenta con 12 zonas horarias distintas debido a sus territorios de ultramar repartidos por los océanos Pacífico, Índico y Atlántico."
      }
    ]
  },
  "/timezone-map": {
    path: "/timezone-map",
    category: "Geografía y Zonas Horarias",
    title: "Mapa de Zonas Horarias Interactivo — Husos Horarios | TimeNumbers",
    description: "Mapa interactivo de zonas horarias del mundo con husos UTC. Haz clic en cualquier franja para ver la hora local, países y capitales correspondientes.",
    h1: "Mapa Interactivo de Zonas Horarias del Mundo — Husos UTC",
    badgeLabel: "Cartografía de Husos Horarios",
    headings: [
      "Mapa interactivo de bandas horarias globales",
      "Exploración de franjas desde UTC-12 hasta UTC+14",
      "Línea internacional de cambio de fecha",
      "Identificación visual de países y husos"
    ],
    page_text: "Visualiza de forma clara cómo se distribuyen los 24 husos horarios principales y las subdivisiones de media hora sobre la superficie terrestre en un mapa vectorial interactivo.",
    faqs: [
      {
        question: "¿Por qué algunos países tienen desfases de 30 o 45 minutos?",
        answer: "Países como India (UTC+5:30), Irán (UTC+3:30) o Nepal (UTC+5:45) optaron por compensaciones no enteras para que el mediodía solar coincida mejor con el centro geográfico de su territorio."
      }
    ]
  },
  "/time-zones": {
    path: "/time-zones",
    category: "Geografía y Zonas Horarias",
    title: "Lista de Zonas Horarias del Mundo — Base de Datos IANA | TimeNumbers",
    description: "Directorio exhaustivo de zonas horarias oficiales de la base de datos IANA (tz database). Abreviaturas (EST, CET, GMT, PST), offsets UTC y relojes.",
    h1: "Directorio de Zonas Horarias Mundiales — Estándar IANA",
    badgeLabel: "Base de Datos Canónica IANA",
    headings: [
      "Catálogo de más de 400 identificadores canónicos IANA",
      "Abreviaturas estándar: GMT, UTC, CET, CEST, EST, EDT, PST, etc.",
      "Desfases actuales y reglas históricas",
      "Relojes en vivo para cada zona horaria"
    ],
    page_text: "Consulta la base de datos de zonas horarias de referencia utilizada por todos los sistemas operativos y servidores del mundo. Explora identificadores por continente como America/Mexico_City, Europe/Madrid o America/Bogota.",
    faqs: [
      {
        question: "¿Qué es la base de datos IANA de zonas horarias?",
        answer: "La base de datos IANA (también llamada Olson database) documenta los nombres canónicos y las reglas históricas de cambio de hora de todas las regiones del planeta desde 1970."
      }
    ]
  },
  "/utc": {
    path: "/utc",
    category: "Geografía y Zonas Horarias",
    title: "Hora UTC Actual — Tiempo Universal Coordinado | TimeNumbers",
    description: "Consulta la hora UTC exacta en tiempo real. Estándar atómico mundial de referencia, cálculo de desfase y relación con el horario GMT.",
    h1: "Hora UTC Actual — Tiempo Universal Coordinado en Vivo",
    badgeLabel: "Estándar Primario de Referencia",
    headings: [
      "Reloj oficial en Tiempo Universal Coordinado (UTC)",
      "Línea base para servidores, aviación y meteorología",
      "Diferencia entre UTC y GMT",
      "Cálculo de husos horarios positivos y negativos"
    ],
    page_text: "El Tiempo Universal Coordinado (UTC) es el patrón temporal primario por el cual se regula el tiempo en todo el planeta. A diferencia de las horas locales, el UTC no cambia jamás por horario de verano y sirve como referencia absoluta para la aviación, los satélites y las telecomunicaciones.",
    faqs: [
      {
        question: "¿Tiene UTC horario de verano?",
        answer: "No. El UTC se mantiene constante los 365 días del año sin modificaciones de verano ni invierno."
      }
    ]
  },
  "/united-states-time-now": {
    path: "/united-states-time-now",
    category: "Geografía y Zonas Horarias",
    title: "Hora Actual en Estados Unidos — Relojes por Zona | TimeNumbers",
    description: "Consulta qué hora es en Estados Unidos en todas sus zonas horarias: Eastern (ET), Central (CT), Mountain (MT), Pacific (PT), Alaska y Hawái en vivo.",
    h1: "Hora Actual en Estados Unidos — Relojes en Tiempo Real",
    badgeLabel: "Husos Horarios de EE. UU.",
    headings: [
      "Supervisión simultánea de las 6 zonas horarias de EE. UU.",
      "Eastern Time (Nueva York, Miami, Washington D.C.)",
      "Central, Mountain y Pacific Time (Chicago, Denver, Los Ángeles)",
      "Normativas de cambio de hora en Estados Unidos y excepciones (Arizona)"
    ],
    page_text: "Estados Unidos abarca múltiples husos horarios en su territorio continental e insular. Supervisa en una sola pantalla la hora en Nueva York (ET), Chicago (CT), Denver (MT), Los Ángeles (PT), Anchorage (AKST) y Honolulu (HST).",
    faqs: [
      {
        question: "¿Cuándo cambia la hora en Estados Unidos en 2026 y 2027?",
        answer: "Los relojes se adelantan una hora el segundo domingo de marzo y se retrasan el primer domingo de noviembre. Hawái y la mayor parte de Arizona no aplican este cambio."
      }
    ]
  },
  "/dialing-codes": {
    path: "/dialing-codes",
    category: "Geografía y Zonas Horarias",
    title: "Prefijos Telefónicos Internacionales y Códigos de País | TimeNumbers",
    description: "Guía completa de prefijos telefónicos internacionales de todos los países. Comprueba la hora local antes de llamar al extranjero para evitar llamadas nocturnas.",
    h1: "Prefijos Telefónicos Internacionales — Códigos de País y Hora Local",
    badgeLabel: "Comunicaciones Internacionales",
    headings: [
      "Directorio completo de códigos de llamada internacional (+34, +52, +1, +54...)",
      "Verificación de la hora local antes de realizar llamadas",
      "Recomendaciones de horarios comerciales para contactar",
      "Buscador por nombre de país o número de prefijo"
    ],
    page_text: "Encuentra el código de llamada para cualquier país del mundo y comprueba de inmediato qué hora es en el destino antes de marcar. Evita despertar a clientes o familiares con llamadas a deshora.",
    faqs: [
      {
        question: "¿Cómo se marca un número con prefijo internacional?",
        answer: "Marca el signo más (+) o el código de salida internacional (00 en la mayoría de países) seguido del código de país y el número del destinatario."
      }
    ]
  },
  "/world-map": {
    path: "/world-map",
    category: "Geografía y Zonas Horarias",
    title: "Mapa del Mundo Interactivo con Relojes y Línea Solar | TimeNumbers",
    description: "Mapa mundial en tiempo real que muestra el terminador solar (día y noche) y relojes sobre 46 grandes capitales globales en vivo.",
    h1: "Mapa del Mundo Interactivo — Zonas de Día, Noche y Relojes",
    badgeLabel: "Cartografía Solar y Horológica",
    headings: [
      "Visualización en vivo de las zonas iluminadas por el sol y de noche",
      "Línea de sombra solar (terminador) en constante movimiento",
      "Relojes en tiempo real sobre las principales ciudades del globo",
      "Rotación y visualización cartográfica optimizada"
    ],
    page_text: "Observa nuestro planeta con la perspectiva de un satélite espacial. Este mapa interactivo calcula la posición cenital del sol en tiempo real para mostrar qué partes de la Tierra están iluminadas y cuáles se encuentran bajo la noche.",
    faqs: [
      {
        question: "¿Cómo se calcula la curva de día y noche en el mapa?",
        answer: "Calculamos las efemérides solares exactas según el día del año y la hora UTC actual, proyectando la curvatura estacional de iluminación sobre la superficie terrestre."
      }
    ]
  },
  "/sun": {
    path: "/sun",
    category: "Astronomía y Ciclos Solares",
    title: "Salida y Puesta del Sol Hoy — Horas Solares | TimeNumbers",
    description: "Calcula la hora exacta de la salida y puesta del sol, mediodía solar y duración del día en cualquier ciudad del mundo según algoritmos NOAA.",
    h1: "Salida y Puesta del Sol — Horas Solares y Duración del Día",
    badgeLabel: "Cálculos Solares de Precisión NOAA",
    headings: [
      "Horas exactas de amanecer y atardecer para cualquier ciudad",
      "Mediodía solar y elevación del sol sobre el horizonte",
      "Duración total de horas de luz del día actual",
      "Crepúsculos civil, náutico y astronómico"
    ],
    page_text: "Planifica tus actividades al aire libre conociendo con exactitud a qué hora sale y se oculta el sol. Con los algoritmos de radiación solar de la NOAA, TimeNumbers calcula los eventos solares con precisión de segundos para cualquier coordenada.",
    faqs: [
      {
        question: "¿A qué hora se considera que sale el sol?",
        answer: "La salida del sol oficial se define como el momento en que el borde superior del disco solar cruza el horizonte geométrico teniendo en cuenta la refracción atmosférica."
      }
    ]
  },
  "/golden-hour": {
    path: "/golden-hour",
    category: "Astronomía y Ciclos Solares",
    title: "Calculadora de Hora Dorada y Hora Azul para Fotografía | TimeNumbers",
    description: "Calcula los mejores momentos de luz para fotografía: hora dorada matutina, hora dorada vespertina y hora azul en cualquier lugar del mundo.",
    h1: "Calculadora de Hora Dorada y Hora Azul — Luz para Fotografía",
    badgeLabel: "Fotografía y Luz Natural",
    headings: [
      "Tiempos exactos de la hora dorada (Golden Hour) de mañana y tarde",
      "Horarios de la hora azul (Blue Hour) para fotografía urbana y de paisajes",
      "Ángulo de elevación del sol sobre el horizonte",
      "Consejos fotográficos para capturar la luz cálida perfecta"
    ],
    page_text: "Los fotógrafos y creadores de contenido saben que la luz natural cambia de forma espectacular durante el amanecer y el atardecer. Esta herramienta calcula los minutos exactos en que la luz solar adquiere esos tonos cálidos y dorados ideales para retratos y paisajes.",
    faqs: [
      {
        question: "¿Qué ángulo solar define la hora dorada?",
        answer: "La hora dorada corresponde al período en que el sol se encuentra entre 6 grados por debajo y 6 grados por encima del horizonte."
      }
    ]
  },
  "/moon": {
    path: "/moon",
    category: "Astronomía y Ciclos Solares",
    title: "Fases de la Luna Hoy — Iluminación y Calendario Lunar | TimeNumbers",
    description: "Consulta la fase lunar actual en vivo, porcentaje de iluminación de la luna, edad lunar en días y fechas de luna llena, luna nueva y cuartos.",
    h1: "Fases de la Luna en Vivo — Porcentaje de Iluminación y Calendario",
    badgeLabel: "Ciclo Sinódico Lunar",
    headings: [
      "Fase lunar actual con porcentaje de iluminación en tiempo real",
      "Ciclo lunar de 29,5 días (edad lunar y días transcurridos)",
      "Próximas fechas de Luna Nueva, Cuarto Creciente, Luna Llena y Cuarto Menguante",
      "Salida y puesta de la luna en tu ubicación"
    ],
    page_text: "Sigue el ciclo de nuestro satélite natural con nuestro observatorio lunar online. Descubre si esta noche habrá luna llena, cuánto porcentaje de su cara visible está iluminada y planifica observaciones astronómicas o salidas nocturnas.",
    faqs: [
      {
        question: "¿Cuánto dura un ciclo completo de fases lunares?",
        answer: "El mes sinódico dura en promedio 29 días, 12 horas y 44 minutos, tiempo en el que la luna completa sus cuatro fases principales."
      }
    ]
  },
  "/daylight-saving-time": {
    path: "/daylight-saving-time",
    category: "Astronomía y Ciclos Solares",
    title: "Horario de Verano 2026 y 2027 — Cuándo Cambia la Hora | TimeNumbers",
    description: "Fechas oficiales del cambio de hora en 2026 y 2027 en España, Estados Unidos, México, Europa y América Latina. Cuándo se adelanta y atrasa el reloj.",
    h1: "Horario de Verano 2026 y 2027 — Guía Mundial del Cambio de Hora",
    badgeLabel: "Calendario Oficial de Cambio de Hora",
    headings: [
      "Fechas exactas del cambio de hora de primavera y otoño",
      "Normativa en la Unión Europea y Estados Unidos",
      "Países que han eliminado el cambio de hora",
      "Consejos para adaptar el cuerpo al nuevo horario"
    ],
    page_text: "¿Cuándo hay que cambiar la hora? Conoce los calendarios oficiales de cambio de horario de verano en el mundo. Descubre qué domingos se adelantan o retrasan las manecillas del reloj y qué países han decidido no cambiar de hora nunca más.",
    faqs: [
      {
        question: "¿En qué fecha cambia la hora en España y Europa en 2026?",
        answer: "En la Unión Europea el reloj se adelanta una hora el último domingo de marzo (29 de marzo de 2026) y se retrasa una hora el último domingo de octubre (25 de octubre de 2026)."
      }
    ]
  },
  "/calendar": {
    path: "/calendar",
    category: "Calendarios y Fechas",
    title: "Calendario Anual 2026 Online con Semanas y Feriados | TimeNumbers",
    description: "Calendario completo del año 2026 online. Consulta los 12 meses, números de semana ISO, días festivos y festividades en una interfaz limpia.",
    h1: "Calendario Anual 2026 — Meses, Semanas y Días Festivos",
    badgeLabel: "Almanaque Anual Completo",
    headings: [
      "Vista completa de los 12 meses del año 2026",
      "Numeración de semanas estándar ISO 8601",
      "Conteo de días del año y días restantes",
      "Compatibilidad con calendarios de años próximos (2027 y 2028)"
    ],
    page_text: "Un almanaque anual claro y funcional para organizar tu año 2026. Visualiza de un vistazo la distribución de los meses, los días hábiles, los fines de semana y la numeración oficial de semanas.",
    faqs: [
      {
        question: "¿Es 2026 un año bisiesto?",
        answer: "No, el año 2026 es un año común de 365 días. El próximo año bisiesto será el 2028 con 366 días."
      }
    ]
  },
  "/compact-calendar": {
    path: "/compact-calendar",
    category: "Calendarios y Fechas",
    title: "Calendario Compacto Mensual Online | TimeNumbers",
    description: "Calendario compacto mes a mes para una planificación rápida. Visualiza el mes actual y navega con facilidad entre fechas.",
    h1: "Calendario Compacto — Vista Rápida Mensual",
    badgeLabel: "Planificación de Bolsillo",
    headings: [
      "Diseño minimalista centrado en el mes en curso",
      "Navegación ágil mes a mes",
      "Identificación clara del día actual",
      "Ideal para incrustar en pantallas reducidas"
    ],
    page_text: "Si necesitas una referencia rápida de fechas sin sobrecargar tu pantalla, el calendario compacto te ofrece la vista mensual indispensable con navegación instantánea.",
    faqs: [
      {
        question: "¿Muestra el número de semana?",
        answer: "Sí, cada fila del calendario compacto incluye el número de semana correspondiente según el estándar internacional."
      }
    ]
  },
  "/today": {
    path: "/today",
    category: "Calendarios y Fechas",
    title: "Qué Día Es Hoy — Fecha de Hoy y Datos del Día | TimeNumbers",
    description: "Consulta la fecha exacta de hoy con número de día del año, número de semana ISO, porcentaje transcurrido del año y días restantes.",
    h1: "Qué Día Es Hoy — Detalles de la Fecha Actual en Vivo",
    badgeLabel: "Métricas del Día Actual",
    headings: [
      "Fecha civil completa con día de la semana y mes",
      "Día del año (1 al 365) y días restantes para fin de año",
      "Número de semana ISO 8601 activa",
      "Porcentaje completado del año en curso"
    ],
    page_text: "Descubre todas las métricas del día de hoy: qué día del año es, cuántos días faltan para que termine el año, qué porcentaje del año llevamos completado y el número de semana actual.",
    faqs: [
      {
        question: "¿Cómo se calcula el porcentaje del año transcurrido?",
        answer: "Dividimos los segundos transcurridos desde el inicio del año entre los segundos totales del año civil (365 o 366 días)."
      }
    ]
  },
  "/week-number": {
    path: "/week-number",
    category: "Calendarios y Fechas",
    title: "Número de Semana Actual — Qué Semana Es Hoy | TimeNumbers",
    description: "Consulta el número de semana actual según el estándar ISO 8601. Descubre qué semana del año es hoy, fechas de inicio y fin de cada semana.",
    h1: "Número de Semana Actual — Calendario de Semanas ISO 8601",
    badgeLabel: "Estándar de Semanas ISO 8601",
    headings: [
      "Número de semana oficial según ISO 8601",
      "Fechas de inicio (lunes) y fin (domingo) de la semana en curso",
      "Total de semanas del año (52 o 53 semanas)",
      "Trimestres fiscales y calendario laboral"
    ],
    page_text: "Muchas empresas e instituciones organizan sus proyectos por números de semana. Consulta qué semana del año es hoy conforme a la norma ISO 8601, donde la primera semana del año es la que contiene el primer jueves de enero.",
    faqs: [
      {
        question: "¿En qué día empieza la semana según ISO 8601?",
        answer: "La norma ISO 8601 estipula que la semana comienza el lunes y finaliza el domingo."
      }
    ]
  },
  "/holidays": {
    path: "/holidays",
    category: "Calendarios y Fechas",
    title: "Días Festivos Internacionales 2026 — Feriados | TimeNumbers",
    description: "Calendario de días festivos internacionales y feriados del año 2026. Consulta fechas festivas en España, México, EE. UU. y el mundo.",
    h1: "Días Festivos Internacionales 2026 — Calendario de Feriados",
    badgeLabel: "Calendario de Festividades",
    headings: [
      "Principales días festivos internacionales de 2026",
      "Días no laborables en España, México, Estados Unidos y Latinoamérica",
      "Festividades religiosas, civiles e históricas",
      "Cálculo de puentes y fines de semana largos"
    ],
    page_text: "Planifica tus vacaciones y días libres con el calendario de días festivos de TimeNumbers. Conoce las fechas de Año Nuevo, Semana Santa, Día del Trabajo, Navidad y feriados nacionales.",
    faqs: [
      {
        question: "¿Cuándo cae Semana Santa en 2026?",
        answer: "En 2026, el Domingo de Resurrección se celebra el 5 de abril, situándose el Jueves Santo el 2 de abril y el Viernes Santo el 3 de abril."
      }
    ]
  },
  "/business-days-calculator": {
    path: "/business-days-calculator",
    category: "Calendarios y Fechas",
    title: "Calculadora de Días Hábiles y Laborables Online | TimeNumbers",
    description: "Calcula el número de días hábiles entre dos fechas excluyendo fines de semana y festivos. O suma días laborables a una fecha inicial.",
    h1: "Calculadora de Días Hábiles — Conteo de Días Laborales",
    badgeLabel: "Cálculo Legal y Laboral",
    headings: [
      "Conteo de días laborables exactos entre dos fechas",
      "Exclusión automática de sábados y domingos",
      "Opción de sumar o restar días hábiles a una fecha",
      "Ideal para plazos judiciales, contratos y entregas de proyectos"
    ],
    page_text: "¿Necesitas calcular una fecha límite de 15 días hábiles o saber cuántos días de trabajo hay en un mes? Nuestra calculadora de días laborales descarta automáticamente los fines de semana para darte una cifra precisa.",
    faqs: [
      {
        question: "¿Qué se considera un día hábil?",
        answer: "Generalmente se consideran días hábiles de lunes a viernes, excluyendo sábados, domingos y los días festivos oficiales."
      }
    ]
  },
  "/date-difference": {
    path: "/date-difference",
    category: "Calendarios y Fechas",
    title: "Calculadora de Días entre Dos Fechas | TimeNumbers",
    description: "Calcula los días, semanas, meses y años transcurridos entre dos fechas. Conteo exacto de días naturales y porcentaje de diferencia.",
    h1: "Calculadora de Diferencia entre Fechas — Días entre Dos Fechas",
    badgeLabel: "Cálculo Cronológico Exacto",
    headings: [
      "Total de días naturales exactos entre dos fechas",
      "Desglose en años, meses, semanas y días",
      "Conteo de horas, minutos y segundos transcurridos",
      "Herramienta perfecta para plazos, aniversarios y proyectos"
    ],
    page_text: "Ingresa dos fechas cualesquiera para conocer la distancia temporal exacta entre ambas. Conoce con precisión cuántos días han pasado desde un acontecimiento histórico o cuántos días faltan para un evento clave.",
    faqs: [
      {
        question: "¿Incluye el día final en el conteo?",
        answer: "Por defecto calcula el intervalo neto entre ambas fechas, pero puedes activar la casilla para incluir el día de finalización si así lo requieres."
      }
    ]
  },
  "/date-calculator": {
    path: "/date-calculator",
    category: "Calendarios y Fechas",
    title: "Calculadora de Fechas — Sumar o Restar Días | TimeNumbers",
    description: "Suma o resta días, semanas, meses o años a cualquier fecha. Descubre qué día exacto de la semana caerá tu fecha objetivo.",
    h1: "Calculadora de Fechas — Sumar y Restar Días a una Fecha",
    badgeLabel: "Aritmética de Calendario",
    headings: [
      "Adición y sustracción de días naturales a una fecha",
      "Suma de semanas, meses o años completos",
      "Identificación automática del día de la semana resultante",
      "Cálculo de vencimientos, periodos de garantía y plazos"
    ],
    page_text: "Calcula en qué fecha caerá un plazo sumando días o semanas a hoy o a una fecha concreta. La calculadora maneja automáticamente los cambios de mes, años bisiestos y fin de año.",
    faqs: [
      {
        question: "¿Tiene en cuenta los meses con diferente número de días?",
        answer: "Sí, la calculadora gestiona matemáticamente los meses de 28, 29, 30 y 31 días garantizando una fecha de destino exacta."
      }
    ]
  },
  "/birthday-calculator": {
    path: "/birthday-calculator",
    category: "Calendarios y Fechas",
    title: "Calculadora de Edad y Cumpleaños — Días Vividos | TimeNumbers",
    description: "Calcula tu edad exacta en años, meses, días, horas y minutos. Descubre qué día de la semana naciste y cuenta atrás para tu próximo cumpleaños.",
    h1: "Calculadora de Edad Exacta — Días Vividos y Próximo Cumpleaños",
    badgeLabel: "Cronometría Biográfica",
    headings: [
      "Edad cronológica exacta en años, meses y días",
      "Total de días, horas y minutos que has vivido en tu vida",
      "Día de la semana en que naciste",
      "Cuenta regresiva para tu próximo cumpleaños"
    ],
    page_text: "Introduce tu fecha de nacimiento para descubrir métricas sorprendentes sobre tu vida: cuántos días exactos has vivido, cuántas respiraciones estimadas has realizado y cuánto falta exactamente para soplar las velas de nuevo.",
    faqs: [
      {
        question: "¿Cómo se calcula la edad exacta?",
        answer: "Comparamos tu fecha de nacimiento con la fecha actual del sistema teniendo en cuenta los años bisiestos intermedios y la duración de cada mes."
      }
    ]
  },
  "/countdown": {
    path: "/countdown",
    category: "Calendarios y Fechas",
    title: "Cuenta Atrás Online Gratis — Contador Regresivo | TimeNumbers",
    description: "Crea una cuenta regresiva online para cualquier fecha, evento, vacaciones o Año Nuevo. Reloj de cuenta atrás en tiempo real con pantalla completa.",
    h1: "Cuenta Atrás Online — Contador Regresivo en Tiempo Real",
    badgeLabel: "Contadores de Eventos",
    headings: [
      "Cuenta atrás configurable para cualquier fecha y hora",
      "Contadores preconfigurados: Año Nuevo, Navidad, Halloween, San Valentín",
      "Modo pantalla completa para proyecciones y celebraciones",
      "Efecto de confeti y celebración al llegar a cero"
    ],
    page_text: "Sigue la emoción de la cuenta atrás para tus momentos más esperados: vacaciones, bodas, lanzamientos de productos o fiestas de fin de año con un contador visual segundo a segundo.",
    faqs: [
      {
        question: "¿Qué pasa cuando el contador llega a cero?",
        answer: "La pantalla activa una animación de celebración con confeti y sonido festivo para festejar el momento."
      }
    ]
  },
  "/unix-time": {
    path: "/unix-time",
    category: "Estándares y Desarrolladores",
    title: "Tiempo Unix Actual — Timestamp Epoch en Vivo | TimeNumbers",
    description: "Consulta el tiempo Unix actual en segundos y milisegundos en tiempo real. Herramienta para desarrolladores con copia rápida y laboratorio de tiempo.",
    h1: "Tiempo Unix Actual — Timestamp Epoch en Tiempo Real",
    badgeLabel: "Estándar Epoch POSIX",
    headings: [
      "Contador en vivo de segundos transcurridos desde el 1 de enero de 1970",
      "Formato en segundos (10 dígitos) y milisegundos (13 dígitos)",
      "Botón de copiado con un solo clic para desarrolladores",
      "Explicación del problema del año 2038 (Y2038)"
    ],
    page_text: "El tiempo Unix (Epoch timestamp) es el sistema empleado por bases de datos, sistemas operativos y APIs para registrar momentos temporales sin ambigüedad de zonas horarias. Visualiza los segundos actuales y cópialos directamente al portapapeles.",
    faqs: [
      {
        question: "¿Qué es el Epoch Unix?",
        answer: "Es el punto de origen fijado a las 00:00:00 UTC del 1 de enero de 1970, a partir del cual se cuentan los segundos continuos sin tener en cuenta segundos intercalares."
      }
    ]
  },
  "/unix-time-converter": {
    path: "/unix-time-converter",
    category: "Estándares y Desarrolladores",
    title: "Conversor de Timestamp Unix a Fecha Humana | TimeNumbers",
    description: "Convierte marcas de tiempo Unix (Epoch) a fecha y hora legible humana (UTC y hora local), y viceversa. Soporta segundos, milisegundos y microsegundos.",
    h1: "Conversor de Timestamp Unix — De Epoch a Fecha y Hora Legible",
    badgeLabel: "Conversor Bidireccional Epoch",
    headings: [
      "Conversión instantánea de timestamp a fecha legible",
      "Conversión de fecha y hora humana a timestamp Unix",
      "Soporte para segundos, milisegundos, microsegundos y nanosegundos",
      "Visualización simultánea en UTC y hora local de tu sistema"
    ],
    page_text: "Convierte números de timestamp crudos de logs, bases de datos o respuestas JSON a fechas perfectamente comprensibles en formato ISO 8601, UTC y tu zona horaria local.",
    faqs: [
      {
        question: "¿Detecta automáticamente si el número son segundos o milisegundos?",
        answer: "Sí, nuestra herramienta analiza la longitud del número para identificar si corresponde a segundos (10 dígitos) o milisegundos (13 dígitos)."
      }
    ]
  },
  "/iso-8601": {
    path: "/iso-8601",
    category: "Estándares y Desarrolladores",
    title: "Validador y Formateador ISO 8601 Online | TimeNumbers",
    description: "Valida, analiza y genera cadenas de fecha y hora ISO 8601 (YYYY-MM-DDTHH:mm:ssZ). Herramienta técnica esencial para desarrolladores de APIs.",
    h1: "Validador y Generador ISO 8601 — Estándar de Fecha y Hora",
    badgeLabel: "Norma Internacional ISO 8601",
    headings: [
      "Validación de sintaxis de cadenas de fecha y hora ISO 8601",
      "Conversión a hora local, UTC y timestamps",
      "Generación de cadenas con zona horaria o sufijo 'Z'",
      "Explicación técnica de la norma y ejemplos de uso"
    ],
    page_text: "El estándar ISO 8601 es la norma internacional indiscutible para el intercambio de fechas y horas en sistemas de información y APIs REST. Valida tus cadenas y resuelve problemas de parsing al instante.",
    faqs: [
      {
        question: "¿Qué significa la 'Z' al final de una cadena ISO 8601?",
        answer: "La letra 'Z' significa 'Zulu time', que equivale a la zona horaria UTC con desplazamiento cero (+00:00)."
      }
    ]
  },
  "/api-docs": {
    path: "/api-docs",
    category: "Estándares y Desarrolladores",
    title: "Documentación de la API de Tiempo y Zonas Horarias | TimeNumbers",
    description: "Documentación oficial de la API de TimeNumbers. Endpoints REST de alto rendimiento para hora actual, zonas horarias y conversiones con respuesta JSON.",
    h1: "Documentación de la API de TimeNumbers — Tiempo y Zonas Horarias",
    badgeLabel: "API REST de Tiempo Global",
    headings: [
      "Endpoints de alta velocidad para hora actual por ciudad o zona",
      "Conversión de zonas horarias mediante llamadas REST simples",
      "Formato de respuesta JSON estandarizado y ultra ligero",
      "Ejemplos de integración en JavaScript, Python, cURL y PHP"
    ],
    page_text: "Integra datos de tiempo atómico y zonas horarias en tus aplicaciones, sitios web o dispositivos IoT con nuestra API REST pública y rápida. Respuestas optimizadas en milisegundos con cabeceras de caché eficientes.",
    faqs: [
      {
        question: "¿Se requiere clave de API (API Key)?",
        answer: "Los endpoints públicos pueden consultarse directamente con límites de uso razonables. Para proyectos de alto volumen se ofrecen planes dedicados."
      }
    ]
  },
  "/developers": {
    path: "/developers",
    category: "Estándares y Desarrolladores",
    title: "Centro de Desarrolladores — APIs, SDKs y Herramientas | TimeNumbers",
    description: "Recursos para desarrolladores de software: bibliotecas, SDKs, algoritmos de zonas horarias, timestamps y herramientas de cronometría.",
    h1: "Centro de Desarrolladores — Herramientas Horológicas y APIs",
    badgeLabel: "Ecosistema para Ingenieros",
    headings: [
      "Guías de integración y buenas prácticas en gestión de tiempo",
      "Algoritmos de compensación de horario de verano y zonas IANA",
      "Librerías de código abierto y utilidades",
      "Soporte para desarrolladores"
    ],
    page_text: "Diseñado para ingenieros de software, administradores de sistemas y creadores que necesitan gestionar la complejidad del tiempo, las zonas horarias y el horario de verano en sus productos.",
    faqs: [
      {
        question: "¿Qué bibliotecas recomiendan para gestionar tiempo en frontend?",
        answer: "Recomendamos el uso de la API nativa de JavaScript Intl.DateTimeFormat y Temporal API para proyectos modernos, o librerías ligeras como Day.js o Luxon."
      }
    ]
  },
  "/widgets": {
    path: "/widgets",
    category: "Estándares y Desarrolladores",
    title: "Widgets de Reloj Gratis para tu Página Web — Reloj HTML | TimeNumbers",
    description: "Inserta un widget de reloj digital o analógico gratis en tu sitio web. Código HTML responsive, temas claro y oscuro, y reloj mundial personalizable.",
    h1: "Widgets de Reloj Gratis para tu Página Web — Código HTML en Vivo",
    badgeLabel: "Widgets Embebibles Gratuitos",
    headings: [
      "Generador de widgets de reloj digital y analógico",
      "Personalización de ciudades, colores, tamaños y temas (claro/oscuro)",
      "Código HTML / iFrame ligero y de carga ultrarrápida",
      "Compatible con WordPress, Shopify, Wix, Squarespace y HTML puro"
    ],
    page_text: "Añade un elegante reloj en tiempo real a tu sitio web, blog o intranet corporativa. Configura la ciudad que desees, elige entre diseño analógico o digital y copia unas pocas líneas de código HTML para integrarlo al instante.",
    faqs: [
      {
        question: "¿Es gratis usar estos widgets en mi página web?",
        answer: "Sí, nuestros widgets son 100% gratuitos para uso personal y comercial, manteniendo el enlace de atribución a TimeNumbers."
      },
      {
        question: "¿Afecta a la velocidad de carga de mi página?",
        answer: "No, los widgets están diseñados en Vanilla CSS y JavaScript ultraligero sin dependencias pesadas, cargando de forma asíncrona sin frenar tu sitio."
      }
    ]
  },
  "/learn": {
    path: "/learn",
    category: "Conocimiento y Aprendizaje",
    title: "Academia de Horología y Tiempo — Guías y Artículos | TimeNumbers",
    description: "Aprende todo sobre cómo funciona el tiempo en nuestro planeta: relojes atómicos, segundos intercalares, historia de los husos horarios y física temporal.",
    h1: "Academia de Horología — Guías Educativas sobre el Tiempo",
    badgeLabel: "Educación y Ciencia Temporal",
    headings: [
      "Historia y evolución de la medición del tiempo",
      "Funcionamiento de los relojes atómicos y estándares NTP",
      "Por qué existen las zonas horarias y la línea de cambio de fecha",
      "El futuro del horario de verano en el mundo"
    ],
    page_text: "Sumérgete en la ciencia fascinante de la horología. Desde los primeros cuadrantes solares y relojes de péndulo hasta la física cuántica de los relojes de cesio y la definición científica del segundo.",
    faqs: [
      {
        question: "¿Qué es la horología?",
        answer: "La horología es la ciencia y el arte dedicados a medir el tiempo y construir instrumentos para registrarlo, como relojes y cronómetros."
      }
    ]
  },
  "/learn/seo-simulator": {
    path: "/learn/seo-simulator",
    category: "Conocimiento y Aprendizaje",
    title: "Simulador de Posicionamiento SEO Interactivo | TimeNumbers",
    description: "Simulador interactivo de ranking y autoridad SEO. Experimenta con métricas de dificultad de palabras clave, enlaces y velocidad web.",
    h1: "Simulador de Autoridad y Posicionamiento SEO",
    badgeLabel: "Herramienta Didáctica SEO",
    headings: [
      "Simulación de variables de posicionamiento orgánico en buscadores",
      "Impacto de la autoridad de dominio y calidad del contenido",
      "Optimización de velocidad y Core Web Vitals",
      "Estrategias de palabras clave de alto impacto"
    ],
    page_text: "Una herramienta interactiva diseñada para explorar de forma didáctica los factores que influyen en la visibilidad orgánica y el posicionamiento en los motores de búsqueda modernos.",
    faqs: [
      {
        question: "¿Cómo funciona este simulador?",
        answer: "Ajusta las variables de autoridad, enlaces y optimización técnica para ver cómo cambia la probabilidad de clasificación para distintas dificultades de palabras clave."
      }
    ]
  },
  "/blog": {
    path: "/blog",
    category: "Conocimiento y Aprendizaje",
    title: "Blog de TimeNumbers — Novedades, Horología y Guías | TimeNumbers",
    description: "Artículos, guías prácticas y novedades sobre gestión del tiempo, productividad, astronomía y sincronización horaria internacional.",
    h1: "Blog de TimeNumbers — Artículos sobre Tiempo y Productividad",
    badgeLabel: "Publicaciones y Novedades",
    headings: [
      "Guías sobre coordinación de equipos remotos y zonas horarias",
      "Análisis sobre la eliminación del horario de verano",
      "Curiosidades astronómicas y solares",
      "Actualizaciones de herramientas de TimeNumbers"
    ],
    page_text: "Bienvenido a nuestro espacio editorial. Aquí publicamos análisis detallados, explicaciones sencillas a dudas complejas sobre husos horarios y consejos para optimizar tus rutinas diarias.",
    faqs: [
      {
        question: "¿Con qué frecuencia se publican nuevos artículos?",
        answer: "Actualizamos nuestro blog periódicamente con contenido riguroso y verificado por especialistas en horología y tecnología."
      }
    ]
  },
  "/about": {
    path: "/about",
    category: "Compañía y Legal",
    title: "Acerca de TimeNumbers — Nuestra Misión y Tecnología | TimeNumbers",
    description: "Conoce más sobre TimeNumbers: nuestra misión de proporcionar la hora exacta, herramientas de tiempo atómico y utilidades horarias globales a millones de personas.",
    h1: "Acerca de TimeNumbers — Precisión, Ciencia y Tiempo Global",
    badgeLabel: "Quiénes Somos",
    headings: [
      "Nuestra misión: hacer el tiempo global comprensible y exacto",
      "Infraestructura sincronizada con relojes atómicos mundiales",
      "Herramientas gratuitas accesibles para todo el mundo",
      "Compromiso con la privacidad y la velocidad"
    ],
    page_text: "TimeNumbers nació con un propósito claro: ofrecer a usuarios, profesionales y empresas una plataforma de tiempo global elegante, sin publicidad invasiva y con la máxima precisión matemática posible.\n\nNuestra infraestructura procesa peticiones conectando directamente con servidores de referencia horaria internacional, ofreciendo una experiencia rápida y fiable en cualquier idioma.",
    faqs: [
      {
        question: "¿Es TimeNumbers un servicio gratuito?",
        answer: "Sí, todas nuestras herramientas públicas de reloj, cronómetros, conversores y calculadoras son de acceso libre y gratuito."
      }
    ]
  },
  "/contact": {
    path: "/contact",
    category: "Compañía y Legal",
    title: "Contacto — Contacta con el Equipo de TimeNumbers | TimeNumbers",
    description: "¿Tienes dudas, sugerencias o necesitas soporte? Ponte en contacto con el equipo de TimeNumbers. Estamos a tu disposición.",
    h1: "Contacto — Comunícate con Nosotros",
    badgeLabel: "Atención y Soporte",
    headings: [
      "Envíanos tus comentarios, sugerencias o dudas",
      "Soporte para widgets e integraciones de API",
      "Reporte de incidencias o correcciones horarias",
      "Colaboraciones y consultas de prensa"
    ],
    page_text: "Nos encanta escuchar a nuestros usuarios. Si has detectado algún dato que requiera actualización, deseas solicitar una nueva función o tienes consultas sobre nuestras herramientas, no dudes en escribirnos.",
    faqs: [
      {
        question: "¿En cuánto tiempo responden a las consultas?",
        answer: "Nuestro equipo responde habitualmente a todos los mensajes en un plazo de 24 a 48 horas hábiles."
      }
    ]
  },
  "/faq": {
    path: "/faq",
    category: "Compañía y Legal",
    title: "Preguntas Frecuentes (FAQ) sobre TimeNumbers | TimeNumbers",
    description: "Respuestas a las preguntas más habituales sobre precisión de relojes, conversión de zonas horarias, cálculo de horario de verano y widgets.",
    h1: "Preguntas Frecuentes — Todo lo que Necesitas Saber",
    badgeLabel: "Centro de Ayuda y Respuestas",
    headings: [
      "Cómo garantiza TimeNumbers la hora exacta",
      "Diferencias entre formatos y estándares de tiempo",
      "Cómo integrar relojes en tu web de forma gratuita",
      "Privacidad y almacenamiento de preferencias"
    ],
    page_text: "Encuentra respuestas inmediatas a las consultas más habituales sobre el funcionamiento de nuestros relojes en vivo, conversor de horas, temporizadores y herramientas de astronomía.",
    faqs: [
      {
        question: "¿Se guardan mis preferencias de ciudades?",
        answer: "Sí, tus ciudades y ajustes favoritos se guardan localmente en tu propio dispositivo mediante LocalStorage, sin recopilar datos personales en servidores."
      }
    ]
  },
  "/data-sources": {
    path: "/data-sources",
    category: "Compañía y Legal",
    title: "Fuentes de Datos y Estándares de Tiempo | TimeNumbers",
    description: "Transparencia científica: conoce las fuentes oficiales, servidores NTP, algoritmos astronómicos de la NOAA y bases de datos IANA que sustentan TimeNumbers.",
    h1: "Fuentes de Datos Científicas y Estándares Oficiales",
    badgeLabel: "Transparencia Científica",
    headings: [
      "Servidores de tiempo de Estrato 1 y protocolos NTP",
      "Base de datos de zonas horarias IANA / Olson",
      "Algoritmos solares de la NOAA para salida y puesta del sol",
      "Modelos lunares basados en parámetros astronómicos"
    ],
    page_text: "En TimeNumbers nos tomamos la exactitud muy en serio. Todos nuestros cálculos derivan de fuentes científicas oficiales y estándares internacionales reconocidos, garantizando una fiabilidad total en cada dato mostrado.",
    faqs: [
      {
        question: "¿Qué algoritmo se utiliza para los cálculos solares?",
        answer: "Utilizamos las ecuaciones de posición solar y refracción atmosférica desarrolladas por el laboratorio NOAA Earth System Research Laboratory."
      }
    ]
  },
  "/privacy": {
    path: "/privacy",
    category: "Compañía y Legal",
    title: "Política de Privacidad | TimeNumbers",
    description: "Conoce nuestra política de privacidad: en TimeNumbers protegemos tus datos, no vendemos información y priorizamos el procesamiento local en tu navegador.",
    h1: "Política de Privacidad de TimeNumbers",
    badgeLabel: "Protección de Datos",
    headings: [
      "Compromiso con la privacidad del usuario",
      "Almacenamiento local de preferencias sin rastreo intrusivo",
      "Uso de cookies esenciales y analíticas anónimas",
      "Tus derechos de privacidad y contacto"
    ],
    page_text: "Tu privacidad es fundamental para nosotros. En TimeNumbers no vendemos tus datos personales ni realizamos perfiles de usuario. Todas las preferencias de ciudades y alarmas se almacenan únicamente en tu navegador.",
    faqs: [
      {
        question: "¿Recopila TimeNumbers mi ubicación exacta?",
        answer: "No. Si permites la geolocalización, se utiliza exclusivamente dentro de tu navegador para mostrar tu hora local más cercana sin almacenar tus coordenadas en servidores."
      }
    ]
  },
  "/terms": {
    path: "/terms",
    category: "Compañía y Legal",
    title: "Términos y Condiciones de Uso | TimeNumbers",
    description: "Condiciones de uso y aviso legal del sitio web TimeNumbers. Información sobre licencias, uso de widgets, propiedad intelectual y responsabilidades.",
    h1: "Términos y Condiciones de Uso",
    badgeLabel: "Aviso Legal",
    headings: [
      "Aceptación de las condiciones de uso",
      "Licencia de uso gratuito de herramientas y widgets",
      "Propiedad intelectual de TimeNumbers",
      "Limitación de responsabilidad"
    ],
    page_text: "Al acceder y utilizar TimeNumbers, aceptas estos términos y condiciones. Nuestras herramientas se ofrecen de forma gratuita para ayudarte en tu día a día con la máxima fiabilidad posible.",
    faqs: [
      {
        question: "¿Puedo usar los datos de TimeNumbers para mi empresa?",
        answer: "Sí, el uso personal y profesional de las herramientas y widgets está permitido conforme a nuestras condiciones de servicio."
      }
    ]
  },
  "/astronomy": {
    path: "/astronomy",
    category: "Astronomía y Efemérides",
    title: "Laboratorio de Astronomía Solar y Lunar | TimeNumbers",
    description: "Cálculos solares en tiempo real, salida y puesta de sol, crepúsculo civil y náutico, hora dorada y fase lunar en vivo para cualquier ciudad.",
    h1: "Laboratorio de Astronomía Solar y Lunar",
    badgeLabel: "Horología Celeste y Mecánica Solar",
    headings: [
      "Algoritmo solar NOAA y cálculo de trayectorias",
      "Ciclo lunar sinódico de 29,5 días",
      "Crepúsculo civil, náutico y astronómico",
      "Fotografía y ventanas de hora dorada"
    ],
    page_text: "Monitorea la posición del sol y de la luna con precisión matemática. Utilizando los algoritmos oficiales de la NOAA, nuestro laboratorio astronómico calcula la salida del sol, mediodía solar, puesta de sol y la iluminación porcentual de la luna en tiempo real para cualquier coordenada del planeta.",
    faqs: [
      {
        question: "¿Cuál es la diferencia entre crepúsculo civil, náutico y astronómico?",
        answer: "El crepúsculo civil ocurre cuando el sol está entre 0° y 6° bajo el horizonte; la luz natural permite actividades al aire libre. El crepúsculo náutico (6° a 12°) permite a los navegantes ver el horizonte marino y las estrellas. El crepúsculo astronómico (12° a 18°) da paso a la oscuridad total idónea para la astronomía."
      },
      {
        question: "¿Qué es la 'Hora Dorada' en fotografía?",
        answer: "Es el intervalo poco después del amanecer o antes del atardecer donde los rayos solares atraviesan mayor grosor atmosférico, filtrando la luz azul y bañando los paisajes con tonos cálidos, dorados y sombras suaves."
      }
    ]
  },
  "/life-in-weeks": {
    path: "/life-in-weeks",
    category: "Productividad y Filosofía",
    title: "Cuadrícula de la Vida en Semanas (Memento Mori) | TimeNumbers",
    description: "Visualiza tu vida de 80 años en una cuadrícula interactiva de 4.160 semanas. Calcula semanas vividas, veranos restantes y perspectiva estoica Memento Mori.",
    h1: "Tu Vida en Semanas — Visualizador Memento Mori de 4.160 Semanas",
    badgeLabel: "Perspectiva y Filosofía Estoica",
    headings: [
      "El concepto Memento Mori aplicado a 4.160 semanas",
      "Por qué medir la vida en semanas transforma tu enfoque",
      "La brevedad de la vida según Séneca",
      "Apreciación del momento presente y veranos restantes"
    ],
    page_text: "Visualizar una vida humana típica de 80 años en 4.160 cuadros finitos transforma el paso del tiempo de una idea abstracta a una realidad visual tangible. Cada cuadro completado representa una semana vivida, recordándonos la importancia de vivir con intención.",
    faqs: [
      {
        question: "¿Qué significa el concepto Memento Mori?",
        answer: "Memento Mori es una frase en latín que significa 'Recuerda que morirás'. No pretende ser un mensaje pesimista, sino una invitación estoica a valorar el tiempo presente y no postergar lo que verdaderamente importa."
      },
      {
        question: "¿Cuántas semanas tiene la vida de una persona?",
        answer: "Una esperanza de vida promedio de 80 años equivale aproximadamente a 4.160 semanas. A los 30 años, ya se han vivido cerca de 1.560 semanas, quedando unas 2.600 semanas por delante."
      }
    ]
  },
  "/meeting-cost-calculator": {
    path: "/meeting-cost-calculator",
    category: "Negocios y Productividad",
    title: "Calculadora del Coste de Reuniones en Tiempo Real | TimeNumbers",
    description: "Calcula el coste financiero real de tus reuniones de trabajo con un taxímetro en tiempo real. Salarios por hora, coste de interrupción y fórmulas de eficiencia.",
    h1: "Calculadora del Coste de Reuniones en Vivo",
    badgeLabel: "Economía y ROI Organizacional",
    headings: [
      "El coste oculto del exceso de reuniones",
      "Impuesto de cambio de contexto e interrupciones",
      "La regla de las dos pizzas de Amazon",
      "Cultura orientada a la comunicación asíncrona"
    ],
    page_text: "Cuando se convoca a 10 ingenieros o ejecutivos a una reunión de una hora, la empresa no invierte 1 hora: invierte 10 horas de trabajo colectivo. Con esta calculadora puedes visualizar en tiempo real el coste económico acumulado segundo a segundo.",
    faqs: [
      {
        question: "¿Cómo se calcula el coste de una reunión corporativa?",
        answer: "La fórmula es: Coste = Número de asistentes × Tarifa horaria promedio × Duración en horas. Añadiendo los costes indirectos (seguridad social, beneficios y equipos), se obtiene el coste real para la organización."
      },
      {
        question: "¿Qué es la regla de las dos pizzas?",
        answer: "Popularizada por Jeff Bezos en Amazon, establece que ninguna reunión interna debe tener más participantes de los que puedan alimentarse con dos pizzas (generalmente 6 a 8 personas), manteniendo la agilidad y evitando reuniones multitudinarias ineficientes."
      }
    ]
  },
  "/sleep-calculator": {
    path: "/sleep-calculator",
    category: "Salud y Productividad",
    title: "Calculadora de Ciclos de Sueño — Despierta con Energía | TimeNumbers",
    description: "Calcula la hora óptima para dormirte y despertarte según ciclos de sueño de 90 minutos. Evita la inercia del sueño y despiértate renovado.",
    h1: "Calculadora de Ciclos de Sueño — Horarios Óptimos de Descanso",
    badgeLabel: "Cronobiología y Ritmos Circadianos",
    headings: [
      "La fórmula científica de los ciclos de sueño de 90 minutos",
      "Inercia del sueño: por qué te despiertas cansado tras 8 horas",
      "La regla de los 14 minutos para conciliar el sueño",
      "Fases NREM, delta profunda y sueño MOR (REM)"
    ],
    page_text: "El sueño humano no es un estado uniforme, sino que se divide en ciclos de aproximadamente 90 a 110 minutos. Despertarse al final de un ciclo completado permite amanecer con energía natural y máxima agilidad mental, evitando la pesadez de cortar el sueño profundo.",
    faqs: [
      {
        question: "¿Cuánto dura un ciclo de sueño natural?",
        answer: "En un adulto sano, cada ciclo dura entre 90 y 110 minutos y consta de sueño ligero (N1 y N2), sueño profundo de ondas lentas (N3) y sueño MOR (movimientos oculares rápidos donde soñamos)."
      },
      {
        question: "¿Por qué me siento cansado aunque duerma 8 o 9 horas?",
        answer: "Se debe a la inercia del sueño. Si la alarma suena a mitad de la fase de sueño profundo N3 delta, el cerebro experimenta una transición forzada y acumula somnolencia que puede tardar hasta una hora en desaparecer."
      },
      {
        question: "¿Cuántos ciclos de sueño necesita un adulto por noche?",
        answer: "La mayoría de los adultos obtienen su mejor rendimiento con 5 ciclos completos (7,5 horas de sueño) o 6 ciclos (9 horas de sueño)."
      }
    ]
  }
};
