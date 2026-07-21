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

export const siteContent = {
  identity: {
    name: 'Josué Amador-Rojas',
    role: {
      es: 'Ingeniero de software y estudiante de ciencias de la computación.',
      en: 'Software engineer and computer science student.',
    },
    statement: {
      es: 'Construyo sistemas y estudio problemas computacionales.',
      en: 'I build systems and study computational problems.',
    },
  },

  navigation: [
    {
      id: 'engineering',
      href: '/engineering',
      label: { es: 'Ingeniería', en: 'Engineering' },
      description: {
        es: 'Sistemas, herramientas y trabajo profesional seleccionado.',
        en: 'Selected systems, tools, and professional work.',
      },
    },
    {
      id: 'science',
      href: '/science',
      label: { es: 'Ciencia', en: 'Science' },
      description: {
        es: 'Investigaciones y exploraciones en ciencias de la computación.',
        en: 'Research and explorations in computer science.',
      },
    },
    {
      id: 'thoughts',
      href: '/thoughts',
      label: { es: 'Pensamientos', en: 'Thoughts' },
      description: {
        es: 'Notas sobre software, ciencia y otras cosas.',
        en: 'Notes on software, science, and other things.',
      },
    },
    {
      id: 'music',
      href: '/music',
      label: { es: 'Música', en: 'Music' },
      description: {
        es: 'Discos y canciones a los que vuelvo.',
        en: 'Records and songs I return to.',
      },
    },
    {
      id: 'photography',
      href: '/photography',
      label: { es: 'Fotografía', en: 'Photography' },
      description: {
        es: 'Algunas de mis fotografías favoritas.',
        en: 'Some of my favorite photographs.',
      },
    },
  ],

  pages: {
    engineering: {
      title: { es: 'Ingeniería', en: 'Engineering' },
      description: {
        es: 'Sistemas, productos y herramientas cuyo resultado principal es algo que funciona.',
        en: 'Systems, products, and tools whose main outcome is something that works.',
      },
    },
    science: {
      title: { es: 'Ciencia', en: 'Science' },
      description: {
        es: 'Investigaciones, experimentos y exploraciones orientadas a comprender problemas computacionales.',
        en: 'Research, experiments, and explorations aimed at understanding computational problems.',
      },
    },
    thoughts: {
      title: { es: 'Pensamientos', en: 'Thoughts' },
      description: {
        es: 'Un espacio para notas sobre software, ciencia, aprendizaje y otros temas.',
        en: 'A place for notes on software, science, learning, and other subjects.',
      },
    },
    music: {
      title: { es: 'Música', en: 'Music' },
      description: {
        es: 'Un registro personal de discos y canciones.',
        en: 'A personal record of albums and songs.',
      },
    },
    photography: {
      title: { es: 'Fotografía', en: 'Photography' },
      description: {
        es: 'Una selección de fotografías tomadas por mí.',
        en: 'A selection of photographs taken by me.',
      },
    },
    about: {
      title: { es: 'Acerca de', en: 'About' },
      description: {
        es: 'Biografía, formación, intereses y formas de contacto.',
        en: 'Biography, education, interests, and ways to get in touch.',
      },
    },
  },

  thoughts: {
    entries: [] as ThoughtEntry[],
    emptyTitle: { es: 'Próximamente.', en: 'Coming soon.' },
    emptyDescription: {
      es: '[Placeholder: aquí aparecerán notas breves sobre software, ciencia, herramientas, aprendizaje y otros temas.]',
      en: '[Placeholder: short notes on software, science, tools, learning, and other subjects will appear here.]',
    },
  },

  music: {
    recentTitle: { es: 'Escuchando últimamente', en: 'Recent listening' },
    recentEntries: [] as Array<{
      artist: string
      title: string
      note?: LocalizedText
    }>,
    recentPlaceholder: {
      es: '[Placeholder: artista — álbum]\n[Placeholder: una línea breve sobre por qué me interesa.]',
      en: '[Placeholder: artist — album]\n[Placeholder: a short line about why it interests me.]',
    },
    returningTitle: {
      es: 'Discos a los que vuelvo',
      en: 'Records I return to',
    },
    returningEntries: [] as Array<{
      artist: string
      title: string
      year?: string
    }>,
    returningPlaceholder: {
      es: '[Placeholder: artista — álbum, año]',
      en: '[Placeholder: artist — album, year]',
    },
  },

  photography: {
    entries: [] as PhotographEntry[],
    emptyTitle: { es: 'Próximamente.', en: 'Coming soon.' },
    emptyDescription: {
      es: '[Placeholder: aquí aparecerá una selección de mis fotografías favoritas.]',
      en: '[Placeholder: a selection of my favorite photographs will appear here.]',
    },
  },

  about: {
    biography: [
      {
        es: 'Soy ingeniero de software y estudiante de ciencias de la computación en la Universidad de Costa Rica. Mi trabajo ha incluido sistemas backend y aplicaciones móviles; mis exploraciones recientes abarcan optimización, inteligencia artificial, análisis de datos e interacción humano-computador.',
        en: 'I am a software engineer and computer science student at Universidad de Costa Rica. My work has included backend systems and mobile applications; my recent explorations span optimization, artificial intelligence, data analysis, and human-computer interaction.',
      },
      {
        es: 'Me interesa construir sistemas claros y útiles, y estudiar con cuidado los problemas computacionales que los sostienen.',
        en: 'I am interested in building clear, useful systems and carefully studying the computational problems behind them.',
      },
    ],
    sections: {
      education: { es: 'Formación', en: 'Education' },
      interests: { es: 'Intereses', en: 'Interests' },
      contact: { es: 'Contacto', en: 'Contact' },
      resumes: { es: 'Currículos', en: 'Resumes' },
      academicProfiles: {
        es: 'Perfiles académicos',
        en: 'Academic profiles',
      },
    },
    education: [
      {
        date: { es: 'Desde 2025', en: 'Since 2025' },
        program: {
          es: 'Bachillerato en computación con énfasis en ciencias de la computación',
          en: "Bachelor's degree in computing with an emphasis in computer science",
        },
        institution: 'Universidad de Costa Rica',
      },
      {
        date: {
          es: 'Ingreso previsto: agosto de 2026',
          en: 'Incoming: August 2026',
        },
        program: {
          es: 'Maestría académica en computación e informática',
          en: 'Master of Science in Computer Science',
        },
        institution: 'Universidad de Costa Rica',
      },
      {
        date: { es: '2018–2021', en: '2018–2021' },
        program: {
          es: 'Bachillerato en computación con énfasis en ingeniería de software',
          en: "Bachelor's degree in computing with an emphasis in software engineering",
        },
        institution: 'Universidad de Costa Rica',
      },
    ],
    interests: {
      es: 'Sistemas backend y móviles, diseño de software, optimización, inteligencia artificial, análisis de datos, métodos numéricos e interacción humano-computador.',
      en: 'Backend and mobile systems, software design, optimization, artificial intelligence, data analysis, numerical methods, and human-computer interaction.',
    },
    academicProfilesPlaceholder: {
      es: '[Placeholder: añadir ORCID, Google Scholar u otros perfiles cuando estén disponibles.]',
      en: '[Placeholder: add ORCID, Google Scholar, or other profiles when available.]',
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
      label: { es: 'GitHub', en: 'GitHub' },
      href: 'https://github.com/rodamaj',
      external: true,
    },
    linkedin: {
      label: { es: 'LinkedIn', en: 'LinkedIn' },
      href: 'https://www.linkedin.com/in/rodamaj/',
      external: true,
    },
    instagram: {
      label: { es: 'Instagram', en: 'Instagram' },
      href: 'https://www.instagram.com/rodamaj',
      external: true,
    },
    cvEs: {
      label: { es: 'Currículo en español', en: 'CV in Spanish' },
      href: '/public-assets/cv/jar_cv_es.pdf',
      external: true,
    },
    cvEn: {
      label: { es: 'Currículo en inglés', en: 'CV in English' },
      href: '/public-assets/cv/jar_cv_en.pdf',
      external: true,
    },
  },

  labels: {
    technologies: { es: 'Tecnologías', en: 'Technologies' },
    index: { es: 'Índice', en: 'Index' },
    about: { es: 'Acerca de', en: 'About' },
    moreAndContact: { es: 'Más + contacto', en: 'More + contact' },
  },
} as const
