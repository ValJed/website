<template>
  <div class="content">
    <div class="work">
      <div class="logo">
        <img
          v-if="experience.logo.url"
          :src="`${assetUrl}${experience.logo.url}`"
          :alt="experience.name"
        />
        <span v-if="experience.logoTitle">{{ experience.logoTitle }}</span>
      </div>
      <div class="description">
        <p>{{ experience.period }}</p>
        <p class="stack" v-html="stack"></p>
        <StrapiBlocksText :nodes="experience.content" />
      </div>
    </div>
    <div class="back-link__container">
      <div class="back-link__inner">
        <NuxtLink class="back-link" to="/experiences">
          <Spear />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Spear from '@/components/svg/Spear.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const current = route.params.experience
const { assetUrl } = useAppConfig()
const { data: experience } = await useAsyncData('experience', () =>
  $fetch('/api/experience', { params: { experience: current } })
)
const stack = experience.value.stack
  .map(({ title }) => title)
  .join(' <span>/</span> ')
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
  color: var(--green);

  :deep(span) {
    color: #fff;
  }
}

.link {
  color: var(--green);
}

.back-link {
  display: inline-block;
  transform: rotate(-90deg);
  width: 8rem;
  height: 8rem;
}

.back-link__container {
  @include tablet-landscape {
    position: fixed;
    height: 5rem;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: var(--black);
  }
}

.back-link__inner {
  @include tablet-landscape {
    display: flex;
    align-items: center;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1400px;
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
