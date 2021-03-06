import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Container3d from "../components/react-reviz/components/container-3d";
import CubeView from "../components/react-reviz/components/cubeview";

//import  {Container3d, CubeView}  from '../components/react-reviz';
import 'react-cubeview/lib/css/react-cubeview.css';
import * as _THREE from 'three';
import OBJLoader from 'three-react-obj-loader';

import P5Wrapper from 'react-p5-wrapper';

//redux
import { connect } from 'react-redux';

import AlertContainer from 'react-alert';

import font from '../fonts/helvetiker_regular.typeface.json';
import Text from '../utilities/Text';

import { setProjectName, setProject, setRenderMap } from '../actions/project';

/*reviz Modules*/
import Terrain from '../modules/Mapbox/Terrain';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import MapEnv from "../components/MapEnv.jsx";

let textObject = new Text(font);

const electron = window.require('electron'); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

const THREE = _THREE;

var TransformControls = require('three-transform-controls');

let _this = null;
let transformControl;
let objLoader = new OBJLoader();

/*visible objects*/
let SHADERS = {};
let SERIAL = {};
let MODELS = {};
let DATASETS = {};
let MQTT = {};
let IMAGES = {
    png: {},
    svg: {}
};

let DIRECTORY=null;

let reviz_version = "1.1.1";
var path = window.require("path");

//var reload = require('require-reload')(require)
var LoadScript = function(name){
            if (require.cache[require.resolve(DIRECTORY + name)]) {
                delete require.cache[require.resolve(DIRECTORY + name)];
            }
            return require(DIRECTORY + "/scripts/" + name);
        };


class Editor3d extends Component {
    constructor(props) {
        super(props);
        _this = this;

        this.state = {
            renderMap:false,
            mainCode: null,
            setup: () => {},
            update: () => {},
            setupCanvas: () => {},
            draw: () => {},
            shaders: {
                vertex: {},
                fragment: {}
            },
            models: {
                obj: {},
                mtl: {},
                stl: {}
            },
            serial: {},
            mqtt: {},
            hoveredObject: null,
            selectedObject: null,
            selectedObjectName: null,
            mouse: new THREE.Vector2(0, 0),
            canvasWidth: 0,
            canvasHeight: 0,
            ctx: null,
            datasets: {},
            images: {
                png: {},
                svg: {}
            }
        };

        this.updateAngles = this.updateAngles.bind(this);
        this.updateAnglesCube = this.updateAnglesCube.bind(this);

        this.filesUpdated = this.filesUpdated.bind(this);
        this.receiveSerialData = this.receiveSerialData.bind(this);
        this.receiveMQTT = this.receiveMQTT.bind(this);

        this.executeCode = this.executeCode.bind(this);
        this.loadFromSerial = this.loadFromSerial.bind(this);
        this.onHoverStart = this.onHoverStart.bind(this);
        this.onHoverEnd = this.onHoverEnd.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onClick = this.onClick.bind(this);

        this.internalSetup = this.internalSetup.bind(this);
        this.internalUpdate = this.internalUpdate.bind(this);
        
        //for maps
        this.internalSetup_Map = this.internalSetup_Map.bind(this);
        
        this.updateWindowSize = this.updateWindowSize.bind(this);

        this.get2DCanvas = this.get2DCanvas.bind(this);
        this.storeProject = this.storeProject.bind(this);

        objLoader = new OBJLoader();

        ipcRenderer.on('file-update', this.filesUpdated);

        this.setup = (scene, camera, renderer) => {};
        this.update = (scene, camera, renderer) => {};
        this.draw = ctx => {};
        this.setupCanvas = () => {};

        ipcRenderer.on('serialport-data', (event, data) => {
            this.receiveSerialData(data);
        });

        ipcRenderer.on('mqtt-message', (event, topic, message) => {
            this.receiveMQTT(message);
        });

        ipcRenderer.on('clear-environment', () => {
            this.setState({
                models: {
                    obj: {},
                    mtl: {},
                    stl: {}
                },
                shaders: {
                    vertex: {},
                    fragment: {}
                },
                datasets: {},
                images: {
                    png: {},
                    svg: {}
                }
            });

            this.datasets = null;
            this.models = null;
            this.shaders = null;
        });

        window.addEventListener('resize', this.updateWindowSize);
        //window.addEventListener("mousemove", this.onMouseMove);
    }

