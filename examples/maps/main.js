/*  ReViz3d project based on Maps Template
check http://lucascassiano.github.io/reViz3d/ for documentation
*/
CONTEXT_MAP = true;

var cube;
var t = 0;

var Map2Scene = function(map, lat, long, ) {
    //42.360462
    // -71.08725
}

//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    // 77 Massachusetts Ave, Cambridge, MA 02139
    //42.359849, -71.092073 -<dome

    var zoom = 18;
    var size = 14;

    var map = MapPlane(zoom, 42.360462, -71.087256, size);
    map.position.y = 2;
    scene.add(map);
    cube = new Cube(1, 0x0000ff);
    var a = sphericalMarcator.ll([0, 0], zoom);

    cube.position.x = (a[0] / (1024 + 1024 * size)) - size / 2;
    cube.position.z = (a[1] / (1024 * 1024 * size)) - size / 2;
    cube.position.y = 2;
    scene.add(cube);
    console.log("a", a, cube.position);
}

//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    //cube.position.y = 5 * Math.sin(t);
    //t += 1.0 / 30;
}