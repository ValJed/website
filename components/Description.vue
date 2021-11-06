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
import weaponsAnimation from '@/lib/weaponsAnimation'

// import Node from '@/components/svg/Node.vue'
// import Vue from '@/components/svg/Vue.vue'
// import Mongodb from '@/components/svg/Mongodb.vue'

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

    onMounted(() => {
      computeDiffDate(start, seconds)

      setInterval(async () => {
        await weaponsAnimation(weapons, weapon)
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
