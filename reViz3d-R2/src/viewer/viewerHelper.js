/*implements the new version of view cube*/

import * as THREE from "three";

var OrbitControls = require('./utils/OrbitControls.js')(THREE);

export default class viewerHelper {
    constructor(_canvas_id, _controls) {
        this.canvas = document.getElementById(_canvas_id);
        this.externalControls = _controls;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 10000);
        this.camera.position.set(0, 10, -30)
        this.camera.lookAt(new THREE.Vector3());

        var renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: true });
        renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0.0);
        renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer = renderer;

        this.controls = new OrbitControls(this.camera);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;

        var cubeScale = 12;
        var geometry = new THREE.BoxGeometry(cubeScale, cubeScale, cubeScale);
        var material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "cube1";
        //this.scene.add(cube);

        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cylinder = new THREE.Mesh(geometry, material);
        this.scene.add(cylinder);

        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
        var material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
        var cylinder = new THREE.Mesh(geometry, material);
        this.scene.add(cylinder);

        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
        var material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
        var cylinder = new THREE.Mesh(geometry, material);
        this.scene.add(cylinder);

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);

        // update the picking ray with the camera and mouse position
        //raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        //var intersects = raycaster.intersectObjects(interactiveObjects.children);
        /*
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
        */
        //console.log("angles", this.externalControls.getAngles());
        let { phi, theta } = this.externalControls.getAngles();
        this.controls.setAngles(phi, theta);

        this.renderer.render(this.scene, this.camera);
    }
}