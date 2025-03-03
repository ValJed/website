export default defineEventHandler(async () => {
  return $api('/experiences?populate=*')
})
