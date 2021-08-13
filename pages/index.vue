<template>
  <div>
    <div class="content">
      <div class="cube">
        <div class="face front">
          <div class="flex justify-center mb-10">
            <h1 title="JED" class="glitched">JED</h1>
          </div>
          <div class="font-text">
            <h2 title="Full stack JS developer">Full stack JS developer</h2>
            <p class="text-xl mb-4">Interested in</p>
            <Interests :texts="texts" />
          </div>
          <Description />
        </div>
        <!-- <div class="face back">Back</div>
        <div class="face right">Right</div>
        <div class="face left">Left</div>
        <div class="face top">Top</div>
        <div class="face bottom">Bottom</div> -->
      </div>
    </div>
    <Model />
    <SocialNetworks />
    <!-- <Player /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Model from '@/components/Model.vue'
import Interests from '@/components/Interests.vue'
import Description from '@/components/Description.vue'

// import Skills from '@/components/Skills.vue'

export default defineComponent({
  components: {
    Interests,
    Model,
    Description
    // Skills
  },
  setup() {
    const texts = [
      'Human Collaboration',
      'Open Source',
      'Improving Society',
      'Dark Arts'
    ]

    return {
      texts
    }
  }
})
</script>

<style lang="scss" scoped>
.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

h1 {
  @include text-3xl;

  font-family: BebasNeue;
  justify-content: center;
  margin-bottom: 2.5rem;
}

h2 {
  @include text-2xl;

  margin-bottom: 1rem;
}

.content {
  width: calc(100% - 32rem);
  padding: 2.5rem 5rem 0;
  perspective: 600px;
}

ul {
  li {
    margin-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}

.glitched {
  font-family: 'Fira Mono', monospace;
  animation: glitch 3s linear infinite;
}

@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }

  20%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }

  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

.glitched::before,
.glitched::after {
  content: attr(title);
  position: absolute;
  left: 0;
}

.glitched::before {
  animation: glitchTop 1s linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {
  2%,
  64% {
    transform: translate(2px, -2px);
  }

  4%,
  60% {
    transform: translate(-2px, 2px);
  }

  62% {
    transform: translate(13px, -1px) skew(-13deg);
  }
}

.glitched::after {
  animation: glitchBotom 1.5s linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom {
  2%,
  64% {
    transform: translate(-2px, 0);
  }

  4%,
  60% {
    transform: translate(-2px, 0);
  }

  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}
</style>
