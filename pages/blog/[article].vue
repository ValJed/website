<template>
  <div
    v-if="article"
    class="content"
  >
    <h1 class="article__title">{{ article.title }}</h1>
    <ContentRenderer
      class="content__article"
      :value="article"
    />
    <BackLink slug="/blog" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const { data: article } = await useAsyncData('article', () =>
  queryCollection('blog').path(route.path).first()
)
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
