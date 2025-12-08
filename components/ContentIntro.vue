<template>
  <div class="intro">
    <h1 class="intro__logo">
      <img
        v-if="logoImg"
        class="intro__logo-img"
        :src="logoImg"
        :alt="name"
      />
      <span
        v-if="logoTitle"
        class="intro__logo-title"
      >
        {{ logoTitle }}</span
      >
    </h1>
    <div class="intro__description">
      <p v-if="period">{{ period }}</p>
      <p class="intro__tags">
        <template
          v-for="(item, index) in tags"
          :key="index"
        >
          {{ item }}
          <span v-if="index < tags.length - 1"> / </span>
        </template>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logoImg: {
    type: String,
    default: null
  },
  logoTitle: {
    type: String,
    required: true
  },
  period: {
    type: String,
    default: null
  },
  tags: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
@include tablet-landscape {
  @include animateTitle('.intro__logo');
}

.intro__logo {
  display: flex;
  align-items: center;

  &-title {
    font-size: 1.5rem;
    font-weight: normal;
    font-family: Inter, 'sans-serif';
  }

  &-img {
    display: block;
    min-height: 2.5rem;
    max-height: 5rem;
    max-width: 13rem;
    height: auto;
    margin-right: 0.5rem;
  }
}

.intro__description {
  margin-top: 4rem;

  @include tablet-landscape {
    margin-top: 3rem;
  }
}

.intro__tags {
  color: var(--green);

  :deep(span) {
    color: #fff;
  }
}
</style>
