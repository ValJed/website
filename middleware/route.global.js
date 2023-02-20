export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === from.path || !process.client) {
    return
  }

  if (window.innerWidth < 900) {
    window.scrollTo(0, 0)
    return
  }

  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 250)
})
