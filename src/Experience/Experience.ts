import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { normalLocal } from "three/tsl";
import { Pane } from "tweakpane";

export default class Experience {
  renderer = new THREE.WebGPURenderer({ antialias: true });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  controls = new OrbitControls(this.camera, this.renderer.domElement);
  timer = new THREE.Timer();
  debug = new Pane();

  async init() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.setClearColor(0x000000);
    await this.renderer.init();
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(9, 2, -5);
    this.controls.enableDamping = true;

    const cube = this.createCube();

    this.scene.add(cube);
    this.debug.addBinding(cube.rotation, "y", {
      label: "rotationY",
      min: 0,
      max: Math.PI * 2,
    });

    this.timer.connect(document);
    window.addEventListener("resize", this.resize);
    this.renderer.setAnimationLoop(this.update);
  }

  createCube(size = 2) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicNodeMaterial();
    material.colorNode = normalLocal.mul(0.5).add(0.5);

    return new THREE.Mesh(geometry, material);
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  update = (timestamp: number) => {
    this.timer.update(timestamp);
    const delta = this.timer.getDelta();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
