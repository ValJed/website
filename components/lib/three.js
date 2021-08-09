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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Samourai {
  constructor(canvas, width, height) {
    this.init(canvas, width, height)

    this.camera.position.set(0, 0, 200)
    this.camera.lookAt(0, 0, 0)

    this.setModelCenter(height)
    this.addLight()
    this.getMousePosition()

    this.loadModel(() => {
      this.animate()
    })
  }

  init(canvas, width, height) {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, width / height, 0.1, 1000)
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true
    })
    this.cubes = []
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.renderer.setSize(width, height)
  }

  setModelCenter(height) {
    const bodyWidth = document.body.offsetWidth
    const bodyHeigh = document.body.offsetHeight

    const centerOffset = height / 2 + 32

    this.modelCenterX = ((bodyWidth - centerOffset) / bodyWidth) * 100
    this.modelCenterY = ((centerOffset + 300) / bodyHeigh) * 100
  }

  loadModel(cb) {
    this.loader = new GLTFLoader()

    this.loader.load('/models/samuraiMask/scene.gltf', (gltf) => {
      this.model = gltf.scene.children[0]

      // Getting size of model to position it (only y used)
      const box = new Box3().setFromObject(this.model)

      const { y } = box.getSize(new Vector3())

      this.model.position.set(0, -y, -30)
      this.pivot = new Object3D()

      this.pivot.add(this.model)
      this.scene.add(this.pivot)
      this.scene.add(gltf.scene)

      cb()
    })
  }

  getMousePosition() {
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mouseX = (clientX / document.body.offsetWidth) * 100
      this.mouseY = (clientY / document.body.offsetHeight) * 100
    })
  }

  followMouse() {
    if (this.mouseX && this.mouseY) {
      this.pivot.rotation.y = ((this.mouseX - this.modelCenterX) / 100) * 1.2
      this.pivot.rotation.x = ((this.mouseY - this.modelCenterY) / 100) * 1.2
    }
  }

  addLight() {
    // const hemiLight = new HemisphereLight(0xffeeb1, 0x080820, 4)
    this.scene.add(new AmbientLight(0x9b9898, 7))
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    this.followMouse()
    this.renderer.render(this.scene, this.camera)
  }
}
