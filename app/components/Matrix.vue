<template>
  <div
    class="matrix-container"
    :style="{ width: matrixContainerWidth, left: matrixContainerLeft }"
    :class="{ extended: state.extendedMatrix }"
  >
    <canvas
      ref="matrix"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup>
import { useLayoutState } from '@/composables/useLayoutState.js'
const state = useLayoutState()

const props = defineProps({
  containerSize: {
    type: Number,
    required: true
  },
  sidebarSize: {
    type: Number,
    required: true
  }
})

const matrix = ref(null)
const width = ref(null)
const height = ref(null)
const matrixContainerWidth = ref('100%')
const matrixContainerLeft = ref('0px')

watch(
  () => state.value.extendedMatrix,
  (newVal) => {
    matrixContainerWidth.value =
      newVal && !state.value.isMobile ? `${props.containerSize}px` : '100%'

    matrixContainerLeft.value =
      newVal && !state.value.isMobile
        ? `calc(-${props.containerSize}px + ${props.sidebarSize}px)`
        : '0px'
  }
)

onMounted(() => {
  width.value = window.innerWidth
  height.value = window.innerHeight

  generateMatrix(matrix.value)
})

function generateMatrix(canvas) {
  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')
  const chars = '悪魔モンスター絶望悲しみ愛する平和エントピ'
  const matrix = chars.split('')
  const fontSize = 15
  const columns = width.value / fontSize // number of columns for the rain

  const drops = Array(Math.round(columns)).fill(
    Math.floor(Math.random() * height.value)
  )

  setInterval(draw, 40)

  function draw() {
    // requestAnimationFrame(draw)

    ctx.fillStyle = 'rgba(0, 0, 10, 0.2)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#03A062' // green text
    ctx.font = `${fontSize}px arial`

    drops.forEach((_, i) => {
      const text = matrix[Math.floor(Math.random() * matrix.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > height.value && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    })
  }
}
</script>
<style scoped lang="scss">
.matrix-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.25s ease-in;
  right: 0;
  bottom: 0;
  z-index: -10;

  @include tablet-landscape {
    z-index: 0;
  }

  &.extended {
    height: calc(100vh - 3rem); // header

    @include tablet-landscape {
      height: calc(100vh - 4rem); // header + container padding
      right: 0;
    }
  }
}

canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  right: 0;
  bottom: 0;

  @include tablet-landscape {
    bottom: auto;
  }
}
</style>
