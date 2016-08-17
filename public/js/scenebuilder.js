var SceneBuilder = (function namespace() {
    
/*конструктор*/
function Scene() {
    
    /*Камера*/
    this.camera = null;
    /*HTML-контейнер, содержащий сцену*/
    this.container = null;
    /*Объект, хранящий THREE.Scene*/
    this.scene = null;
    /*Объект OrbitControls -- управление камерой*/
    this.orbitControls = null; /*controls*/
    /*Объект TransformControls -- управление перемещением объектов*/
    this.transformControls = null; /*control*/
    /*Объект mouse*/
    this.mouse = null;
    /*Смещение мыши*/
    this.offset = null;
    /*raycaster - отлавливает пересечение мыши с объектами на сцене*/
    this.raycaster = null;
    /*Объект, управляющий рендером сцены*/
    this.renderer = null;
    /*Освещение сцены*/
    this.light = null;
    /*Объект пересечения с мышью*/
    this.INTERSECTED = null;
    /*Объект, выбранный мышью*/
    this.SELECTED = null;
}
    
/*методы класса*/    
Scene.prototype = {
    constructor: Scene,
    /*Ширина сцены*/
    get width() { return window.innerWidth - 3; }, /*сделать getter*/
    /*Высота сцены*/
    get height() { return window.innerHeight - 3; },  /*сделать getter*/
    init: function() {
    this.mouse = new THREE.Vector2();
    this.offset = new THREE.Vector3();
    this.container = document.getElementById('WebGL-output'); /*jQuery попробовать*/
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.z = 20;
    this.camera.position.y = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.orbitControls = new THREE.OrbitControls(this.camera, this.container);
    this.scene = new THREE.Scene();
    this.light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.light.position.set(1, 1, 1).normalize();
    this.scene.add(this.light);
    this.transformControls = new THREE.TransformControls( this.camera, this.renderer.domElement );
    this.scene.add(this.transformControls);
    this.raycaster = new THREE.Raycaster();             
    //this.renderer.setClearColor(0xfffff0);
    this.renderer.setClearColor(0xb0cbd0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.sortObjects = false;
    this.container.appendChild(this.renderer.domElement);

    /*events*/
    //document.addEventListener('mousemove', onDocumentMouseMove, false);
    //this.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    //this.renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    //window.addEventListener('resize', onWindowResize, false);
    //this.transformControls.addEventListener( 'change', transformed );
    
}, /*function init()*/
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }, /*function animate()*/
    render: function() {
        this.transformControls.update();
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    }, /*function render()*/
}    
    
    
/*внутренние функции*/    
/* ... */    

    
return Scene;
}());