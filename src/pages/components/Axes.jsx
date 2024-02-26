import { useMatcapTexture, Clone, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const material = new THREE.MeshMatcapMaterial();

export default function Axes(props) {
  const [matcapTexture] = useMatcapTexture("430404_BD9295_7E1E21_94544C", 512);
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

  useFrame(({clock}, delta) => {
    const time = clock.getElapsedTime()
    axe.current.rotation.y += delta * 0.2;
    axe.current.rotation.z += delta * 0.2;
    axe.current.position.z += (Math.sin(time/5))*0.005;
  });

  return (
    <>
      <Clone
        {...props}
        ref={axe}
        object={model.scene}
        material={material}
        scale={1 + (Math.random() - 0.5)}
        position-y={(Math.random() - 0.5) * 16}
        position-x={(Math.random() - 0.5) * 16}
        position-z={(Math.random() - 0.5) * 16}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
      ></Clone>
    </>
  );
}

useGLTF.preload("./Axe.glb");
