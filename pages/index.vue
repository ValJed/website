<template>
  <div>
    <div class="content">
      <div class="flex justify-center mb-10">
        <h1 title="JED" class="glitched text-5xl font-title">JED</h1>
      </div>
      <div class="font-text">
        <h2 title="Full stack JS developer" class="text-xl mb-4">
          Full stack JS developer
        </h2>
        <p class="text-xl mb-4">Interested in</p>
        <Interests :texts="texts" />
      </div>
      <Skills />
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
import Skills from '@/components/Skills.vue'

export default defineComponent({
  components: {
    Interests,
    Model,
    Skills
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

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

.content {
  width: calc(100% - 32rem);

  @apply pt-10 px-20;
}

ul {
  li {
    @apply ml-5 mb-2;
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
