var graphScene = new SceneBuilder();

graphScene.init();
graphScene.animate();
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    graphScene.camera.aspect = graphScene.width / graphScene.height;
    graphScene.camera.updateProjectionMatrix();
    graphScene.renderer.setSize(graphScene.width, graphScene.height);
}