<template>
  <SiteHeader v-if="containerSize" :is-mobile="isMobile" />
  <div ref="containerRef" class="error-page">
    <div class="error-page__matrix">
      <Matrix
        v-if="containerSize"
        :extended-matrix="true"
        :container-size="containerSize"
        :is-mobile="false"
      />
    </div>
    <div class="error-page__content">
      <div class="error-page__info">
        <h1 v-if="error.statusCode === '404'" class="error-page__title">
          Page not found
        </h1>
        <h1 v-else class="error-page__title">An error occurred</h1>

        <nuxt-link class="error-page__link" to="/">
          <SvgHell />
          <h2>Back Home</h2>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})
const containerRef = ref(null)
const containerSize = ref(0)
const isMobile = ref(false)

onMounted(() => {
  containerSize.value = containerRef.value.clientWidth

  if (window.innerWidth < 900) {
    isMobile.value = true
  }
})
</script>

<style lang="scss">
.error-page {
  &__content {
    position: relative;
    width: 100%;
    height: 100vh;
    width: 80%;
    margin: 0 auto;
    padding: 4rem 0 7rem;

    @include desktop {
      max-width: 1400px;
    }
  }

  &__matrix {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  &__info {
    position: absolute;
    top: 8rem;
    left: 0rem;
    z-index: 10;

    @include tablet-landscape {
      left: 4rem;
    }
  }

  &__title {
    position: relative;
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    font-family: $ftext;

    svg {
      width: 2rem;
      margin-right: 1rem;
    }
  }
}
</style>
