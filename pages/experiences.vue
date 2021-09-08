<template>
  <div class="experiences">
    <div class="Studies">
      <h2>Studies</h2>
      <ul>
        <li>
          <h3><span> in web editorial</span></h3>
          <span>2014 - 2016</span>
        </li>
        <li>
          <h3><span>Bachelor's degree in history</span></h3>
          <span>2010 - 2013</span>
        </li>
      </ul>
    </div>
    <div class="work">
      <h2>Work experiences</h2>
      <ul>
        <li>
          <h3><span>ApostropheCMS</span></h3>
          <span>November 2020 - Today</span>
          <p>
            Developing / improving ApostropheCMS core and modules. Setting up
            and working on ApostropheCMS projects for customers.
          </p>
        </li>
        <li>
          <h3><span>EasyLife</span></h3>
          <span>November 2019 - July 2020</span>
          <p>Realization of a business tool for a corporate concierge.</p>
          <ul>
            <li>
              Managing tickets, products, collaborators through a single
              application.
            </li>
            <li>
              Development of a customer application to allow employees to order
              products / services online.
            </li>
            <li>
              Creation of a chatbot that allow users to get information
              (contacts, hours, etc.) as well as to make requests
            </li>
            <li>Smart search system with Elasticsearch.</li>
          </ul>
        </li>
        <li>
          <h3><span>Michelin</span></h3>
          <span>May 2017 - November 2019</span>
          <p>
            multilingual sites conception for the different brands of the group.
          </p>
          <p>
            Delivering a large amount of website through our ApostropheCMS
            factory.
          </p>
          <p>
            Creation of cross sites applications (Dealer locator / Rating &
            reviews / Tyre selector)
          </p>
        </li>
        <li>
          <h3><span>Dedi Agency (internship)</span></h3>
          <span>April - September 2016</span>
          <p>Pixel perfect and responsive integrations for online shops.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('=============> lick <================')
    })
  }
})
</script>

<style lang="scss" scoped>
.experiences {
  padding-right: 1rem;
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

    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background-color: $green;
      bottom: -0.3rem;
    }
  }
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
}

// Animations

@keyframes growbar {
  0% {
    width: 0;
  }

  100% {
    width: 80%;
  }
}

.page-enter-active {
  h3 {
    > span {
      &:after {
        animation: 0.5s linear 0.1s backwards running growbar;
      }
    }
  }
}
</style>
