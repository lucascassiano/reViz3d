var _color = 0xfafafa;
var _size = 1;

var Geometries = function Geometries(THREE) {
    /**
     * create a cube
     * @param {*} size 
     * @param {*} color 
     */
    this.Cube = function() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _size;
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _color;

        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
    };

    this.Sphere = function() {
        var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _size;
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _color;

        var geometry = new THREE.SphereGeometry(radius, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var sphere = new THREE.Mesh(geometry, material);
        return sphere;
    };
};

module.exports = Geometries;