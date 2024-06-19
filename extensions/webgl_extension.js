import * as THREE from 'three';

class WebGLExtension {
    constructor(container, data) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
        this.data = data;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update(data) {
        this.data = data;
        this.render();
    }
}
