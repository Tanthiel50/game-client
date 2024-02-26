import {
  useGLTF,
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { useRef, useEffect, useCallback } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Axes from "./Axes";

// title and axe material 
const material = new THREE.MeshMatcapMaterial();

// scroll listening part
let scrollY = window.scrollY;
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
  console.log(scrollY);})

// function begin  

export default function Experience() {
  const text3d = useRef();

  const [matcapTexture] = useMatcapTexture("432322_5E3839_170C0B_543433", 512);


  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    text3d.current.position.z = scrollY/25;
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />
      <color args={["#17100d"]} attach={"background"} />
      <Center>
        <Float rotationIntensity={0} speed={0}>
          <Text3D
            ref={text3d}
            material={material}
            font="./fonts/Governor_Regular.json"
            size={1}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {`le cercueil\nde tes morts`}
          </Text3D>
        </Float>
      </Center>
      {[...Array(100).keys()].map((i) => (
        <Axes key={i} />
      ))}
    </>
  );
}
