<template>
  <div class="work">
    <div class="logo">
      <img :src="`/images/${experience.img}`" :alt="experience.name" />
      <span v-if="experience.logoName">{{ experience.logoName }}</span>
    </div>
    <div class="content">
      <p>{{ experience.date }}</p>
      <p class="stack" v-html="stack"></p>
      <p v-for="(paragraph, i) in experience.content" :key="i">
        {{ paragraph }}
      </p>
      <p v-if="experience.link">
        See
        <a class="link" target="__blank" :href="experience.link">{{
          experience.link
        }}</a>
      </p>
    </div>
    <NuxtLink class="arrow" to="/experiences">
      <Arrow />
    </NuxtLink>
  </div>
</template>

<script setup>
/* import { defineComponent, useRoute } from '@nuxtjs/composition-api' */
import experiences from '@/data/experiences'
import Arrow from '@/components/svg/Arrow.vue'

const route = useRoute()
const { experience: current } = route.value.params
const experience = experiences[current]

const stack = experience.stack.join(' <span>/</span> ')
</script>

<style scoped lang="scss">
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

  ::v-deep span {
    color: #fff;
  }
}

.link {
  color: $green;
}

.arrow {
  position: relative;
  left: 1.24rem;
  width: 4rem;

  @include tablet-landscape {
    top: 3rem;
  }
}

// Anims
@include tablet-landscape {
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
}
</style>
