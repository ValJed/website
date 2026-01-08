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
const modelCanvas = useTemplateRef('modelCanvas')

const height = ref(null)
const width = ref(null)
const mouseX = ref(null)
const mouseY = ref(null)
const centerX = ref(null)
const centerY = ref(null)

let pivot
let scene
/* let model */
let camera
let renderer

onMounted(async () => {
  initSceneAndCamera()
  const { model, gltfScene } = await loadModel()
  setPosition()
  setModelCenterAndPosition(model)
  console.log('centerX', centerX.value)
  console.log('centerY', centerY.value)
  insertModelInScene(model, gltfScene)

  animate()
})

function insertModelInScene(model, gltfScene) {
  /* requestIdleCallback(() => { */
  /* }) */
  pivot.add(model)
  scene.add(pivot)
  scene.add(gltfScene)
}

function setPosition() {
  pivot = new Object3D()

  if (state.value.isMobile) {
    pivot.position.set(0, -75, 0)
  } else {
    pivot.position.set(0, 0, -900)
  }

  // Mouse position listener
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    mouseX.value = (clientX / window.innerWidth) * 100
    mouseY.value = (clientY / window.innerHeight) * 100
  })
}

function animate() {
  requestAnimationFrame(animate)

  const mobileMutations = () => {
    // Before the mask has been fully loaded
    if (pivot.position.y < 0) {
      pivot.position.set(0, pivot.position.y + 2, 0)
    }

    if (state.value.openedMenu) {
      pivot.rotation.y =
        pivot.rotation.y > Math.PI * 2 ? 0 : pivot.rotation.y + 0.025
      return
    }

    if (pivot.rotation.y <= Math.PI * 2 && pivot.rotation.y !== 0) {
      pivot.rotation.y =
        pivot.rotation.y + 0.1 * (Math.PI * 2 - pivot.rotation.y)
    } else if (pivot.rotation.y !== 0) {
      pivot.rotation.y = 0
    }
  }

  const desktopMutations = () => {
    // Before the mask has been fully loaded
    if (pivot.position.z < -100) {
      pivot.position.set(0, 0, pivot.position.z + 20)
    } else if (mouseX.value && mouseY.value && !state.value.isMobile) {
      computePivot()
    }
  }

  if (!state.value.isMobile) {
    desktopMutations()
  } else {
    mobileMutations()
  }

  renderer.render(scene, camera)
}

function computePivot() {
  const destinationY = ((mouseX.value - centerX.value) / 100) * 1.2
  const destinationX = ((mouseY.value - centerY.value) / 100) * 1.2

  const maxDistance = 0.1

  if (pivot.rotation.y !== destinationY) {
    pivot.rotation.y = getDistance(pivot.rotation.y, destinationY)
  }
  if (pivot.rotation.x !== destinationX) {
    pivot.rotation.x = getDistance(pivot.rotation.x, destinationX)
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

function initSceneAndCamera() {
  width.value = modelCanvas.value.clientWidth
  height.value = modelCanvas.value.clientHeight
  camera = new PerspectiveCamera(45, width.value / height.value, 0.1, 1000)
  scene = new Scene()
  renderer = new WebGLRenderer({
    antialias: true,
    canvas: modelCanvas.value,
    alpha: true
  })

  camera.position.set(0, 0, 200)
  camera.lookAt(0, 0, 0)

  scene.add(new AmbientLight(0x9b9898, 6))

  renderer.setSize(width.value, height.value)
}

async function loadModel() {
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync('/models/samuraiMask/scene.gltf')

  return {
    model: gltf.scene.children[0],
    gltfScene: gltf.scene
  }
}

function setModelCenterAndPosition(model, modelSize) {
  console.log('modelSize', modelSize)
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
