import {
  useGLTF,
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import Axes from "./Axes";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

//helvetiker_regular.typeface.json
//Governor_Regular.json
export default function Experience() {
  // const donutsGroup = useRef()

  const donuts = useRef([]);
  const [matcapTexture] = useMatcapTexture("432322_5E3839_170C0B_543433", 512);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  // useFrame((state, delta) => {
  //   for (const donut of donuts.current) {
  //     donut.rotation.y += delta * 0.3;
  //     donut.rotation.z += delta * 0.3;
  //   }
  // });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      {/* <OrbitControls makeDefault /> */}
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      <color args={["#17100d"]} attach={"background"} />
      <Center>
        <Float speed={1}>
          <Text3D
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

      {/* {[...Array(100)].map((value, index) => (
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
      ))} */}

      {[...Array(100).keys()].map((i) => (
        <Axes key={i} />
      ))}
    </>
  );
}