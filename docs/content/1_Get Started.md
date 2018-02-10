## Installation

The current version only requires to be downloaded and executed.

### Download
You can download the latest version at:

OS | Link | Version | Format
---|---|---|---|
`Windows` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.1.2-win.zip)  | 1.1.2| .zip/.exe
`OSX` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.1.2-mac.zip) | 1.1.2 | .zip/.app
`Linux` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.1.2-linux.zip)  | 1.1.2 | .zip/.tar
`Windows` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.1.0-mac.zip)  | 1.1.0 beta | .zip/.exe
`OSX` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.1.0-mac.zip) | 1.1.0 beta | .zip/.app
`Linux` | ... | 1.1.0 beta | .zip/.tar
`Windows` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.0.0-mac.zip)  | 1.0.0 beta | .zip/.exe
`OSX` | [download](https://github.com/lucascassiano/reViz3d/raw/master/releases/reViz3d-1.0.0-mac.zip) | 1.0.0 beta | .zip/.app
`Linux` | ... | 1.0.0 beta | .zip/.tar

### Build from source
In can also build it from the source, if you want the latest (maybe unstable) version:

```
# Clone the Quick Start repository
$ git clone https://github.com/lucascassiano/reViz3d

# Go into the repository
$ cd/app

# Install the dependencies and Build for a specific OS
$ npm install

# Windows
$ npm run build-win

# OSX
$ npm run build-mac

# Linux
$ npm run build-linux
```
The built apps will be in ./dist directory

## How it works
### Project Structure
```
/project_directory/
    project.json
    main.js
    /shaders/
        **.vert
        **.frag
    /datasets/
        **.json
    /models/
        **.obj  
    /images/
        **.png
        **.svg  
```

- Project.json

The project settings are defined by a .json file used as an entry-point, i.e., everytime you want to open a project, just select this file.
All the templates and projects created by reViz3d use the standard name <strong>project.json</strong> in the root of the project directory.
It follows this structure:

```json
{
    "name": "project name",
    "author": "lucascassiano",
    "creation_date": "MM/DD/YYYY",
    "last_update": "MM/DD/YYYY",
    "indexed_files": {
        "main": "main.js",
        "shadersDirectory": "shaders",
        "modelsDirectory": "models",
        "dataDirectory": "datasets"
    },
    "user_preferences": { "auto_reload": true, "background": "#FFFFFF" }
}
```

### Main Code

The main code is defined by <strong> main.js</strong>, written in JavaScript - [ES6/ECMAScript2015](https://babeljs.io/learn-es2015/). it has a basic 

This is the basic structure:

```javascript

//called once
Setup = (scene, renderer, camera) =>{

}

//called @30FPS
Updated = (scene, renderer, camera) =>{
    
}
```

Parameter | Description
---|---
`scene` | three.js scene
`renderer` | three.js
`camera` | three.js

The life cycle is very similar to the Arduino platform: 
Setup() will be called one, in the very first rendered frame.
Update() will be called 30 times per second (30FPS), in an infinite loop.

### Local Assets
Local assets are automatically loaded into your code. So you just use the respective variables: 
SHADERS (for GLSL shaders), DATASETS, MODELS and IMAGES.
* Currently only .png, .svg are supported images and both of them are loaded as [THREE.Texture](https://threejs.org/docs/#api/textures/Texture).
* [OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file) are imported to the reviz as [THREE.Object3D](https://threejs.org/docs/#api/core/Object3D).

```javascript
    SHADERS.vertex.{...}
    SHADERS.fragment.{...}

    DATASETS.{...}

    MODELS.obj.{...}

    IMAGES.png.{...}
    IMAGES.svg.{...}
```

### SerialPort
The system will try to convert the incoming stream into a JS object (basically a JSON). If the parsing returns an error, then the ```SERIAL``` will contain the received package as a String. 
The communication is designed to update the SERIAL variable whenever there is a new break-line indicator ```'\r\n'```. If you are working using Arduino, this break-line is the result of a ```Serial.println()``` command; 
In other words, the variable ```SERIAL``` will always receive the latest values available in the Serialport, and if possible it will parse the Serial data to a JSON format.

### MQTT
The ```MQTT``` variable works similarly to ```SERIAL```, always receiving the latest value available the set mqtt topic.
To Setup the MQTT connection go to ```View > Inspector Menu > MQTT``` and select the mqtt server and topic. In order to help with debug, we also added the option to write in a specific topic in the same mqtt server.
Need a help to understand how mqtt works? take a look at [Hivemq.com](https://www.hivemq.com/blog/how-to-get-started-with-mqtt);
<img src="https://www.hivemq.com/wp-content/uploads/Screen-Shot-2014-10-22-at-12.21.07-1024x589.png" width="400px"/>
# Basic Example

### Saving Projects

### Basic Shapes

### Load 3D Models

### Read from local data

## Read from SerialPort

## Read from MQTT

## Record SerialPort and MQTT
Still under development

# Internal Modules

### Geometries

### Text

### Canvas2Plane

### Ruler 

### Maps



