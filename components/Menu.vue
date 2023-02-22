<template>
  <div
    v-if="isMobile"
    class="menu-btn"
    :class="{ opened: extendedMatrix }"
    @click="toggleMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
  <transition name="fade">
    <div v-if="!isMobile || extendedMatrix" class="links">
      <ul class="menu">
        <li class="menu__item">
          <nuxt-link to="/" @click="toggleMenu">
            <SvgHell />
          </nuxt-link>
        </li>
        <li class="menu__item">
          <nuxt-link to="/experiences" @click="toggleMenu">
            <SvgSatan />
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
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
    default: true
  },
  extendedMatrix: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggleMenu'])

const toggleMenu = () => {
  if (props.isMobile) {
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
    flex-direction: column;

    @include tablet-landscape {
      height: 10rem;
      margin-top: 4rem;
      justify-content: space-between;
      flex-direction: column;
    }
  }

  .networks {
    flex-direction: column;

    @include tablet-landscape {
      flex-direction: row;
      transform: translateY(-7.5rem);
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
