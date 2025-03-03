import { getQuery } from 'h3'
export default defineEventHandler(async (event) => {
  const { experience } = getQuery(event)
  return $api(`/experiences/by-slug/${experience}`)
})
