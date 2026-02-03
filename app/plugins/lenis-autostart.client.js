export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return
  const start = () => nuxtApp.$lenis?.start?.()
  nuxtApp.$router?.afterEach(() => {
    requestAnimationFrame(start)
  })
})
