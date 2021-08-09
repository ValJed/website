<template>
  <div ref="modelContainer" class="model-container">
    <canvas ref="bgCanvas" class="absolute" />
    <canvas ref="modelCanvas" class="absolute" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const height = 480
    const width = ref(480)
    const modelContainer = ref(null)
    const bgCanvas = ref(null)
    const modelCanvas = ref(null)
    const three = ref(null)

    onMounted(async () => {
      width.value = modelContainer.value.clientWidth
      const { Samourai } = await import('./lib/three')
      const { generateMatrix } = await import('./lib/matrix')

      generateMatrix(bgCanvas.value, width.value, height)

      setTimeout(() => {
        three.value = new Samourai(modelCanvas.value, width.value, height)
      }, 1300)
    })

    return {
      modelContainer,
      bgCanvas,
      modelCanvas
    }
  }
})
</script>
<style scoped lang="postcss">
.model-container {
  position: absolute;
  width: 30rem;
  height: 30rem;
  top: 2rem;
  right: 2rem;
}
</style>
