import { useFrame } from '@react-three/fiber';
import { useRef,useMemo } from 'react';
import { TextureLoader } from 'three';
import * as THREE from "three";
import { useLoader } from '@react-three/fiber';
import earth from "../assets/landing-earth.png"

function RotatingEarth(){
    const earthRef = useRef();
    const atmosphereRef = useRef();
    const texture = useLoader(TextureLoader, earth);
    useMemo(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      
      texture.anisotropy = 16;
      
      texture.offset.set(0, 0);
      texture.repeat.set(2, 1);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
    }
  }, [texture]);
  
    const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
  }, []);
  useFrame(() => {
    if(earthRef.current){
      earthRef.current.rotation.y += 0.01;
    }
    if(atmosphereRef.current){
        atmosphereRef.current.rotation.y +=0.01
    }
    
  });
  
  return (
    <group>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 128, 32]} />
        <meshPhongMaterial 
          map={texture}
          shininess={100}
          specular={new THREE.Color(0x111111)}
        />
      </mesh>
      

      <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={atmosphereMaterial} />
      </mesh>

      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A90E2" />
    </group>
  );
}
export default RotatingEarth