    updateWindowSize() {
        //console.log('width', ReactDOM.findDOMNode(this.c3d).offsetWidth);
        if(this.c3d){
            var canvas3d = ReactDOM.findDOMNode(this.c3d);
            var width = canvas3d.offsetWidth;
            var height = canvas3d.offsetHeight;

            this.setState({
                canvasWidth: width,
                canvasHeight: height
            });
        }
    }

    componentDidMount() {
        //set home;
        if(this.c3d)
            this.c3d.setAngles(Math.PI * 0.25, Math.PI * 0.25);
        
        //if(this.refs.map){
            var a= ReactDOM.findDOMNode(this.refs.map);
            console.log("map",this.refs.map, a);

        //}
        var canvas = this.getMainCanvas();
        console.log('canvas', canvas);
        //var canvas2d = this.get2DCanvas();
        //console.log('canvas2d', canvas2d);
        this.updateWindowSize();

        this.storeProject();
        //drawing
        //const canvas = this.get2DCanvas();

        //console.log("width", ReactDOM.findDOMNode(this.c3d).offsetWidth);
    }

    storeProject(project) {
        if (project) {
            this.props.setProject(project);
        } else {
            this.props.setProject(this.state);
        }
    }

    onMouseMove(event) {
        var mouse = new THREE.Vector2(event.x, event.y);
        //console.log(mouse);

        //this.setState({ mouse: mouse });
    }

    receiveSerialData(data) {
        var content = {};
        try {
            content = JSON.parse(data);
            this.serial = content;
            SERIAL = content;
            this.setState({
                serial: content
            });
        } catch (e) {
            SERIAL = data; //pass as a string
            console.log(e);
        }
    }

    receiveMQTT(message) {
        var data = message.toString();
        this.mqtt = data;
        MQTT = data;
        this.setState({
            mqtt: data
        });
    }

    internalSetup(scene, camera, renderer) {
        //transformControl = new TransformControls(camera, renderer.domElement);

        //for (var i in models.obj) {
        //scene.add(models.obj[i]);
        //}

        var text = textObject.createObject('reViz3D Editor', 0.6);
        text.position.y = 0;
        text.position.z = 11;
        text.rotation.x = Math.PI * -0.5;
        scene.add(text);

        console.log('INTERNAL SETUP', this.state.setup);

        //create grid and axis
        var size = 20;
        var divisions = 20;
        var color = new THREE.Color('rgba(255, 255, 255,0.5)');
        var gridHelper = new THREE.GridHelper(size, divisions, 0x999999, 0x555555);
        scene.add(gridHelper);

        try {
            this.state.setup(scene, camera, renderer);
        } catch (e) {
            this.showAlert(e.toString(), 'error');
        }
    }

    internalUpdate(scene, camera, renderer) {
        try {
            this.state.update(scene, camera, renderer);
        } catch (e) {
            //this.showAlert(e.toString(), "error");
        }
    }

    internalSetup_Map(scene, camera, renderer, world, map){
        try {
            this.state.setup(scene, camera, renderer, world, map);
        } catch (e) {
            this.showAlert(e.toString(), "error");
        }
    }

    executeCode() {
        //import modules here
        //revizModules(THREE);
        require("../modules/Geometries")(THREE);

        //require("react-reviz3d/lib/modules/Geometries")(THREE);
        //var Map = require("../modules/Mapbox");
        require("../modules/Mapbox")(THREE);
        //require internals here 

        var Setup = function() {};
        var Update = function() {};
        var CONTEXT_MAP = false;
        var CONTEXT = "device";

        var _this = this;
        
        var Context = function(a){
            if(a=="map"){
                CONTEXT = "map"
            }
            else 
                CONTEXT = "device"

            _this.setState({
                context: CONTEXT
            });
        }

        var Draw = function() {};

        var Text = function(text, size) {
            return textObject.createObject(text, size);
        };

        var MapBox = function(MapBoxKey) {
            return 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?';
        };
        
        console.clear();

        //console.log("PROJECT", this.props.project);
        
        DIRECTORY = this.props.project.entryPoint.directory;

        eval(this.state.mainCode);

        this.setup = Setup;
        this.update = Update;
        this.draw = Draw;

        this.setState({
            setup: Setup,
            update: Update,
            context: CONTEXT
        });

        //saving data to store (Redux)
        var project = {
            mainCode: this.state.mainCode,
            shaders: this.state.shaders,
            models: this.state.models,
            context: CONTEXT
        };

        //var canvas2d = ReactDOM.findDOMNode(this.c2d);
        //const ctx = canvas2d.getContext('2d'); //ReactDOM.findDOMNode(this.c2d).getContext("2d");
        //this.draw(ctx);
        this.storeProject(project);
        
        if(this.c3d && CONTEXT =="device")
            this.c3d.reloadScene();
        
        if(this.mapEnv && CONTEXT =="map")
            this.mapEnv.reloadScene();

        //this.storeProject();
    }

