

/*Created with ReViz version 1.1.1
  project: new project
  author: author
  date: February 9th 2018, 5:52:12 pm
*/

import React, { Component } from "react";
import {Container3d, CubeView} from "react-reviz3d";

import OBJLoader from 'three-react-obj-loader';
import * as THREE from "three";

require("react-reviz3d/lib/modules/Geometries");

//import the main reviz here

let SHADERS, MODELS, DATASETS, SERIAL, MQTT, IMAGES;

class VizComponent extends Component{
    constructor(props){
        this.Setup = this.Setup.bind(this);
        this.Update = this.Update.bind(this);

        //loading bundled variables
        var props = this.props; 

        var store = this.props.store;
        
        if(!store){
            store = {
                shaders:{}, 
                models:{}, 
                datasets:{}, 
                mqtt:{}, 
                images:{}
            };
        }
        //loading stored content
        let objLoader = new OBJLoader();

        SHADERS = props.shaders ? props.shaders : store.shaders;
        MODELS = props.models ? props.models : JSON.parse(store.models);
        DATASETS = props.datesets ? props.datasets : JSON.parse(store.datasets);
        SERIAL = props.serial;
        MQTT = props.mqtt;

        //call reviz here
    }

    var cube;
var t = 0;

//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    cube = Cube(2, 0x22acff);
    scene.add(cube);
};

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    cube.position.y = 10 * Math.sin(t);
    t += 1 / 30;
    var s = cube.position.y / 10;
    cube.scale.set(s, s, s);
};

    render(){
        return(
            <Container3d 
                background ={"#FFF"}
                setup = {this.Setup}
                update = {this.Update}
            />
        );
    }

}

export default VizComponent
