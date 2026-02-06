<script setup>
  const { $lenis } = useNuxtApp()
  const videoRef = ref(null)
  const containerRef = ref(null)
  const containerHeight = ref('50%')

  onMounted(() => {
    if (!videoRef.value) return
    const video = videoRef.value

    video.addEventListener('canplaythrough', () => {
      if (!video.duration) return
      const pxPerSecond = 500
      containerHeight.value = `${video.duration * pxPerSecond}px`
    })
    $lenis.on('scroll', updateScrollProgress)
  })

  const updateScrollProgress = () => {
    if (!containerRef.value || !videoRef.value) return
    const video = videoRef.value
    const containerRect = containerRef.value.getBoundingClientRect()

    if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
      let progress =
        -containerRect.top / (containerRect.height - window.innerHeight)

      progress = Math.min(Math.max(progress, 0), 1)

      video.currentTime = progress * video.duration
    }
  }

  onBeforeUnmount(() => {
    $lenis.off('scroll', updateScrollProgress)
  })
</script>

<template>
  <div ref="containerRef" :style="`height: ${containerHeight}`">
    <div class="h-screen w-screen sticky top-0 left-0">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        poster="/video-desktop.png"
        muted
        preload="auto">
        <source
          src="https://template-video-lenis.cdn.prismic.io/template-video-lenis/aYMPvd0YXLCxVWZK_video-desktop.mp4"
          type="video/mp4" />
      </video>
    </div>
  </div>
</template>
