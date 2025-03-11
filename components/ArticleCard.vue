<template>
  <li
    :key="article.id"
    class="card"
    :style="{ backgroundImage: `url(${assetUrl}${article.cover.url})` }"
    @mouseenter="startHover"
    @mouseleave="endHover"
  >
    <NuxtLink :to="`blog/${article.slug}`" class="card__link">
      <div class="card__content-title">
        <h2 class="card__title">{{ article.title }}</h2>
      </div>
      <div class="card__content-description">
        <p class="card__description">{{ desc }}</p>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup>
import { getJapaneseWord, japaneseToWeapon } from '@/lib/weaponsAnimation.js'
const { assetUrl } = useAppConfig()
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})
const desc = ref(getJapaneseWord(props.article.description))

function startHover() {
  japaneseToWeapon(
    desc,
    props.article.description,
    props.article.description.length
  )
}

function endHover() {
  desc.value = getJapaneseWord(props.article.description)
}
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

      .card__content-description {
        visibility: visible;
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
  flex: 1.5;
  background-color: rgba(3, 160, 98, 0.6);
  padding: 20px 10px 20px 20px;
  width: 30%;
}

.card__title {
  font-family: var(--ftext);
  margin: 0;
  word-wrap: break-word;
}

.card__content-description {
  visibility: hidden;
  flex: 2;
  width: 70%;
  background-color: rgba(17, 24, 39, 0.6);
  padding: 15px 20px 10px 15px;
}

.card__description {
  margin: 0;
  font-size: 1rem;
}
</style>
