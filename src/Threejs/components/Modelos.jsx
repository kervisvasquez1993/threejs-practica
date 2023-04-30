import { useRef, useEffect } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" 

const Modelos = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentRef = mountRef.current;
        currentRef.style.width = "100vw";
        currentRef.style.height = "100vh";
        const { clientWidth: width, clientHeight: height } = currentRef;
        // crear scena
        const scene = new THREE.Scene();
        // crear camara
        const camara = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        );
        scene.add(camara);
        camara.position.z = 6
        camara.position.x = 6
        const rendere = new THREE.WebGLRenderer();
        rendere.setSize(width, height);
        const control = new OrbitControls(camara, rendere.domElement)
        // agregamos elemto a la escena
        currentRef.appendChild(rendere.domElement);
        //agregar cubo
        const geometry = new THREE.BoxGeometry(1,1,1)
        const material = new THREE.MeshBasicMaterial({color :0x0f2c64  })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube);
        camara.lookAt(cube.position)
         // render scene
         const animate = () => {
            rendere.render(scene, camara)
            requestAnimationFrame(animate)
         }
         animate()
         rendere.render(scene,camara)
        return () => {
            currentRef.removeChild(rendere.domElement)
        }
    }, []);
    return (
        <div ref={mountRef} style={{ width: "100%", height: "10vh" }}>
        </div>
    );
};

export default Modelos;
