<template>
  <div ref="modelContainer" class="model-container">
    <div class="matrix-container" :class="{ extended: extendedMatrix }">
      <canvas ref="bgCanvas" class="matrix" />
    </div>
    <canvas v-if="!isMobile" ref="modelCanvas" class="mask" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { generateMatrix } from './lib/matrix'

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
    const isMobile = ref(false)

    // const resizeHandler = () => {
    //    if (window.innerWidth < 900) {
    //     // console.log(modelCanvas.value)
    //   } else if (isMobile.value) {
    //     three.value = new Samourai(
    //       modelCanvas.value,
    //       modelCanvas.value.clientWidth,
    //       modelCanvas.value.clientHeight
    //     )
    //   }

    //   isMobile.value = window.innerWidth < 900
    // }

    onMounted(async () => {
      // window.addEventListener('resize', resizeHandler)

      if (window.innerWidth < 900) {
        isMobile.value = true
      }

      const { generateModel } = await import('./lib/three')

      generateMatrix(bgCanvas.value, window.innerWidth, window.innerHeight)

      if (!isMobile.value) {
        setTimeout(() => {
          three.value = generateModel(
            modelCanvas.value,
            modelCanvas.value.clientWidth,
            modelCanvas.value.clientHeight
          )
        }, 1300)
      }
    })

    // onUnmounted(() => {
    //   window.removeEventListener('resize', resizeHandler)
    // })

    return {
      isMobile,
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
  top: 0;
  right: 0;

  @include tablet-landscape {
    top: 6rem;
    right: 2rem;
  }

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
      top: 2rem;
      right: 5rem;

      @include tablet-landscape {
        top: 0;
        right: 0;
      }
    }

    &.mask {
      top: 0;
      right: 0;
    }
  }
}

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
