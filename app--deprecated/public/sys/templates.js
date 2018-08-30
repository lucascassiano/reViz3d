const defaultProject = {
    project: {
        name: "experiment",
        author: null,
        creation_date: null,
        last_update: null,
        indexed_files: {
            main: "main.js",
            shadersDirectory: "shaders",
            modelsDirectory: "models",
            dataDirectory: "datasets",
            imagesDirectory: "images"
        },
        user_preferences: {
            auto_reload: true,
            background: "white"
        }
    },
    directories: ["datasets", "shaders", "models", "images"],
    main: `//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {

}

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {

}
`
};

const ReactComponent = ` /*Created with Exp3 http://github.com/lucascassiano/experiemental_three
 $author
*/

import React, { Component } from "react";
import Container3d from "react-container-3d";
import * as _THREE from "three";

let shaders = $shaders;

let models = $models;

export default class $componentName extends Component{
    constructor(props){
        this.Setup = this.Setup.bind(this);
        this.Update = this.Updated.bind(this);
    }

    $mainCode

    renderer(){
        return(
            <Container3d
                setup={this.Setup}
                update={this.Update}
            />
        );
    }
}
`;

module.exports = {
    defaultProject,
    ReactComponent
};