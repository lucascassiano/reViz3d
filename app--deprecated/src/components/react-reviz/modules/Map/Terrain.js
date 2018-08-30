import * as THREE from "three";
import { position } from "tether";
import { getImgFromArr } from "array-to-image";

const SphericalMarcator = require("./SphericalMarcator.js");
const MapboxClient = require("mapbox");
var getPixels = require("get-pixels");
const basePlaneDimension = 10000;
//https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,14.25,0,60/600x600?access_token=
/*
img data from:
https://www.mapbox.com/api-documentation/#static


*/
class Terrain {
    constructor(mapbox_token, zoom, lat, long) {
        this.mapbox_token = mapbox_token;
        this.zoom = zoom;
        this.lat = lat;
        this.long = long;

        this.z = zoom;
        var url = this.assembleUrl(mapbox_token, zoom, lat, long);
        try {
            this.client = new MapboxClient(mapbox_token);
            //getPixels(null, null);3
            var texture = new THREE.TextureLoader().load(url);
            console.log("map text", texture);
        } catch (err) {
            console.log("MAPBOX ERROR", err);
        }
    }

    assembleUrl(mapbox_token, zoom, lat, long) {
        // "https://api.mapbox.com/v4/mapbox.terrain-rgb/"
        var url =
            "https://api.mapbox.com/v4/mapbox.streets/" +
            lat +
            "," +
            long +
            "," +
            zoom +
            "/1024x1024.png?access_token=" +
            mapbox_token;

        return url;
    }

    assembleUrl_Satellite(mapbox_token, zoom, lat, long) {
        var sm = new SphericalMarcator();
        var tileConfig = sm.xyz([lat, long], zoom);

        var x = tileConfig.minX;
        var y = tileConfig.maxY;
        var z = zoom;
        /*
                                            mapbox.satellite
                                            mapbox.streets
                                            mapbox.dark*/

        var url =
            "https://api.mapbox.com/v4/mapbox.satellite/" +
            lat +
            "," +
            long +
            "," +
            zoom +
            "/1024x1024.png?access_token=" +
            mapbox_token;

        return url;
    }

    assembleUrl_style1(mapbox_token, zoom, lat, long) {
        //https://api.mapbox.com/styles/v1/lucascassiano21/cjcpvggu14g0a2vpslbiapxfh/static/-122.4241,37.78,14.25,0,0/600x600?access_token=pk.eyJ1IjoibHVjYXNjYXNzaWFubzIxIiwiYSI6ImNqY280d2VxaTFxaGoycXJ3cGE3N292cHoifQ.YLp5agVY737YVFrLgOCbiA

        var url =
            "https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/" +
            lat +
            "," +
            long +
            "," +
            zoom +
            "/1024x1024.png?style=mapbox://styles/lucascassiano21/cjcpvggu14g0a2vpslbiapxfh" +
            "&access_token=" +
            mapbox_token;

        console.log("style", url);

        return url;
    }

