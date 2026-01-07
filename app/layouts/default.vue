<template>
  <div>
    <SiteHeader
      v-if="containerSize"
      :is-mobile="state.isMobile"
    />
    <div
      ref="containerRef"
      class="container"
    >
      <NuxtPage :transition="transition" />
      <aside
        ref="sidebarEl"
        class="sidebar"
        :class="{ extended: state.openedMenu }"
      >
        <Matrix
          v-if="containerSize && !isResizing"
          class="matrix-container"
          :extended-matrix="state.extendedMatrix"
          :container-size="containerSize"
          :sidebar-size="sidebarSize"
          :is-mobile="state.isMobile"
        />
        <div class="model-container">
          <Model
            v-if="containerSize && !isResizing"
            class="model-canvas"
            :container-size="containerSize"
          />
        </div>
        <Menu
          v-if="containerSize"
          @toggle-menu="toggleMenu"
        />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useLayoutState } from '@/composables/useLayoutState.js'
const state = useLayoutState()

const sidebarEl = ref(null)
const sidebarSize = ref(0)
const containerRef = ref(null)
const containerSize = ref(0)
const isResizing = ref(false)
const transition = ref(getTransition())

const router = useRouter()

router.beforeEach(() => {
  if (state.value.isMobile && state.value.openedMenu) {
    closeMenu()
  }
})

router.afterEach(() => {
  if (state.vaue.isMobile) {
    closeMenu()
  }
})

onMounted(() => {
  if (window.innerWidth < 900) {
    state.value.isMobile = true
  }

  containerSize.value = containerRef.value.clientWidth
  sidebarSize.value = sidebarEl.value.clientWidth
  resize()
})

function extendMatrix() {
  state.value.extendedMatrix = true
}

function contractMatrix() {
  state.value.extendedMatrix = false
}

function toggleMenu() {
  if (state.value.openedMenu) {
    closeMenu()
  } else {
    openMenu()
  }
}

function closeMenu() {
  state.value.openedMenu = false
  state.value.extendedMatrix = false

  setTimeout(() => {
    transition.value = getTransition()
  }, 250)
}

function openMenu() {
  state.value.openedMenu = true
  state.value.extendedMatrix = true
  transition.value = {}
}

function getTransition() {
  return {
    name: 'page',
    mode: 'out-in',
    duration: 500,
    onBeforeEnter: contractMatrix,
    onBeforeLeave: extendMatrix
  }
}

function resize() {
  let timeout = null

  window.onresize = () => {
    if (containerSize.value === containerRef.value.clientWidth) {
      return
    }
    isResizing.value = true

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      containerSize.value = containerRef.value.clientWidth
      sidebarSize.value = sidebarEl.value.clientWidth
      timeout = null
      isResizing.value = false
      state.value.isMobile = window.innerWidth < 900
    }, 500)
  }
}
</script>

<style lang="scss">
$model-size-desktop: 320px;
$model-size-laptop: 250px;

.none-enter-active,
.none-leave-active {
  transition: none;
}

.container {
  width: 85%;
  margin: 0 auto;
  padding: 3rem 0 7rem;
  min-height: 100vh;

  @include tablet-landscape {
    width: auto;
    margin: 0 40px;
    padding: 4rem 0 0;
    display: flex;
  }

  @include desktop {
    width: 80%;
    margin: 0 auto;
    max-width: 1400px;
  }
}

.content {
  position: relative;
  z-index: 0;
  padding-top: 1rem;
  flex: 1;
  min-height: calc(100vh - 11rem);

  @include tablet-landscape {
    margin-top: 5rem;
    padding: 0 0 80px;
  }

  // Markdown content
  &__experience,
  &__article {
    img {
      display: block;
      width: 100%;
      margin: 30px auto;

      @include tablet-landscape {
        width: 80%;
      }
    }

    p {
      @include text-sm;
      font-weight: normal;
    }

    a.link {
      color: var(--green);
    }

    pre {
      overflow-x: scroll;
    }

    pre,
    code {
      width: 100%;
    }

    ul {
      padding-left: 15px;

      li {
        font-family: var(--ftext);
        list-style: none;
        margin: 10px 0;
      }
    }
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
    top: 4rem;
    flex-shrink: 0;
    width: $model-size-laptop;
    height: calc(100vh - 4rem);
    margin-left: 20px;
  }

  @include desktop {
    width: $model-size-desktop;
  }

  &.extended {
    .model-canvas {
      transform: translateY(calc(-450px - 10vh));

      @include mobile-tiny {
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
    margin-top: 2rem;
    display: block;
    position: relative;
    height: $model-size-laptop;
    top: 0;
  }

  @include desktop {
    height: $model-size-desktop;
  }
}

.matrix-container {
  @include tablet-landscape {
    height: $model-size-laptop;
  }

  @include desktop {
    height: $model-size-desktop;
  }
}
</style>
