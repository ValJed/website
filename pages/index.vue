<template>
  <div class="home">
    <div class="font-text">
      <h1 title="Full stack JS developer">
        Hi, I'm a full stack web developer.
      </h1>
      <Interests :texts="texts" />
    </div>
    <Description />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Description from '@/components/Description.vue'

export default defineComponent({
  components: {
    Description
  },
  setup() {
    const texts = ['Human Collaboration', 'Philosophy', 'Dark Arts']

    return {
      texts
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  @include text-2xl;

  margin-bottom: 1rem;
}

ul {
  li {
    margin-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>
