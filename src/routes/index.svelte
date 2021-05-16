<script context="module">
  export const prerender = true
</script>

<script>
  import Model from '@/Model.svelte'
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="container mx-auto">
  <section>
    <div class="w-1/2">
      <h1 class="text-center text-5xl font-title mb-4">Jed</h1>
      <h2 class="text-lg font-text">
        Full stack Web developer Interested in
        <p>* Open source</p>
        <p>* Human collaboration</p>
        <p>* Improving society</p>
        <p>* Self governance</p>
      </h2>
    </div>
    <Model />
  </section>
</div>

<style lang="scss">
  section {
    @apply flex items-start;
  }
</style>
