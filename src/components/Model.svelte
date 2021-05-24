<script>
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  let bgCanvas
  let modelCanvas

  let width
  let height
  let three

  onMount(async () => {
    const { Three } = await import('lib/three')
    const { default: generateMatrix } = await import('lib/matrix')

    generateMatrix(bgCanvas, width, 500)

    three = new Three(modelCanvas, width, 500)
  })
</script>

<div class="w-1/2 relative" bind:clientWidth={width}>
  <canvas class="absolute" bind:this={bgCanvas} />
  <canvas class="absolute" bind:this={modelCanvas} />
</div>

<style lang="scss">
  /* your styles go here */
</style>
