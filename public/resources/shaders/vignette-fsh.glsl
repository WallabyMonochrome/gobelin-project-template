uniform sampler2D tDiffuse;
uniform float time;
uniform float intensity;
uniform float dropoff;

varying vec2 vUv;

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    
    // Calculate distance from center
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Apply vignette effect
    float vignette = 1.0 - smoothstep(dropoff, 1.0, dist * intensity);
    
    gl_FragColor = vec4(color.rgb * vignette, color.a);
}
