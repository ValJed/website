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
            v-if="containerSize && !isResizing"
            :extended-matrix="extendedMatrix"
            :container-size="containerSize"
            :is-mobile="isMobile"
          />
          <Model
            v-if="containerSize && !isResizing"
            class="model-canvas"
            :container-size="containerSize"
            :is-mobile="isMobile"
            :extended-matrix="extendedMatrix"
          />
        </div>
        <Menu
          v-if="containerSize"
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
const isResizing = ref(false)

const router = useRouter()

const extendMatrix = () => {
  extendedMatrix.value = true
}

const contractMatrix = () => {
  extendedMatrix.value = false
}

const toggleMenu = () => {
  extendedMatrix.value = !extendedMatrix.value
}

if (isMobile) {
  router.beforeEach(() => {
    contractMatrix()
  })
}

onMounted(() => {
  if (window.innerWidth < 900) {
    isMobile.value = true
  }

  containerSize.value = containerRef.value.clientWidth

  resize()
})

function resize() {
  let timeout = null

  window.onresize = () => {
    if (containerSize.value === containerRef.value.clientWidth) {
      return
    }

    if (timeout) {
      isResizing.value = true
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      containerSize.value = containerRef.value.clientWidth
      timeout = null
      isResizing.value = false
      isMobile.value = window.innerWidth < 900
    }, 500)
  }
}
</script>

<style lang="scss">
.container {
  width: 80%;
  margin: 0 auto;
  padding: 3rem 0 7rem;
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
  padding-top: 1rem;
  flex: 1;
  min-height: calc(100vh - 11rem);

  @include tablet-landscape {
    margin-top: 5rem;
    padding: 0;
  }
}

.sidebar {
  position: fixed;
  height: 4rem;
  width: 100%;
  right: 0;
  bottom: 0;

  @include tablet-landscape {
    position: -webkit-sticky;
    position: sticky;
    top: 6rem;
    flex-shrink: 0;
    width: 20rem;
    height: calc(100vh - 6rem);
  }

  &.extended {
    .model-canvas {
      transform: translateY(-75vh);

      @media (max-height: 800px) {
        transform: translateY(-70vh);
      }
    }
  }
}

.model-canvas {
  transition: transform 0.3s ease-out;
}

.model-container {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4rem;
  bottom: 0;

  @include tablet-landscape {
    display: block;
    position: relative;
    height: 20rem;
  }
}
</style>
