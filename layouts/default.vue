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
      <Model :extended-matrix="extendedMatrix" />
      <SocialNetworks />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
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
</style>
