<template>
  <div
    v-if="state.isMobile"
    class="menu-btn"
    :class="{ opened: state.extendedMatrix }"
    @click="toggleMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
  <transition name="fade">
    <div v-if="!state.isMobile || state.extendedMatrix" class="links">
      <ul class="menu">
        <li
          class="menu__item"
          @mouseenter="setHovered('Home')"
          @mouseleave="setHovered()"
        >
          <nuxt-link to="/" @click="toggleMenu">
            <SvgHell />
          </nuxt-link>
        </li>
        <li
          class="menu__item"
          @mouseenter="setHovered('Xp')"
          @mouseleave="setHovered()"
        >
          <nuxt-link to="/experiences" @click="toggleMenu">
            <SvgSatan />
          </nuxt-link>
        </li>
        <li
          class="menu__item"
          @mouseenter="setHovered('Blog')"
          @mouseleave="setHovered()"
        >
          <nuxt-link to="/blog" @click="toggleMenu">
            <SvgParchment />
          </nuxt-link>
        </li>
      </ul>
      <ul class="networks">
        <li class="menu__item">
          <a href="https://github.com/ValJed" target="__blank">
            <SvgGithub />
          </a>
        </li>
        <li class="menu__item linkedin">
          <a
            href="https://www.linkedin.com/in/valentin-jeudy-585466112"
            target="__blank"
          >
            <SvgLinkedin />
          </a>
        </li>
      </ul>
      <p v-if="!state.isMobile" class="menu__item--hovered">
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

const emit = defineEmits(['toggleMenu'])

function setHovered(name) {
  if (!name) {
    hovered.value = ''
    return
  }
  hovered.value = getJapaneseWord(name)
  japaneseToWeapon(hovered, name, hovered.value.length)
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

.links {
  position: absolute;
  align-items: center;
  width: 100%;
  bottom: 10vh;
  z-index: 10;

  @media (max-height: 800px) {
    bottom: 10vh;
  }

  @include tablet-landscape {
    position: inherit;
    display: inherit;
    opacity: 1;
  }

  ul {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-evenly;
  }

  li {
    width: 2.5rem;
    height: 2.5rem;

    &:not(.linkedin) {
      margin-bottom: 2.5rem;

      @include tablet-landscape {
        margin-bottom: 1rem;
      }
    }

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    position: relative;
    flex-direction: column;
    z-index: 2;

    @include tablet-landscape {
      height: 10rem;
      margin-top: 4rem;
      justify-content: space-between;
      flex-direction: column;

      .menu__item:nth-child(2) {
        /* margin-bottom: 4rem; */
      }
    }
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

.menu-btn {
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
