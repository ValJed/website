<template>
  <div v-if="article" class="article content">
    <h1 class="article__title">{{ article.title }}</h1>
    <div class="article__content">
      <StrapiBlocksText :nodes="article.content" />
    </div>
    <BackLink slug="/blog" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const slug = route.params.article
const { data: article } = await useAsyncData('article', () =>
  $fetch('/api/article', { params: { article: slug } })
)
console.log('article', article.value)
</script>

<style lang="scss" scoped>
@include tablet-landscape {
  @include animateTitle('.article__title');
}

.article {
}

img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
