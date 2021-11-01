<template>
  <div>
    <Header />
    <div class="container">
      <!-- <div class="title">
      <h1 title="JED" class="glitched">JED</h1>
    </div> -->
      <Nuxt
        class="content"
        @extendMatrix="extendMatrix"
        @contractMatrix="contractMatrix"
      />
      <Model :extended-matrix="extendedMatrix" />
      <SocialNetworks />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'

export default defineComponent({
  components: {
    Header
  },
  setup() {
    const extendedMatrix = ref(false)

    const extendMatrix = () => {
      extendedMatrix.value = true
    }

    const contractMatrix = () => {
      extendedMatrix.value = false
    }

    return {
      extendedMatrix,
      extendMatrix,
      contractMatrix
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

.content {
  padding-bottom: 3rem;

  @include desktop {
    width: calc(100% - 28rem);
  }
}

.title {
  position: fixed;
  left: calc(50% - 1.5rem);
  top: 0;
  display: flex;
  justify-content: center;
  padding: 2rem 0 2.5rem 0;
  z-index: 5;

  // @include tablet-landscape {
  //   width: 100%;
  // }

  h1 {
    @include text-3xl;

    width: 3rem;
    font-family: $ftitle;
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
