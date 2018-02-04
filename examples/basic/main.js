// the setup routine runs once when you press reset:

var plane;

Setup = function(scene, camera, renderer) {

    console.log("IMAGES", IMAGES);
    //var texture = THREE.load

    //var texture = new THREE.TextureLoader().load(IMAGES.png.lucas);
    //var texture = IMAGES.png.b;
    //var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, visible: true, side: side });


    //let image = "data:image/png;base64," + IMAGES.png.b;
    //console.log("lucas", image);

    //var texture = new THREE.TextureLoader().load(image);
    //scene.add(IMAGES.svg.oval);

    var material = new THREE.MeshBasicMaterial({
        map: IMAGES.svg.text,
        side: THREE.DoubleSide,
        transparent: true,
    });

    var geometry = new THREE.PlaneGeometry(10, 10, 7, 7);
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = 5;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);
};

Update = function(scene, camera, renderer) {

};