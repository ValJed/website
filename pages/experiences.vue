<template>
  <div class="experiences">
    <div class="Studies">
      <h2>Studies</h2>
      <ul>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>Master in web editorial</span></span>
          </h3>
          <div class="xp-content">
            <span>2014 - 2016</span>
          </div>
        </li>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>Bachelor's degree in history</span></span>
          </h3>
          <div class="xp-content">
            <span>2010 - 2013</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="work">
      <h2>Work experiences</h2>
      <ul>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>ApostropheCMS</span></span>
          </h3>
          <div class="xp-content">
            <span>November 2020 - Today</span>
            <p>
              Developing / improving ApostropheCMS core and modules. Setting up
              and working on ApostropheCMS projects for customers.
            </p>
          </div>
        </li>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>EasyLife</span></span>
          </h3>
          <div class="xp-content">
            <span>November 2019 - July 2020</span>
            <p>Realization of a business tool for a corporate concierge.</p>
            <p>
              Managing tickets, products, collaborators through a single
              application.
            </p>
            <p>
              Development of a customer application to allow employees to order
              products / services online.
            </p>
            <p>
              Creation of a chatbot that allow users to get information
              (contacts, hours, etc.) as well as to make requests
            </p>
            <p>Smart search system with Elasticsearch.</p>
          </div>
        </li>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>Michelin</span></span>
          </h3>
          <div class="xp-content">
            <span>May 2017 - November 2019</span>
            <p>
              multilingual sites conception for the different brands of the
              group.
            </p>
            <p>
              Delivering a large amount of website through our ApostropheCMS
              factory.
            </p>
            <p>
              Creation of cross sites applications (Dealer locator / Rating &
              reviews / Tyre selector)
            </p>
          </div>
        </li>
        <li :class="{ show: showXp }">
          <h3>
            <span><span>Dedi Agency (internship)</span></span>
          </h3>
          <div class="xp-content">
            <span>April - September 2016</span>
            <p>Pixel perfect and responsive integrations for online shops.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const showXp = ref(false)

    onMounted(() => {
      setTimeout(() => {
        showXp.value = true
      }, 250)
    })

    return {
      showXp
    }
  }
})
</script>

<style lang="scss" scoped>
.experiences {
  padding: 0 1rem 4rem;
}

h2 {
  @include text-2xl;
  font-family: $ftitle;
  padding: 1.5rem 0;
}

h3 {
  @include text-2xl;
  font-family: $ftitle;
  margin-bottom: 0.7rem;

  > span {
    position: relative;
    padding-right: 3rem;

    > span {
      display: inline-block;
      position: relative;
      opacity: 0;
      transform: translateX(-1rem);
      transition: all 0.25s ease-in-out 0.25s;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 2px;
      width: 0%;
      background-color: $green;
      bottom: -0.3rem;
      transition: width 0.25s ease-in;
    }
  }
}

.xp-content {
  opacity: 0;
  transform: translateY(1rem);
  transition: all 0.25s ease-out 0.5s;
}

p,
li {
  @include text-sm;
  font-family: $ftext;
}

li {
  margin-bottom: 2rem;

  > span {
    @include text-sm;
    margin-bottom: 0.25rem;
  }

  &.show {
    h3 {
      > span {
        > span {
          opacity: 1;
          transform: translateX(0);
        }

        &:after {
          width: 100%;
        }
      }
    }

    .xp-content {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// Animations

// @keyframes showListItem {
// }

// @keyframes growbar {
//   0% {
//     width: 0;
//   }

//   100% {
//     width: 80%;
//   }
// }

// .page-enter-active {
//   h3 {
//     > span {
//       &:after {
//         animation: 0.5s linear 0.1s backwards running growbar;
//       }
//     }
//   }
// }
</style>
