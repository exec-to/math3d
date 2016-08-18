var graphScene = new SceneBuilder();

graphScene.init();
graphScene.addGridHelper(userapi.addGridHelper, graphScene.scene);
graphScene.animate();

window.addEventListener('resize', onWindowResize, false);

//Установить событие на изменение размера окна
function onWindowResize() {
    graphScene.camera.aspect = graphScene.width / graphScene.height;
    graphScene.renderer.setSize(graphScene.width, graphScene.height);
    //camera.aspect = 0.5 * aspect;
    graphScene.camera.updateProjectionMatrix();
    
}


