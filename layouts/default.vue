<template>
  <div>
    <SiteHeader v-if="containerSize" :is-mobile="isMobile" />
    <div ref="containerRef" class="container">
      <router-view v-if="!isMobile" v-slot="{ Component }">
        <transition
          mode="out-in"
          duration="500"
          @before-enter="contractMatrix"
          @before-leave="extendMatrix"
        >
          <component :is="Component" :is-mobile="isMobile" class="content" />
        </transition>
      </router-view>

      <router-view v-else v-slot="{ Component }">
        <component :is="Component" :is-mobile="isMobile" class="content" />
      </router-view>

      <aside class="sidebar" :class="{ extended: extendedMatrix && isMobile }">
        <div class="model-container">
          <Matrix
            v-if="containerSize"
            :extended-matrix="extendedMatrix"
            :container-size="containerSize"
            :is-mobile="isMobile"
          />
          <Model
            v-if="containerSize"
            class="model-canvas"
            :container-size="containerSize"
            :is-mobile="isMobile"
            :extended-matrix="extendedMatrix"
          />
        </div>
        <SocialNetworks
          :is-mobile="isMobile"
          :extended-matrix="extendedMatrix"
          @toggle-menu="toggleMenu"
        />
      </aside>
    </div>
  </div>
</template>

<script setup>
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

const toggleMenu = () => {
  extendedMatrix.value = !extendedMatrix.value
}

onMounted(() => {
  if (window.innerWidth < 900) {
    isMobile.value = true
  }

  containerSize.value = containerRef.value.clientWidth

  // resize()
})

// function resize() {
//   let timeout = null

//   window.onresize = () => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }

//     timeout = setTimeout(() => {
//       containerSize.value = containerRef.value.clientWidth
//       timeout = null

//       console.log('containerSize.value ===> ', containerSize.value)
//     }, 500)
//   }
// }
</script>

<style lang="scss">
.container {
  width: 80%;
  margin: 0 auto;
  padding: 4rem 0 7rem;
  min-height: 100vh;

  @include tablet-landscape {
    padding: 4rem 0 0;
    display: flex;
  }

  @include desktop {
    max-width: 1400px;
  }
}

.content {
  position: relative;
  flex-grow: 1;
  z-index: 0;
  padding-top: 2rem;
  flex: 1;
  min-height: calc(100vh - 11rem);

  @include tablet-landscape {
    margin-top: 5rem;
    padding: 0;
  }
}

.sidebar {
  position: fixed;
  height: 5rem;
  width: 100%;
  right: 0;
  bottom: 0;

  @include tablet-landscape {
    position: -webkit-sticky;
    position: sticky;
    top: 6rem;
    flex-shrink: 0;
    width: 20rem;
    flex-shrink: 0;
    height: auto;
  }

  &.extended {
    .model-canvas {
      transform: translateY(-75vh);
    }
  }
}

.model-canvas {
  transition: transform 0.3s ease-out;
}

.model-container {
  width: 100%;
  height: 12rem;
  position: absolute;
  bottom: 0;

  @include tablet-landscape {
    position: relative;
    height: 20rem;
  }
}
</style>
