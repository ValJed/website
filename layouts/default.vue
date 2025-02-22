<template>
  <div>
    <SiteHeader v-if="containerSize" :is-mobile="isMobile" />
    <div ref="containerRef" class="container">
      <NuxtPage :transition="transition" />
      <aside
        class="sidebar"
        :class="{ extended: state.extendedMatrix && isMobile }"
      >
        <div class="model-container">
          <Matrix
            v-if="containerSize && !isResizing"
            :extended-matrix="state.extendedMatrix"
            :container-size="containerSize"
            :is-mobile="isMobile"
          />
          <Model
            v-if="containerSize && !isResizing"
            class="model-canvas"
            :container-size="containerSize"
          />
        </div>
        <Menu v-if="containerSize" @toggle-menu="toggleMenu" />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useLayoutState } from '@/composables/useLayoutState.js'
const state = useLayoutState()

const isMobile = ref(false)
const containerRef = ref(null)
const containerSize = ref(0)
const isResizing = ref(false)
const transition = ref({
  name: 'matrix',
  mode: 'out-in',
  duration: 500,
  onBeforeEnter: contractMatrix,
  onBeforeLeave: extendMatrix
})

const router = useRouter()

function extendMatrix() {
  state.value.extendedMatrix = true
}

function contractMatrix() {
  state.value.extendedMatrix = false
}

const toggleMenu = () => {
  state.value.extendedMatrix = !state.value.extendedMatrix
}

if (state.value.isMobile) {
  router.beforeEach(() => {
    contractMatrix()
  })
}

onMounted(() => {
  if (window.innerWidth < 900) {
    state.value.isMobile = true
    transition.value = ref({})
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
      state.value.isMobile = window.innerWidth < 900
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
