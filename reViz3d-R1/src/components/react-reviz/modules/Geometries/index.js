var _color = 0xfafafa;
var _size = 1;

const Geometries = function(THREE) {
    /**
     * create a cube
     * @param {*} size 
     * @param {*} color 
     */
    this.Cube = function(size = _size, color = _color) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
    }

    this.Sphere = function(radius = _size, color = _color) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var sphere = new THREE.Mesh(geometry, material);
        return sphere
    }
};

module.exports = Geometries;