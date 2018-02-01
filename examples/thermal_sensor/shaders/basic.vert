uniform float time;
attribute vec3 endPosition;
varying float posz;

void main() {  // pass the color to the fragment shader
  //gl_PointSize = size;
  vec3 newPos = position;
  //newPos.z = time; //newPos.y;
  //newPos = endPosition;
  posz = newPos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
  
}