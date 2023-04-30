import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ModeloEjemplo2 = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentMount;
        const scene = new THREE.Scene();
        const camere = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        );

        camere.position.z = 10;
        scene.add(camere);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(width, height);
        currentMount.appendChild(renderer.domElement);
        const controls = new OrbitControls(camere, renderer.domElement);
        // controls.target = new THREE.Vector3(3,3,3)
        controls.enableDamping = true;
        // texturas
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("./texturas/basecolor.jpg");
        const aoMap = textureLoader.load("./texturas/ao.jpg");
        const rounghnessMap = textureLoader.load("./texturas/roughness.jpg");
        const normalMap = textureLoader.load("./texturas/normal.jpg");
        const heightMap = textureLoader.load("./texturas/height.png");
        //CUBO
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 250, 250, 250);
        const material = new THREE.MeshStandardMaterial({
            map: map,
            aoMap: aoMap,
            roughnessMap: rounghnessMap,
            normalMap: normalMap,
            displacementMap: heightMap,
            // wireframe : true
            displacementScale : 0.07
        });
        // const test = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent : true, opacity : 0.3, wireframe : true })
        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(2, 2, 2);
        scene.add(cube);
        // luces ambiants
        const AO = new THREE.AmbientLight(0xffffff, 1);
        scene.add(AO);

        // sheper
        // const geometry = new THREE.SphereGeometry(0.8, 32, 16);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const sphere = new THREE.Mesh(geometry, material);
        // scene.add(sphere);
        // sphere.position.x = 2;
        // sphere.position.y = 2;

        // torus

        // const geometry1 = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
        // const material1 = new THREE.MeshNormalMaterial({flatShading:true});
        // const torusKnot = new THREE.Mesh(geometry1, material1);
        // scene.add(torusKnot);

        // torusKnot.position.x = -2
        // torusKnot.position.y = -0.5
        // torusKnot.position.set(-2, 0.5, 0);
        // torusKnot.scale.x = 2
        // torusKnot.scale.y = 2
        // torusKnot.scale.set(2, 2, 1);
        //render the scene

        const animate = () => {
            controls.update();
            renderer.render(scene, camere);
            requestAnimationFrame(animate);
        };
        animate();
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
