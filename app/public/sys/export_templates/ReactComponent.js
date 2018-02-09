const ReactComponent = `

/*Created with ReViz version $reviz_version
  project: $name
  author: $author
  date: $date
*/

import React, { Component } from "react";
import {Container3d} from "react-reviz3d";

import OBJLoader from 'three-react-obj-loader';
import * as THREE from "three";

//import the main reviz here

let SHADERS, MODELS, DATASETS, SERIAL, MQTT, IMAGES;

class $component_name extends Component{
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

    $main_code

    render(){
        return(
            <Container3d 
                background ={"$background"}
                setup = {this.Setup}
                update = {this.Update}
            />
        );
    }

}

export default $component_name
`

module.exports = ReactComponent;