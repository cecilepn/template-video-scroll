<script setup>
  const { $lenis } = useNuxtApp()
  const videoRef = ref(null)
  const containerRef = ref(null)
  const containerHeight = ref('50%')
  let raf = null

  onMounted(() => {
    if (!videoRef.value) return
    const video = videoRef.value

    video.addEventListener('loadedmetadata', () => {
      const newHeight = video.duration * 500
      containerHeight.value = `${newHeight}px`
    })

    $lenis.on('scroll', startRaf)
  })

  const startRaf = () => {
    if (raf) return
    raf = requestAnimationFrame(updateScrollProgress)
    raf = null
  }

  const updateScrollProgress = () => {
    if (!containerRef.value || !videoRef.value) return
    const container = containerRef.value
    const video = videoRef.value

    const windowHeight = window.innerHeight
    const containerRect = container.getBoundingClientRect()

    const containerHeight = containerRect.height
    const containerTop = containerRect.top
    const containerBottom = containerRect.bottom

    if (containerTop <= 0 && containerBottom >= windowHeight) {
      let progress = -containerTop / (containerHeight - windowHeight)
      progress = Math.min(Math.max(progress, 0), 1)
      video.currentTime = progress * video.duration
    }
    raf = requestAnimationFrame(updateScrollProgress)
  }

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    $lenis.off('scroll', startRaf)
  })
</script>

<template>
  <div ref="containerRef" :style="`height: ${containerHeight}`">
    <div class="h-screen w-screen sticky top-0 left-0">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        muted
        playsinline
        preload="metadata">
        <source src="/content/video-desktop.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
