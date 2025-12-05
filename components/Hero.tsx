import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointer2, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

// 3D Diamond Component
const DiamondModel = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Auto Rotation
    meshRef.current.rotation.y += delta * 0.15;
    
    // Subtle Mouse Follow
    const targetX = mousePos.current.x * 0.5;
    const targetY = mousePos.current.y * 0.5;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetX, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.5}>
        <octahedronGeometry args={[1, 0]} />
        {/* Glass Material */}
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          chromaticAberration={0.5} // High value for that "diamond" dispersion look
          anisotropy={0.5}
          color="#a3c1ff"
          resolution={512}
        />
        {/* Wireframe Overlay for "Tech" feel */}
        <lineSegments>
          <wireframeGeometry args={[new THREE.OctahedronGeometry(1, 0)]} />
          <lineBasicMaterial color="#60A5FA" transparent opacity={0.15} linewidth={1} />
        </lineSegments>
      </mesh>
    </Float>
  );
};

// Lighting that follows mouse
const MovingLight = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mousePos.current.x * 10;
      lightRef.current.position.y = -mousePos.current.y * 10;
    }
  });

  return (
    <spotLight
      ref={lightRef}
      position={[0, 0, 10]}
      angle={0.5}
      penumbra={1}
      intensity={2}
      color="#60A5FA"
      distance={20}
    />
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.2} />
          <MovingLight mousePos={mousePos} />
          <Suspense fallback={null}>
             <DiamondModel mousePos={mousePos} />
             <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-primary mb-6"
        >
          Valor que se vê. <br />
          <span className="italic text-white">Resultados</span> que se medem.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-secondary text-base md:text-lg tracking-wide max-w-2xl mx-auto mb-12"
        >
          Consultoria especializada em Cibersegurança, Observabilidade e Governança. Transformando recursos em resultados desde 2017.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="#trust"
            className="group relative inline-block px-8 py-3 overflow-hidden rounded-sm bg-transparent border border-white/20 hover:border-white/50 transition-colors duration-300"
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-black font-sans text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300">
              Conheça nossa expertise
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;