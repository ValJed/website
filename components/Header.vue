<template>
  <header>
    <div v-for="(jed, i) in jedArray" :key="i">
      <span>{{ jed }}</span>
    </div>
  </header>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

// import Node from '@/components/svg/Node.vue'
// import Vue from '@/components/svg/Vue.vue'
// import Mongodb from '@/components/svg/Mongodb.vue'

export default defineComponent({
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  setup({ isMobile }) {
    const jedArray = new Array(isMobile ? 6 : 10).fill('JED')

    return { jedArray }
  }
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
  height: 4rem;
  width: 200%;
  top: 0;
  left: -100%;
  background-color: $black;
  z-index: 5;
  animation: 14s linear 0s infinite normal forwards animateBanner;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    border: solid 4px $green;

    span {
      @include text-3xl;
      color: $green;
      font-size: 2rem;
      font-family: 'Martyr';
    }
  }
}
</style>
