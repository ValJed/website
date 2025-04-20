<template>
  <div class="blog content">
    <h1 class="blog__title">Blog</h1>
    <ul class="blog__list">
      <ArticleCard
        v-for="article in nav.children"
        :key="article.path"
        :article="article"
      />
    </ul>
  </div>
</template>

<script setup>
const nav = ref(null)
const { data } = await useAsyncData('navigation', async () => {
  return queryCollectionNavigation('blog', [
    'description',
    'date',
    'tags',
    'coverImg'
  ]).order('date', 'DESC')
})

nav.value = data.value?.[0]
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
