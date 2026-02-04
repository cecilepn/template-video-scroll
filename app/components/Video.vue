<script setup>
  import { useElementVisibility } from '@vueuse/core'
  const { $lenis } = useNuxtApp()

  const videoRef = ref(null)
  const containerRef = ref(null)
  const containerHeight = ref('50%')

  const targetIsVisible = useElementVisibility(videoRef)
  // watch(targetIsVisible, isVisible => {
  //   if (isVisible) {
  //     unlockVideo()
  //   }
  // })

  const unlockVideo = () => {
    const video = videoRef.value
    if (!video) return
    console.log('unlockVideo')
    video.play()
    setTimeout(() => video.pause(), 100)
  }

  onMounted(() => {
    if (!videoRef.value) return
    const video = videoRef.value

    const updateHeight = () => {
      if (!video.duration) return
      containerHeight.value = `${video.duration * 500}px`
    }

    video.addEventListener('loadedmetadata', updateHeight)
    $lenis.on('scroll', updateScrollProgress)
  })

  const updateScrollProgress = () => {
    if (!containerRef.value || !videoRef.value) return

    const container = containerRef.value
    const video = videoRef.value

    const windowHeight = window.innerHeight
    const containerRect = container.getBoundingClientRect()

    if (containerRect.top <= 0 && containerRect.bottom >= windowHeight) {
      let progress = -containerRect.top / (containerRect.height - windowHeight)

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
      <!-- <div class="bg-blue-800" @click="unlockVideo">click ici</div> -->
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        poster="/video-desktop.png"
        muted
        preload="metadata">
        <source
          src="https://template-video-lenis.cdn.prismic.io/template-video-lenis/aYMPvd0YXLCxVWZK_video-desktop.mp4"
          type="video/mp4" />
      </video>
    </div>
  </div>
</template>
