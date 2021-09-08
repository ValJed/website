<template>
  <div>
    <div class="font-text">
      <h2 title="Full stack JS developer">Full stack JS developer</h2>
      <p class="text-xl mb-4">Interested in</p>
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
    const texts = [
      'Human Collaboration',
      'Open Source',
      'Philosophy',
      'Dark Arts'
    ]

    return {
      texts
    }
  }
})
</script>

<style lang="scss" scoped>
h2 {
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
