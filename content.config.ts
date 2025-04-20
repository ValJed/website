import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    experiences: defineCollection({
      source: 'experiences/*.md',
      type: 'page',
      schema: z.object({
        logoImg: z.string(),
        logoTitle: z.string().nullable(),
        period: z.string(),
        date: z.date(),
        stack: z.array(z.string())
      })
    }),
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page',
      schema: z.object({
        coverImg: z.string(),
        date: z.date(),
        tags: z.array(z.string())
      })
    })
  }
})
