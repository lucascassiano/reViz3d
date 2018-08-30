var _color = 0xfafafa;
var _size = 1;

//var SphericalMarcator = require('./SphericalMarcator.js');
//const MapboxClient = require('mapbox');
var mapbox_token = 'pk.eyJ1IjoibHVjYXNjYXNzaWFubzIxIiwiYSI6ImNqY280d2VxaTFxaGoycXJ3cGE3N292cHoifQ.YLp5agVY737YVFrLgOCbiA';
var tileSize = 100;
var vertices = 1;
const SphericalMarcator = require("./SphericalMarcator.js");

var sphericalMarcator = new SphericalMarcator(); //{ size: 1024 }

function assembleUrl(mapbox_token, zoom, lat, long) {
    // "https://api.mapbox.com/v4/mapbox.terrain-rgb/"
    var url =
        'https://api.mapbox.com/v4/mapbox.satellite/' +
        lat +
        ',' +
        long +
        ',' +
        zoom +
        '/1024x1024.png?access_token=' +
        mapbox_token;

    return url;
}

var Maps = function Maps(THREE) {
    this.MapPlane = function(zoom, long, lat, size = tileSize) {
        var url = assembleUrl(mapbox_token, zoom, lat, long);
        var texture = new THREE.TextureLoader().load(url);

        var material = new THREE.MeshPhongMaterial({
            wireframe: false,
            map: texture
        });

        this.size = size;

        var geometry = new THREE.PlaneBufferGeometry(size, size, 1, 1);

        var plane = new THREE.Mesh(geometry, material);
        plane.map_size = size;
        plane.map_zoom = zoom;
        plane.map_lat = lat;
        plane.map_long = long;

        plane.rotation.x = -Math.PI * 0.5;
        return plane;
    }
    this.sphericalMarcator = sphericalMarcator;
    /*
        this.Map2Scene = function(map, lat, long, ) {

        }

        this.Scene2Map(map, x, y) = function{
        }*/
};

module.exports = Maps;