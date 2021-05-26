<script>
  import { onMount } from 'svelte'

  const height = 500
  let bgCanvas
  let modelCanvas

  let width
  let three

  onMount(async () => {
    const { Three } = await import('lib/three')
    const { default: generateMatrix } = await import('lib/matrix')

    generateMatrix(bgCanvas, width, height)

    three = new Three(modelCanvas, width, height)
  })
</script>

<div class="w-1/2 re  lative" bind:clientWidth={width}>
  <canvas class="absolute" bind:this={bgCanvas} />
  <canvas class="absolute" bind:this={modelCanvas} />
</div>

<style lang="scss">
  /* your styles go here */
</style>
