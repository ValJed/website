<template>
  <div class="blog content">
    <h1>Blog</h1>
    <ul class="blog__list">
      <li
        v-for="{ id, slug, title, description, cover } in articles.data"
        :key="id"
        class="blog__item"
      >
        <NuxtLink :to="`blog/${slug}`" class="blog__item-link">
          <div
            class="blog__item-cover"
            :style="{ backgroundImage: `url(${assetUrl}${cover.url})` }"
          >
            <div class="blog__item-content">
              <h3>{{ title }}</h3>
              <p>{{ description }}</p>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { assetUrl } = useAppConfig()
const { data: articles } = await useFetch('/api/articles')
</script>

<style lang="scss" scoped>
.blog__list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, auto);
  height: calc(100% - 132px);

  @include tablet-landscape {
    padding: 0 2rem 2rem 2rem;
  }

  @include desktop {
    padding: 0 20px 0 0;
    grid-template-columns: repeat(2, auto);
  }
}

.blog__item-cover {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.blog__item-img {
  width: 100%;
}

.blog__item-content {
  background-color: var(--black);
  opacity: 0.8;
}
</style>
