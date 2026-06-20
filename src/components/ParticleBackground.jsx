import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle field component
function ParticleField({ count = 2000 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#bf00ff'),
      new THREE.Color('#ff0090'),
      new THREE.Color('#00ff41'),
      new THREE.Color('#0080ff'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10;
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={light} color="#00f5ff" intensity={2} distance={30} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// Floating grid lines
function GridLines() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.z = ((state.clock.elapsedTime * 2) % 10) - 20;
    }
  });

  const gridHelper = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const lines = [];
    const color = new THREE.Color('#00f5ff');

    // Horizontal lines
    for (let i = -10; i <= 10; i++) {
      lines.push(-20, i * 2, 0, 20, i * 2, 0);
    }
    // Vertical lines
    for (let i = -20; i <= 20; i++) {
      lines.push(i * 2, -10, 0, i * 2, 10, 0);
    }

    const positions = new Float32Array(lines);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return geometry;
  }, []);

  return (
    <lineSegments ref={mesh} geometry={gridHelper} position={[0, 0, -15]}>
      <lineBasicMaterial color="#00f5ff" transparent opacity={0.05} />
    </lineSegments>
  );
}

// Floating orb
function FloatingOrb({ position, color, speed }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 1.5;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <ParticleField count={1500} />
        <GridLines />
        <FloatingOrb position={[-8, 3, -5]} color="#00f5ff" speed={0.5} />
        <FloatingOrb position={[8, -2, -8]} color="#bf00ff" speed={0.7} />
        <FloatingOrb position={[0, 5, -10]} color="#ff0090" speed={0.3} />
      </Canvas>
    </div>
  );
}
