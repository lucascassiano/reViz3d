import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as THREE from "three";
//import sizeMe from "react-sizeme";
//import OBJLoader from 'three-react-obj-loader';
//import * as CSS3DRenderer from "../utils/CSS3DRenderer";
//var CSS3DRenderer  = require('../utils/CSS3DRenderer')(THREE);

var OrbitControls = require('../utils/OrbitControls')(THREE);

let renderer,
    scene,
    camera,
    mainSphere,
    windowSize = {
        width: 0,
        height: 0
    },
    animation,
    controls;

// for interactive hovering
let mouse = new THREE.Vector2(),
    raycaster,
    INTERSECTED;

//for css rendering
let scene2d, canvas2d;

class Container3d extends Component {
    constructor(props) {
        super(props);
        this.onHoverStart = this.onHoverStart.bind(this);
        this.onHoverEnd = this.onHoverEnd.bind(this);

        this.onError = this.onError.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
        this.clearScene = this.clearScene.bind(this);
    }

    componentDidMount() {
        if (this.props.relatedCanvas)
            this.relatedCanvas = this.props.relatedCanvas();

        if (this.props.onUpdateAngles)
            this.updateAngles = this.props.onUpdateAngles;

        this.init();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        renderer = null;
        scene = null;
        camera = null;
        controls = null;
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Defines the angles - useful when using OrbitControls from react-cubeview
     * @param {*} phi
     * @param {*} theta
     */
    setAngles(phi, theta) {
        if (controls) {
            controls.setPolarAngle(phi);
            controls.setAzimuthalAngle(theta);
        }
    }

    getSize() {
        var { width, percentageWidth, aspect } = this.props;
        if (percentageWidth)
            width = window.innerWidth * parseFloat(percentageWidth) / 100;

        var height = width / aspect;

        height = 200;
        console.log("size", width, height);
        return {
            width: width,
            height: height
        };
    }

    getScene() {
        return scene;
    }

    getCamera() {
        return camera;
    }

    getRenderer() {
        return renderer;
    }

    clearScene() {
        if (scene != undefined)
            scene.traverse(function (object) {
                scene.remove(object);
                if (object.geometry) object.geometry.dispose();
                if (object.material) object.material.dispose();
                //object.dispose();
            });

        var canvas = this.refs.threeCanvas;
        scene = new THREE.Scene();
        //this._createScene(canvas);
        this.reloadScene();
    }

    updateDimensions() {
        //Get the proportions from screen

        var {
            width,
            percentageWidth,
            aspect,
            fitScreen,
            marginLeft,
            marginTop,
            marginBottom,
            height
        } = this.props;

        if (percentageWidth) {
            width = parseInt(window.innerWidth * parseInt(percentageWidth) / 100.0);
        }

        if (aspect) {
            height = width / aspect;
        }

        if (fitScreen) {
            height = window.innerHeight;
            if (marginTop) {
                height = height - marginTop;
            }

            if (marginBottom) {
                height = height - marginBottom;
            }
        }

        var canvas = this.refs.threeCanvas;

        canvas.height = height;

        renderer.setSize(width, height);

        camera.aspect = width / height;

        camera.updateProjectionMatrix();
    }

    init() {
        //this.props.onHover("hello");
        const { width, height } = this.getSize();

        const canvas = this.refs.threeCanvas;
        //const canvas2d = this.refs.cssCanvas;

        canvas.height = height;
        const marginTop = this.props.marginTop;

        raycaster = new THREE.Raycaster();
        window.addEventListener("mousemove", this.onDocumentMouseMove, false);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(0, 20, 20);
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: this.props.antialias ? this.props.antialias : true,
            alpha: true,
            opacity: 0.5
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this._createScene(canvas);
        var _this = this;

        this._render = function () {
            //animation = requestAnimationFrame(_this._render);
            setTimeout(function () {
                requestAnimationFrame(_this._render);
            }, 1000 / 30); //running @ 30FPS

            var { phi, theta } = _this.props;

            if (phi && theta && controls) {
                controls.setPolarAngle(phi);
                controls.setAzimuthalAngle(theta);
            }

            if (_this.props.update) {
                try {
                    _this.props.update(scene, camera, renderer);
                } catch (error) {
                    this.onError(error);
                }
            }

            // find intersections

            if (
                (_this.props.onHoverStart || _this.props.onHoverEnd) &&
                camera != null
            ) {
                //console.log("camera is", camera);
                camera.updateMatrixWorld();

                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(scene.children, true);

                if (intersects.length > 0) {
                    if (INTERSECTED != intersects[0].object) {
                        if (INTERSECTED) {
                            _this.onHoverEnd(INTERSECTED, scene, camera, renderer);
                            INTERSECTED = intersects[0].object;
                            _this.onHoverStart(INTERSECTED, scene, camera, renderer);
                        } else {
                            INTERSECTED = intersects[0].object;
                            _this.onHoverStart(INTERSECTED, scene, camera, renderer);
                        }
                    }
                } else {
                    if (INTERSECTED) {
                        _this.onHoverEnd(INTERSECTED, scene, camera, renderer);
                        INTERSECTED = null;
                    }
                    INTERSECTED = null;
                }
            }
            renderer.render(scene, camera);
        };

        this._render();
    }

    getIntersectedObject() {
        return INTERSECTED;
    }

    onHoverStart(object, scene, camera, renderer) {
        if (this.props)
            if (this.props.onHoverStart) {
                this.props.onHoverStart(object, scene, camera, renderer);
            }
    }

    onHoverEnd(object, scene, camera, renderer) {
        if (this.props)
            if (this.props.onHoverEnd) {
                this.props.onHoverEnd(object, scene, camera, renderer);
            }
    }

    onHover(object) {
        if (this.props)
            if (this.props.onHover) {
                this.props.onHover(object);
            }
    }

    setAngles(phi, theta) {
        //console.log(phi, theta);
        if (controls) {
            controls.setPolarAngle(phi);
            controls.setAzimuthalAngle(theta);
        }
    }

    reloadScene(newScene) {
        if (newScene) scene = newScene;
        else scene = new THREE.Scene();

        const {
            addControls,
            addGrid,
            addLight,
            enableZoom,
            enableKeys,
            enablePan
        } = this.props;

        if (addGrid) {
            var gridXZ = new THREE.GridHelper(20, 20);
            gridXZ.name = "grid";
            scene.add(gridXZ);

            var planeGeometry = new THREE.PlaneGeometry(20, 20);
            planeGeometry.rotateX(-Math.PI / 2);

            var planeMaterial = new THREE.ShadowMaterial({
                opacity: 0.4
            });

            //var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            //plane.receiveShadow = true;
            //scene.add(plane);
        }

        if (addLight != undefined ? addLight : false) {
            scene.add(new THREE.AmbientLight(0xf0f0f0));
            var light = new THREE.SpotLight(0xffffff, 1.5);
            light.position.set(50, 50, 50);
            light.castShadow = true;
            light.shadow = new THREE.LightShadow(
                new THREE.PerspectiveCamera(70, 1, 10, 1000)
            );

            light.shadow.bias = -0.000222;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            scene.add(light);
        }

        if (addControls) {
            var rootDiv = this.refs.rootthree;

            //if (this.relatedCanvas) rootDiv = this.relatedCanvas;

            /* if (this.updateAngles) {
                controls = new OrbitControls(camera, rootDiv, this.updateAngles);
            } else {
                controls = new OrbitControls(camera, rootDiv);
            }
*/
            if (this.props.rotateSpeed)
                controls.rotateSpeed = this.props.rotateSpeed

            controls.enablePan = enablePan != undefined ? enablePan : true;
            controls.enableZoom = enableZoom != undefined ? enableZoom : true;
            controls.enableKeys = enableKeys != undefined ? enableKeys : true;
        }

        if (this.props.setup) {
            try {
                this.props.setup(scene, camera, renderer);
            } catch (error) {
                this.onError(error);
            }
        }
        this.updateDimensions();
    }

    //Insert all 3D elements here
    _createScene(canvas) {
        //console.log(this.props);
        const {
            addControls,
            addGrid,
            addLight,
            enableZoom,
            enableKeys,
            enablePan
        } = this.props;

        if (addGrid) {
            var gridXZ = new THREE.GridHelper(20, 20);
            gridXZ.name = "grid";
            scene.add(gridXZ);
            /*
            var planeGeometry = new THREE.PlaneGeometry(20, 20);
            planeGeometry.rotateX(-Math.PI / 2);
            var planeMaterial = new THREE.ShadowMaterial({
                opacity: 0.4
            });
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            scene.add(plane);
            */
        }

        if (addControls) {
            var rootDiv = this.refs.rootthree;

            if (this.relatedCanvas) rootDiv = this.relatedCanvas;

            if (addControls) {
                var rootDiv = this.refs.rootthree;

                //if (this.relatedCanvas) rootDiv = this.relatedCanvas;

                if (this.updateAngles) {
                    controls = new OrbitControls(camera, rootDiv, this.updateAngles);
                } else {
                    controls = new OrbitControls(camera, rootDiv);
                }

                if (this.props.rotateSpeed)
                    controls.rotateSpeed = this.props.rotateSpeed

                controls.enablePan = enablePan != undefined ? enablePan : true;
                controls.enableZoom = enableZoom != undefined ? enableZoom : true;
                controls.enableKeys = enableKeys != undefined ? enableKeys : true;
            }

        }

        if (addLight != undefined ? addLight : true) {
            scene.add(new THREE.AmbientLight(0x777));
            var light = new THREE.SpotLight(0xffffff, 1.0);
            light.position.set(50, 50, 50);
            light.castShadow = true;
            light.shadow = new THREE.LightShadow(
                new THREE.PerspectiveCamera(70, 1, 10, 1000)
            );
            light.shadow.bias = -0.0001;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            scene.add(light);
        }

        var _this = this;

        if (this.props.setup) {
            try {
                this.props.setup(scene, camera, renderer);
            } catch (error) {
                this.onError(error);
            }
        }
    }

    onError(error) {
        if (this.props.onError) {
            this.props.onError(error);
        }
    }

    onDocumentMouseMove(event) {
        event.preventDefault();
        var canvas = this.refs.threeCanvas;
        var canvasDOM = ReactDOM.findDOMNode(canvas);

        var rect = canvasDOM.getBoundingClientRect();

        mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    render() {
        let style = {
            top: 0,
            position: "absolute"
        };
        let style1 = {
            zIndex: 5
        };
        return (<div ref="rootthree" >

            <canvas ref="threeCanvas"
                style={style1}
            />

            <div ref="cssCanvas" />

        </div>
        );
    }
}

export default Container3d;