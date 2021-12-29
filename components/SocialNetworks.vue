<template>
  <div class="links">
    <ul class="menu">
      <li>
        <nuxt-link to="/">
          <!-- <img src="/images/hell.svg" alt="" /> -->
          <HellSvg />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/experiences">
          <SatanSvg />
        </nuxt-link>
      </li>
    </ul>
    <ul class="networks">
      <li>
        <a href="https://github.com/ValJed" target="__blank">
          <GithubSvg />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/valentin-jeudy-585466112"
          target="__blank"
        >
          <LinkedinSvg />
        </a>
        <!-- <img src="/static/svg/noun_linkedin_2045186.svg" alt=""> -->
      </li>
    </ul>
  </div>
</template>

<script>
import LinkedinSvg from './svg/Linkedin.vue'
import GithubSvg from './svg/Github.vue'
import SatanSvg from './svg/Satan.vue'
import HellSvg from './svg/Hell.vue'

export default {
  components: {
    LinkedinSvg,
    GithubSvg,
    SatanSvg,
    HellSvg
  },
  emits: ['goToHome', 'goToExperiences']
}
</script>

<style lang="scss">
.links {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 2rem;

  @include tablet-landscape {
    top: 34rem;
  }

  @include desktop {
    width: 30rem;
  }

  li {
    margin-bottom: 1rem;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 10.5rem;

    @include desktop {
      margin-top: 4rem;
    }

    li {
      width: 4rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .networks {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @include desktop {
      flex-direction: row;
      transform: translateY(-6.5rem);
    }

    li {
      width: 2.5rem;
      height: 2.5rem;

      @include desktop {
        margin: 0 2rem;
      }

      a {
        width: 100%;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
