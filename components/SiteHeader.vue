<template>
  <header>
    <div v-for="(jed, i) in jedArray" :key="i">
      <span>{{ jed }} </span>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
})

const jedArray = computed(() => {
  return new Array(props.isMobile ? 4 : 10).fill('JED')
})
</script>

<style scoped lang="scss">
@keyframes animateBanner {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(50%);
  }
}

header {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 3rem;
  width: 200%;
  top: 0;
  left: -100%;
  background-color: $black;
  z-index: 5;
  animation: 14s linear 0s infinite normal forwards animateBanner;

  @include tablet-landscape {
    height: 4rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    span {
      color: $green;
      font-size: 1.7rem;
      font-family: 'Martyr';

      @include tablet-landscape {
        font-size: 2rem;
      }
    }
  }
}
</style>
