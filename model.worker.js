self.addEventListener('message', async () => {
  const { GLTFLoader } = await import(
    'three/examples/jsm/loaders/GLTFLoader'
  )
  const loader = new GLTFLoader()

  loader.load('/models/samuraiMask/scene.gltf', (gltf) => {
    const [model] = gltf.scene.children

    if (model) {
      postMessage({ model, gltfScene: gltf.scene })
    }
  })
})
