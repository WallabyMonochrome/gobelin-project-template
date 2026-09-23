import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from './Experience';

export default class Camera {
    #camera: THREE.PerspectiveCamera;
    #controls: OrbitControls | undefined;
    #experience: Experience;

    constructor(fov = 60, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
        this.#experience = Experience.getInstance();
        this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.#camera.position.set(0, 0, 200);
        const renderer = this.#experience.getRenderer();
        if(!renderer) return;
        this.#controls = new OrbitControls(this.#camera, renderer.domElement);
        this.#controls.enableDamping = true;
        this.#controls.target.set(0, 0, 0);
    }

    get camera() {
        return this.#camera;
    }

    get controls() {
        return this.#controls;
    }

    resize(width: number, height: number) {
        this.#camera.aspect = width / height;
        this.#camera.updateProjectionMatrix();
    }

    step(delta: number) {
        if (this.#controls) {
            this.#controls.update(delta);
        }
    }
}
