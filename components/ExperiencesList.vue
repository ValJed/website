<template>
  <ul v-if="experiences" class="experiences-list">
    <li
      v-for="{ id, slug, logo, logoTitle } in experiences.data"
      :key="id"
      class="experiences-list__item"
    >
      <NuxtLink :to="`experiences/${slug}`" class="experiences-list__item-link">
        <div class="experiences-list__item-content">
          <img
            v-if="logo?.url"
            :src="`${assetUrl}${logo.url}`"
            :alt="slug"
            class="experiences-list__item-img"
          />
          <span v-if="logoTitle" class="experiences-list__item-title">
            {{ logoTitle }}
          </span>
        </div>
      </NuxtLink>
    </li>
  </ul>
  <div v-else-if="pending">Loading...</div>
</template>

<script setup>
const { assetUrl } = useAppConfig()
const { data: experiences } = await useFetch('/api/experiences')
</script>

<style lang="scss" scoped>
@keyframes shadow {
  0% {
    box-shadow: -7px -7px 25px var(--green);
  }
  50% {
    box-shadow: 7px 5px 25px var(--green);
  }
  100% {
    box-shadow: -7px -7px 25px var(--green);
  }
}

.experiences-list {
  position: relative;
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

.experiences-list__item {
  border-radius: 50px;
  height: 6rem;

  @include tablet-landscape {
    &:hover {
      animation: shadow 2s linear 0s infinite running forwards;
    }
  }
}

.experiences-list__item-link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.experiences-list__item-img {
  display: block;
  min-height: 2.5rem;
  max-height: 4rem;
  max-width: 13rem;
  height: auto;

  @include desktop {
    max-height: 5rem;
  }
}

.experiences-list__item-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.experiences-list__item-title {
  font-size: 1.5rem;
  font-family: Inter, 'sans-serif';
  margin-left: 0.5rem;
}

h2 {
  @include text-2xl;
  font-family: var(--ftitle);
  padding: 1.5rem 0;
}
</style>
