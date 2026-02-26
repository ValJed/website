<template>
  <a
    class="link"
    :href="props.to"
    @click.prevent="linkTo"
  >
    <slot></slot>
  </a>
</template>

<script setup>
const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

function linkTo() {
  if (props.disabled) {
    return
  }

  router.push(props.to)
}
</script>

<style lang="scss">
.link {
  cursor: pointer;
}
</style>
