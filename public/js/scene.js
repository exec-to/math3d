(function () { /*Модуль инициализации сцены и регистрации событий*/
    var graphScene = new SceneBuilder();

    graphScene.init();
    userapi.addGridHelper(graphScene.scene);
    graphScene.animate();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    graphScene.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    graphScene.renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    graphScene.transformControls.addEventListener( 'change', onTransformed );
    document.addEventListener('keydown', userapi.onSceneKeysHandle);
    document.addEventListener('keyup', userapi.onSceneKeysHandle);

    //Установить событие на изменение размера окна
    function onWindowResize() {
        graphScene.camera.aspect = graphScene.width / graphScene.height;
        graphScene.renderer.setSize(graphScene.width, graphScene.height);
        //camera.aspect = 0.5 * aspect;
        graphScene.camera.updateProjectionMatrix();

    }

    $('#addGraphVertexButton').click(function() {
        userapi.addGraphVertex(graphScene.scene, graphScene.objects);
    });

    function onDocumentMouseMove(event) {
        userapi.onSceneMouseMove.call(graphScene, event);
    }

    function onDocumentMouseDown(event) {
        userapi.onSceneMouseDown.call(graphScene, event);
    }

    function onDocumentMouseUp(event) {
        userapi.onSceneMouseUp.call(graphScene, event);
    }
    
    /*callback при перетаскивании объектов на сцене*/
    function onTransformed() {
        //***moveElementBounds(control.object, edit_v, lines, scene);
        //***updateMeshHelpText(control.object);
        graphScene.render();
    }
}());