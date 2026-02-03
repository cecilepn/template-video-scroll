import Lenis from 'lenis'

export default defineNuxtPlugin(nuxtApp => {
  const lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    smoothTouch: true,
    lerp: 0.2,
    wheelMultiplier: 1.3,
    touchMultiplier: 0.8,
    allowNestedScroll: true,
    prevent: node => node.closest('[data-lenis-local]') !== null
  })

  nuxtApp.provide('lenis', lenis)
})
