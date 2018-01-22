import * as THREE from "three";

export default class Text {
  constructor(font) {
    this.fontLoader = new THREE.FontLoader();
    this.loadedFont = this.fontLoader.parse(font);
    this.createObject = this.createObject.bind(this);
  }

  createObject(msg, size) {
    var loadedFont = this.loadedFont;

    var xMid, text;
    var textShape = new THREE.BufferGeometry();
    var color = 0xffffff;

    var matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    });

    var shapes = loadedFont.generateShapes(msg, size, 2);

    var geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();
    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    textShape.fromGeometry(geometry);
    text = new THREE.Mesh(textShape, matLite);

    return text;
  }
}
