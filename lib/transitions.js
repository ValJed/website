export const matrixTransition = {
  name: 'matrix',
  duration: 500,
  beforeLeave() {
    this.$emit('extendMatrix')
  },
  afterLeave() {
    this.$emit('contractMatrix')
  }
}
