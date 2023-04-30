import { useRef, useEffect } from "react";
import * as THREE from "three";

const ModeloEjemplo2 = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current2;
        const { clientWidth: width, clientHeight: height } = currentMount;
        const scene = new THREE.Scene();
        const camere = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        );
        camere.position.z = 6;
        scene.add(camere);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentMount.appendChild(renderer.domElement);
        //CUBO
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial()
        );
        scene.add(cube);

        //sheper
        // const geometry = new THREE.SphereGeometry(15, 32, 16);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const sphere = new THREE.Mesh(geometry, material);
        // scene.add(sphere);

        //render the scene
        renderer.render(scene, camere);

        return () => {
            currentMount.removeChild(renderer.domElement);
        };
    }, []);
    return (
        <div
            ref={mountRef}
            className="Contenedor3D"
            style={{ width: "100%", height: "100vh" }}
        ></div>
    );
};

export default ModeloEjemplo2;
