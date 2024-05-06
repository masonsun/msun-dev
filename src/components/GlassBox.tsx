import { useLayoutEffect, useEffect, useRef } from "react";
import { useTheme } from "@mui/material";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  useMask,
  useGLTF,
  useAnimations,
  Float,
  Instance,
  Instances,
  CameraControls,
} from "@react-three/drei";

import {
  Lightformer,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";

// @ts-ignore
function AquariumWithoutSpheres({ spheres }) {
  const theme = useTheme();
  return (
    <Canvas
      shadows
      camera={{ position: [40, 0, 0], fov: 35, near: 1, far: 50 }}
    >
      <color attach="background" args={[theme.palette.primary.main]} />
      {/** Glass aquarium */}
      <Aquarium position={[0, 2, 0]}>
        <Float rotationIntensity={8} floatIntensity={10} speed={2}>
          <OneSpinningObject
            position={[0, -0.5, -1]}
            rotation={[0, Math.PI, 0]}
            scale={40}
          />
        </Float>
        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
          {
            // @ts-ignore
            spheres.map(([scale, color, speed, position], index) => (
              <Sphere
                key={index}
                scale={scale}
                color={color}
                speed={speed}
                position={position}
              />
            ))
          }
        </Instances>
      </Aquarium>
      {/** Custom environment map */}
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <CameraControls
        truckSpeed={0}
        dollySpeed={0}
        azimuthAngle={Math.PI / 3}
        polarAngle={Math.PI / 2}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

// @ts-ignore
function Aquarium({ children, ...props }) {
  const ref = useRef();
  // @ts-ignore
  const { nodes } = useGLTF("glb/glass-box.glb");
  const stencil = useMask(1, false);
  useLayoutEffect(() => {
    // @ts-ignore
    ref.current.traverse(
      (child) => child.material && Object.assign(child.material, { ...stencil })
    );
  }, []);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        scale={[0.61 * 6, 0.8 * 6, 1 * 6]}
        geometry={nodes.Cube.geometry}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
}

// @ts-ignore
function Sphere({ position, scale = 1, speed = 0.1, color = "black" }) {
  return (
    <Float rotationIntensity={40} floatIntensity={20} speed={speed / 2}>
      {/* @ts-ignore */}
      <Instance position={position} scale={scale} color={color} />
    </Float>
  );
}

// @ts-ignore
function OneSpinningObject(props) {
  const { scene, animations } = useGLTF("glb/tennis-ball.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  useEffect(() => {
    mixer.timeScale = 0.5;
  }, []);
  useFrame(
    (state) => (scene.rotation.z = Math.sin(state.clock.elapsedTime / 4) / 2)
  );
  return <primitive object={scene} {...props} />;
}

export default function GlassBox() {
  return (
    <AquariumWithoutSpheres
      spheres={[
        [0.75, "lightblue", 0.1, [-4, 2, -2]],
        [1.25, "aquamarine", 0.2, [4, -3, 2]],
        [1.5, "lightblue", 0.3, [-4, -2, -3]],
        [2, "pink", 0.3, [-4, 2, -4]],
        [2, "skyblue", 0.3, [-4, 2, -4]],
        [2, "lightblue", 0.1, [-4, 2, -2]],
        [1.5, "pink", 0.2, [4, -3, 2]],
        [1.25, "aquamarine", 0.3, [-4, -2, -3]],
        [1, "skyblue", 0.3, [-4, 2, -4]],
      ]}
    />
  );
}
