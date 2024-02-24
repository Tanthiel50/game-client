import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

//helvetiker_regular.typeface.json
//Governor_Regular.json
export default function Experience() {
  // const donutsGroup = useRef()
  const donuts = useRef([]);
  const [matcapTexture] = useMatcapTexture("3B3C3F_DAD9D5_929290_ABACA8", 512);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for(const donut of donuts.current)
    {
        donut.rotation.y += delta *0.3
        donut.rotation.z += delta * 0.3;
    }
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      <Center>
        <Text3D
          material={material}
          font="./fonts/Governor_Regular.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          fUCK YOU 
        </Text3D>
      </Center>
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => {
            donuts.current[index] = element;
          }}
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
