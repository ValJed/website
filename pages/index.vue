<template>
  <div class="home">
    <div>
      <h1 title="Full stack JS developer">
        Hi, I'm a full stack web developer.
      </h1>
      <p>
        Here are the weapons I love to fight with: <br v-if="isMobile" />
        <span class="green">{{ weapon }}</span>
      </p>
      <p class="interests">
        Also interested in Human Collaboration <span>/</span> Philosophy
        <span>/</span> Dark Arts
      </p>
    </div>
  </div>
</template>

<script setup>
import weaponsAnimation from '@/lib/weaponsAnimation'
import { setTextsLoaded, getTextsLoaded } from '@/lib/textsLoaded'

const interests =
  'Also interested in Human Collaboration / Philosophy / Dark Arts'
const weapons = ['Vue', 'React', 'MongoDB', 'Nodejs', 'Linux', 'Docker', 'Rust']
const typingMin = 30
const typingMax = 150

const weapon = ref(weapons[0])
const textsLoaded = getTextsLoaded()
const interestsText = ref(textsLoaded ? interests : '')

defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
})

onMounted(() => {
  setInterval(async () => {
    await weaponsAnimation(weapons, weapon)
  }, 3000)

  if (!textsLoaded) {
    setTimeout(() => {
      write(interestsText, interests)
    }, 2000)
  }
})

async function write(text, interests) {
  setTextsLoaded()

  for (const char of interests) {
    await timeOut()

    text.value += char
  }

  function timeOut() {
    return new Promise((resolve) => {
      const random = Math.random() * (typingMax - typingMin + 1) + typingMin

      setTimeout(() => {
        resolve()
      }, random)
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
  color: $green;
}

.interests > span {
  color: $green;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  min-height: 2rem;
  @include text;

  @include tablet-landscape {
    @include text-xl;
  }

  .green {
    display: inline-block;
    height: 30px;
    color: $green;
    line-height: 1.3;
  }
}

h1 {
  @include text-xl;

  @include tablet-landscape {
    @include text-2xl;
  }
}

ul {
  li {
    margin-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>
