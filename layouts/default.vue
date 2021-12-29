<template>
  <div>
    <Header />
    <div class="container">
      <!-- <div class="title">
      <h1 title="JED" class="glitched">JED</h1>
    </div> -->
      <Nuxt
        class="content"
        @extendMatrix="extendMatrix"
        @contractMatrix="contractMatrix"
      />
      <div class="model-container">
        <!-- <Matrix extended-matrix="extendedMatrix" /> -->
        <Model />
      </div>
      <!-- <Model :extended-matrix="extendedMatrix" />
      <SocialNetworks /> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Model from '@/components/Model.vue'

export default defineComponent({
  components: {
    Model
  },
  setup() {
    const extendedMatrix = ref(false)

    const extendMatrix = () => {
      extendedMatrix.value = true
    }

    const contractMatrix = () => {
      extendedMatrix.value = false
    }

    return {
      extendedMatrix,
      extendMatrix,
      contractMatrix
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 3rem;

  @include desktop {
    width: calc(100% - 28rem);
  }
}

.model-container {
  position: fixed;
  width: 20rem;
  height: 20rem;
  top: 0;
  right: 0;

  @include tablet-landscape {
    top: 6rem;
    right: 2rem;
  }

  @include desktop {
    width: 30rem;
    height: 30rem;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;

    &.matrix {
      width: 100vw;
      height: 100vh;
      top: 2rem;
      right: 5rem;

      @include tablet-landscape {
        top: 0;
        right: 0;
      }
    }

    &.mask {
      top: 0;
      right: 0;
    }
  }
}
</style>
