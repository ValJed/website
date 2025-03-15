import { getQuery } from 'h3'
export default defineEventHandler(async (event) => {
  const { article } = getQuery(event)
  return $api(`/articles/by-slug/${article}`)
})
