<template>
  <div class="home content">
    <div>
      <h1 title="Full stack JS developer">
        Hi, I'm a full stack web developer.
      </h1>
      <p>
        Here are the weapons I love to fight with: <br v-if="state.isMobile" />
        <span class="green">{{ weapon }}</span>
      </p>
      <p class="interests">
        Also interested in Human Collaboration <span>/</span> Philosophy
        <span>/</span> Dark Arts
      </p>
    </div>
  </div>
</template>

<script setup>
import weaponsAnimation from '@/lib/weaponsAnimation.js'
import { useLayoutState } from '@/composables/useLayoutState.js'

const state = useLayoutState()
const weapons = ['Vue', 'React', 'MongoDB', 'Nodejs', 'Linux', 'Docker', 'Rust'] // TODO: get from api
const weapon = ref(weapons[0])

onMounted(() => {
  setInterval(async () => {
    await weaponsAnimation(weapons, weapon)
  }, 3000)
})
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
  color: var(--green);
}

.interests > span {
  color: var(--green);
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  min-height: 2rem;
  @include text;

  @include tablet-landscape {
    @include text-xl;
  }

  .green {
    display: inline-block;
    height: 30px;
    color: var(--green);
    line-height: 1.3;
  }
}

h1 {
  @include text-xl;

  @include tablet-landscape {
    @include text-2xl;
  }
}

ul {
  li {
    margin-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>
