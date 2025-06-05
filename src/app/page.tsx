"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
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

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${
          mousePosition.x
        }deg)`,
      }}
      className="relative group transition-all duration-200 ease-out"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-colors" />
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(138,58,238,0.1),rgba(255,255,255,0)_100%)]" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-br from-white to-white/80 bg-clip-text">
            {title}
          </h3>
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  index,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  index: number;
}) {
  const countingValue = useMotionValue(0);
  const displayValue = useMotionValue(prefix + "0" + suffix);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = animate(countingValue, value, {
      duration: 2,
      delay: index * 0.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        displayValue.set(prefix + Math.round(latest) + suffix);
      },
    });
    return controls.stop;
  }, [countingValue, value, prefix, suffix, index]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-lg"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="relative z-10"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {useTransform(displayValue, (v) => v)}
          </motion.h3>
          <p className="text-gray-300 text-lg font-medium">{label}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  index,
}: {
  name: string;
  role: string;
  quote: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="relative z-10"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <div className="relative w-16 h-16 mr-4">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur group-hover:blur-md transition-all duration-300" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <motion.h4
                className="text-xl font-bold text-white"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h4>
              <p className="text-purple-300">{role}</p>
            </div>
          </div>
          <blockquote className="relative">
            <div className="absolute -top-4 -left-2 text-4xl text-purple-500/20">
              &ldquo;
            </div>
            <p className="text-gray-300 italic pl-4">{quote}</p>
            <div className="absolute -bottom-4 -right-2 text-4xl text-purple-500/20">
              &rdquo;
            </div>
          </blockquote>
        </motion.div>
      </div>
    </motion.div>
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
  const heroBackgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black cursor-none">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Particle Background - Now only in hero */}
        <motion.div
          style={{ y: heroBackgroundY }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-purple-900 to-black opacity-80" />
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="night" />
              <ParticleField />
            </Canvas>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10">
          {/* Navigation */}

          {/* Hero Content */}
          <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center px-6 pt-20"
          >
            <motion.div
              style={{ scale, opacity }}
              className="max-w-7xl mx-auto -mt-40 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <Environment preset="sunset" />
                    <FloatingLogo />
                  </Canvas>
                </div>

                <motion.h1
                  style={{ x, y }}
                  className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8 mt-40"
                >
                  Create.
                  <br />
                  Connect.
                  <br />
                  Conquer.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
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
                    className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-medium transform transition-all hover:scale-105 focus:outline-none overflow-hidden"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transform transition-all hover:scale-105 focus:outline-none"
                  >
                    Explore Creators
                  </button>
                </motion.div>
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

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative text-gray-300 hover:text-white transition-colors group"
    >
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
    </a>
  );
}
