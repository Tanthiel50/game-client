import { useMatcapTexture, Clone, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const material = new THREE.MeshMatcapMaterial();

export default function Axes(props) {
  const [matcapTexture] = useMatcapTexture("432322_5E3839_170C0B_543433", 512);
  const model = useGLTF("./Axe.glb");
  const axePosition = model.scene.position;
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.material = material;
    }
  });

  const axe = useRef([]);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    axe.current.rotation.y += delta * 0.3;
    axe.current.rotation.z += delta * 0.3;
  });

  return (
    <>
      <Clone
        {...props}
        ref={axe}
        object={model.scene}
        material={material}
        scale={1.0 + (Math.random() - 0.5)}
        position-y={(Math.random() - 0.5) * 16}
        position-x={(Math.random() - 0.5) * 16}
        //position-x={axePosition.x}
        position-z={(Math.random() - 0.5) * 16}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
      ></Clone>
    </>
  );
}

useGLTF.preload("./Axe.glb");
