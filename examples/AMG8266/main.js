// the setup routine runs once when you press reset:

var sphere;
var t = 0;
var label;
var uniforms = {
    time: {
        value: 1.0
    },
    vertex_color: 1.0
};

var attributes = {
    size: {
        type: "f",
        value: []
    },
    endPosition: {
        type: "v3",
        value: []
    }
};

var plane;
var plane2;

var addModels = (scene) => {
    for (var i in MODELS.obj) {
        scene.add(MODELS.obj[i]);
    }
}

Setup = function(scene, camera, renderer) {
    var vert = SHADERS.vertex.basic;
    var frag = SHADERS.fragment.basic;
    var frag1 = SHADERS.fragment.wireframe;

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: vert,
        fragmentShader: frag,
        wireframe: false,
        transparent: true,
        opacity: 0.1
    });

    var material1 = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: vert,
        fragmentShader: frag1,
        wireframe: true,
        transparent: true,
    });

    var geometry = new THREE.PlaneBufferGeometry(10, 10, 7, 7);
    var total = geometry.attributes.position.count;

    //models.obj.sensor_amg8833.scale.set(0.5, 0.5, 0.5);

    //console.log(total);
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = 5;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    plane2 = new THREE.Mesh(geometry, material1);
    plane2.position.y = 5;
    plane2.rotation.x = -Math.PI * 0.5;
    scene.add(plane2);

    scene.add(label);
    //MODELS.OBJ.sensor.scale.set(0.5, 0.5, 0.5);
    var material3 = new THREE.MeshLambertMaterial({
        color: 0x777777
    });
    //addModels(scene);
    MODELS.obj.sensor.traverse(function(child) {
        child.material = material3;
    });

    MODELS.obj.sensor.scale.set(0.5, 0.5, 0.5);
    scene.add(MODELS.obj.sensor);

    //scene.add();

    //ctx.font = "12px Helvetica";
    //ctx.fillStyle = "#fff";
    //ctx.fillText("Lucas Cassiano", 10, 10);
    //console.log(plane);
    //var cube = Cube();
    // cube.position.y = DATASETS.data.sensor[0].position.y;
    //scene.add(cube);
};

Update = function(scene, camera, renderer) {

    var total = plane.geometry.attributes.position.array.length;
    var k = 0;
    if (_this.serial)
        for (var i = 2; i <= total; i += 3) {
            if (k <= _this.serial.data.length) {
                plane.geometry.attributes.position.array[i] = (SERIAL.data[k] - 25);
            }
            k++;
        }

    plane.geometry.attributes.position.needsUpdate = true;
};