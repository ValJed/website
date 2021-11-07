<template>
  <div class="home">
    <div class="font-text">
      <h1 title="Full stack JS developer">
        Hi, I'm a full stack web developer.
      </h1>
      <p>
        I'm coding passionately since
        <span class="green">{{ seconds }}</span> seconds, approximately..
      </p>
      <p>
        Here are the weapons I love to fight with:
        <span class="green">{{ weapon }}</span>
      </p>
      <p class="interests">
        Also interested in <span>{{ interestsText }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import weaponsAnimation from '@/lib/weaponsAnimation'
import { DateTime } from 'luxon'
import { setTextsLoaded, getTextsLoaded } from '@/lib/textsLoaded'

const interests = 'Human Collaboration / Philosophy / Dark Arts'
const weapons = ['Vue', 'React', 'MongoDB', 'Nodejs', 'Linux']
const typingMin = 30
const typingMax = 200

export default defineComponent({
  setup() {
    const start = DateTime.local(2016, 4, 1, 9, 0)
    const seconds = ref(0)
    const weapon = ref(weapons[0])
    const textsLoaded = getTextsLoaded()
    const interestsText = ref(textsLoaded ? interests : '')

    onMounted(() => {
      computeDiffDate(start, seconds)

      setInterval(() => {
        computeDiffDate(start, seconds)
      }, 1000)

      setInterval(async () => {
        await weaponsAnimation(weapons, weapon)
      }, 3000)

      if (!textsLoaded) {
        setTimeout(() => {
          write(interestsText, interests)
        }, 2000)
      }
    })

    return {
      seconds,
      interests,
      weapon,
      interestsText
    }

    function computeDiffDate(start, sec) {
      const now = DateTime.now()

      const { values } = now.diff(start, ['seconds'])

      sec.value = Math.floor(values.seconds)
    }

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
  }
})
</script>

<style lang="scss" scoped>
@keyframes blink {
  0% {
    border-right-width: 2px;
  }

  50% {
    border-right-width: 0px;
  }
}

.interests > span {
  border-color: $green;
  animation: 1s infinite step-end blink;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  @include text-xl;

  .green {
    color: $green;
  }
}

h1 {
  @include text-2xl;

  margin-bottom: 1rem;
}

ul {
  li {
    margin-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>
