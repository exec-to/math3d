var graphScene = new SceneBuilder();

graphScene.init();
addGridHelper(graphScene.scene);
graphScene.animate();

window.addEventListener('resize', onWindowResize, false);

//Установить событие на изменение размера окна
function onWindowResize() {
    graphScene.camera.aspect = graphScene.width / graphScene.height;
    graphScene.renderer.setSize(graphScene.width, graphScene.height);
    //camera.aspect = 0.5 * aspect;
    graphScene.camera.updateProjectionMatrix();
    
}


//Добавить сетку на сцену
function addGridHelper(scene) {
    var grid = new THREE.GridHelper(10, 1);
    grid.position.y = -5;
    grid.setColors(0xff4040, 0xcdb38b);
    scene.add(grid);
    
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000, 8, 8),
        new THREE.MeshBasicMaterial({ visible : false})
    );
    scene.add(plane);

    console.log("addGridHelper executed");    
}

