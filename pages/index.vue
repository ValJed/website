<template>
  <div class="container">
    <div class="title">
      <h1 title="JED" class="glitched">JED</h1>
    </div>
    <div ref="content" class="content">
      <div class="cube">
        <div class="face front">
          <div class="flex justify-center mb-10"></div>
          <div class="font-text">
            <h2 title="Full stack JS developer">Full stack JS developer</h2>
            <p class="text-xl mb-4">Interested in</p>
            <Interests :texts="texts" />
          </div>
          <Description />
        </div>
        <div class="face back">Back</div>
        <div class="face right">Right</div>
        <div class="face left">Left</div>
        <!-- <div class="face top">Top</div>
        <div class="face bottom">Bottom</div> -->
      </div>
    </div>
    <!-- <Model />
    <SocialNetworks /> -->
    <!-- <Player /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import Model from '@/components/Model.vue'
import Interests from '@/components/Interests.vue'
import Description from '@/components/Description.vue'

// import Skills from '@/components/Skills.vue'

export default defineComponent({
  components: {
    Interests,
    // Model,
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

    // TODO: add ref to content to get width, set attribute, and get it from css?
    // const contentSize = this.$ref

    return {
      texts
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(360deg);
  }
}

.content {
  width: calc(100% - 32rem);
  height: calc(100vh - 88px);
  perspective: 0;
  perspective-origin: 0 0;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  // transform: rotateY(5deg);
  animation: spin 10s infinite linear;

  .face {
    padding: 2.5rem 5rem 0;
    overflow-x: scroll;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.front {
  // transform: translateZ(50%);
  background-color: purple;
}
.back {
  transform: translateZ(-50%) rotateY(180deg);
  // background-color: orange;
}
.right {
  transform: rotateY(-270deg) translateX(50%);
  transform-origin: top right;
  background-color: cyan;
}
.left {
  transform: rotateY(270deg) translateX(-50%);
  transform-origin: center left;
  background-color: red;
}
// .top {
// 	transform: rotateX(-90deg) translateY(-100px);
// 	transform-origin: top center;
// }
// .bottom {
// 	transform: rotateX(90deg) translateY(100px);
// 	transform-origin: bottom center;
// }

@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

.title {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;

  h1 {
    @include text-3xl;

    width: calc(100% - 32rem);
    font-family: BebasNeue;
  }
}

h2 {
  @include text-2xl;

  margin-bottom: 1rem;
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
