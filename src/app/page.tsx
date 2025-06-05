"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import AuthModal from "@/components/auth/AuthModal";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text, Center } from "@react-three/drei";
import type { Points, PointLight, Group } from "three";

function FloatingLogo() {
  const mesh = useRef<Group>(null!);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text
          ref={mesh}
          fontSize={1.5}
          font="/fonts/Inter-Bold.ttf"
          characters="THC"
          material-toneMapped={false}
        >
          THC
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Text>
      </Center>
    </Float>
  );
}

function ParticleField() {
  const count = 2000;
  const mesh = useRef<Points>(null!);
  const light = useRef<PointLight>(null!);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.4;
      colors[i * 3 + 2] = Math.random() * 0.3 + 0.7;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (mesh.current && light.current) {
      // Rotate based on mouse position
      const targetRotationX = mousePosition.current.y * 0.5;
      const targetRotationY = mousePosition.current.x * 0.5;

      mesh.current.rotation.x +=
        (targetRotationX - mesh.current.rotation.x) * 0.02;
      mesh.current.rotation.y +=
        (targetRotationY - mesh.current.rotation.y) * 0.02;

      // Animate particles
      const positions = mesh.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] +=
          Math.sin(state.clock.elapsedTime + positions[i] * 0.1) * 0.01;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;

      // Animate light
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 3;
      light.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
      light.current.intensity =
        1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={20} intensity={1.5} color="#8B5CF6" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            itemSize={3}
            array={colors}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 border-2 border-purple-500 rounded-full transition-transform duration-100 ease-out mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full transition-transform duration-75 ease-out mix-blend-difference"
      />
    </>
  );
}

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((e.clientX - centerX) * 0.1);
      y.set((e.clientY - centerY) * 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0817] cursor-none">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Particle Background - Fixed positioning to cover entire viewport */}
        <div className="fixed inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0817] via-purple-900/20 to-black/20" />
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ position: "fixed", zIndex: 1 }}
          >
            <Environment preset="night" />
            <ParticleField />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative" style={{ zIndex: 50 }}>
          <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center px-6"
          >
            <motion.div
              style={{ scale }}
              className="max-w-7xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative pt-20"
              >
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80"
                  style={{ zIndex: 51 }}
                >
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <Environment preset="sunset" />
                    <FloatingLogo />
                  </Canvas>
                </div>

                <div className="relative" style={{ zIndex: 52 }}>
                  <motion.h1
                    style={{ x, y }}
                    className="text-7xl md:text-8xl font-bold mb-8 mt-10"
                  >
                    <span className="relative inline-block">
                      <span className="relative text-white font-extrabold [text-shadow:_0_2px_10px_rgba(255,255,255,0.3)]">
                        Create.
                        <br />
                        Connect.
                        <br />
                        Conquer.
                      </span>
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-white mb-12 max-w-3xl mx-auto font-semibold [text-shadow:_0_1px_10px_rgba(255,255,255,0.3)]"
                  >
                    Welcome to the future of influencer marketing. A space where
                    creativity meets opportunity, powered by cutting-edge
                    technology and endless possibilities.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                  >
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold transform transition-all hover:scale-105 focus:outline-none overflow-hidden shadow-[0_4px_20px_rgba(168,85,247,0.5)]"
                    >
                      <span className="relative z-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                        Start Your Journey
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white font-semibold hover:bg-white/30 transform transition-all hover:scale-105 focus:outline-none shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
                    >
                      <span className="[text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                        Explore Creators
                      </span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-2">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-2"
                >
                  <motion.div className="w-1 h-1 rounded-full bg-gray-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