    filesUpdated(event, type, fileName, filePath, content) {
        if (type == 'main') {
            try {
                this.setState({
                    mainCode: content
                });
                this.executeCode();
            } catch (err) {
                this.showAlert(err.toString(), 'error');
            }
        }

        if (type == 'vertex-shader') {
            try {
                var shader = content;

                var key = fileName.replace('.vert', '');
                var { shaders } = this.state;

                shaders.vertex[key] = content;
                this.shaders = shaders;
                SHADERS = shaders;
                this.setState({
                    shaders: shaders
                });
                this.executeCode();
                //this.c3d.reloadScene();
            } catch (err) {
                this.showAlert(err.toString(), 'error');
            }
        } else if (type == 'fragment-shader') {
            try {
                var shader = content;
                var key = fileName.replace('.frag', '');
                var { shaders } = this.state;
                shaders.fragment[key.toString()] = content;
                this.shaders = shaders;
                SHADERS = shaders;
                this.setState({
                    shaders: shaders
                });
                this.executeCode();
            } catch (err) {
                this.showAlert(err.toString(), 'error');
            }
        }

        if (type == 'obj') {
            var model = objLoader.parse(content);
            //changing model material
            var material = new THREE.MeshLambertMaterial({
                color: 0xa0a0a0
            });

            model.material = material;

            model.castShadow = true;
            model.receiveShadow = true;

            model.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
                child.traverse(function(c) {
                    c.material = material;
                    c.castShadow = true;
                    c.receiveShadow = true;
                });
            });

            var key = fileName.replace('.obj', '');

            model.name = key;

            //console.log("model", model);
            var { models } = _this.state;
            models.obj[key.toString()] = model;

