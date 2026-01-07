<template>
  <canvas ref="modelCanvas" />
</template>

<script setup>
import { useLayoutState } from '@/composables/useLayoutState.js'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Box3,
  Object3D,
  Vector3
} from 'three'

const props = defineProps({
  containerSize: {
    type: Number,
    required: true
  }
})

const state = useLayoutState()
const modelCanvas = ref(null)
const mouseX = ref(null)
const mouseY = ref(null)
/* const model = ref(null) */
const pivot = ref(null)
const scene = ref(null)
const camera = ref(null)
const rendered = ref(null)
const height = ref(null)
const width = ref(null)
const centerX = ref(null)
const centerY = ref(null)

onMounted(async () => {
  const model = await generateModelAndScene(
    modelCanvas.value,
    props.containerSize
  )
  setPosition(model, height)
  setModelCenterAndPosition(model, height)
  requestIdleCallback(() => {
    pivot.value.add(model)
    scene.value.add(pivot.value)
    scene.value.add(gltf.scene)
  })

  animate()
})

async function generateModelAndScene(canvas) {
  width.value = canvas.clientWidth
  height.value = canvas.clientHeight

  init(canvas)

  scene.value = scene
  camera.value = camera

  const gltf = await loadModel()
  const model = gltf.scene.children[0]

  return model
}

function setPosition() {
  pivot.value = new Object3D()

  if (state.value.isMobile) {
    pivot.value.position.set(0, -75, 0)
  } else {
    pivot.value.position.set(0, 0, -900)
  }

  // Mouse position listener
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    mouseX.value = (clientX / window.innerWidth) * 100
    mouseY.value = (clientY / window.innerHeight) * 100
  })
}

function animate() {
  requestAnimationFrame(animate)

  const mobileMutations = ({ position, rotation }) => {
    // Before the mask has been fully loaded
    if (position.y < 0) {
      position.set(0, position.y + 2, 0)
    }

    if (state.value.openedMenu) {
      rotation.y = rotation.y > Math.PI * 2 ? 0 : rotation.y + 0.025
      return
    }

    if (rotation.y <= Math.PI * 2 && rotation.y !== 0) {
      rotation.y = rotation.y + 0.1 * (Math.PI * 2 - rotation.y)
    } else if (rotation.y !== 0) {
      rotation.y = 0
    }
  }

  const desktopMutations = () => {
    // Before the mask has been fully loaded
    if (pivot.value.position.z < -100) {
      pivot.value.position.set(0, 0, pivot.value.position.z + 20)
    } else if (mouseX.value && mouseY.value && !state.value.isMobile) {
      computePivot(centerX, centerY)
    }
  }

  if (!state.value.isMobile) {
    desktopMutations()
  } else {
    mobileMutations()
  }

  console.log('renderer', renderer)
  renderer.value.render(scene.value, camera.value)
}

function computePivot(centerX, centerY) {
  const destinationY = ((mouseX.value - centerX) / 100) * 1.2
  const destinationX = ((mouseY.value - centerY) / 100) * 1.2

  const maxDistance = 0.1

  if (pivot.value.rotation.y !== destinationY) {
    pivot.value.rotation.y = getDistance(pivot.value.rotation.y, destinationY)
  }
  if (pivot.value.rotation.x !== destinationX) {
    pivot.value.rotation.x = getDistance(pivot.value.rotation.x, destinationX)
  }

  function getDistance(position, destination) {
    const decrease = destination < position
    const diff = decrease ? position - destination : destination - position

    return diff > maxDistance
      ? decrease
        ? position - maxDistance
        : position + maxDistance
      : destination
  }
}

function init(canvas) {
  camera.value = new PerspectiveCamera(
    45,
    width.value / height.value,
    0.1,
    1000
  )
  scene.value = new Scene()
  renderer.value = new WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true
  })

  camera.position.set(0, 0, 200)
  camera.lookAt(0, 0, 0)

  scene.add(new AmbientLight(0x9b9898, 6))

  renderer.setSize(width.value, height.value)

  scene.value = scene
  camera.value = camera
  renderer.value = rendered
}

async function loadModel() {
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
  const loader = new GLTFLoader()
  return loader.loadAsync('/models/samuraiMask/scene.gltf')
}

function setModelCenterAndPosition(model, modelSize) {
  // Model position
  const box = new Box3().setFromObject(model)
  const { y } = box.getSize(new Vector3())
  model.position.set(0, -y, 0)

  // Model center
  const windowWith = window.innerWidth
  const windowHeight = window.innerHeight
  const centerOffsetY = modelSize / 2 + 32
  const centerOffsetX = modelSize / 2 + (windowWith - props.containerSize) / 2

  centerX.value = ((windowWith - centerOffsetX) / windowWith) * 100
  centerY.value = ((centerOffsetY + 300) / windowHeight) * 100
}
</script>

<style scoped lang="scss">
canvas {
  position: relative;
  width: 12rem;
  height: 100%;
  min-height: 10rem;
  left: 0;
  bottom: 2rem;

  @include tablet-landscape {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
  }
}
</style>
