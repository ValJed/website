import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Box3,
  Object3D,
  Vector3
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const generateModel = async (canvas, width, height) => {
  let mouseX
  let mouseY

  const { scene, renderer, camera } = init(canvas, width, height)
  // const controls = new OrbitControls(camera, renderer.domElement)

  const { model, gltfScene } = await loadModel()

  const { centerX, centerY } = setModelCenterAndPosition(model, height)

  const pivot = new Object3D()

  pivot.add(model)
  scene.add(pivot)
  scene.add(gltfScene)

  pivot.position.set(0, 0, -900)

  // Mouse position listener
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    mouseX = (clientX / window.innerWidth) * 100
    mouseY = (clientY / window.innerHeight) * 100
  })

  animate(pivot, renderer, scene, camera, { centerX, centerY, mouseX, mouseY })

  function animate() {
    requestAnimationFrame(animate)

    if (pivot.position.z < -100) {
      pivot.position.set(0, 0, pivot.position.z + 20)
    } else if (mouseX && mouseY) {
      pivot.rotation.y = ((mouseX - centerX) / 100) * 1.2
      pivot.rotation.x = ((mouseY - centerY) / 100) * 1.2
    }

    renderer.render(scene, camera)
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

  // Camera setting
  camera.position.set(0, 0, 200)
  camera.lookAt(0, 0, 0)

  // Light
  scene.add(new AmbientLight(0x9b9898, 6))

  renderer.setSize(width, height)

  return {
    scene,
    camera,
    renderer,
  }
}

function setModelCenterAndPosition(model, height) {
  // Mode position
  const box = new Box3().setFromObject(model)
  const { y } = box.getSize(new Vector3())
  model.position.set(0, -y, 0)

  // Model center
  const windowWith = window.innerWidth
  const windowHeight = window.innerHeight
  const centerOffset = height / 2 + 32

  return {
    centerX: ((windowWith - centerOffset) / windowWith) * 100,
    centerY: ((centerOffset + 300) / windowHeight) * 100
  }
}

function loadModel() {
  const loader = new GLTFLoader()

  return new Promise((resolve, reject) => {
    loader.load('/models/samuraiMask/scene.gltf', (gltf) => {
      const [model] = gltf.scene.children

      if (model) {
        resolve({ model, gltfScene: gltf.scene })
      }
    })
  })
}
