<template>
  <div
    ref="content"
    class="content"
  >
    <ExperienceIntro
      :logo-img="experience.logoImg"
      :logo-title="experience.logoTitle"
      :period="experience.period"
      :stack="experience.stack"
    />
    <ContentRenderer
      class="content__experience"
      :value="experience"
    />
    <BackLink slug="/experiences" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getJapaneseWord } from '@/lib/weaponsAnimation.js'

const route = useRoute()
const { data: experience } = await useAsyncData('experience', () =>
  queryCollection('experiences').path(route.path).first()
)

const contentEl = useTemplateRef('content')
const linkText = ref(null)
const linkInterval = ref(null)
const links = ref([])

onMounted(() => {
  links.value = contentEl.value.querySelectorAll('a.link')
  links.value.forEach((link) => {
    link.addEventListener('mouseenter', animateLink)

    link.addEventListener('mouseleave', stopAnimateLink)
  })
})

onBeforeUnmount(() => {
  links.value.forEach((link) => {
    link.removeEventListener('mouseenter', animateLink)
    link.removeEventListener('mouseLeave', stopAnimateLink)
  })
})

function animateLink(e) {
  const target = e.currentTarget
  linkText.value = target.innerText

  setLinkText(target)
  linkInterval.value = setInterval(() => {
    setLinkText(target)
  }, 50)
}

function stopAnimateLink(e) {
  const target = e.currentTarget
  clearTimeout(linkInterval.value)
  target.innerText = linkText.value
  linkInterval.value = null
  linkText.value = null
}

function setLinkText(target) {
  const japWord = getJapaneseWord(target.innerText)
  target.innerText = japWord
}
</script>

<style scoped lang="scss">
.work {
  position: relative;
}

.description {
  margin-top: 4rem;

  @include tablet-landscape {
    margin-top: 3rem;
    padding-bottom: 6rem;
  }
}

.stack {
  color: var(--green);

  :deep(span) {
    color: #fff;
  }
}

.link {
  color: var(--green);
}

@include tablet-landscape {
  @include animateTitle('.logo');
}
</style>
