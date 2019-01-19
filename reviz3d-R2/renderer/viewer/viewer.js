import * as THREE from 'three';

import Sky from "./sky";
import Grid from "./grid";
import ViewerHelper from "./viewerHelper";

//internal ojbects
import PhysicalComponents from "./objects/PhysicalComponents";

import store, { toggleMenu, updateScene, updateSelectedObject } from "../store";

import svg_floorplan from "../svg/floorplan.svg";
//import { getBoundingBox } from "./utils";

var OrbitControls = require('./utils/OrbitControls.js')(THREE);
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var SVGLoader = require("./utils/SVGLoader");

var TransformControls = require("./utils/TransformControls")(THREE);

let defaultConfing = {
    antialias: true,
    fullScreen: true,
    width: 500,
    height: 300,
}

class Viewer {
    constructor(config = defaultConfing, antialias = true) {
        this.config = config;

        this.events = {
            onSelectObject: new Event("onSelectObject")
        };

        let { width, height, fullScreen } = this.config;

        this.scene = new THREE.Scene();

        if (fullScreen) {
            width = window.innerWidth;
            height = window.innerHeight;

            this.width = width;
            this.height = height;
        }

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

        this.camera.position.set(0, 100, -100);
        this.camera.lookAt(new THREE.Vector3());

        this.canvas = document.getElementById("3d-env");
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: antialias,
            alpha: false,
            //performance improvements
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
        });

        this.renderer.sortObjects = false;
        console.log('W', { width, height })
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Enable shadow rendering
        this.renderer.shadowMap.enabled = true;

        this.interactiveObjects = new THREE.Group();
        this.scene.add(this.interactiveObjects);

        //scene.add(cube);
        this.transformControl = new TransformControls(this.camera, this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.canvas);

        let sky = new Sky();
        this.scene.add(sky.getObject(THREE));

        //cubeview
        let viewerHelper = new ViewerHelper("viewer-helper", this.controls);

        this.controls.setPolarAngle(Math.PI * 0.25);
        this.controls.setAzimuthalAngle(Math.PI * 0.25);
        this.controls.update();

        var gridHelper = new Grid();//new THREE.GridHelper(100, 100, 0xaaaaaa, 0x666666);
        this.scene.add(gridHelper);

        //raycast
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED;
        this.INTERSECTED_box;
        this.INTERSECTED_selected;

        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('resize', this.onWindowResize, false);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);

        //tControl.addEventListener('change', this.animate);

        this.transformControl.addEventListener('mouseDown', (event) => {
            this.controls.enabled = false;
            viewerHelper.enabled = false;
        });

        this.transformControl.addEventListener('mouseUp', (event) => {
            this.controls.enabled = true;
            viewerHelper.enabled = true;
        });


        this.scene.add(this.transformControl);

        //this.interactiveObjects.add(this.cube);
        var cube2 = new THREE.Mesh(geometry, material);
        cube2.position.y = 12;
        this.interactiveObjects.add(cube2);

        /*testing loader*/

        // instantiate a loader
        var loader = new SVGLoader();

        // load a SVG resource
        loader.load(
            // resource URL
            svg_floorplan,
            // called when the resource is loaded
            (paths) => {

                var group = new THREE.Group();
                let boundBoxes = [];
                let maxWidth = 0;
                let maxHeight = 0;

                for (var i = 0; i < paths.length; i++) {

                    var path = paths[i];

                    var material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });

                    var shapes = path.toShapes(true);

                    for (var j = 0; j < shapes.length; j++) {

                        var shape = shapes[j];
                        var geometry = new THREE.ShapeBufferGeometry(shape);
                        geometry.computeBoundingBox();
                        let box3 = geometry.boundingBox.getSize();
                        let width = box3.x;
                        let height = box3.y;

                        if (width > maxWidth)
                            maxWidth = width;

                        if (height > maxHeight)
                            maxHeight = height;


                        //boundBoxes.push();

                        var mesh = new THREE.Mesh(geometry, material);
                        group.add(mesh);

                    }

                }

                let scale = 0.2;
                group.scale.set(scale, scale, scale);
                group.rotation.x = Math.PI * 0.5;




                console.log('box');
                this.scene.add(group);

                var box = new THREE.BoxHelper(group, 0xffff00);
                //this.scene.add(box);
                box.geometry.computeBoundingBox();
                let boundingBox = box.geometry.boundingBox.getSize();

                console.log('box')
                group.position.x -= boundingBox.x * 0.5;
                group.position.z -= boundingBox.z * 0.5;

            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened');

            }
        );

        this.physicalComponents = new PhysicalComponents(this.scene, this.interactiveObjects);

    }

    onMouseMove = (event) => {
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    }

    onMouseDown = (event) => {
        if (this.INTERSECTED && event.button == 2) {
            console.log(event);
            console.log(this.INTERSECTED.name);
        }
        if (this.INTERSECTED && event.button == 0) {
            this.updateSelectedObject(this.INTERSECTED);
            console.log(store.getState().environment);
            console.log(this.INTERSECTED.name);

            this.INTERSECTED_selected = this.INTERSECTED;

            if (this.INTERSECTED_box)
                this.scene.remove(this.INTERSECTED_box)
            this.INTERSECTED_box = new THREE.BoxHelper(this.INTERSECTED, 0x55ddff);

            this.scene.add(this.INTERSECTED_box);
        }
    }

    animate = () => {

        this.animationFrame = requestAnimationFrame(this.animate);
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.interactiveObjects.children);

        // if there is one (or more) intersections
        if (intersects.length) {
            if (intersects[0].object != this.INTERSECTED) {
                this.INTERSECTED = intersects[0].object;
                if (this.INTERSECTED) {
                    //INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                    //INTERSECTED.material.color.setHex(0xffff00);

                }
                else
                    this.INTERSECTED = null;
            }
        }
        else {
            if (this.INTERSECTED)
                this.INTERSECTED = null;
        }

        if (this.INTERSECTED_box) {
            this.INTERSECTED_box.update();
        }

        if (this.controls.enabled)
            this.controls.update();


        //this.cube.rotation.x = window.pos3d.x * 5;
        //this.cube.rotation.y = window.pos3d.y * 5;
        // your code goes here

        this.physicalComponents.update();

        this.renderer.render(this.scene, this.camera);

    }

    updateSelectedObject = (object) => {
        console.log(object);
        this.transformControl.attach(object);

        console.log('selected', object.componentType);
        if (object.componentType == 'PHYSICAL') {
            this.physicalComponents.showMenu(object);
        }
        else {
            this.physicalComponents.clearMenu();
        }

        if (object.componentType == 'FEATURE_BUTTON') {
            alert('FEATURE');
        }

        // this.events.onSelectObject;

        //this.dispatchEvent({ type: propName + "-changed", value: value });
        // this.dispatch()
    }

    getObjectByName(name) {

    }


    onWindowResize = () => {
        let { width, height } = this.config;

        if (fullScreen) {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    disableRender = () => {
        cancelAnimationFrame(this.animationFrame);
    }

    enableRender = () => {
        this.animate();
    }
}

window.onload = function () {
    var viewer = new Viewer();
    viewer.animate();
    window.viewer = viewer;
};


//load obj
// instantiate a loader
//var loader = new THREE.OBJLoader();
/*
// load a resource
loader.load(
    // resource URL
    'models/monster.obj',
    // called when resource is loaded
    function (object) {

        scene.add(object);

    },
    // called when loading is in progresses
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);
*/

