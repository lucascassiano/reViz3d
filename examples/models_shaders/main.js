/* Basic ReViz3d project
check http://lucascassiano.github.io/reViz3d/ for documentation
*/

var cube;
var t = 0;
//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    cube = new Cube();
    //scene.add(cube);
    scene.add(MODELS.obj.dragon);
}

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    cube.position.y = 5 * Math.sin(t);
    t += 1.0 / 30;
}