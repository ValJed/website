<template>
  <div class="networks">
    <ul class="flex items-center justify-center mt-3">
      <li>
        <LinkedinSvg />
        <!-- <img src="/static/svg/noun_linkedin_2045186.svg" alt=""> -->
      </li>
      <li>
        <GithubSvg />
      </li>
      <li>
        <SoundCloudSvg />
      </li>
    </ul>
  </div>
</template>

<script>
import LinkedinSvg from './svg/Linkedin.vue'
import GithubSvg from './svg/Github.vue'
import SoundCloudSvg from './svg/SoundCloud.vue'

export default {
  components: { LinkedinSvg, GithubSvg, SoundCloudSvg }
}
</script>
<style lang="scss">
.networks {
  position: absolute;
  width: 30rem;
  height: 30rem;
  top: 32rem;
  right: 2rem;
}
</style>
