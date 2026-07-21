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
  },
})
