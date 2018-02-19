import React, { Component } from 'react';
import mapboxgl from "mapbox-gl";

import * as THREE from 'three';
import {Threebox} from "threebox";
let threebox, map;

class MapEnv extends React.Component {

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVjYXNjYXNzaWFubzIxIiwiYSI6ImNqY280d2VxaTFxaGoycXJ3cGE3N292cHoifQ.YLp5agVY737YVFrLgOCbiA';
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9'
        });
        
        var props = this.props;

        map.on("load", function() {
            console.log("map loaded");

            if(props.setup)
                props.setup();

        // Initialize threebox
        threebox = new Threebox(map);
        threebox.setupDefaultLights();
        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        var sphere = new THREE.Mesh( geometry, material );
        
        console.log("threebox",threebox);
        
        //scene.add( sphere );
        var position = [-122.41356, 37.77577 ,100];
        threebox.addAtCoordinate(sphere, position, {scaleToLatitude: false, preScale: 2});
    });
       this.reloadScene = this.reloadScene.bind(this);
       this.render = this.render.bind(this);

    }

    reloadScene(newScene) {
        if (newScene) threebox.world= newScene;
        else threebox.world = new THREE.Group();

        if(this.props.setup){
            this.props.setup(threebox.scene, threebox.camera, threebox.renderer, threebox.world, threebox.map);
        }
    }

   

    _render(){
        setTimeout(function() {
                requestAnimationFrame(this._render);
            }, 1000 / 30); //running @ 30FPS
        
        if(this.props){
            if(this.props.update)
                this.props.update(threebox.scene, threebox.camera, threebox.renderer, threebox.world, threebox.map);
        }
    }

    componentWillUnmount() {
        map.remove();
    }

    render() {
        const style ={
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            opacity: 0.5
        };

        return <div style = { style }
        ref = { el => this.mapContainer = el }
        />;
    }
}

export default MapEnv;