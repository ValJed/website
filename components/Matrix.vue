<template>
  <div class="matrix-container" :class="{ extended: extendedMatrix }">
    <canvas ref="matrix" :width="width" :height="height" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    extendedMatrix: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const matrix = ref(null)
    const width = ref(null)
    const height = ref(null)

    onMounted(() => {
      width.value = window.innerWidth
      height.value = window.innerHeight

      generateMatrix(matrix.value)
    })

    return {
      matrix,
      width,
      height
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
  position: absolute;
  top: -3rem;
  right: -5rem;
  width: 20rem;
  height: 20rem;
  overflow: hidden;
  transition: all 0.25s ease-in;
  border-radius: 0 0 0 50%;

  @include tablet-landscape {
    top: -2rem;
    right: -2rem;
    width: 20rem;
  }

  @include desktop {
    width: 32rem;
    height: 32rem;
  }

  &.extended {
    width: 110vw;
    height: 110vh;
    border-radius: 0;

    @include tablet-landscape {
      top: -2rem;
      right: -2rem;
    }
  }
}

canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;

  @include tablet-landscape {
    top: -2rem;
    right: -2rem;
  }
}
</style>
