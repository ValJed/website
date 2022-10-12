<template>
  <div class="skills">
    <h3 class="font-text">Skills</h3>
    <section>
      <span class="skills-title">Javascript</span>
      <ul>
        <li class="skill"><SvgNode /></li>
        <li class="skill"><SvgVue /></li>
        <li class="skill"><SvgReact /></li>
        <li class="skill">Jest</li>
      </ul>
    </section>
    <section>
      <span class="skills-title">Databases</span>
      <ul>
        <li class="skill"><SvgMongodb /></li>
        <li class="skill"><SvgGraphql /></li>
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

<style lang="scss" scoped>
.skills {
  &-title {
    @include text-xl;

    font-style: $fs1;
  }
}

.skill {
  width: 6rem;
  height: 6rem;
}
</style>
