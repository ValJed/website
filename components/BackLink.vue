<template>
  <div class="back-link__container">
    <div class="back-link__inner">
      <NuxtLink
        class="back-link"
        :to="slug"
      >
        <Spear />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import Spear from '@/components/svg/Spear.vue'
defineProps({
  slug: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss">
.back-link {
  display: inline-block;
  transform: rotate(-90deg);
  width: 8rem;
  height: 8rem;
}

.back-link__container {
  @include tablet-landscape {
    position: fixed;
    height: 5rem;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: var(--black);
  }
}

.back-link__inner {
  @include tablet-landscape {
    display: flex;
    align-items: center;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1400px;
  }
}
</style>
