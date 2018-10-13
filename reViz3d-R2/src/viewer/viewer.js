import * as THREE from 'three';

import Sky from "./sky";
import store, { toggleMenu, updateScene, updateSelectedObject } from "../store";

var OrbitControls = require('three-orbit-controls')(THREE)

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 10, -30)
camera.lookAt(new THREE.Vector3());
var canvas = document.getElementById("3d-env");
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.0);
var devicePixelRatio = window.devicePixelRatio || 1;
renderer.setPixelRatio( devicePixelRatio );

/* --- for ambiente occlusions
composer = new THREE.EffectComposer( renderer );
				renderPass = new THREE.RenderPass( scene, camera );
				composer.addPass( renderPass );
				saoPass = new THREE.SAOPass( scene, camera, false, true );
				saoPass.renderToScreen = true;
				composer.addPass( saoPass );
*/

var interactiveObjects = new THREE.Group();
scene.add(interactiveObjects);

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

//scene.add(cube);

var controls = new OrbitControls(camera);
let sky = new Sky();

scene.add(sky.getObject(THREE));

var gridHelper = new THREE.GridHelper(100, 10, 0xaaaaaa, 0x666666);
scene.add(gridHelper);

//raycast
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var INTERSECTED;
var INTERSECTED_box;
var INTERSECTED_selected;

function onMouseMove(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
}

function onMouseDown(event) {
    if (INTERSECTED && event.button == 2) {
        console.log(event);
        console.log(INTERSECTED.name);
    }
    if (INTERSECTED && event.button == 0) {
        updateSelectedObject(INTERSECTED);
        console.log(store.getState().environment);
        console.log(INTERSECTED.name);

        INTERSECTED_selected = INTERSECTED;

        if (INTERSECTED_box)
            scene.remove(INTERSECTED_box)
        INTERSECTED_box = new THREE.BoxHelper(INTERSECTED, 0x55ddff);

        scene.add(INTERSECTED_box);
    }
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);

function animate() {
    requestAnimationFrame(animate);
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(interactiveObjects.children);

    // if there is one (or more) intersections
    if (intersects.length) {
        if (intersects[0].object != INTERSECTED) {
            INTERSECTED = intersects[0].object;
            if (INTERSECTED) {
                //INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                //INTERSECTED.material.color.setHex(0xffff00);
            }
            else
                INTERSECTED = null;
        }
    }
    else {
        if (INTERSECTED)
            INTERSECTED = null;
    }

    if (INTERSECTED_box) {
        INTERSECTED_box.update();
    }

    renderer.render(scene, camera);
}

//load obj
// instantiate a loader
var loader = new THREE.OBJLoader();

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

animate();
