import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

export default class BaseCube extends THREE.Mesh {
  constructor(size = 2) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });
    
    super(geometry, material);
  }
}
