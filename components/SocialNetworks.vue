<template>
  <div class="links">
    <ul class="menu">
      <li>
        <nuxt-link to="/">
          <!-- <img src="/images/hell.svg" alt="" /> -->
          <HellSvg />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/experiences">
          <SatanSvg />
        </nuxt-link>
      </li>
    </ul>
    <ul class="networks">
      <li>
        <a href="https://github.com/ValJed" target="__blank">
          <GithubSvg />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/valentin-jeudy-585466112"
          target="__blank"
        >
          <LinkedinSvg />
        </a>
        <!-- <img src="/static/svg/noun_linkedin_2045186.svg" alt=""> -->
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.links {
  width: 4rem;
  top: 5rem;
  position: fixed;
  right: 0.4rem;
  z-index: 10;

  @include tablet-landscape {
    position: inherit;
    width: 100%;
  }

  li {
    margin-bottom: 1rem;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @include tablet-landscape {
      height: 10.5rem;
      margin-top: 4rem;
    }

    li {
      width: 3.2rem;

      @include tablet-landscape {
        width: 4rem;
      }

      &:first-child {
        margin-bottom: 0.4rem;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .networks {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @include tablet-landscape {
      flex-direction: row;
      transform: translateY(-6.5rem);
    }

    li {
      width: 2rem;
      height: 2rem;

      @include tablet-landscape {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 2rem;
      }

      a {
        width: 100%;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
