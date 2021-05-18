import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  AmbientLight,
  Box3
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Three {
  constructor(canvas, width, height) {
    this.init(canvas, width, height)
    this.camera.position.set(0, 0, 200)
    this.camera.lookAt(0, 0, 0)

    this.addLight()

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
      const { y } = new Box3().setFromObject(this.model).getSize();

      this.model.position.set(0, -y, -30)

      this.scene.add(gltf.scene)

      cb()
    })
  }

  addLight() {
    // const hemiLight = new HemisphereLight(0xffeeb1, 0x080820, 4)
    this.scene.add(new AmbientLight(0x9b9898, 7))
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    // this.cubes[0].rotation.y -= 0.01

    this.renderer.render(this.scene, this.camera)
  }
}
