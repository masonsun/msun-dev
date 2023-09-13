
import React, { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";


const Rig = () => {
  const camera = useThree((state) => state.camera);
  return useFrame((state) => {
    camera.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    camera.position.z = Math.sin(state.clock.elapsedTime) * 1;
    
  })
};

const CloudsCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 16], fov: 75 }}>
      <ambientLight intensity={2} />
      <pointLight intensity={2} position={[0, 0, -1000]} />
      <Suspense>
        <Cloud position={[-4, -2, -25]} speed={0.2} opacity={1}/>
        <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.5} />
        <Cloud position={[4, -2, -2]} speed={0.2} opacity={0.5} />
        <Cloud position={[4, 2, -2]} speed={0.2} opacity={0.25} />
        <Cloud position={[-10, -2, -15]} speed={0.2} opacity={1} />
      </Suspense>
      <Sky 
        sunPosition={[5, 1, 8]} 
        azimuth={0.1} 
        turbidity={2}
        rayleigh={0.5} 
        inclination={0.6} 
        distance={1000} 
      />
      <Rig />
    </Canvas>
  )
};

export default CloudsCanvas;
