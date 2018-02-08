

/*Created with ReViz version 1.1.0
  project: new project
  author: lucascassiano
  date: February 8th 2018, 2:18:50 pm
*/

import React, { Component } from "react";
import Container3d from "react-container-3d";
import OBJLoader from 'three-react-obj-loader';
import * as THREE from "three";

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

    //executa 1x
var cube;
Setup = function(scene, camera, renderer) {
    cube = Cube();
    scene.add(cube);
    //MODELS.obj.sensor[0].position.y = DATASETS.sensor.positions.y;
    scene.add(MODELS.obj.sensor);

};

//ES6 - ES2015
//loop 30FPS
Update = function(scene, camera, renderer) {
    cube.position.y = DATASETS.sensor.position;
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
