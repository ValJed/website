<template>
  <div class="content">
    <ExperienceIntro
      :logo-img="experience.logoImg"
      :logo-title="experience.logoTitle"
      :period="experience.period"
      :stack="experience.stack"
    />
    <ContentRenderer
      class="content__experience"
      :value="experience"
    />
    <BackLink slug="/experiences" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const { data: experience } = await useAsyncData('experience', () =>
  queryCollection('experiences').path(route.path).first()
)

console.log('experience', experience)
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

@include tablet-landscape {
  @include animateTitle('.logo');
}
</style>
