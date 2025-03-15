<template>
  <div class="experiences content">
    <h1 class="experiences__title">Experiences</h1>
    <ExperiencesList />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include tablet-landscape {
  @include animateTitle('.experiences__title');
}
</style>
