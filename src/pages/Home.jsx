import React from "react";
import "../styles/App.scss";
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'


import HeroBanner from "./components/HeroBanner";

function Home() {

  

  return (
    <div className="App">
      <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}>
          <Canvas
            camera={{ fov: 45, near: 0.1, far: 200, position: [4, -2, 6] }}>
            <Experience />
          </Canvas>
        </div>
       <HeroBanner  />
       <HeroBanner  />
    </div>
  );
}

export default Home;