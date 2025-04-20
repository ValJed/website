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
      type: 'page'
      // Define custom schema for docs collection
      /* schema: z.object({ */
      /*   tags: z.array(z.string()), */
      /*   image: z.string(), */
      /*   date: z.date() */
      /* }) */
    })
  }
})
