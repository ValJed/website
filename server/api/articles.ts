export default defineEventHandler(async () => {
  return $api('/articles?populate=*')
})
