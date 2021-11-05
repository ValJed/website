<template>
  <div class="description">
    <p>
      I'm a passionate web developer since
      <span>{{ seconds }}</span> seconds, approximately..
    </p>
    <!-- <p>
      I love developing nice and clean apps / features from the UI to the API,
      working with nice people, and building great stuff.
    </p> -->
    <p>
      Here are the weapons I love to fight with: <span>{{ weapon }}</span>
    </p>
    <!-- <p>
      Playing everyday with <span>NodejS</span>, <span>Vue</span>,
      <span>Scss</span> and <span>MongoDB</span>.
    </p>
    <p>
      I also have more or less skills with <span>React</span>,
      <span>Svelte</span>, <span>graphQL</span>, <span>SQL</span>, and
      <span>Rust</span>.
    </p>
    <p>Familiar with <span>Linux</span> systems.</p> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { DateTime } from 'luxon'

// import Node from '@/components/svg/Node.vue'
// import Vue from '@/components/svg/Vue.vue'
// import Mongodb from '@/components/svg/Mongodb.vue'

const japaneseChars = '悪魔モンスター絶望悲しみ愛する平和エントピ'

export default defineComponent({
  props: {
    weapons: {
      type: Array,
      required: true
    }
  },
  setup({ weapons }) {
    const start = DateTime.local(2016, 4, 1, 9, 0)

    const seconds = ref(0)
    const weapon = ref(weapons[0])
    const iter = ref(0)

    onMounted(() => {
      computeDiffDate(start, seconds)

      setInterval(async () => {
        await computeWeapons(weapons, weapon)
        console.log('iter.value ===> ', iter.value)
      }, 3000)
    })

    return { seconds, weapon }

    function computeDiffDate(start, sec) {
      const now = DateTime.now()

      const { values } = now.diff(start, ['seconds'])

      sec.value = Math.floor(values.seconds)

      setTimeout(() => {
        computeDiffDate(start, sec)
      }, 1000)
    }

    async function computeWeapons(weapons, weapon) {
      const currentIndex = weapons.indexOf(weapon.value)
      const nextIndex =
        currentIndex + 1 !== weapons.length ? currentIndex + 1 : 0
      const nextWeapon = weapons[nextIndex]
      const longerWordLength =
        nextWeapon.length >= weapon.value.length
          ? nextWeapon.length
          : weapon.value.length
      // const longerWord =
      //   nextWeapon.length >= weapon.value.length ? nextWeapon : weapon.value

      await weaponToJapanese(weapon)

      await japaneseToWeapon(weapon, nextWeapon, longerWordLength)

      // await computeWeapons(weapons, weapon)

      async function weaponToJapanese(weapon) {
        const randomIndexes = getRandomIndexes(weapon.value.length)
        for (const index of randomIndexes) {
          const randomJapaneseIndex = Math.floor(
            Math.random() * (japaneseChars.length - 0 + 1) + 0
          )
          weapon.value = replaceChar(
            weapon.value,
            index,
            japaneseChars[randomJapaneseIndex]
          )

          await timeOut(50)
        }
      }

      async function japaneseToWeapon(weapon, nextWeapon, longerWordLength) {
        const randomIndexes = getRandomIndexes(longerWordLength)

        for (const index of randomIndexes) {
          weapon.value = replaceChar(weapon.value, index, nextWeapon[index])

          await timeOut(150)
        }
      }

      function getRandomIndexes(length) {
        return [...Array(length).keys()].sort(() =>
          Math.random() > 0.5 ? 1 : -1
        )
      }

      function replaceChar(word, index, char) {
        const splitted = word.split('')

        splitted[index] = char || ''

        return splitted.join('')
      }

      function timeOut(time) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, time)
        })
      }
    }
  }
})
</script>
<style scoped lang="scss">
.description {
  margin-top: 4rem;

  p {
    span {
      color: $green;
    }
  }
}
</style>
