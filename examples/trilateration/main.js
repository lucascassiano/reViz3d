/* Basic ReViz3d project
check http://lucascassiano.github.io/reViz3d/ for documentation
*/
var LoadScript = function(name) {
    if (require.cache[require.resolve(DIRECTORY + name)]) {
        delete require.cache[require.resolve(DIRECTORY + name)];
    }
    return require(DIRECTORY + name);
};

var trilateration = LoadScript("/scripts/trilateration.js");

trilateration.addBeacon(0, trilateration.vector(2, 4));
trilateration.addBeacon(1, trilateration.vector(5.5, 13));
trilateration.addBeacon(2, trilateration.vector(11.5, 2));
trilateration.addBeacon(3, trilateration.vector(1.5, 2));


trilateration.setDistance(0, 5.7);
trilateration.setDistance(1, 1.8);
trilateration.setDistance(2, 6.4);
trilateration.setDistance(3, 6.4);

var pos = trilateration.calculatePosition();

console.log("X: " + pos.x + "; Y: " + pos.y); // X: 7; Y: 6.5

//var trilaterate = require(DIRECTORY + "/scripts/trilateration.js");

var cube;
var t = 0;
//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    cube = new Cube();
    scene.add(cube);;
}

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    cube.position.y = 5 * Math.sin(t);
    t += 1.0 / 30;
}