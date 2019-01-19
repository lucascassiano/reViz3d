import * as THREE from 'three';
import icon_feature_camera from "../../svg/feature_camera.svg";
import icon_feature_microphone from "../../svg/feature_microphone.svg";
import icon_feature_sound from "../../svg/feature_sound.svg";
import icon_feature_display from "../../svg/feature_display.svg";
import icon_feature_touch from "../../svg/feature_touch.svg";
import icon_feature_gps from "../../svg/feature_gps.svg";
import icon_feature_light from "../../svg/feature_light.svg";

let featuresList = {
    camera: {
        name: 'camera',
        icon: icon_feature_camera
    },
    microphone: {
        name: 'microphone',
        icon: icon_feature_microphone
    },
    sound: {
        name: 'sound',
        icon: icon_feature_sound
    },
    display: {
        name: 'display',
        icon: icon_feature_display
    },
    light: {
        name: 'light',
        icon: icon_feature_light
    },
    touch: {
        name: 'touch',
        icon: icon_feature_touch
    },
    gps: {
        name: 'gps',
        icon: icon_feature_gps
    }
};

export default class PhysicalComponents {

    constructor(scene, interactiveObjects) {

        this.scene = scene;
        this.interactiveObjects = interactiveObjects;

        this.objects = [];
        this.gizmos = [];

        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshBasicMaterial({ color: 0xE14D6D });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.componentType = 'PHYSICAL';

        this.objects.push(this.cube);
        let circle = this.drawCircle();
        circle.controls = this.cube;

        var dir = new THREE.Vector3(0, 0, 10);

        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();


        var origin = new THREE.Vector3(0, 0, 0);
        var length = 5;
        var hex = 0xE14D6D;

        var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
        arrowHelper.position.x = this.cube.position.x;
        arrowHelper.position.y = this.cube.position.y;
        arrowHelper.position.z = this.cube.position.z + 1;

        this.scene.add(arrowHelper);


        this.interactiveObjects.add(this.cube);
    }

    add(name = 'untitled', features = [], ip = '', mqtt = {}) {

    }
    getObject = () => {
        return this.cube;
    }

    clearMenu = () => {
        if (this.menu)
            this.scene.remove(this.menu)
    }
    showMenu = (object) => {
        this.clearMenu();

        let circle = this.drawCircle();
        //circle.position.set(object.position);
        circle.position.x = object.position.x;
        circle.position.y = object.position.y;
        circle.position.z = object.position.z;

        circle.related = object;

        this.menu = circle;

        this.scene.add(circle);
    }

    getMesh = () => {
        return this.cube;
    }

    update = () => {
        if (this.menu) {

            this.menu.position.x = this.menu.related.position.x;
            this.menu.position.y = this.menu.related.position.y;
            this.menu.position.z = this.menu.related.position.z;
        }

    }

    drawCircle = (radius = 3, color = 0x17C879, segment = 100) => {

        var lineGeometry = new THREE.Geometry();
        var vertArray = lineGeometry.vertices;
        var angle = 2 * Math.PI / segment;
        var angleButtons = 2 * Math.PI / Object.keys(featuresList).length; //total maximum of features

        for (var i = 0; i < segment + 1; i++) {
            var x = radius * Math.cos(angle * i);
            var y = radius * Math.sin(angle * i);
            vertArray.push(new THREE.Vector3(x, y, 0));
        }

        lineGeometry.computeLineDistances();
        var lineMaterial = new THREE.LineDashedMaterial({ color: color, dashSize: 4, gapSize: 2 });
        var circle = new THREE.Line(lineGeometry, lineMaterial);
        let offset = 0.1;

        //Adding Buttons for each feature
        let features = ['camera', 'microphone', 'sound', 'gps'];

        for (var i = 0; i < features.length; i++) {
            var x = (radius + offset) * Math.cos(angleButtons * i);
            var y = (radius + offset) * Math.sin(angleButtons * i);

            let pos = new THREE.Vector3(x, y, 0);
            let icon = featuresList[features[i]].icon;
            var spriteMap = new THREE.TextureLoader().load(icon);
            var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff, sizeAttenuation: true });

            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.componentType = 'FEATURE_BUTTON';

            //sprite.scale.set(0.2, 0.2, 0);
            sprite.position.set(pos.x, pos.y, 0);
            //vertArray.push(new THREE.Vector3(x, y, 0));
            circle.add(sprite);
        }

        circle.rotation.x = Math.PI / 2;
        circle.position.y = 0;
        return circle;
    }

    addFeature(feature) {

    }




}

var drawProprieties = function (scene, radius = 10, color = 0x17C879, segment = 6) {

    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices;
    var angle = 2 * Math.PI / segment;

    for (var i = 0; i < segment + 1; i++) {
        var x = radius * Math.cos(angle * i);
        var y = radius * Math.sin(angle * i);


        vertArray.push(new THREE.Vector3(x, y, 0));
    }

    lineGeometry.computeLineDistances();
    var lineMaterial = new THREE.LineDashedMaterial({ color: color, dashSize: 4, gapSize: 2 });
    var circle = new THREE.Line(lineGeometry, lineMaterial);

    circle.rotation.x = Math.PI / 2;
    circle.position.y = 0;
    return circle;
}


/*
function PhysicalComponent() {

    this.type = 'PhysicalComponent';

    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    THREE.Mesh.call(this, this.geometry, this.material);

    this.group = new THREE.Group();

    var resolution = 100;
    var amplitude = 100;
    var size = 360 / resolution;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, opacity: 1.0 });
    for (var i = 0; i <= resolution; i++) {
        var segment = (i * size) * Math.PI / 180;
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(Math.cos(segment) * amplitude, 0, Math.sin(segment) * amplitude)));
    }

    var line = new THREE.Line(geometry, material);
    //scene.add(line);
}

PhysicalComponent.prototype = Object.create(THREE.Groupe.prototype);
PhysicalComponent.prototype.constructor = PhysicalComponent;

PhysicalComponent.prototype.getMesh = function () {

    return this.mesh;

}

export default PhysicalComponent;
*/