<template>
  <div class="networks">
    <ul>
      <li>
        <a href="https://github.com/ValJed">
          <GithubSvg />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/valentin-jeudy-585466112">
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
// import SoundCloudSvg from './svg/SoundCloud.vue'

export default {
  components: {
    LinkedinSvg,
    GithubSvg
    // SoundCloudSvg
  }
}
</script>
<style lang="scss">
.networks {
  position: absolute;
  width: 30rem;
  height: 30rem;
  top: 32rem;
  right: 2rem;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
}
</style>
