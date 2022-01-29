<template>
  <div>
    <Header :is-mobile="isMobile" />
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
            :is-mobile="isMobile"
          />
          <Model v-if="!isMobile" :container-size="containerSize" />
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
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;
  min-height: 100vh;

  @include tablet-landscape {
    display: flex;
  }

  @include desktop {
    max-width: 1400px;
  }
}

.content {
  position: relative;
  padding-bottom: 3rem;
  flex-grow: 1;
  z-index: 0;
  padding-right: 1rem;
  padding: 2rem 1rem 0 0;
  min-height: calc(100vh - 4rem);

  @include tablet-landscape {
    padding: 5rem 0 0 0;
  }

  @include desktop {
    width: calc(100% - 28rem);
  }
}

.sidebar {
  position: fixed;
  width: 100%;
  height: 5rem;
  left: 0;
  top: 4rem;

  @include tablet-landscape {
    position: relative;
    width: 20rem;
    padding-top: 2rem;
    flex-shrink: 0;
  }
}

.model-container {
  position: relative;
  width: 100%;
  height: 20rem;
}
</style>
