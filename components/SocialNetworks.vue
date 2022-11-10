<template>
  <div class="links">
    <ul class="menu">
      <li>
        <nuxt-link to="/">
          <SvgHell />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/experiences">
          <SvgSatan />
        </nuxt-link>
      </li>
    </ul>
    <ul class="networks">
      <li>
        <a href="https://github.com/ValJed" target="__blank">
          <SvgGithub />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/valentin-jeudy-585466112"
          target="__blank"
        >
          <SvgLinkedin />
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@include mobile-only {
  ul {
    margin: 0;
  }
}

.links {
  display: flex;
  width: 4rem;
  top: 5rem;
  position: fixed;
  align-items: center;
  width: 100%;
  z-index: 10;

  ul {
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
    justify-content: space-around;
  }

  @include tablet-landscape {
    position: inherit;
    display: inherit;
  }

  li {
    margin-bottom: 1rem;
  }

  .menu {
    @include tablet-landscape {
      height: 10.5rem;
      margin-top: 4rem;
      justify-content: space-between;
      flex-direction: column;
    }

    li {
      width: 3.2rem;
      height: 3.2rem;

      @include tablet-landscape {
        width: 4rem;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .networks {
    @include tablet-landscape {
      flex-direction: row;
      transform: translateY(-7.5rem);
      justify-content: center;
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
