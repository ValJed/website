<template>
  <div class="blog content">
    <h1 class="blog__title">Blog</h1>
    <ul v-if="articles" class="blog__list">
      <template v-for="article in articles.data" :key="article.id">
        <ArticleCard :article="article" />
      </template>
    </ul>
  </div>
</template>

<script setup>
const { data: articles } = await useFetch('/api/articles')
</script>

<style lang="scss" scoped>
.blog__list {
  height: calc(100% - 132px);

  @include tablet-landscape {
    padding: 0 2rem 2rem 2rem;
  }

  @include desktop {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 0 20px 0 0;
  }
}

@include tablet-landscape {
  @include animateTitle('.blog__title');
}
</style>
