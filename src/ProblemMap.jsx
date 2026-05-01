import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const nodes = [
  { label: "messy process", position: [-1.45, 0.62, 0], color: "#2b6cff" },
  { label: "useful data", position: [-0.62, -0.58, 0.18], color: "#16a36a" },
  { label: "AI workflow", position: [0.28, 0.45, -0.1], color: "#1f2937" },
  { label: "prototype", position: [1.08, -0.42, 0.1], color: "#f2b705" },
  { label: "product", position: [1.56, 0.68, -0.04], color: "#2b6cff" },
  { label: "signal", position: [0.08, 1.45, 0.12], color: "#16a36a" },
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [5, 4],
];

function Connector({ start, end }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#9aa5b1" transparent opacity={0.42} />
    </line>
  );
}

function Node({ node, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = Math.sin(clock.elapsedTime * 1.5 + index) * 0.04;
    ref.current.scale.setScalar((hovered ? 1.22 : 1) + pulse);
  });

  return (
    <group position={node.position}>
      <mesh
        ref={ref}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color={node.color} roughness={0.35} metalness={0.08} />
      </mesh>
      <Html center distanceFactor={8} className={hovered ? "node-label active" : "node-label"}>
        {node.label}
      </Html>
    </group>
  );
}

function Scene() {
  const group = useRef();

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * 0.16;
    group.current.rotation.x = -pointer.y * 0.1;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <group ref={group}>
        {edges.map(([from, to]) => (
          <Connector
            key={`${from}-${to}`}
            start={nodes[from].position}
            end={nodes[to].position}
          />
        ))}
        {nodes.map((node, index) => (
          <Node key={node.label} node={node} index={index} />
        ))}
      </group>
    </>
  );
}

export default function ProblemMap() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 44 }}
      dpr={[1, 1.6]}
      gl={{ preserveDrawingBuffer: true, alpha: false }}
    >
      <color attach="background" args={["#f6f4ee"]} />
      <Scene />
    </Canvas>
  );
}
