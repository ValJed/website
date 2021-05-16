<script>
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  let el
  let width
  let height

  onMount(async () => {
    const { createScene } = await import('lib/three')

    createScene(el, width, 700)
  })
</script>

<div class="w-1/2" bind:clientWidth={width} bind:clientHeight={height}>
  <canvas bind:this={el} />
</div>

<!-- <style lang="scss">
</style> -->
