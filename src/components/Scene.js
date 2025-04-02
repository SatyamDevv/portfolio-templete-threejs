"use client";

import {
  Environment,
  Float,
  Loader,
  MeshDistortMaterial,
  ScrollControls,
  Sphere,
  useScroll
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Color } from "three";

// Abstract Geometric Element that morphs and changes color
function GeometricElement({ position, color, scale, distortSpeed, distortIntensity, section }) {
  const mesh = useRef();
  const data = useScroll();
  
  const materialRef = useRef();
  const baseColor = new Color(color);
  const targetColor = useMemo(() => new Color(color).offsetHSL(0, 0.2, 0.1), [color]);
  
  // Respond to scroll position
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    
    // Calculate section influence based on scroll
    const currentSection = Math.floor(data.offset * 5);
    const sectionInfluence = currentSection === section ? 1 : 0.2;
    
    // Apply rotation and scale based on section
    mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1 * sectionInfluence;
    mesh.current.rotation.y = Math.sin(time * 0.1) * 0.2 * sectionInfluence;
    mesh.current.scale.set(
      scale + Math.sin(time * 0.3) * 0.1 * sectionInfluence,
      scale + Math.sin(time * 0.2) * 0.1 * sectionInfluence,
      scale + Math.sin(time * 0.3) * 0.1 * sectionInfluence
    );
    
    // Lerp color based on section
    if (materialRef.current) {
      const targetInfluence = Math.sin(time) * 0.5 + 0.5;
      materialRef.current.color.copy(baseColor).lerp(
        targetColor, 
        targetInfluence * sectionInfluence
      );
      
      // Adjust distortion based on section influence
      materialRef.current.distort = 0.2 + Math.sin(time * distortSpeed) * 0.1 * sectionInfluence;
    }
  });
  
  return (
    <Float
      speed={2} 
      rotationIntensity={0.4 * (section % 2 === 0 ? 1 : -1)}
      floatIntensity={0.3}
    >
      <mesh ref={mesh} position={position} castShadow>
        {section % 2 === 0 ? (
          <icosahedronGeometry args={[1, 4]} />
        ) : (
          <dodecahedronGeometry args={[1, 0]} />
        )}
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          speed={distortSpeed}
          distort={distortIntensity}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Interactive particles system 
function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 500;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 25;
      positions[idx + 1] = (Math.random() - 0.5) * 25;
      positions[idx + 2] = (Math.random() - 0.5) * 25;
    }
    
    return positions;
  }, [particleCount]);
  
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const time = clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Interactive background planes that respond to scroll
function BackgroundPlanes({ count = 10 }) {
  const data = useScroll();
  const group = useRef();
  
  useFrame(() => {
    if (!group.current) return;
    const scrollOffset = data.offset;
    
    // Move planes based on scroll position
    group.current.children.forEach((plane, i) => {
      const z = i * -4 + scrollOffset * 15;
      plane.position.z = ((z % 40) - 20);
      plane.material.opacity = 0.1 + 0.1 * Math.sin(scrollOffset * Math.PI * 2);
    });
  });
  
  // Create planes
  const planes = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const size = 10 + i * 0.8;
      items.push(
        <mesh 
          key={i}
          position={[0, 0, -i * 4]}
          rotation={[0, 0, Math.PI / (4 + i * 0.2)]}
        >
          <planeGeometry args={[size, size]} />
          <meshStandardMaterial 
            color={new Color().setHSL(i * 0.1, 0.8, 0.3)}
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
    return items;
  }, [count]);
  
  return <group ref={group}>{planes}</group>;
}

// Main workspace where content sections will appear
function InteractiveWorkspace() {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  
  // Generate colors for each section
  const sectionColors = useMemo(() => [
    '#4f46e5', // Indigo
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#8b5cf6', // Purple
    '#14b8a6', // Teal
  ], []);
  
  // Create geometric elements for each section
  const geometricElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < 5; i++) {
      // Create multiple elements per section
      for (let j = 0; j < 3; j++) {
        const angle = j * Math.PI * 2 / 3;
        const radius = 3 + (i % 2) * 0.5;
        elements.push(
          <GeometricElement
            key={`${i}-${j}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              -i * 5
            ]}
            color={sectionColors[i]}
            scale={0.5 + j * 0.2}
            distortSpeed={0.5 + j * 0.2}
            distortIntensity={0.2 + j * 0.1}
            section={i}
          />
        );
      }
      
      // Add center piece for each section
      elements.push(
        <Sphere
          key={`center-${i}`}
          position={[0, 0, -i * 5]}
          args={[0.8, 16, 16]}
        >
          <MeshDistortMaterial
            color={sectionColors[i]}
            speed={0.3}
            distort={0.4}
            metalness={1}
            roughness={0.1}
            envMapIntensity={1}
          />
        </Sphere>
      );
    }
    return elements;
  }, [sectionColors]);
  
  useFrame(() => {
    // We could add any global animations here
  });
  
  return (
    <group>
      <BackgroundPlanes count={15} />
      <ParticleField />
      {geometricElements}
    </group>
  );
}

// Main Scene Component
export default function Scene() {
  // Notify parent when scene is loaded
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scene-loaded'));
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 70 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050816']} />
        
        {/* Optimized Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#5e4fff" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ScrollControls pages={5} damping={0.2} distance={1}>
            <InteractiveWorkspace />
          </ScrollControls>
        </Suspense>
        
        <fog attach="fog" args={['#070b1a', 5, 30]} />
      </Canvas>
      
      <Loader />
    </div>
  );
}
