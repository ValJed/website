<script>
  import { onMount } from 'svelte'

  const height = 480
  let bgCanvas
  let modelCanvas

  let width
  let three

  onMount(async () => {
    const { Three } = await import('lib/three')
    const { generateMatrix } = await import('lib/matrix')

    generateMatrix(bgCanvas, width, height)

    three = new Three(modelCanvas, width, height)
  })
</script>

<div class="model-container" bind:clientWidth={width}>
  <canvas class="absolute" bind:this={bgCanvas} />
  <canvas class="absolute" bind:this={modelCanvas} />
</div>

<style lang="scss">
  .model-container {
    position: absolute;
    width: 30rem;
    height: 30rem;
    top: 2rem;
    right: 2rem;
  }
</style>
