<script>
  import { onMount } from 'svelte'

  export let texts

  const listElems = []
  const min = 30
  const max = 200

  onMount(() => {
    write(listElems)
  })

  async function write(listElems) {
    for (const [index, el] of Object.entries(listElems)) {
      const i = parseInt(index, 10)
      el.classList.add('active')

      for (const char of texts[i]) {
        await timeOut()
        el.append(char)
      }

      if (i !== listElems.length - 1) {
        el.classList.remove('active')
      }
    }
  }

  function timeOut() {
    return new Promise((resolve, reject) => {
      const random = Math.random() * (max - min + 1) + min

      setTimeout(() => {
        resolve()
      }, random)
    })
  }
</script>

<ul class="pl-4 text-xl">
  {#each texts as text, i}
    <li class="my-4"><span bind:this={listElems[i]} /></li>
  {/each}
</ul>

<style lang="scss">
  :global(.active) {
    @apply border-green;

    animation: 1s infinite step-end blink;
  }

  @keyframes blink {
    0% {
      @apply border-r-2;
    }

    50% {
      @apply border-r-0;
    }
  }
</style>
