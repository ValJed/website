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
      I love developing nice and clean features from the UI to the API, working
      with nice people and building great stuff.
    </p>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { DateTime } from 'luxon'

export default defineComponent({
  setup() {
    const start = DateTime.local(2016, 4, 1, 9, 0)

    const dates = ref([])

    const computeDiffDate = (start) => {
      setInterval(() => {
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
      }, 1000)
    }

    computeDiffDate(start)

    return { dates }
  }
})
</script>
<style scoped lang="scss">
.description {
  p {
    span {
      color: $green;
    }
  }
}
</style>
