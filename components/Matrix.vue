<template>
  <div
    class="matrix-container"
    :style="{ width: matrixContainerWidth, left: matrixContainerLeft }"
    :class="{ extended: extendedMatrix }"
  >
    <canvas ref="matrix" :width="width" :height="height" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    extendedMatrix: {
      type: Boolean,
      required: true
    },
    containerSize: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const matrix = ref(null)
    const width = ref(null)
    const height = ref(null)
    const matrixContainerWidth = ref('100%')
    const matrixContainerLeft = ref('0px')

    watch(
      () => props.extendedMatrix,
      () => {
        matrixContainerWidth.value = props.extendedMatrix
          ? `${props.containerSize}px`
          : '100%'

        matrixContainerLeft.value = props.extendedMatrix
          ? `calc(-${props.containerSize}px + 20rem)`
          : '0px'
      }
    )

    onMounted(() => {
      width.value = window.innerWidth
      height.value = window.innerHeight

      generateMatrix(matrix.value)
    })

    return {
      matrix,
      width,
      height,
      matrixContainerWidth,
      matrixContainerLeft
    }

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

        drops.forEach((drop, i) => {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > height.value && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        })
      }
    }
  }
})
</script>
<style scoped lang="scss">
.matrix-container {
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;
  transition: all 0.25s ease-in;
  border-radius: 50%;
  right: 0;

  &.extended {
    height: calc(100vh - (4rem + 20px));
    border-radius: 0;

    @include tablet-landscape {
      right: 0;
    }

    @include desktop {
      width: 1400px;
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
