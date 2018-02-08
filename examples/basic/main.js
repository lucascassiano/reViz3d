//executa 1x
var cube;
Setup = function(scene, camera, renderer) {
    cube = Cube();
    scene.add(cube);
    //MODELS.obj.sensor[0].position.y = DATASETS.sensor.positions.y;
    scene.add(MODELS.obj.sensor);

};

//ES6 - ES2015
//loop 30FPS
Update = function(scene, camera, renderer) {
    cube.position.y = DATASETS.sensor.position;
};