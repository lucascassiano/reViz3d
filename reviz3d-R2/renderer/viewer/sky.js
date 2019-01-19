import * as THREE from 'three';

export default class Sky {

    getObject() {
    
        // SKYDOME
        var vertexShader = `
        varying vec3 vWorldPosition;
			void main() {
				vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
				vWorldPosition = worldPosition.xyz;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
            `;         
        var fragmentShader = `
        uniform vec3 topColor;
			uniform vec3 bottomColor;
			uniform float offset;
			uniform float exponent;
			varying vec3 vWorldPosition;
			void main() {
				float h = normalize( vWorldPosition + offset ).y;
				gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
            }
            `;
        var uniforms = {
            topColor: { type: "c", value: new THREE.Color(0x363636) },
            bottomColor: { type: "c", value: new THREE.Color(0x212121) },
            offset: { type: "f", value: 400 },
            exponent: { type: "f", value: 1.0 }
        };

        var skyGeo = new THREE.SphereBufferGeometry(1000, 32, 15);

        var skyMat = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide
        });

        var sky = new THREE.Mesh(skyGeo, skyMat);
        return sky;
    }
}