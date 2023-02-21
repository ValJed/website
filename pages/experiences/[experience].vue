<template>
  <div>
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
    </div>
    <div class="back-link__container">
      <NuxtLink class="back-link" to="/experiences">
        <Spear />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import experiences from '@/data/experiences'
import Spear from '@/components/svg/Spear.vue'
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
  margin-top: 4rem;

  @include tablet-landscape {
    margin-top: 3rem;
    padding-bottom: 6rem;
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

.back-link {
  display: inline-block;
  transform: rotate(-90deg);
  width: 8rem;
  height: 8rem;
}

.back-link__container {
  position: static;
  display: flex;
  align-items: center;

  @include tablet-landscape {
    position: fixed;
    height: 5rem;
    background-color: $black;
    bottom: 0;
    left: 10%;
    width: 80%;
    overflow: hidden;
  }

  @include desktop {
    max-width: 1400px;
    left: calc((100vw - 1400px) / 2);
  }
}

@include tablet-landscape {
  .v-enter-active {
    .logo {
      animation: 0.5s ease-in-out 0s 1 normal both titleEnterAnim;
    }
  }

  .v-leave-active {
    .logo {
      animation: 0.5s ease-in-out 0s 1 normal both titleLeaveAnim;
    }
  }
}
</style>
