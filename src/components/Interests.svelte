<script>
  import { onMount } from 'svelte'

  const listElems = []
  // your script goes here
  export let texts

  onMount(() => {
    write(listElems)
  })

  function write(listElems) {
    listElems.forEach((el, i) => {
      el.classList.add('active')
      console.log('el ===> ', el)
      console.log('i ===> ', i)
    })
  }
</script>

<ul class="interests-list text-xl">
  {#each texts as text, i}
    <li class="active" bind:this={listElems[i]} />
  {/each}
</ul>

<!-- markup (zero or more items) goes here -->
<style>
  .active {
    @apply border-green;

    animation: 1s infinite step-end blink;
  }

  @keyframes blink {
    0% {
      @apply border-r-2;
    }

    /* 50% {
      @apply border-r-0;
    } */

    50% {
      @apply border-r-0;
    }
  }
</style>
