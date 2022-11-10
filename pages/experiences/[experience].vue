<template>
  <div class="work">
    <div class="logo">
      <img :src="`/images/${experience.img}`" :alt="experience.name" />
      <span v-if="experience.logoName">{{ experience.logoName }}</span>
    </div>
    <div class="description">
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
import experiences from '@/data/experiences'
import Arrow from '@/components/svg/Arrow.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const current = route.params.experience
const experience = experiences[current]

const stack = experience.stack.join(' <span>/</span> ')
</script>

<style scoped lang="scss">
.work {
  position: relative;
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
  display: block;
  min-height: 2.5rem;
  max-height: 5rem;
  max-width: 13rem;
  height: auto;
}

.description {
  margin-top: 6rem;

  @include tablet-landscape {
    margin-top: 3rem;
  }
}

.stack {
  color: $green;

  :deep(span) {
    color: #fff;
  }
}

.link {
  color: $green;
}

.arrow {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  margin: 3rem 0 3rem 1.24rem;

  @include tablet-landscape {
    position: absolute;
    bottom: 5rem;
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