            this.models = models;
            MODELS = models;
            this.setState({
                models: models
            });
            this.executeCode();
        }

        if (type == 'data-file') {
            var { datasets } = _this.state;
            var key = fileName.replace('.json', '');

            //import data file to data
            try {
                var json = JSON.parse(content);
                //var json = content;
                console.log('json', json);
                datasets[key.toString()] = json;
                DATASETS = datasets;
                this.datasets = datasets;
                this.setState({
                    datasets: datasets
                });
                this.executeCode();
            } catch (err) {
                datasets[key.toString()] = null;

                this.datasets = datasets;
                DATASETS = datasets;
                this.setState({
                    datasets: datasets
                });

                console.log('content json', content);
                console.log('error parsing .json file', err);
            }
        }

        if (type == 'image-png') {
            var { images } = _this.state;
            var key = fileName.replace('.png', '');
            //for svg -> data:image/svg+xml;base64,
            //import data file to data
            try {
                let image = "data:image/png;base64," + content;

                var texture = new THREE.TextureLoader().load(image);
                images.png[key.toString()] = texture;

                IMAGES = images;
                this.images = images;

                this.setState({
                    images: images
                });

                this.executeCode();
            } catch (err) {
                images.png[key.toString()] = null;
                IMAGES.png = images;
                this.images = images;
                this.setState({
                    images: images
                });
                console.log('error parsing .png file', err);
            }
        }

        //svg loader
        if (type == 'image-svg') {
            var { images } = _this.state;
            var key = fileName.replace('.svg', '');
            //key = key.replace(" ", "_"); //<-- add this at some point on top

            //for svg -> data:image/svg+xml;base64,
            //import data file to data
            try {
                let image = "data:image/svg+xml;base64," + content;
                //var loaded_svg =  new THREE.SVGLoader().load(image);
                var texture = new THREE.TextureLoader().load(image);
                //var svg_obj = new THREE.SVGObject(image);

                images.svg[key.toString()] = texture;

                IMAGES = images;

                this.images = images;

                this.setState({
                    images: images
                });

                this.executeCode();
            } catch (err) {
                images.svg[key.toString()] = null;
                IMAGES = images;
                this.images = images;
                this.setState({
                    images: images
                });
                console.log('error parsing .svg file', err);
            }
        }

        //this.storeProject();
    }

    loadFromSerial() {
        this.executeCode();
    }

    //3D ui controllers
    getMainCanvas() {
        var mainCanvas = ReactDOM.findDOMNode(this.c3d);
        console.log('inside canvas3d', mainCanvas);
        return mainCanvas;
    }

    get2DCanvas() {
        // var canvas = ReactDOM.findDOMNode(this.c2d);
        var canvas = ReactDOM.findDOMNode(this.c2d);
        console.log('inside canvas2d', canvas);
        return canvas;
    }

    //will update the camera angles/position from the orbitcontrols on the c3d
    updateAngles(phi, theta) {
        this.c3d.setAngles(phi, theta);
    }

    updateAnglesCube(phi, theta) {
        //(phi,theta) => this.cubeView.setAngles;
        if (this.cubeView) {
            this.cubeView.setAngles(phi, theta);
            //console.log('rotation',phi, theta);
        }
    }

    showAlert(msg, type) {
        this.msg.show(msg, {
            time: 2000,
            type: type ? type : 'success'
        });
    }

    onHoverStart(object, scene, camera, renderer) {
        this.selectedObjectName = object.name;
        this.selectedObject = object;

        //if (object.name != "_boxHelper" && object.name != "grid") {
        var box = new THREE.BoxHelper(object, 0x0088ff);
        box.name = '_boxHelper';
        box.parentName = object.name;
        box.isHelper = true;
        scene.add(box);
        //}
    }

    onHoverEnd(object, scene, camera, renderer) {
        var box = scene.getObjectByName('_boxHelper');
        scene.remove(box);
        //if (object.name != "_boxHelper" && !object.isHelper);
        this.setState({
            selectedObjectName: null
        });
    }

    onClick() {
        let { selectedObject } = this.state;
        if (selectedObject) {
            //selectedObject.position.y = selectedObject.position.y + 1;
            //let {selectedObject} = this.state;
            //console.log("selected and clicked", selectedObject.name);
            // transformControl.attach(selectedObject);
            //transformControl.name = "_tranformsControls";
            //selectedObject.add(transformControl);
        }
    }

    render() {
        var { mouse, selectedObjectName } = this.state;

        var tooltip = ( <div style = {
                {
                    position: 'absolute',
                    left: mouse.x + 10,
                    top: mouse.y,
                    display: selectedObjectName ? 'block' : 'none'
                }
            }
            className = "tooltip-object" > { selectedObjectName } 
            </div>
        );
        var env3d = ( 
            <div>
                <div className = "canvas-3d" >
                    <Container3d 
                       percentageWidth = { '100%' }
                       fitScreen ref = { c => (this.c3d = c) }
                       key = { 'c3d' }
                       setup = { this.internalSetup }
                       update = { this.internalUpdate }
                       marginBottom = { 30 }
                       code = { this.state.code }
                       onHoverStart = { this.onHoverStart }
                       onHoverEnd = { this.onHoverEnd }
                       addLight = { true }
                       addControls = { true }
                       addGrid = { true }
                       onUpdateAngles = { this.updateAnglesCube }
                    /> 
                </div> 
                <div className = "cube-view" >
                <CubeView aspect = { 1 }
                    hoverColor = { 0x0088ff }
                    ref = { c => (this.cubeView = c) }
                    cubeSize = { 2 }
                    zoom = { 6 }
                    antialias = { true }
                    onUpdateAngles = { this.updateAngles }
                    width = { 100 }
                    height = { 100 }
                    /> 
                </div> 
            </div>
        );
        


        var envMap =(
            <MapEnv />
        )

        //{ this.props.project.renderMap ? envMap : env3d} 
            
        return ( 
            <div className = "canvas" onClick = { this.onClick } >

            { this.state.context=="map" ? envMap : null }

            { this.state.context=="device" ? env3d :null }

            <AlertContainer ref = { a => (this.msg = a) } {...this.alertOptions }/>
            </div>
        );
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
        // You can now say this.props.rightMenu_isOpen
        project: state.project,
        name: state.project.name
    };
};

// Maps actions to props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // You can now say this.props.viewRightMenu
        setProject: project => dispatch(setProject(project)),
        setProjectName: name => dispatch(setProjectName(name)),
        setProjectRenderMap: renderMap => dispatch(setRenderMap(renderMap))
    };
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Editor3d);