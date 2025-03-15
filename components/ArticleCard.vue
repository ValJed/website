<template>
  <li
    :key="article.id"
    class="card"
    :style="{ backgroundImage: `url(${assetUrl}${article.cover.url})` }"
  >
    <NuxtLink :to="`blog/${article.slug}`" class="card__link">
      <div class="card__content-title">
        <h2 class="card__title">{{ article.title }}</h2>
      </div>
      <div class="card__content-description">
        <p class="card__description">{{ article.description }}</p>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup>
const { assetUrl } = useAppConfig()
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.card {
  display: block;
  border-radius: 60px;
  overflow: hidden;
  height: 220px;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;

  @include tablet-landscape {
    &:hover {
      animation: shadow 2s linear 0s infinite running forwards;

      .card__content-title {
        position: relative;
        transition: all 0.2s linear;
        width: 20%;
      }

      .card__title {
        transition: none;
        opacity: 0;
      }

      .card__content-description {
        visibility: visible;
      }

      .card__description {
        opacity: 1;
      }
    }
  }

  @include desktop {
    margin-bottom: 0;
  }
}

.card__link {
  display: flex;
  position: relative;
  flex-direction: row;
  height: 100%;
}

.card__cover {
  height: 100%;
}

.card__img {
  width: 100%;
}

.card__content-title {
  background-color: rgba(3, 160, 98, 0.6);
  padding: 20px 10px 20px 20px;
  width: 40%;
  transition: all 0.1s linear;
}

.card__title {
  transition: opacity 100ms 100ms linear;
  font-family: var(--ftext);
  margin: 0;
  word-wrap: break-word;
}

.card__content-description {
  visibility: hidden;
  flex: 1;
  background-color: rgba(17, 24, 39, 0.6);
  padding: 20px 20px 20px 15px;
}

.card__description {
  transition: opacity 100ms 200ms linear;
  margin: 0;
  font-size: 1rem;
  opacity: 0;
}
</style>
