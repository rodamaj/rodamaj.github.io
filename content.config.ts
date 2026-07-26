import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const localizedText = z.object({
  es: z.string(),
  en: z.string().optional(),
})

const editorialSchema = z.object({
  id: z.string(),
  order: z.number(),
  date: localizedText,
  title: localizedText,
  description: z.array(localizedText),
  context: z.array(localizedText).optional(),
  status: localizedText.optional(),
  technologies: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({
        label: localizedText,
        href: z.string(),
        external: z.boolean().optional(),
      })
    )
    .optional(),
  provisional: z.boolean().optional(),
})

const contentLink = z.object({
  label: localizedText,
  href: z.string(),
  external: z.boolean().optional(),
})

const aboutSchema = z.object({
  biography: z.array(localizedText),
  sections: z.object({
    education: localizedText,
    interests: localizedText,
    contact: localizedText,
    resumes: localizedText,
  }),
  education: z.array(
    z.object({
      date: localizedText,
      program: localizedText,
      institution: z.string(),
    })
  ),
  interests: localizedText,
})

const linksSchema = z.object({
  personalEmail: contentLink,
  academicEmail: contentLink,
  github: contentLink,
  linkedin: contentLink,
  instagram: contentLink,
  cvEs: contentLink,
  cvEn: contentLink,
})

const photographSchema = z.object({
  slug: z.string(),
  order: z.number(),
  date: z.string(),
  location: localizedText,
  device: z.string(),
  captureType: z.enum([
    'main-camera',
    'main-camera-2x',
    'ultra-wide',
    'video-frame',
  ]),
  focalLengthMm: z.number().optional(),
  image: z.object({
    src: z.string(),
    width: z.number(),
    height: z.number(),
    alt: localizedText,
    sources: z.array(
      z.object({
        src: z.string(),
        width: z.number(),
      })
    ),
  }),
})

export default defineContentConfig({
  collections: {
    engineering: defineCollection({
      type: 'data',
      source: 'engineering/*.md',
      schema: editorialSchema,
    }),
    science: defineCollection({
      type: 'data',
      source: 'science/*.md',
      schema: editorialSchema,
    }),
    thoughts: defineCollection({
      type: 'page',
      source: 'thoughts/*.md',
    }),
    photography: defineCollection({
      type: 'data',
      source: 'photography/*.yml',
      schema: photographSchema,
    }),
    about: defineCollection({
      type: 'data',
      source: 'about.yml',
      schema: aboutSchema,
    }),
    links: defineCollection({
      type: 'data',
      source: 'links.yml',
      schema: linksSchema,
    }),
  },
})
