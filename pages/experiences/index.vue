<template>
  <div class="experiences content">
    <h1>Experiences</h1>
    <ul v-if="!pending">
      <li v-for="xp in experiences" :key="xp.id">
        <NuxtLink :to="`experiences/${xp.title}`">
          <div>
            <img v-if="xp.logo?.url" :src="xp.logo.url" :alt="xp.title" />
            <span v-if="xp.logoTitle">{{ xp.logoTitle }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { data: experiences, pending } = await useAsyncData('experiences', () =>
  $api('/experiences?populate=*')
)
</script>

<style lang="scss" scoped>
@keyframes shadow {
  0% {
    box-shadow: -7px -7px 25px var(--green);
  }
  50% {
    box-shadow: 7px 5px 25px var(--green);
  }
  100% {
    box-shadow: -7px -7px 25px var(--green);
  }
}

.experiences {
  ul {
    position: relative;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, auto);
    height: calc(100% - 132px);
    padding-right: 20px;

    @include tablet-landscape {
      padding: 0 2rem 2rem 2rem;
    }

    @include desktop {
      grid-template-columns: repeat(2, auto);
    }
  }

  li {
    border-radius: 50px;
    height: 6rem;

    @include tablet-landscape {
      &:hover {
        animation: shadow 2s linear 0s infinite running forwards;
      }
    }

    > a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      display: block;
      min-height: 2.5rem;
      max-height: 4rem;
      max-width: 13rem;
      height: auto;

      @include desktop {
        max-height: 5rem;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 1.5rem;
        font-family: Inter, 'sans-serif';
        margin-left: 0.5rem;
      }
    }
  }
}

h2 {
  @include text-2xl;
  font-family: var(--ftitle);
  padding: 1.5rem 0;
}

// Anims
@include tablet-landscape {
  .v-enter-active {
    h1 {
      animation: 0.5s ease-in-out 0s 1 normal both titleEnterAnim;
    }
  }

  .v-leave-active {
    h1 {
      animation: 0.5s ease-in-out 0s 1 normal forwards titleLeaveAnim;
    }
  }
}

@keyframes titleLeaveAnim {
  25% {
    transform: translateX(2rem);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
