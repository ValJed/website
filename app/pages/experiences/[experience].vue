<template>
  <div
    ref="content"
    class="content"
  >
    <ContentIntro
      :logo-img="experience.logoImg"
      :logo-title="experience.logoTitle"
      :period="experience.period"
      :tags="experience.stack"
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
import { useAnimateLink } from '@/composables/useAnimateLink.js'

const route = useRoute()
const { data: experience } = await useAsyncData('experience', () =>
  queryCollection('experiences').path(route.path).first()
)

const contentEl = useTemplateRef('content')
useAnimateLink(contentEl)
</script>

<style scoped lang="scss">
.work {
  position: relative;
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
