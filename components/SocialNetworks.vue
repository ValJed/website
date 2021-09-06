<template>
  <div class="links">
    <ul class="menu">
      <li>
        <nuxt-link to="/">Me</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/experiences">Xp</nuxt-link>
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

export default {
  components: {
    LinkedinSvg,
    GithubSvg
  },
  emits: ['goToHome', 'goToExperiences']
}
</script>

<style lang="scss">
.links {
  position: absolute;
  width: 30rem;
  top: 32rem;
  right: 2rem;

  .menu {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      @include text-xl;
      font-family: $ftitle;
      cursor: pointer;

      &:first-child {
        margin-bottom: 3rem;
      }
    }
  }

  .networks {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    transform: translateY(-7rem);

    li {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 2rem;

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
