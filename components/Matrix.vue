<template>
  <div class="matrix-container" :class="{ extended: extendedMatrix }">
    <canvas ref="matrix" :width="width" :height="height" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup({ extendedMatrix }) {
    const matrix = ref(null)
    const width = ref(null)
    const height = ref(null)

    onMounted(() => {
      width.value = window.innerWidth
      height.value = window.innerHeight

      generateMatrix(matrix.value)
    })

    return {
      extendedMatrix,
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

      const drops = Array(Math.round(columns)).fill(1)

      setInterval(draw, 40)

      function draw() {
        // requestAnimationFrame(draw)

        ctx.fillStyle = 'rgba(0, 0, 10, 0.2)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#03A062' // green text
        ctx.font = `${fontSize}px arial`

        drops.forEach((drop, i) => {
          // a random chinese character to print
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          // x = i*fontSize, y = value of drops[i]*fontSize
          ctx.fillText(text, i * fontSize, drop * fontSize)

          // sending the drop back to the top randomly after it has crossed the screen
          // adding a randomness to the reset to make the drops scattered on the Y axis
          if (drop * fontSize > height && Math.random() > 0.975) drop = 0

          drop++
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
  border-radius: 50%;

  @include tablet-landscape {
    top: 0;
    right: 0;
    width: 20rem;
  }

  @include desktop {
    width: 30rem;
    height: 30rem;
  }

  &.extended {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    top: 0;
    right: 0;

    @include tablet-landscape {
      top: -2rem;
      right: -2rem;
    }
  }
}
</style>
