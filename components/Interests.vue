<template>
  <div class="interests">
    <p class="text-xl mb-4">Interested in</p>
    <ul class="pl-4 text-xl">
      <li v-for="(text, i) in writtenTexts" :key="i">
        <span :class="{ active: activeIndex === i }">{{ text.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
/* import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api' */
/* import { setTextsLoaded, getTextsLoaded } from '@/lib/textsLoaded' */

const props = defineProps({
  texts: {
    type: Array,
    default: null
  },
  textsLoaded: {
    type: Boolean
  }
})
const textsLoaded = getTextsLoaded()

const writtenTexts = props.texts.map((text) => ref(textsLoaded ? text : ''))
const activeIndex = ref(textsLoaded.textsLoaded ? 3 : 0)
const min = 30
const max = 200

if (!props.textsLoaded) {
  onMounted(() => {
    write(writtenTexts)
  })
}

async function write(writtenTexts) {
  setTextsLoaded()

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
</script>

<style lang="scss" scoped>
.interests {
  margin-bottom: 1rem;
  height: 8rem;

  ul li {
    margin: 0.8rem 0;
  }
}

.active {
  border-color: $green;
  animation: 1s infinite step-end blink;
}

@keyframes blink {
  0% {
    border-right-width: 2px;
  }

  50% {
    border-right-width: 0px;
  }
}
</style>
