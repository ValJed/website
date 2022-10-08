<template>
  <div
    class="matrix-container"
    :style="{ width: matrixContainerWidth, left: matrixContainerLeft }"
    :class="{ extended: extendedMatrix }"
  >
    <canvas ref="matrix" :width="width" :height="height" />
  </div>
</template>

<script setu>
const props = defineProps({
  extendedMatrix: {
    type: Boolean,
    required: true
  },
  containerSize: {
    type: Number,
    required: true
  },
  isMobile: {
    type: Boolean,
    required: true
  }
})

const matrix = ref(null)
const width = ref(null)
const height = ref(null)
const matrixContainerWidth = ref('100%')
const matrixContainerLeft = ref('0px')

watch(
  () => props.extendedMatrix,
  (newVal) => {
    matrixContainerWidth.value =
      newVal && !props.isMobile ? `${props.containerSize}px` : '100%'

    matrixContainerLeft.value =
      newVal && !props.isMobile
        ? `calc(-${props.containerSize}px + 20rem)`
        : '0px'

    if (newVal) {
      console.log('props.containerSize ===> ', props.containerSize)
      // console.log(
      //   'matrixContainerWidth.value ===> ',
      //   matrixContainerWidth.value
      // )

      // console.log(
      //   'matrixContainerLeft.value ===> ',
      //   matrixContainerLeft.value
      // )
    }
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
@keyframes mobileExtented {
  15% {
    height: 0;
    z-index: 3;
  }

  50% {
    height: calc(100vh - 4rem); // header
  }

  85% {
    height: 0;
    z-index: 1;
  }

  100% {
    height: 7rem;
  }
}

.matrix-container {
  position: relative;
  width: 100%;
  height: 7rem;
  overflow: hidden;
  transition: all 0.25s ease-in;
  right: 0;
  z-index: -10;

  @include tablet-landscape {
    height: 20rem;
    border-radius: 50%;
    z-index: 0;
  }

  &.extended {
    // animation: 0.5s mobileExtented;
    height: calc(100vh - 4rem); // header

    @include tablet-landscape {
      height: calc(100vh - 6rem); // header + container padding
      right: 0;
      border-radius: 0;
      animation: none;
    }
  }
}

canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  right: 0;
}
</style>
