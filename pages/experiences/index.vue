<template>
  <div class="experiences content">
    <h1 class="experiences__title">Experiences</h1>
    <ExperiencesList />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include tablet-landscape {
  .v-enter-active {
    .experiences__title {
      animation: 0.5s ease-in-out 0s 1 normal both titleEnterAnim;
    }
  }

  .v-leave-active {
    .experiences__title {
      animation: 0.5s ease-in-out 0s 1 normal forwards titleLeaveAnim;
    }
  }
}

@keyframes titleLeaveAnim {
  25% {
    transform: translateX(2rem);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
