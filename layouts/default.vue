<template>
  <div>
    <SiteHeader :is-mobile="isMobile" />
    <div ref="containerRef" class="container">
      <slot />
      <!-- <NuxtPage -->
      <!--   class="content" -->
      <!--   @extend-matrix="extendMatrix" -->
      <!--   @contract-matrix="contractMatrix" -->
      <!-- /> -->
      <!-- <div class="content"> -->
      <!--   <router-view v-slot="{ Component }"> -->
      <!--     <transition -->
      <!--       name="matrix" -->
      <!--       mode="out-in" -->
      <!--       :css="false" -->
      <!--       @before-leave="extendMatrix" -->
      <!--       @after-leave="contractMatrix" -->
      <!--     > -->
      <!--       <component :is="Component" /> -->
      <!--     </transition> -->
      <!--   </router-view> -->
      <!-- </div> -->

      <aside class="sidebar">
        <div class="model-container">
          <Matrix
            v-if="containerSize"
            :extended-matrix="extendedMatrix"
            :container-size="containerSize"
            :is-mobile="isMobile"
          />
          <!-- <Model v-if="!isMobile" :container-size="containerSize" /> -->
        </div>
        <SocialNetworks />
      </aside>
    </div>
  </div>
</template>

<script setup>
const isMobile = ref(false)
const extendedMatrix = ref(false)
const containerRef = ref(null)
const containerSize = ref(0)

/* const extendMatrix = () => { */
/*   console.log('extend matrix') */
/*   extendedMatrix.value = true */
/* } */
/**/
/* const contractMatrix = () => { */
/*   console.log('contract matrix') */
/*   extendedMatrix.value = false */
/* } */

onMounted(() => {
  if (window.innerWidth < 900) {
    isMobile.value = true
  }

  containerSize.value = containerRef.value.clientWidth
  console.log('size value: ', containerSize.value)

  // resize()
})

// function resize() {
//   let timeout = null

//   window.onresize = () => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }

//     timeout = setTimeout(() => {
//       containerSize.value = containerRef.value.clientWidth
//       timeout = null

//       console.log('containerSize.value ===> ', containerSize.value)
//     }, 500)
//   }
// }
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  background-color: red;
  matrix-container {
    transition: all 0.5s;
  }
}
.page-enter-from,
.page-leave-to {
  matrix-container {
    opacity: 0;
    filter: blur(1rem);
  }
}

.container {
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding-top: 6rem;
  min-height: 100vh;

  @include tablet-landscape {
    display: flex;
  }

  @include desktop {
    max-width: 1400px;
  }
}

.content {
  position: relative;
  padding-bottom: 3rem;
  flex-grow: 1;
  z-index: 0;
  padding: 7rem 1rem 2rem 0;
  /* min-height: calc(100vh - 4rem); */
  min-height: 50vh;

  @include tablet-landscape {
    padding: 0;
  }

  @include desktop {
    width: calc(1400px - 20rem);
  }
}

.sidebar {
  position: fixed;
  /* width: 100%; */
  height: 5rem;
  right: 0;
  top: 4rem;

  @include tablet-landscape {
    position: -webkit-sticky;
    position: sticky;
    top: 6rem;
    flex-shrink: 0;
    width: 20rem;
    flex-shrink: 0;
  }
}

.model-container {
  position: relative;
  width: 100%;

  @include tablet-landscape {
    height: 20rem;
  }
}
</style>
