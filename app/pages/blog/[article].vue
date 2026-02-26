<template>
  <div
    v-if="article"
    ref="content"
    class="content"
  >
    <ContentIntro
      :title="article.title"
      :logo-title="article.title"
      :tags="article.tags"
    />
    <ContentRenderer
      class="content__article"
      :value="article"
    />
    <BackLink slug="/blog" />
  </div>
</template>

<script setup>
import { useAnimateLink } from '@/composables/useAnimateLink.js'

const route = useRoute()
const { data: article } = await useAsyncData(`article-${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)

const contentEl = useTemplateRef('content')
useAnimateLink(contentEl)
</script>

<style lang="scss" scoped>
@include tablet-landscape {
  @include animateTitle('.article__title');
}

img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
