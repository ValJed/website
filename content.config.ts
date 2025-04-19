import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page'
      // Define custom schema for docs collection
      /* schema: z.object({ */
      /*   tags: z.array(z.string()), */
      /*   image: z.string(), */
      /*   date: z.date() */
      /* }) */
    }),
    experience: defineCollection({
      source: 'experience/*.md',
      type: 'page'
    })
  }
})
