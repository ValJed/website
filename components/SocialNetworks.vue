<template>
  <div class="links">
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
    <ul class="menu">
      <li>
        <nuxt-link to="/">
          <SvgHell />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/experiences">
          <SvgSatan />
        </nuxt-link>
      </li>
    </ul>
    <ul class="networks">
      <li>
        <a href="https://github.com/ValJed" target="__blank">
          <SvgGithub />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/valentin-jeudy-585466112"
          target="__blank"
        >
          <SvgLinkedin />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true
  },
  extendedMatrix: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['toggleMenu'])

const toggleMenu = () => {
  emit('toggleMenu')
}
</script>

<style lang="scss">
$menuTranslate: 10px;

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
  top: 0;
  overflow: hidden;
  cursor: pointer;

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

@include mobile-only {
  ul {
    margin: 0;
  }
}

.links {
  position: relative;
  display: flex;
  width: 4rem;
  bottom: 0;
  position: fixed;
  align-items: center;
  width: 100%;
  z-index: 10;

  @include tablet-landscape {
    position: inherit;
    display: inherit;
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
    margin-bottom: 1rem;

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
    @include tablet-landscape {
      height: 10rem;
      margin-top: 4rem;
      justify-content: space-between;
      flex-direction: column;
    }
  }

  .networks {
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
</style>
