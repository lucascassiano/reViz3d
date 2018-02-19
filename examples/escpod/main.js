/* Basic ReViz3d project
check http://lucascassiano.github.io/reViz3d/ for documentation
*/

var cube;
var t = 0;
//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {

    MODELS.obj.panels_escpod.scale.set(0.1, 0.1, 0.1);
    MODELS.obj.panels_escpod.position.y = 10;
    MODELS.obj.panels_escpod.position.z = -5;
    scene.add(MODELS.obj.panels_escpod);

}

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {

}