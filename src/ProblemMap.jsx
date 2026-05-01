import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const modeConfig = {
  observe: { accent: "#2b6cff", speed: 0.46, energy: 0.55 },
  prototype: { accent: "#16a36a", speed: 0.74, energy: 0.82 },
  ship: { accent: "#f2b705", speed: 1.02, energy: 1 },
};

const layers = [
  [
    { position: [-1.75, 0.72, 0] },
    { position: [-1.75, 0, 0.08] },
    { position: [-1.75, -0.72, 0] },
  ],
  [
    { position: [-0.62, 1.05, 0.02] },
    { position: [-0.62, 0.35, -0.08] },
    { position: [-0.62, -0.35, 0.1] },
    { position: [-0.62, -1.05, -0.02] },
  ],
  [
    { position: [0.55, 0.82, -0.08] },
    { position: [0.55, 0.18, 0.12] },
    { position: [0.55, -0.48, -0.02] },
  ],
  [{ position: [1.75, 0.08, 0] }],
];

const nodes = layers.flat();

const edges = [];
let offset = 0;
for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
  const fromStart = offset;
  const toStart = offset + layers[layerIndex].length;
  layers[layerIndex].forEach((_, fromIndex) => {
    layers[layerIndex + 1].forEach((__, toIndex) => {
      edges.push([fromStart + fromIndex, toStart + toIndex]);
    });
  });
  offset += layers[layerIndex].length;
}

function Connector({ start, end, active }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={active} transparent opacity={0.18} />
    </line>
  );
}

function Neuron({ position, index, mode }) {
  const ref = useRef();
  const { accent, energy } = modeConfig[mode];
  const isEndpoint = index < 3 || index === nodes.length - 1;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = Math.sin(clock.elapsedTime * 1.8 + index * 0.7) * 0.035 * energy;
    ref.current.scale.setScalar(1 + pulse);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.105, 32, 32]} />
        <meshStandardMaterial
          color={isEndpoint ? accent : "#f8fafc"}
          emissive={isEndpoint ? accent : "#d8e1ea"}
          emissiveIntensity={isEndpoint ? 0.12 : 0.03}
          roughness={0.32}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

function SignalPulse({ edge, index, mode }) {
  const ref = useRef();
  const [from, to] = edge;
  const start = new THREE.Vector3(...nodes[from].position);
  const end = new THREE.Vector3(...nodes[to].position);
  const { accent, speed } = modeConfig[mode];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * speed + index * 0.073) % 1;
    ref.current.position.copy(start).lerp(end, t);
    ref.current.scale.setScalar(0.48 + Math.sin(t * Math.PI) * 0.42);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 18, 18]} />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.28} />
    </mesh>
  );
}

function Scene({ mode }) {
  const group = useRef();
  const { accent, energy } = modeConfig[mode];

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * 0.2;
    group.current.rotation.x = -pointer.y * 0.1;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.4 + energy * 0.35} />
      <pointLight position={[0, 0, 2.2]} intensity={0.8} color={accent} />
      <group ref={group}>
        {edges.map(([from, to], index) => (
          <Connector key={`edge-${index}`} start={nodes[from].position} end={nodes[to].position} active={accent} />
        ))}
        {nodes.map((node, index) => (
          <Neuron key={`node-${index}`} position={node.position} index={index} mode={mode} />
        ))}
        {edges.filter((_, index) => index % 3 === 0).map((edge, index) => (
          <SignalPulse key={`pulse-${index}`} edge={edge} index={index} mode={mode} />
        ))}
      </group>
    </>
  );
}

export default function NeuralLab({ mode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ preserveDrawingBuffer: true, alpha: false }}
    >
      <color attach="background" args={["#f6f4ee"]} />
      <Scene mode={mode} />
    </Canvas>
  );
}
