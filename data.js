// Contenido del portfolio en español. La versión en inglés está en data.en.js:
// si cambias algo aquí, cámbialo también allí.
//
// - Los campos vacíos ('') no se muestran.
// - En los textos puedes usar **negrita** y `comando` (se convierte en un botón que ejecuta ese comando).
// - Busca "TODO" para ver los datos que faltan o que conviene revisar.

window.PORTFOLIO = {
  profile: {
    name: 'Pedro',
    host: 'pedro', // aparece en el prompt: visitante@pedro:~$
    role: 'Data Scientist · AI/ML Engineer · Co-fundador',
    location: 'Valencia',
    status: 'Construyendo soluciones de IA a medida',
    email: 'pedrodelunahuerta@gmail.com',
    x: 'https://x.com/pedrodelunah',
    linkedin: 'https://www.linkedin.com/in/pedro-de-luna-huerta-1a161b333/',
  },

  // Generado con https://patorjk.com/software/taag (fuente "ANSI Shadow")
  banner: String.raw`
██████╗ ███████╗██████╗ ██████╗  ██████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗
██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║
██╔═══╝ ██╔══╝  ██║  ██║██╔══██╗██║   ██║
██║     ███████╗██████╔╝██║  ██║╚██████╔╝
╚═╝     ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝`.slice(1),
  bannerLabel: 'portfolio', // texto que aparece al lado del nombre

  about: [
    'Hola, soy **Pedro**. Programo desde los 14 años y hoy me dedico a lo que más me gusta: convertir datos en decisiones con **inteligencia artificial y machine learning**.',
    'Soy graduado en **Ciencia de Datos** con **varias matrículas de honor** y tengo un **Máster en Planificación y Gestión de Procesos Empresariales**, ambos por la **Universitat de València**. En un proyecto con **Kongsberg** detectaba lecturas erróneas de **sensores submarinos de pesca** y estimaba su valor correcto. Mi TFG sobre ML y **gemelos digitales** cardíacos se publicó en el **CASEIB** y en **Computing in Cardiology (CinC)**.',
    'Ahora estoy volcado en **Nódicus**, la consultora de IA a medida que cofundé con un amigo, donde desarrollamos soluciones de IA y machine learning adaptadas a cada cliente. Escribe `empresa` o `proyectos` para saber más.',
  ],

  timeline: [
    { when: '2017', title: 'Primeras líneas de código', text: 'Empiezo a programar con 14 años, por curiosidad. Desde entonces no he parado.' },
    { when: '2021', title: 'Grado en Ciencia de Datos', text: 'Estadística, programación y machine learning en la Universitat de València. Cierro primero con una **media superior a 9.5**.' },
    { when: '2022', title: 'Desarrollador de aplicaciones web', text: 'Mi primer trabajo en la industria, en **PKSIAM**: aplicaciones web a medida para distintos clientes, compaginado con la carrera hasta 2025.' },
    { when: '2023–24', title: 'Erasmus en Noruega', text: 'Curso tercero en Noruega mientras sigo trabajando en remoto.' },
    { when: '2024–25', title: 'TFG: ML y gemelos digitales', text: 'Mi trabajo de fin de grado se publica en el **CASEIB** y en **Computing in Cardiology**. Ver `publicaciones`.' },
    { when: '2025', title: 'Proyecto con Kongsberg', text: 'Datos de sensores submarinos de pesca: detectar lecturas erróneas y estimar el valor correcto. Ver `proyectos`.' },
    { when: '2025–26', title: 'Máster en Planificación y Gestión de Procesos Empresariales', text: 'Lo curso en la Universitat de València, en paralelo al proyecto con Kongsberg.' },
    { when: 'Jun. 2026 → hoy', title: 'Co-fundo Nódicus', text: 'Dejo el proyecto de Kongsberg para montar, con un amigo, una consultora de IA a medida y ML. Ver `empresa`.', now: true },
  ],

  company: {
    name: 'Nódicus',
    url: 'https://nodicus.com',
    since: 'jun. 2026 → hoy',
    tagline: 'Consultoría de IA a medida y machine learning',
    story: 'La monté junto a un amigo en junio de 2026, tras dejar el proyecto con Kongsberg, para llevar la IA y el machine learning a empresas con problemas concretos. Algunos de nuestros trabajos están en `proyectos`.',
    services: [
      '**IA a medida**: soluciones diseñadas para el problema concreto de cada cliente.',
      '**Machine learning**: modelos predictivos entrenados con los datos del cliente.',
      '**Datos**: limpieza, preparación y puesta en valor de la información.',
    ],
  },

  experience: [
    {
      file: 'empresa.md',
      title: 'Co-fundador',
      org: 'Nódicus',
      when: 'jun. 2026 → hoy',
      sub: 'Consultoría de IA a medida y machine learning',
      bullets: [
        'Fundada junto a un amigo tras dejar el proyecto con Kongsberg.',
        'Diseñamos soluciones de IA y modelos de ML a medida para cada cliente.',
        'Proyecto de **visión por computador** que verifica la correcta preparación de fármacos oncológicos: generación del dataset y entrenamiento del modelo.',
      ],
      tags: ['IA', 'Machine Learning', 'LLMs', 'Visión por computador', 'Consultoría', 'Emprendimiento'],
    },
    {
      file: 'kongsberg.md',
      title: 'Data Scientist', // TODO: revisa el título del puesto
      org: 'Kongsberg',
      when: '2025 → jun. 2026',
      sub: 'Datos de sensores submarinos de pesca',
      bullets: [
        'Limpieza y preparación de los datos de los sensores.',
        'Modelos para detectar cuándo un dato que llega es erróneo.',
        'Estimación del valor correcto a partir de las lecturas anteriores y del resto de datos.',
        'Compaginado con el máster.',
      ],
      tags: ['Series temporales', 'Detección de anomalías', 'Imputación de datos', 'Machine Learning'],
    },
    {
      file: 'pksiam.md',
      title: 'Desarrollador de aplicaciones web',
      org: 'PKSIAM',
      when: '2022 → 2025',
      sub: 'Aplicaciones web a medida para distintos clientes',
      bullets: [
        'Ciclo completo de cada proyecto: **requisitos hablando con el cliente**, gestión de la **base de datos**, desarrollo y **despliegue en producción**.',
        'Mi primer trabajo profesional, compaginado con el grado.',
        'Seguí trabajando en remoto durante el Erasmus en Noruega.',
      ],
      tags: ['C#', '.NET', 'SQL', 'Aplicaciones web', 'Despliegue', 'Trato con clientes'],
    },
  ],

  education: [
    {
      file: 'master-pgpe.md',
      title: 'Máster en Planificación y Gestión de Procesos Empresariales',
      org: 'Universitat de València',
      when: '2025 – 2026',
      bullets: ['Cursado en paralelo al proyecto con Kongsberg.'],
    },
    {
      file: 'erasmus-noruega.md',
      title: 'Erasmus',
      org: 'Noruega',
      when: '2023 – 2024',
      bullets: [
        'Tercer curso del grado en Noruega.',
        'Compaginado con mi trabajo en remoto como desarrollador web.',
      ],
      tags: ['Internacional', 'Inglés', 'Trabajo en remoto'],
    },
    {
      file: 'grado-ciencia-datos.md',
      title: 'Grado en Ciencia de Datos',
      org: 'Universitat de València',
      when: '2021 – 2025',
      bullets: [
        'Nota media: **8.8**.',
        'TFG sobre machine learning y gemelos digitales, **publicado en CASEIB y CinC**.',
      ],
      tags: ['Estadística', 'Machine Learning', 'Programación'],
    },
  ],

  // Proyectos. `short` se muestra en el listado de `proyectos`; el resto al abrir cada uno (`proyectos <id>`).
  // Campos opcionales del detalle:
  //   flow:     pasos del proceso, se dibujan como un esquema con flechas
  //   sections: bloques { title, text?, bullets? }
  //   links:    { label, cmd }, botones que ejecutan ese comando
  projects: [
    {
      id: 'vision',
      file: 'vision-farmacos-oncologicos.md',
      short: 'Una segunda mirada: la IA verifica que la preparación se hace bien, para dar más seguridad.',
      title: 'Visión por computador para verificar fármacos oncológicos',
      org: 'Nódicus',
      when: 'jun. 2026 → hoy',
      summary: 'Sistema de **ayuda** basado en visión por computador que **verifica que el profesional prepara correctamente** los fármacos oncológicos. No lo sustituye: añade una capa más de **seguridad**. Además del modelo, generamos el dataset del que aprende.',
      flow: ['El profesional prepara el fármaco', 'Visión por computador', 'Verificación', 'Más seguridad'],
      sections: [
        {
          title: 'El contexto',
          text: 'La preparación de fármacos oncológicos es un proceso delicado en el que un error puede tener consecuencias graves. La hace una persona, y cualquier control adicional suma seguridad.',
        },
        {
          title: 'Qué hace',
          bullets: [
            'Funciona como **ayuda**: el profesional sigue preparando el fármaco y la IA **verifica que lo haga bien**.',
            'Aporta una **segunda comprobación** que refuerza la seguridad del proceso.',
          ],
        },
        {
          title: 'Qué hacemos',
          bullets: [
            '**Generamos el dataset**: definimos qué datos necesita el modelo y los creamos.',
            '**Entrenamos y evaluamos** el modelo de visión por computador, iterando sobre los datos y el modelo.',
          ],
        },
        {
          title: 'Por qué empezar por los datos',
          text: 'Un modelo de visión es tan bueno como los datos con los que aprende. Hacernos cargo también del dataset nos permite controlar la calidad de principio a fin, en lugar de depender de datos que no encajan con el problema.',
        },
      ],
      tags: ['Visión por computador', 'Creación de datasets', 'Deep learning', 'Salud'], // TODO: revisa tecnologías
      links: [{ label: 'sobre Nódicus', cmd: 'empresa' }],
    },
    {
      id: 'garantias',
      file: 'llm-garantias-camiones.md',
      short: 'Un LLM propone qué tareas corresponden a cada avería de entre 10-15k códigos. Antes se hacía a mano.',
      title: 'LLM + retrieval para garantías de camiones',
      org: 'Nódicus',
      when: 'jun. 2026 → hoy',
      summary: 'Sistema que, a partir de una **avería de camión**, propone los **códigos de tarea** que le corresponden dentro de un catálogo de **10.000 a 15.000 opciones**. Es el paso necesario para **cobrar la garantía**, y hasta ahora se hacía a mano.',
      flow: ['Avería del camión', 'El LLM propone códigos', 'Si no acierta: búsqueda más inteligente', 'Códigos para la garantía'],
      sections: [
        {
          title: 'El problema',
          text: 'Para cobrar la garantía de una reparación hay que clasificar la avería y asignarle las tareas correctas de un catálogo de miles de códigos. Una persona tenía que hacerlo a mano, avería por avería: un trabajo lento y repetitivo.',
        },
        {
          title: 'La solución',
          bullets: [
            'Un **LLM** interpreta la avería y **propone los códigos de tarea** que corresponden.',
            'Si la propuesta no acierta, el sistema pasa a una **búsqueda más inteligente** sobre el catálogo para dar con el código adecuado.',
            'Los códigos resultantes son los que se usan para **reclamar la garantía**.',
          ],
        },
        {
          title: 'Por qué LLM + retrieval',
          text: 'Con miles de códigos posibles, un LLM no puede "saberse" el catálogo. Combinarlo con búsqueda sobre los datos reales hace que sus respuestas se apoyen en opciones que existen de verdad, y la búsqueda de respaldo cubre los casos en los que la primera propuesta falla.',
        },
      ],
      tags: ['LLMs', 'Retrieval', 'Clasificación', 'Automatización de procesos'],
      links: [{ label: 'sobre Nódicus', cmd: 'empresa' }],
    },
    {
      id: 'kongsberg',
      file: 'kongsberg-datos.md',
      short: 'Modelos que detectan cuándo un dato de un sensor submarino de pesca es erróneo y estiman el valor correcto.',
      title: 'Datos fiables de sensores submarinos de pesca',
      org: 'Kongsberg',
      when: '2025 → jun. 2026',
      summary: 'Proyecto con **Kongsberg**, el grupo tecnológico noruego, sobre datos de **sensores submarinos de pesca**. El objetivo: saber cuándo un dato que llega es **erróneo** y **qué valor debería tener**, a partir de las lecturas anteriores y del resto de datos.',
      flow: ['Llega una lectura', 'Detección de errores', 'Estimación del valor correcto', 'Serie fiable'],
      sections: [
        {
          title: 'El contexto',
          text: 'Los sensores submarinos trabajan en un entorno difícil y los datos que envían no siempre son fiables. Un dato erróneo que se da por bueno contamina todo lo que se construye encima.',
        },
        {
          title: 'Qué hice',
          bullets: [
            '**Limpieza y preparación** de los datos de los sensores.',
            '**Detección de datos erróneos**: modelos que deciden si una lectura que llega es fiable o no.',
            '**Estimación del valor correcto**: predecir qué dato debería haber llegado a partir de las **lecturas anteriores** y del **resto de datos**.',
          ],
        },
        {
          title: 'Por qué importa',
          text: 'Detectar el error es solo la mitad del trabajo: para que los datos sigan siendo útiles hay que sustituirlo por un valor plausible. Usar a la vez el histórico del sensor y el resto de datos permite estimarlo con contexto, no solo prolongando la tendencia.',
        },
        {
          title: 'En paralelo',
          text: 'Lo compaginé con el **máster en Planificación y Gestión de Procesos Empresariales** y lo dejé en junio de 2026 para cofundar **Nódicus**.',
        },
      ],
      tags: ['Series temporales', 'Detección de anomalías', 'Imputación de datos', 'Sensores submarinos', 'Machine Learning'],
      links: [{ label: 'ver timeline', cmd: 'timeline' }],
    },
  ],

  publications: [
    {
      authors: '**P. de Luna**, M. Termenón-Rivas, G. S. Romitti, D. de Luis-Moura, M. Rodrigo, A. Liberos',
      title: 'Atrial Fibrillation Biomarker Prediction to the Personalization of Electrophysiological Models',
      venue: 'Computing in Cardiology (CinC)',
      details: 'vol. 52, 2025',
      doi: '10.22489/CinC.2025.264',
      pdf: 'CinC25_deLuna.pdf',
      note: 'Versión internacional, en inglés, del trabajo de mi TFG.',
    },
    {
      authors: '**P. de Luna**, M. Termenon-Rivas, G. S. Romitti, D. de Luis-Moura, M. Rodrigo, A. Liberos',
      title: 'Aprendizaje automático para la personalización de modelos electrofisiológicos en fibrilación auricular',
      venue: 'XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica (CASEIB 2025)',
      details: 'Zaragoza, 19-21 nov. 2025, pp. 760-763 · ISBN 978-84-09-80259-3',
      pdf: 'CASEIB25_deLuna.pdf',
      note: 'Basado en mi TFG.',
    },
  ],

  // Línea destacada encima de los grupos de skills
  skillsLead: 'LLMs y RAG · visión por computador · datos de sensores',

  skills: [
    { group: 'lenguajes', items: ['Python', 'SQL', 'C#'] },
    { group: 'ML', items: ['PyTorch', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy'] },
    { group: 'LLMs', items: ['RAG', 'Embeddings', 'Bases de datos vectoriales', 'LangChain', 'Agentes', 'LLMs en local', 'Evaluación de LLMs'] },
    { group: 'visión', items: ['OpenCV', 'Creación de datasets', 'Data augmentation', 'Datos sintéticos'] },
    { group: 'datos', items: ['Limpieza', 'Detección de anomalías', 'Imputación', 'Series temporales'] },
    { group: 'despliegue', items: ['Docker', 'FastAPI', 'CI/CD', 'Git', 'Linux', 'GCP (básico)'] },
    { group: 'negocio', items: ['Consultoría de IA', 'Requisitos con clientes', 'Gestión de proyectos', 'Inglés'] },
  ],

  contactIntro: '¿Tienes un problema que se podría resolver con datos o IA? Escríbeme y lo hablamos.',

  neofetch: [
    ['OS', 'Grado en Ciencia de Datos · media 8.8'],
    ['Host', 'Co-fundador @ Nódicus'],
    ['Uptime', 'programando desde los 14'],
    ['Kernel', 'Python · C# · SQL'],
    ['Packages', 'machine learning, LLMs, visión por computador, gemelos digitales'],
    ['Papers', 'CinC 2025 · CASEIB 2025'],
    ['Shell', 'portfolio-sh 1.0'],
  ],
};
