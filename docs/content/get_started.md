## Installation

The current version only requires to be downloaded and executed.

### Download
You can download the latest version at:

OS | Link | Version | Format
---|---|---|---|
`Windows` | ... | 1.0.0 beta | .zip/.exe
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
The built apps will be in ./release directory

## How it works
This is the basic structure
```javascript

//called once
Setup = (scene, renderer, camera) =>{

}

//called @30FPS
Updated = (scene, renderer, camera) =>{
    
}
```

Property | Description
---|---
`scene` | three.js scene
`renderer` | three.js
`camera` | three.js

## Project

### Creating a new Project

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



