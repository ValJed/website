<template>
  <div class="work">
    <div class="logo">
      <img :src="`/images/${experience.img}`" :alt="experience.name" />
      <span v-if="experience.logoName">{{ experience.logoName }}</span>
    </div>
    <p>{{ experience.date }}</p>
    <p class="stack">{{ experience.stack }}</p>
    <p v-for="(paragraph, i) in experience.content" :key="i">
      {{ paragraph }}
    </p>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import experiences from '@/data/experiences'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { experience: current } = route.value.params
    const experience = experiences[current]

    return { experience }
  }
})
</script>
<style scoped lang="scss">
h1 {
  padding: 3rem 0;
}

.logo {
  display: flex;
  align-items: center;

  span {
    font-size: 1.5rem;
    font-family: Inter, 'sans-serif';
    margin-left: 0.5rem;
  }
}

img {
  margin: 3rem 0;
  display: block;
  min-height: 2.5rem;
  max-height: 5rem;
  max-width: 13rem;
  height: auto;
}

.stack {
  color: $green;
}

// Anims
.matrix-enter-active {
  .logo {
    animation: 0.5s ease-in-out 0s 1 normal both titleEnterAnim;
  }
}

.matrix-leave-active {
  .logo {
    animation: 0.5s ease-in-out 0s 1 normal both titleLeaveAnim;
  }
}
</style>
