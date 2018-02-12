var cube;
var t = 0;

var LoadScript = function(name) {
    if (require.cache[require.resolve(DIRECTORY + name)]) {
        delete require.cache[require.resolve(DIRECTORY + name)];
    }
    return require(DIRECTORY + name);
};

LoadScript("/scripts/test.js")();

//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    cube = Cube(2, 0x22acff);
    scene.add(cube);
};

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    cube.position.y = 10 * Math.sin(t);
    t += 1 / 30;
    var s = cube.position.y / 10;
    cube.scale.set(s, s, s);
};