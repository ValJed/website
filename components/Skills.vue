<template>
  <div class="skills">
    <h3 class="font-text">Skills</h3>
    <section>
      <span class="skills-title">Javascript</span>
      <ul>
        <li class="skill">Node</li>
        <li class="skill">Vue</li>
        <li class="skill">React</li>
        <li class="skill">Jest</li>
      </ul>
    </section>
    <section>
      <span class="skills-title">Databases</span>
      <ul>
        <li class="skill">MongoDB</li>
        <li class="skill">GraphQL</li>
        <li class="skill">SQL</li>
      </ul>
    </section>
    <section>
      <span class="skills-title">Systems / Tools</span>
      <ul>
        <li class="skill">Linux</li>
        <li class="skill">Git</li>
        <li class="skill">Nginx</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    texts: {
      type: Array,
      default: null
    }
  },
  setup() {
    // onMounted(() => {
    //   write(writtenTexts)
    // })

    return {}
  }
})
</script>

<style lang="postcss" scoped>
.skills {
  &-title {
    @apply text-2xl;

    background-color: blue;
  }
}
</style>
