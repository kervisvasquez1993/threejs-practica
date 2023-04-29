import {useRef, useEffect} from 'react'
import * as THREE from 'three'

const Modelos = () => {
    const mountRef = useRef(null)
    useEffect(() => {
        // crear scena 
        const scene = new THREE.Scene()
        // crear camara
        const camara = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
    }, [])
  return (
    <div>Modelos</div>
  )
}

export default Modelos