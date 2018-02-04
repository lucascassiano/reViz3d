varying float posz;

vec3 rgb2hsv(vec3 c)
{
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
	vec3 c = vec3(posz*0.1-0.2, 1.0, 1.0);

	vec3 fragHSB = hsv2rgb(c);

	//gl_FragColor = vec4(c.x ,c.y, c.z, 1.0);
	/*
	gl_FragColor = vec4(1.0,	// R
											1.0,	// G
											posy, // B
											1.0); // A
											*/

	gl_FragColor = vec4(fragHSB, 1.0);

	//gl_FragColor = vec4(posz*0.1, posz*0.1, posz*0.1, 1.0); //RGBA
}