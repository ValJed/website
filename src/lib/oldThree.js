import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  DoubleSide,
  HemisphereLight,
  AmbientLight,
  Camera
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

let scene, camera, loader, renderer, model, controls

const createCube = () => {
  const geometry = new BoxGeometry()
  const material = new MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)

  cube.position.set(0, 0, 0)
  scene.add(cube)
}

const animate = () => {
  requestAnimationFrame(animate)
  model.rotation.z += 0.01
  // model.rotation.y += 0.01;
  renderer.render(scene, camera)
}

const addLight = () => {
  // const hemiLight = new HemisphereLight(0xffeeb1, 0x080820, 4)
  const light = new AmbientLight(0x404040, 7)
  scene.add(light)
}

const resize = (width, height) => {
  renderer.setSize(width, height)
  camera.position.set(0, 0, 5)
  camera.lookAt(0, 0, 0)
  // controls.update();
}

const init = (el, width, height) => {
  scene = new Scene()
  camera = new PerspectiveCamera(100, width / height, 0.1, 1000)
  loader = new GLTFLoader()
  renderer = new WebGLRenderer({
    antialias: true,
    // canvas: el
    // alpha: true
  })
  controls = new OrbitControls(camera, renderer.domElement)

}

const setModelInfos = (gltf) => {
  model = gltf.scene.children[0]
  model.scale.set(0.5, 0.5, 0.5)
  model.position.set(1, 1, 1)
}

export const createScene = (el, width, height) => {
  try {
    init(el, width, height)
    resize(width, height)
    createCube()
    // addLight()

    loader.load('models/samuraiMask/scene.gltf', (gltf) => {
      setModelInfos(gltf)
      scene.add(gltf.scene)

      renderer.render(scene, camera)

      controls.update()
      el.appendChild(renderer.domElement)
      // animate()
    })
  } catch (err) {
    console.error('Error when creatin scene: ', err)
  }
}

window.addEventListener('resize', resize)
