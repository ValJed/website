import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Box3,
  Object3D,
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Three {
  constructor(canvas, width, height) {
    this.init(canvas, width, height)
    this.camera.position.set(0, 0, 200)
    this.camera.lookAt(0, 0, 0)

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
      canvas: canvas,
      alpha: true
    })
    this.cubes = []
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.renderer.setSize(width, height)
  }

  loadModel(cb) {
    this.loader = new GLTFLoader()

    this.loader.load('models/samuraiMask/scene.gltf', (gltf) => {
      this.model = gltf.scene.children[0]

      // Getting size of model to position it (only y used)
      const box = new Box3().setFromObject(this.model);

      const { y } = box.getSize()

      this.model.position.set(0, -y, -30)

      // this.pivot = new Group()
      this.pivot = new Object3D();

      // this.pivot.add(this.model)
      this.scene.add(this.pivot)
      this.pivot.add(this.model)
      this.scene.add(gltf.scene)

      cb()
    })
  }

  getMousePosition() {
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mouseX = clientX / window.innerWidth * 100
      this.mouseY = clientY / window.innerHeight * 100
    })
  }

  followMouse() {

    // 75% being the standard place for our model
    // the rotation should be at 0 when the mouse is at 75%
    if (this.mouseX && this.mouseY) {
      this.pivot.rotation.y = (this.mouseX - 70) / 100
      this.pivot.rotation.x = (this.mouseY - 50) / 100
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
