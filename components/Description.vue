<template>
  <div class="description">
    <p>
      I'm a passionate web developer since
      <span>{{ dates.years }}</span> years,
      <span>{{ dates.months }}</span> months,
      <span>{{ dates.days }}</span> days, <span>{{ dates.hours }}</span> hours,
      <span>{{ dates.minutes }}</span> minutes and
      <span>{{ dates.seconds }}</span> seconds now.
    </p>
    <p>
      I love developing nice and clean apps / features from the UI to the API,
      working with nice people, and building great stuff.
    </p>
    <p>
      Playing everyday with <span>NodejS</span>, <span>Vue</span>,
      <span>Scss</span> and <span>MongoDB</span>.
    </p>
    <p>
      I also have more or less skills with <span>React</span>,
      <span>Svelte</span>, <span>graphQL</span>, <span>SQL</span>, and
      <span>Rust</span>.
    </p>
    <p>Familiar with <span>Linux</span> systems.</p>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { DateTime } from 'luxon'

// import Node from '@/components/svg/Node.vue'
// import Vue from '@/components/svg/Vue.vue'
// import Mongodb from '@/components/svg/Mongodb.vue'

export default defineComponent({
  // components: {
  //   Node,
  //   Vue,
  //   Mongodb
  // },
  setup() {
    const start = DateTime.local(2016, 4, 1, 9, 0)

    const dates = ref([])

    const computeDiffDate = (start) => {
      const now = DateTime.now()

      const { values } = now.diff(start, [
        'years',
        'months',
        'days',
        'hours',
        'minutes',
        'seconds'
      ])

      values.seconds = Math.floor(values.seconds)

      dates.value = values

      setTimeout(() => {
        computeDiffDate(start)
      }, 1000)
    }

    computeDiffDate(start)

    return { dates }
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
