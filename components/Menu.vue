<template>
  <div
    v-if="state.isMobile"
    class="menu__btn"
    :class="{ opened: state.extendedMatrix }"
    @click="toggleMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
  <transition name="fade">
    <div
      v-if="!state.isMobile || state.extendedMatrix"
      class="menu"
    >
      <ul class="menu__items">
        <li
          class="menu__item menu__item--top"
          @mouseenter="setHovered('Home')"
          @mouseleave="setHovered()"
        >
          <nuxt-link
            to="/"
            @click="toggleMenu"
          >
            <SvgHell />
            <span
              v-if="state.isMobile"
              class="menu__item-title"
              >Home</span
            >
          </nuxt-link>
        </li>
        <li
          class="menu__item menu__item--center"
          @mouseenter="setHovered('Xp')"
          @mouseleave="setHovered()"
        >
          <nuxt-link
            to="/experiences"
            @click="toggleMenu"
          >
            <SvgSatan />

            <span
              v-if="state.isMobile"
              class="menu__item-title"
              >Xp</span
            >
          </nuxt-link>
        </li>
        <li
          class="menu__item menu__item--bottom"
          @mouseenter="setHovered('Blog')"
          @mouseleave="setHovered()"
        >
          <nuxt-link
            to="/blog"
            @click="toggleMenu"
          >
            <SvgParchment />
            <span
              v-if="state.isMobile"
              class="menu__item-title"
              >Blog</span
            >
          </nuxt-link>
        </li>

        <li class="menu__item menu__item--left">
          <a
            class="menu__item-link"
            href="https://github.com/ValJed"
            target="__blank"
          >
            <SvgGithub />
          </a>
        </li>
        <li class="menu__item menu__item--right">
          <a
            class="menu__item-link"
            href="https://www.linkedin.com/in/valentin-jeudy-585466112"
            target="__blank"
          >
            <SvgLinkedin />
          </a>
        </li>
      </ul>
      <p
        v-if="!state.isMobile"
        class="menu__item--hovered"
      >
        <span>{{ hovered }}</span>
      </p>
    </div>
  </transition>
</template>

<script setup>
import { useLayoutState } from '@/composables/useLayoutState.js'
import { getJapaneseWord, japaneseToWeapon } from '@/lib/weaponsAnimation.js'
const state = useLayoutState()
const hovered = ref('')
const animRunning = ref(false)
const stopTimeout = ref(null)
const timeout = ref(null)

const emit = defineEmits(['toggleMenu'])

async function setHovered(name) {
  if (state.isMobile) {
    return
  }
  clearTimeout(stopTimeout.value)
  if (!name) {
    stopTimeout.value = setTimeout(() => {
      hovered.value = ''
    }, 300)
  }
  if (animRunning.value) {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
      if (name) {
        runAnimation(name)
      } else {
        hovered.value = ''
      }
    }, 100)
    return
  }
  if (!name) {
    hovered.value = ''
    return
  }
  runAnimation(name)
}

async function runAnimation(name) {
  animRunning.value = true
  hovered.value = getJapaneseWord(name)
  await japaneseToWeapon(hovered, name, hovered.value.length)
  animRunning.value = false
}

const toggleMenu = () => {
  if (state.value.isMobile) {
    emit('toggleMenu')
  }
}
</script>

<style lang="scss">
$menuTranslate: 10px;

.fade-enter-active {
  transition: all 0.3s linear 0.3s;
}

.fade-leave-active {
  transition: all 0.1s linear;
}

[v-cloak] {
  display: none !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@include mobile-only {
  ul {
    margin: 0;
  }
}

.menu {
  position: absolute;
  align-items: center;
  width: 100%;
  bottom: 15vh;
  z-index: 10;

  @include tablet-landscape {
    position: inherit;
    display: inherit;
    opacity: 1;
  }

  &__items {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 250px;
    height: 300px;
    margin: 0 auto;
    justify-content: space-between;
    grid-gap: 40px 40px;

    @include tablet-landscape {
      display: grid;
      width: 160px;
      height: 160px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      margin-top: 70px;
      grid-gap: 20px 20px;
    }
  }

  .menu__item {
    width: 40px;
    height: 65px;

    @include tablet-landscape {
      height: 40px;
    }

    &-title {
      text-align: center;
      color: var(--green);
      margin-top: 5px;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;

      @include tablet-landscape {
        display: inline-block;
      }
    }

    svg {
      width: 100%;
      height: 40px;
    }

    &--center {
      grid-row: 2;
      grid-column: 2;
    }
    &--top {
      grid-row: 1;
      grid-column: 2;
    }
    &--bottom {
      grid-row: 3;
      grid-column: 2;
    }
    &--left {
      position: inherit;
      grid-row: 2;
      grid-column: 1;

      @include mobile-only {
        position: absolute;
        left: 0;
        top: calc(100% / 2 - 20px);
      }
    }
    &--right {
      position: inherit;
      grid-row: 2;
      grid-column: 3;

      @include mobile-only {
        position: absolute;
        right: 0;
        top: calc(100% / 2 - 20px);
      }
    }
  }

  .menu__item-link {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .menu__item--hovered {
    text-align: center;
    color: var(--green);
  }

  .networks {
    position: absolute;
    width: 100%;
    flex-direction: column;

    @include tablet-landscape {
      flex-direction: row;
      transform: translateY(-8.5rem);
      justify-content: center;
    }

    li {
      @include tablet-landscape {
        margin: 0 2rem;
      }
    }
  }
}

.menu__btn {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 30px;
  height: 30px;
  background-color: none;
  right: 2rem;
  bottom: calc((4rem - 30px) / 2);
  overflow: hidden;
  cursor: pointer;
  z-index: 20;

  &.opened {
    span:first-child {
      width: 100%;
      transform: rotate(-45deg) translateY($menuTranslate)
        translateX(-$menuTranslate);
    }

    span:nth-child(2) {
      transform: translateX(-100%);
    }

    span:last-child {
      width: 100%;
      transform: rotate(45deg) translateY(-$menuTranslate)
        translateX(-$menuTranslate);
    }
  }

  span {
    display: block;
    height: 1.5px;
    background-color: #fff;
    transition: all 0.3s ease-out;

    &:first-child {
      width: 80%;
    }

    &:nth-child(2) {
      width: 100%;
    }

    &:last-child {
      width: 60%;
    }
  }
}
</style>
