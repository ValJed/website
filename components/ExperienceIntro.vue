<template>
  <div class="intro">
    <div class="intro__logo">
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
    </div>
    <div class="intro__description">
      <p>{{ period }}</p>
      <p class="intro__stack">
        <template
          v-for="(item, index) in stack"
          :key="index"
        >
          {{ item }}
          <span v-if="index < stack.length - 1"> / </span>
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
    required: true
  },
  stack: {
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
    font-family: Inter, 'sans-serif';
    margin-left: 0.5rem;
  }

  &-img {
    display: block;
    min-height: 2.5rem;
    max-height: 5rem;
    max-width: 13rem;
    height: auto;
  }
}

.intro__description {
  margin-top: 4rem;

  @include tablet-landscape {
    margin-top: 3rem;
  }
}

.intro__stack {
  color: var(--green);

  :deep(span) {
    color: #fff;
  }
}
</style>
