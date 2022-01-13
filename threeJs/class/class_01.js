const init = () => {
    console.log(THREE.REVISION)


    // 创建场景
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)


    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const axes = new THREE.AxesHelper(20)
    scene.add(axes)


    const planeGeometry = new THREE.PlaneGeometry(60, 20)
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA})
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)


    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true})
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(-4, 3, 0)
    scene.add(cube)


    scene.add(plane)

    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    document.getElementById('scene').appendChild(renderer.domElement)

    renderer.render(scene, camera)

}


init()