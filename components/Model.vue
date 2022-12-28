<template>
  <canvas ref="modelCanvas" />
</template>

<script setup>
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
  isMobile: {
    type: Boolean,
    required: true
  },
  containerSize: {
    type: Number,
    required: true
  },
  extendedMatrix: {
    type: Boolean,
    required: true
  }
})

const modelCanvas = ref(null)
const mouseX = ref(null)
const mouseY = ref(null)

onMounted(async () => {
  await generateModel(modelCanvas.value, props.containerSize)
})

async function generateModel(canvas, containerSize) {
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  const { scene, renderer, camera } = init(canvas, width, height)

  const { model, gltfScene } = await loadModel()

  const { centerX, centerY } = setModelCenterAndPosition(
    model,
    height,
    containerSize
  )

  const pivot = new Object3D()

  pivot.add(model)
  scene.add(pivot)
  scene.add(gltfScene)

  if (props.isMobile) {
    pivot.position.set(0, -75, 0)
  } else {
    pivot.position.set(0, 0, -900)
  }

  // Mouse position listener
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    mouseX.value = (clientX / window.innerWidth) * 100
    mouseY.value = (clientY / window.innerHeight) * 100
  })

  animate()

  function animate() {
    requestAnimationFrame(animate)

    const mobileMutations = ({ position, rotation }) => {
      if (position.y < 0) {
        position.set(0, position.y + 2, 0)
      } else if (props.extendedMatrix && rotation.z > -0.2) {
        rotation.z = rotation.z - 0.002
      } else if (!props.extendedMatrix && rotation.z < 0) {
        rotation.z = rotation.z + 0.01
      }
    }

    const desktopMutations = (p) => {
      // Before the mask has been fully loaded
      if (p.position.z < -100) {
        pivot.position.set(0, 0, pivot.position.z + 20)
      } else if (mouseX.value && mouseY.value && !props.isMobile) {
        computePivot(pivot, centerX, centerY)
      }
    }

    if (!props.isMobile) {
      desktopMutations(pivot)
    } else {
      mobileMutations(pivot)
    }

    renderer.render(scene, camera)
  }
}

function computePivot(pivot, centerX, centerY) {
  const destinationY = ((mouseX.value - centerX) / 100) * 1.2
  const destinationX = ((mouseY.value - centerY) / 100) * 1.2

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

function init(canvas, width, height) {
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000)
  const scene = new Scene()
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true
  })

  camera.position.set(0, 0, 200)
  camera.lookAt(0, 0, 0)

  scene.add(new AmbientLight(0x9b9898, 6))

  renderer.setSize(width, height)

  return {
    scene,
    camera,
    renderer
  }
}

async function loadModel() {
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
  const loader = new GLTFLoader()

  return new Promise((resolve) => {
    loader.load('/models/samuraiMask/scene.gltf', (gltf) => {
      resolve({
        gltfScene: gltf.scene,
        model: gltf.scene.children[0]
      })
    })
  })
}

function setModelCenterAndPosition(model, modelSize, containerSize) {
  // Model position
  const box = new Box3().setFromObject(model)
  const { y } = box.getSize(new Vector3())
  model.position.set(0, -y, 0)

  // Model center
  const windowWith = window.innerWidth
  const windowHeight = window.innerHeight
  const centerOffsetY = modelSize / 2 + 32
  const centerOffsetX = modelSize / 2 + (windowWith - containerSize) / 2

  return {
    centerX: ((windowWith - centerOffsetX) / windowWith) * 100,
    centerY: ((centerOffsetY + 300) / windowHeight) * 100
  }
}
</script>

<style scoped lang="scss">
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: -4.5rem;

  @include tablet-landscape {
    bottom: 0;
  }
}
</style>
