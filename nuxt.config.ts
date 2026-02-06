// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }, 
    modules: ['@nuxtjs/device'],
  css: ['~~/assets/css/main.css'],
 app: {
    head: {
     link: [
        { rel: 'video', href: 'https://template-video-lenis.cdn.prismic.io/template-video-lenis/aYMPvd0YXLCxVWZK_video-desktop.mp4' },
      ]
    }
  },
  vite: {
    plugins: [tailwindcss(), ]
  },

})
