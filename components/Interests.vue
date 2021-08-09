<template>
  <div class="interests">
    <ul class="pl-4 text-xl">
      <li v-for="(text, i) in writtenTexts" :key="i" class="my-4">
        <span :class="{ active: activeIndex === i }">{{ text.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    texts: {
      type: Array,
      default: null
    }
  },
  setup({ texts }) {
    const writtenTexts = texts.map(() => ref(''))
    const activeIndex = ref(0)
    const min = 30
    const max = 200

    onMounted(() => {
      write(writtenTexts)
    })

    return { writtenTexts, activeIndex }

    async function write(writtenTexts) {
      for (const [index, text] of texts.entries()) {
        activeIndex.value = index

        for (const char of text) {
          await timeOut()

          writtenTexts[index].value += char
        }
      }

      function timeOut() {
        return new Promise((resolve) => {
          const random = Math.random() * (max - min + 1) + min

          setTimeout(() => {
            resolve()
          }, random)
        })
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.interests {
  @apply mb-6;

  height: 10rem;
}

.active {
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
