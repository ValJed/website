import { getJapaneseWord } from '@/lib/weaponsAnimation.js'
import { useLayoutState } from '@/composables/useLayoutState.js'

export const useAnimateLink = (contentEl) => {
  const linkText = ref(null)
  const linkInterval = ref(null)
  const links = ref([])

  const state = useLayoutState()

  onMounted(() => {
    if (state.value.isMobile) {
      return
    }
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
}