    getElevations() {
        var { mapbox_token, zoom, lat, long } = this;

        var url = this.assembleUrl(mapbox_token, zoom, lat, long);

        console.log("url 2", url);
        //var convertedPixels = new Uint8ClampedArray(1024 * 1024 * 4);
        var textureOrig = new THREE.TextureLoader().load(url);
        console.log("converted original", textureOrig);

        var pixelsArray = textureOrig.image.data;

        var convertedPixels = new Uint8Array(pixelsArray.length);

        for (var i = 0; i < pixelsArray.length; i++) {
            var R = pixelsArray[i * 4];
            var G = pixelsArray[i * 4 + 1];
            var B = pixelsArray[i * 4 + 2];
            var A = pixelsArray[i * 4 + 3];
            /*
                                            var height = -10000 + (R * 256 * 256 + G * 256 + B) * 0.1;
                                            var alphaMultiplier;

                                            if (height > 0) {
                                                alphaMultiplier = -(height / 14.7 - 255) - 20;
                                            } else {
                                                alphaMultiplier = 255;
                                            }*/
            /*
                                                      convertedPixels[i] = 255;
                                                      convertedPixels[i + 1] = 0;
                                                      convertedPixels[i + 2] = 0;
                                                      convertedPixels[i + 3] = alphaMultiplier;
                                                      */
            convertedPixels[i * 4] = R;
            convertedPixels[i * 4 + 1] = G;
            convertedPixels[i * 4 + 2] = B;
            convertedPixels[i * 4 + 3] = A;
        }

        //var img = getImgFromArr(convertedPixels, 1024, 1024);
        //console.log("img", img);
        //return img;
        console.log("converted", convertedPixels);

        var dataTexture = new THREE.DataTexture(
            pixelsArray,
            1024,
            1024,
            THREE.RGBAFormat,
            THREE.UnsignedByteType,
            THREE.UVMapping
        );
        dataTexture.needsUpdate = true;

        console.log("converted", dataTexture);
        //var texture = new THREE.Texture(dataTexture);
        return textureOrig;
    }

    generateTexturePos(w, h) {
        var data = [];
        var r, g, b, a;

        var points = w * h;

        for (var k = 0; k < points; k++) {
            // x = ~~(k / w ) / w;
            r = 255;
            g = 0;
            b = 0;
            a = 255;

            data.push(r, g, b, a);
        }

        var texture = new THREE.DataTexture(
            new Float32Array(data),
            w,
            h,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;

        return texture;
    }

    generateTexturePos2(callback) {
        var w = 1024,
            h = 1024;
        var data = [];
        var r, g, b, a;

        var points = w * h;

        var { mapbox_token, zoom, lat, long } = this;

        var url = this.assembleUrl(mapbox_token, zoom, lat, long);

        console.log("url 2", url);

        var texture = new THREE.DataTextureLoader().load(url, function() {
            console.log("loaded");
        });

        getPixels(url, function(err, pixels) {
            if (err) {
                console.log("Bad image path");
                return;
            }
            //console.log("got pixels", pixels.data);

            //var d = this.getImageData(texture.image);

            //console.log("data ", texture);
            
            for (var k = 0; k < points - 4; k++) {
                r = pixels.data[k * 4];
                b = pixels.data[k * 4 + 2];
                g = 0;
                //b = r;
                a = 255;

                data.push(r, g, b, a);
            }

            console.log('data t', data);

            var texture = new THREE.DataTexture(
                new Float32Array(data),
                w,
                h,
                THREE.RGBAFormat,
                THREE.FloatType
            );

            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            texture.needsUpdate = true;

            callback(texture);
        });
    }

    getMesh(callback) {
        var z = this.z;
        var tileSize = 100;
        var vertices = 512;
        var segments = vertices - 1;

        var { mapbox_token, zoom, lat, long } = this;

        //var url = this.assembleUrl(mapbox_token, zoom, lat, long);
        var url = this.assembleUrl_Satellite(mapbox_token, zoom, lat, long);
        //console.log("url", url);

        var texture = new THREE.TextureLoader().load(url);

        var urlBump = this.assembleUrl_style1(mapbox_token, zoom, lat, long);
        var textureBump = new THREE.TextureLoader().load(urlBump);
        //var textDisp = this.getElevations();

        this.generateTexturePos2(function(mapTexture) {
            var material = new THREE.MeshPhongMaterial({
                wireframe: false,
                map:texture,
                displacementMap: textureBump,
                displacementScale: 10
            });

            material.needsUpdate = true;

            var geometry = new THREE.PlaneBufferGeometry(
                tileSize,
                tileSize,
                segments,
                segments
            );

            var plane = new THREE.Mesh(geometry, material);

            plane.rotation.x = -Math.PI * 0.5;

            callback(plane);
        });
    }
}

export default Terrain;