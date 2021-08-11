<template>
  <div class="skills">
    <h3 class="font-text">Skills</h3>
    <section>
      <span class="skills-title">Javascript</span>
      <ul>
        <li class="skill"><Node /></li>
        <li class="skill"><Vue /></li>
        <li class="skill"><React /></li>
        <li class="skill">Jest</li>
      </ul>
    </section>
    <section>
      <span class="skills-title">Databases</span>
      <ul>
        <li class="skill"><Mongodb /></li>
        <li class="skill"><Graphql /></li>
        <li class="skill">SQL</li>
      </ul>
    </section>
    <section>
      <span class="skills-title">Systems / Tools</span>
      <ul>
        <li class="skill">Linux</li>
        <li class="skill">Git</li>
        <li class="skill">Nginx</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Node from '@/components/svg/Node.vue'
import Vue from '@/components/svg/Vue.vue'
import React from '@/components/svg/React.vue'
import Mongodb from '@/components/svg/Mongodb.vue'
import Graphql from '@/components/svg/Graphql.vue'

export default defineComponent({
  components: {
    Node,
    Vue,
    React,
    Mongodb,
    Graphql
  },
  props: {
    texts: {
      type: Array,
      default: null
    }
  },
  setup() {
    // onMounted(() => {
    //   write(writtenTexts)
    // })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.skills {
  &-title {
    @include text-xl;

    font-style: $fs1;

    // background-color: $blue;
  }
}

.skill {
  width: 6rem;
  height: 6rem;

  svg {
  }
}
</style>
