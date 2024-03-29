var SceneBuilder = (function namespace() { /*Конструктор сцены*/
    
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
    /**/
    this.plane = null;
    /*Объекты сцены, взаимодействующие с мышью*/
    this.objects = [];
    /*Выделенные вершины*/
    this.selectedVertex = [];
    /*Перемещаемый в данный момент объект*/
    this.transformer = null;
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
        this.plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000, 2000, 8, 8),
            new THREE.MeshBasicMaterial({ visible : false}));
        this. scene.add(this.plane);
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
    }/*function render()*/
}    
    
    
/*внутренние функции*/    
/* ... */  
Array.prototype.unSelect = Array.prototype.unSelect || function(callback) {
    while (this.length) {
        callback(this.pop());
    }
};

    
return Scene;
}());

//пространство имён для вызова пользовательских функций
var userapi = (function namespace() {
    
    /*Реализует статические методы (методы класса)*/
    var functions = {},
    /*объект клавиш клавиатуры*/
        keys = { /*keycodes https://learn.javascript.ru/keyboard-events*/
            ctrlState: false,
            shiftState : false,
            altState : false            
        };
    
    //Обработчик нажатия клавиш клавиатуры
    functions.onSceneKeysHandle = function(e) {
        /*ctrl is pressed*/
        keys.ctrlState = e.ctrlKey;
        //console.log('ctrl is pressed: ' + keys.ctrlState);
    };/*onSceneKeyDown*/
    
    //Добавить сетку на сцену
    functions.addGridHelper = function(scene) {
        var grid = new THREE.GridHelper(10, 1);
        grid.position.y = -5;
        grid.setColors(0xff4040, 0xcdb38b);
        scene.add(grid);
    };/*addGridHelper*/
    
    //Новая вершина графа
    functions.addGraphVertex = function (scene, objects) {
        /*TODO: implement counter*/
        description = "V" + "counter"; 
        var geometry = new THREE.SphereGeometry(0.5, 16, 16);
        var object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x32cd32 }));
        object.position.x = Math.random() * 10 - 5;
        object.position.y = Math.random() * 10 - 5;
        object.position.z = Math.random() * 10 - 5;
        object.name = description;
        object.links = []; /*DefineProperty? Рёбра, связанные с вершиной*/
        object.linkedWith = []; /*DefineProperty? Вершины, связанные с текущей*/
        object.isSelected = false;
        scene.add(object);
        objects.push(object);
    };/*addGraphVertex*/
    
    functions.addLinkGraphVertex = function (scene, selected) {
        //console.log(selected);
        var geometry,
            material,
            selectedCount = selected.length,
            link;
        
        if (selectedCount == 0) {
            
        }
        else if (selectedCount == 1) {
            
        }
        else if (selectedCount == 2) {
            selected[0].linkedWith = selected[0].linkedWith || [];
            selected[0].links = selected[0].links || [];
            selected[1].linkedWith = selected[1].linkedWith || [];
            selected[1].links = selected[1].links || [];
            
            /*Проверка наличия установленных связей*/
            if((selected[0].linkedWith.indexOf(selected[1]) != -1) &&
               (selected[1].linkedWith.indexOf(selected[0]) != -1)) {
                return;
            }
                
            geometry = new THREE.Geometry();
            material = new THREE.LineBasicMaterial({
					   color: 0x0000ff, linewidth: 5
					 });
            //Вершина 1
            geometry.vertices.push(new THREE.Vector3(
                selected[0].position.x,
                selected[0].position.y,
                selected[0].position.z ));
            //ссылка на слинкованную вершину
            selected[0].linkedWith.push(selected[1]);
            //Вершина 2
            geometry.vertices.push(new THREE.Vector3(
                selected[1].position.x,
                selected[1].position.y,
                selected[1].position.z ));
            selected[1].linkedWith.push(selected[0]);
            link = new THREE.Line( geometry, material );
            link.v0 = selected[0];
            link.v1 = selected[1];
            //link.name = "line"+scene.children.length;
            scene.add( link );
            selected[0].links.push(link);
            selected[1].links.push(link);
        }
        else if (selectedCount > 2) {
            functions.addLinkGraphVertex(scene, selected.slice(0,2)); //without: star reverse
            functions.addLinkGraphVertex(scene, selected.slice(0,1).concat(selected.slice(2))); //without: chain
            functions.addLinkGraphVertex(scene, selected.slice(1)); //without: star
        }
    };
    
    //*** Нужные инструкции
    functions.onSceneMouseMove = function (event) {
        event.preventDefault();
        this.mouse.x = ((event.clientX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.width) * 2 - 1;
        this.mouse.y = -((event.clientY - this.renderer.domElement.offsetTop) / this.renderer.domElement.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        if (this.SELECTED) {
            var intersects = this.raycaster.intersectObject(this.plane);
            if (intersects.length > 0) {
                this.SELECTED.position.copy(intersects[0].point.sub(this.offset));
                //переносим связанные линии
                functions.onVertexTransform(this.SELECTED);
                //***updateMeshHelpText(SELECTED);
            }
            return;
        }
        var intersects = this.raycaster.intersectObjects(this.objects);
        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0xff0000);
                this.plane.position.copy(this.INTERSECTED.position);
                this.plane.lookAt(this.camera.position);
            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
            this.INTERSECTED = null;
        }
    };/*onSceneMouseMove*/
    
    //var controller;
    functions.onSceneMouseDown = function(event) {
        
        //control.onPointerDown(event);
        event.preventDefault();
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.objects);
        if (intersects.length > 0) {
            this.orbitControls.enabled = false;
            this.SELECTED = intersects[0].object;
            this.transformer = this.SELECTED;
            this.transformControls.attach( this.transformer );
            //console.log(this.transformer);
            /*Визуально выделяем объекты*/
            if (keys.ctrlState) {
                if (this.selectedVertex.indexOf(this.transformer) == -1) {
                    this.selectedVertex.push(this.transformer);
                    this.transformer.isSelected = true;
                    this.transformer.material.color.setHex(0xfff400);
                }
                //console.log(this.selectedVertex);
            }
            else {
                //uncolorize
                this.selectedVertex.unSelect(function (vertex) {
                    vertex.material.color.setHex(0x32cd32);
                    vertex.isSelected = false;
                });
                this.selectedVertex.push(this.transformer);
                this.transformer.isSelected = true;
                this.transformer.material.color.setHex(0xfff400);
                //colorize
                
            }
            
            var intersects = this.raycaster.intersectObject(this.plane);
            if (intersects.length > 0) {
                this.offset.copy(intersects[0].point).sub(this.plane.position);
            }
        }
    };/*function onSceneMouseDown*/
    
    functions.onSceneMouseUp = function (event) {
        //control.onPointerUp(event);
        event.preventDefault();
        this.orbitControls.enabled = true;
        if (this.INTERSECTED) {
            this.plane.position.copy(this.INTERSECTED.position);
            this.SELECTED = null;
        }
    };/*onSceneMouseUp*/
    
    functions.onVertexTransform = function (graphVertex) {
        var linkeds = graphVertex.links.length || 0,
            index, //текущее ребро
            v, //индекс точки для текущей вершины
            pos,
            geo;
        
        if (linkeds == 0) {
            return;
        }
        
        pos = new THREE.Vector3(graphVertex.position.x, graphVertex.position.y, graphVertex.position.z);
        
        for (index = 0; index < linkeds; index += 1) {
            v = (graphVertex.links[index].v0 == graphVertex) ? 0 : 1;
            geo = graphVertex.links[index].geometry;
            geo.vertices[v] = pos;
            geo.verticesNeedUpdate = true;
        }
    };/*function onVertexTransform*/
    
    return functions;
}());