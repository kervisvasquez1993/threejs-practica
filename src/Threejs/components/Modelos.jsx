import { useRef, useEffect } from "react";
import { render } from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Modelos = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentRef = mountRef.current;
        currentRef.style.width = "100vw";
        currentRef.style.height = "100vh";
        const { clientWidth: width, clientHeight: height } = currentRef;
        // crear scena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffff)
        // crear camara
        const camara = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        );
        scene.add(camara);
        camara.position.z = 6;
        camara.position.x = 6;
        const rendere = new THREE.WebGLRenderer();
        rendere.setSize(width, height);
        const control = new OrbitControls(camara, rendere.domElement);
        control.enableDamping = true;
        // agregamos elemto a la escena
        currentRef.appendChild(rendere.domElement);
        //agregar cubo
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x0f2c64 });
        const cube = new THREE.Mesh(geometry, material);
        const luzAmbiente = new THREE.AmbientLight(0x404040,5); // soft white light
        const light = new THREE.PointLight(0xff0000, 15);
        scene.add(cube);
        camara.lookAt(cube.position);
        scene.add(luzAmbiente);
        light.position.set(8, 8, 8);
        scene.add(light);

        // render scene
        const clock = new THREE.Clock();
       
        const animate = () => {
            const elapsed = clock.getElapsedTime();
            cube.rotation.y = elapsed;
            cube.rotation.x = elapsed;
            cube.position.y = Math.sin(elapsed);

            control.update();
            rendere.render(scene, camara);
            requestAnimationFrame(animate);
        };
        const resize = () => {
            const updateWith = currentRef.clientWidth
            const upateHeight = currentRef.clientHeight
            rendere.setSize(updateWith, upateHeight);
            camara.aspect = updateWith / upateHeight
            camara.updateProjectionMatrix()
        }
        window.addEventListener("resize",resize)
        animate();
        rendere.render(scene, camara);
        return () => {
            currentRef.removeChild(rendere.domElement);
            window.removeEventListener("resize", resize)
        };
    }, []);
    return <div ref={mountRef} style={{ width: "100%", height: "10vh" }}></div>;
};

export default Modelos;
