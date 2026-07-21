export type SiteLocale = 'es' | 'en'

export type LocalizedText = {
  es: string
  en?: string
}

export type ContentLink = {
  label: LocalizedText
  href: string
  external?: boolean
}

export type EditorialEntry = {
  id: string
  date: LocalizedText
  title: LocalizedText
  description: LocalizedText[]
  context?: LocalizedText[]
  status?: LocalizedText
  technologies?: string[]
  links?: ContentLink[]
  provisional?: boolean
}

export type ThoughtEntry = {
  slug: string
  date?: LocalizedText
  title: LocalizedText
  summary?: LocalizedText
}

export type PhotographEntry = {
  id: string
  src: string
  alt: LocalizedText
  date?: LocalizedText
  location?: LocalizedText
  note?: LocalizedText
}

const repositoryLink = (href: string): ContentLink => ({
  label: { es: 'repositorio', en: 'repository' },
  href,
  external: true,
})

export const siteContent = {
  identity: {
    name: 'Josué Amador-Rojas',
    role: {
      es: 'ingeniero de software y estudiante de ciencias de la computación.',
      en: 'software engineer and computer science student.',
    },
    statement: {
      es: 'construyo sistemas y estudio problemas computacionales.',
      en: 'i build systems and study computational problems.',
    },
  },

  navigation: [
    {
      id: 'engineering',
      href: '/engineering',
      label: { es: 'ingeniería', en: 'engineering' },
      description: {
        es: 'sistemas, herramientas y trabajo profesional seleccionado.',
        en: 'selected systems, tools, and professional work.',
      },
    },
    {
      id: 'science',
      href: '/science',
      label: { es: 'ciencia', en: 'science' },
      description: {
        es: 'investigaciones y exploraciones en ciencias de la computación.',
        en: 'research and explorations in computer science.',
      },
    },
    {
      id: 'thoughts',
      href: '/thoughts',
      label: { es: 'pensamientos', en: 'thoughts' },
      description: {
        es: 'notas sobre software, ciencia y otras cosas.',
        en: 'notes on software, science, and other things.',
      },
    },
    {
      id: 'music',
      href: '/music',
      label: { es: 'música', en: 'music' },
      description: {
        es: 'discos y canciones a los que vuelvo.',
        en: 'records and songs i return to.',
      },
    },
    {
      id: 'photography',
      href: '/photography',
      label: { es: 'fotografía', en: 'photography' },
      description: {
        es: 'algunas de mis fotografías favoritas.',
        en: 'some of my favorite photographs.',
      },
    },
  ],

  pages: {
    engineering: {
      title: { es: 'ingeniería', en: 'engineering' },
      description: {
        es: 'sistemas, productos y herramientas cuyo resultado principal es algo que funciona.',
        en: 'systems, products, and tools whose main outcome is something that works.',
      },
    },
    science: {
      title: { es: 'ciencia', en: 'science' },
      description: {
        es: 'investigaciones, experimentos y exploraciones orientadas a comprender problemas computacionales.',
        en: 'research, experiments, and explorations aimed at understanding computational problems.',
      },
    },
    thoughts: {
      title: { es: 'pensamientos', en: 'thoughts' },
      description: {
        es: 'un espacio para notas sobre software, ciencia, aprendizaje y otros temas.',
        en: 'a place for notes on software, science, learning, and other subjects.',
      },
    },
    music: {
      title: { es: 'música', en: 'music' },
      description: {
        es: 'un registro personal de discos y canciones.',
        en: 'a personal record of albums and songs.',
      },
    },
    photography: {
      title: { es: 'fotografía', en: 'photography' },
      description: {
        es: 'una selección de fotografías tomadas por mí.',
        en: 'a selection of photographs taken by me.',
      },
    },
    about: {
      title: { es: 'acerca de', en: 'about' },
      description: {
        es: 'biografía, formación, intereses y formas de contacto.',
        en: 'biography, education, interests, and ways to get in touch.',
      },
    },
  },

  engineering: [
    {
      id: 'personal-site',
      date: { es: '2021–presente', en: '2021–present' },
      title: { es: 'sitio personal', en: 'personal website' },
      description: [
        {
          es: 'sitio bilingüe que reúne mi identidad profesional y académica, proyectos, exploraciones y espacios personales en un índice pequeño.',
          en: 'a bilingual site that brings together my professional and academic identity, projects, explorations, and personal spaces in a small index.',
        },
      ],
      context: [{ es: 'proyecto personal', en: 'personal project' }],
      technologies: ['Nuxt', 'Vue', 'TypeScript', 'GitHub Pages'],
      links: [repositoryLink('https://github.com/rodamaj/rodamaj.github.io')],
    },
    {
      id: 'combinatorics-expert-system',
      date: { es: '2026', en: '2026' },
      title: {
        es: 'sistema experto de combinatoria',
        en: 'combinatorics expert system',
      },
      description: [
        {
          es: 'sistema en Prolog que clasifica problemas básicos de combinatoria mediante un árbol de decisión y devuelve la técnica, fórmula, explicación y un ejemplo correspondientes.',
          en: 'a Prolog system that classifies basic combinatorics problems through a decision tree and returns the corresponding technique, formula, explanation, and example.',
        },
      ],
      context: [{ es: 'proyecto académico', en: 'academic project' }],
      technologies: ['Prolog', 'SWI-Prolog'],
      links: [
        repositoryLink(
          'https://github.com/rodamaj/combinatorics-expert-system'
        ),
      ],
    },
    {
      id: 'genetic-image-approximation',
      date: { es: '2026', en: '2026' },
      title: {
        es: 'aproximación de imágenes con un algoritmo genético',
        en: 'image approximation with a genetic algorithm',
      },
      description: [
        {
          es: 'pequeña herramienta en el navegador que aproxima una imagen de referencia con cuadrados de color y permite observar selección, cruce y mutación a través de generaciones.',
          en: 'a small browser tool that approximates a reference image with colored squares and makes it possible to observe selection, crossover, and mutation across generations.',
        },
      ],
      context: [{ es: 'repositorio público', en: 'public repository' }],
      technologies: ['JavaScript', 'p5.js'],
      links: [
        repositoryLink(
          'https://github.com/rodamaj/genetic-image-approximation'
        ),
      ],
    },
    {
      id: 'private-work-placeholder',
      date: { es: 'fecha por confirmar', en: 'date to confirm' },
      title: {
        es: '[contenido provisional] sistema interno para productos orientados a clientes',
        en: '[provisional content] internal system for client-facing products',
      },
      description: [
        {
          es: 'ejemplo de cómo presentar trabajo realizado como parte de un equipo en sistemas backend o móviles, sin revelar nombres, detalles internos ni información de clientes.',
          en: 'an example of how to present work completed as part of a team on backend or mobile systems without revealing names, internal details, or client information.',
        },
      ],
      context: [
        { es: 'trabajo profesional privado', en: 'private professional work' },
        {
          es: 'descripción limitada por confidencialidad',
          en: 'description limited by confidentiality',
        },
        { es: 'reemplazar este ejemplo', en: 'replace this example' },
      ],
      provisional: true,
    },
  ] satisfies EditorialEntry[],

  science: [
    {
      id: 'image-compression-noise-experiment',
      date: { es: '2026', en: '2026' },
      title: {
        es: 'experimento sobre compresión y ruido en imágenes',
        en: 'image compression and noise experiment',
      },
      description: [
        {
          es: 'experimento reproducible que compara PNG y WebP bajo distintos niveles de ruido y bloques de contenido. La tubería aleatoriza los tratamientos y produce un conjunto de datos para análisis estadístico posterior.',
          en: 'a reproducible experiment comparing PNG and WebP under different noise levels and content blocks. The pipeline randomizes treatments and produces a dataset for later statistical analysis.',
        },
      ],
      status: { es: 'experimento reproducible', en: 'reproducible experiment' },
      context: [
        { es: 'exploración independiente', en: 'independent exploration' },
      ],
      technologies: ['Python', 'R', 'Make'],
      links: [
        repositoryLink(
          'https://github.com/rodamaj/image-compression-noise-experiment'
        ),
      ],
    },
    {
      id: 'newton-quasi-newton-case-studies',
      date: { es: '2026', en: '2026' },
      title: {
        es: 'métodos de Newton y quasi-Newton para optimización',
        en: 'Newton and quasi-Newton methods for optimization',
      },
      description: [
        {
          es: 'estudio de métodos de optimización multivariable mediante dos casos: Newton sobre la función de Rosenbrock y L-BFGS para entrenar una red neuronal que aproxima la función seno.',
          en: 'a study of multivariable optimization methods through two cases: Newton on the Rosenbrock function and L-BFGS to train a neural network that approximates the sine function.',
        },
      ],
      status: { es: 'estudio de caso', en: 'case study' },
      context: [{ es: 'trabajo en equipo', en: 'team project' }],
      technologies: ['MATLAB', 'Python', 'PyTorch', 'L-BFGS'],
      links: [
        repositoryLink(
          'https://github.com/rodamaj/newton-quasi-newton-case-studies'
        ),
      ],
    },
    {
      id: 'interactive-clustering-analysis',
      date: { es: '2026', en: '2026' },
      title: {
        es: 'análisis interactivo de clustering',
        en: 'interactive clustering analysis',
      },
      description: [
        {
          es: 'análisis reproducible del conjunto Wine con PCA y clustering jerárquico, acompañado por una visualización educativa que permite observar paso a paso un mapa autoorganizado pequeño.',
          en: 'a reproducible analysis of the Wine dataset with PCA and hierarchical clustering, accompanied by an educational visualization of a small self-organizing map running step by step.',
        },
      ],
      status: { es: 'exploración académica', en: 'academic exploration' },
      context: [{ es: 'trabajo en equipo', en: 'team project' }],
      technologies: ['Python', 'Jupyter', 'p5.js', 'PCA', 'HCA', 'SOM'],
      links: [
        repositoryLink(
          'https://github.com/rodamaj/interactive-clustering-analysis'
        ),
      ],
    },
  ] satisfies EditorialEntry[],

  thoughts: {
    entries: [] as ThoughtEntry[],
    emptyTitle: { es: 'próximamente.', en: 'coming soon.' },
    emptyDescription: {
      es: '[placeholder: aquí aparecerán notas breves sobre software, ciencia, herramientas, aprendizaje y otros temas.]',
      en: '[placeholder: short notes on software, science, tools, learning, and other subjects will appear here.]',
    },
  },

  music: {
    recentTitle: { es: 'escuchando últimamente', en: 'recent listening' },
    recentEntries: [] as Array<{
      artist: string
      title: string
      note?: LocalizedText
    }>,
    recentPlaceholder: {
      es: '[placeholder: artista — álbum]\n[placeholder: una línea breve sobre por qué me interesa.]',
      en: '[placeholder: artist — album]\n[placeholder: a short line about why it interests me.]',
    },
    returningTitle: {
      es: 'discos a los que vuelvo',
      en: 'records i return to',
    },
    returningEntries: [] as Array<{
      artist: string
      title: string
      year?: string
    }>,
    returningPlaceholder: {
      es: '[placeholder: artista — álbum, año]',
      en: '[placeholder: artist — album, year]',
    },
  },

  photography: {
    entries: [] as PhotographEntry[],
    emptyTitle: { es: 'próximamente.', en: 'coming soon.' },
    emptyDescription: {
      es: '[placeholder: aquí aparecerá una selección de mis fotografías favoritas.]',
      en: '[placeholder: a selection of my favorite photographs will appear here.]',
    },
  },

  about: {
    biography: [
      {
        es: 'soy ingeniero de software y estudiante de ciencias de la computación en la Universidad de Costa Rica. mi trabajo ha incluido sistemas backend y aplicaciones móviles; mis exploraciones recientes abarcan optimización, inteligencia artificial, análisis de datos e interacción humano-computador.',
        en: 'i am a software engineer and computer science student at Universidad de Costa Rica. my work has included backend systems and mobile applications; my recent explorations span optimization, artificial intelligence, data analysis, and human-computer interaction.',
      },
      {
        es: 'me interesa construir sistemas claros y útiles, y estudiar con cuidado los problemas computacionales que los sostienen.',
        en: 'i am interested in building clear, useful systems and carefully studying the computational problems behind them.',
      },
    ],
    sections: {
      education: { es: 'formación', en: 'education' },
      interests: { es: 'intereses', en: 'interests' },
      contact: { es: 'contacto', en: 'contact' },
      resumes: { es: 'currículos', en: 'resumes' },
      academicProfiles: {
        es: 'perfiles académicos',
        en: 'academic profiles',
      },
    },
    education: [
      {
        date: { es: 'desde 2025', en: 'since 2025' },
        program: {
          es: 'bachillerato en computación con énfasis en ciencias de la computación',
          en: "bachelor's degree in computing with an emphasis in computer science",
        },
        institution: 'Universidad de Costa Rica',
      },
      {
        date: {
          es: 'ingreso previsto: agosto de 2026',
          en: 'incoming: august 2026',
        },
        program: {
          es: 'maestría académica en computación e informática',
          en: 'master of science in computer science',
        },
        institution: 'Universidad de Costa Rica',
      },
      {
        date: { es: '2018–2021', en: '2018–2021' },
        program: {
          es: 'bachillerato en computación con énfasis en ingeniería de software',
          en: "bachelor's degree in computing with an emphasis in software engineering",
        },
        institution: 'Universidad de Costa Rica',
      },
    ],
    interests: {
      es: 'sistemas backend y móviles, diseño de software, optimización, inteligencia artificial, análisis de datos, métodos numéricos e interacción humano-computador.',
      en: 'backend and mobile systems, software design, optimization, artificial intelligence, data analysis, numerical methods, and human-computer interaction.',
    },
    academicProfilesPlaceholder: {
      es: '[placeholder: añadir ORCID, Google Scholar u otros perfiles cuando estén disponibles.]',
      en: '[placeholder: add ORCID, Google Scholar, or other profiles when available.]',
    },
  },

  links: {
    personalEmail: {
      label: { es: 'bjamadorr@gmail.com', en: 'bjamadorr@gmail.com' },
      href: 'mailto:bjamadorr@gmail.com',
      external: false,
    },
    academicEmail: {
      label: { es: 'bryan.amador@ucr.ac.cr', en: 'bryan.amador@ucr.ac.cr' },
      href: 'mailto:bryan.amador@ucr.ac.cr',
      external: false,
    },
    github: {
      label: { es: 'github', en: 'github' },
      href: 'https://github.com/rodamaj',
      external: true,
    },
    linkedin: {
      label: { es: 'linkedin', en: 'linkedin' },
      href: 'https://www.linkedin.com/in/rodamaj/',
      external: true,
    },
    instagram: {
      label: { es: 'instagram', en: 'instagram' },
      href: 'https://www.instagram.com/rodamaj',
      external: true,
    },
    cvEs: {
      label: { es: 'currículo en español', en: 'cv in spanish' },
      href: '/public-assets/cv/jar_cv_es.pdf',
      external: true,
    },
    cvEn: {
      label: { es: 'currículo en inglés', en: 'cv in english' },
      href: '/public-assets/cv/jar_cv_en.pdf',
      external: true,
    },
  },

  labels: {
    technologies: { es: 'tecnologías', en: 'technologies' },
    index: { es: 'índice', en: 'index' },
    about: { es: 'acerca de', en: 'about' },
    moreAndContact: { es: 'más + contacto', en: 'more + contact' },
  },
} as const
