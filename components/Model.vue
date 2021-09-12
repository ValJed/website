<template>
  <div ref="modelContainer" class="model-container">
    <div class="matrix-container" :class="{ extended: extendedMatrix }">
      <canvas ref="bgCanvas" class="matrix" />
    </div>
    <canvas ref="modelCanvas" class="mask" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    extendedMatrix: {
      type: Boolean
    }
  },
  setup() {
    const bgCanvas = ref(null)
    const modelCanvas = ref(null)
    const three = ref(null)

    onMounted(async () => {
      const { Samourai } = await import('./lib/three')
      const { generateMatrix } = await import('./lib/matrix')

      generateMatrix(bgCanvas.value, window.innerWidth, window.innerHeight)

      setTimeout(() => {
        three.value = new Samourai(
          modelCanvas.value,
          modelCanvas.value.clientWidth,
          modelCanvas.value.clientHeight
        )
      }, 1300)
    })

    return {
      bgCanvas,
      modelCanvas
    }
  }
})
</script>
<style scoped lang="scss">
.model-container {
  position: fixed;
  width: 20rem;
  height: 20rem;
  top: 2rem;
  right: 2rem;

  @include desktop {
    width: 30rem;
    height: 30rem;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;

    &.matrix {
      width: 100vw;
      height: 100vh;
      top: 0rem;
      right: 0rem;
    }

    &.mask {
      top: 0;
      right: 0;
    }
  }
}

.matrix-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.25s ease-in;

  @include desktop {
    width: 30rem;
    height: 30rem;
  }

  &.extended {
    width: 100vw;
    height: 100vh;
    top: -2rem;
    border-radius: 0;
  }
}
</style>
