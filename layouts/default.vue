<template>
  <div>
    <Header />
    <div ref="containerRef" class="container">
      <Nuxt
        class="content"
        @extendMatrix="extendMatrix"
        @contractMatrix="contractMatrix"
      />
      <aside class="sidebar">
        <div class="model-container">
          <Matrix
            :extended-matrix="extendedMatrix"
            :container-size="containerSize"
          />
          <!-- <Model v-if="!isMobile" /> -->
        </div>
        <SocialNetworks />
      </aside>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isMobile = ref(false)
    const extendedMatrix = ref(false)
    const containerRef = ref(null)
    const containerSize = ref(0)

    const extendMatrix = () => {
      extendedMatrix.value = true
    }

    const contractMatrix = () => {
      extendedMatrix.value = false
    }

    onMounted(() => {
      if (window.innerWidth < 900) {
        isMobile.value = true
      }

      containerSize.value = containerRef.value.clientWidth

      window.onresize = () => {
        containerSize.value = containerRef.value.clientWidth
      }
    })

    return {
      extendedMatrix,
      extendMatrix,
      contractMatrix,
      isMobile,
      containerRef,
      containerSize
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;
  min-height: 100vh;

  @include desktop {
    max-width: 1400px;
  }
}

.content {
  padding-bottom: 3rem;
  flex-grow: 1;

  @include desktop {
    width: calc(100% - 28rem);
  }
}

.sidebar {
  position: relative;
  padding-top: 20px;
  width: 20rem;
}

.model-container {
  width: 100%;
  height: 20rem;

  @include tablet-landscape {
    top: 6rem;
    right: 2rem;
  }

  // @include desktop {
  //   width: 30rem;
  //   height: 30rem;
  // }

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
</style>
