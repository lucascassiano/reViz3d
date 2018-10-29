import * as THREE from 'three';
import Stats from "stats-js";

import Sky from "./sky";
import Grid from "./grid";
import ViewerHelper from "./viewerHelper";

import store, { toggleMenu, updateScene, updateSelectedObject } from "../store";

var OrbitControls = require('./utils/OrbitControls.js')(THREE);
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

class Viewer {
    constructor(antialias = true) {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        this.camera.position.set(0, 10, -30)
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
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.interactiveObjects = new THREE.Group();
        this.scene.add(this.interactiveObjects);
        /* 
            var geometry = new THREE.BoxGeometry(10, 10, 10);
            var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            var cube = new THREE.Mesh(geometry, material);
            cube.name = "cube1";
            interactiveObjects.add(cube);
    
            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ffFF });
            var cube = new THREE.Mesh(geometry, material);
            cube.position.y = 7.5;
            cube.name = "cube2";
            interactiveObjects.add(cube);
    
            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ffFF });
            var cube = new THREE.Mesh(geometry, material);
            cube.position.y = 15;
            cube.name = "cube3";
            interactiveObjects.add(cube);
        */
        //scene.add(cube);

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

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        //this.scene.add(this.cube);
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
        requestAnimationFrame(this.animate);
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

        //stats.begin();
        this.cube.rotation.x = window.pos3d.x*5;
        this.cube.rotation.y = window.pos3d.y*5;
        // your code goes here
        this.renderer.render(this.scene, this.camera);
        //stats.end();
    }

}

window.onload = function () {
    var viewer = new Viewer();
    viewer.animate();
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

