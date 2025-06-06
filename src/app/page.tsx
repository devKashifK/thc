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
import type { Group } from "three";
import * as THREE from "three";

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
  const count = 600;
  const mesh = useRef<THREE.Group>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const animationProgress = useRef(0);
  const targetPositions = useRef<{ x: number; y: number; z: number }[]>([]);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hoveredSprite = useRef<THREE.Sprite | null>(null);
  const time = useRef(0);
  const spritesRef = useRef<THREE.Sprite[]>([]);

  // Constants for boundary and motion control
  const BOUNDS = {
    maxRadius: 15,
    minRadius: 2,
    maxHeight: 12,
    spiralTightness: 0.15,
    verticalOscillation: 0.02,
    yOffset: 0,
  };

  // List of all available images
  const availableImages = [
    "/img/dummy.jpeg",
    "/img/profile-1681838143738-d1fd7640401fimage.jpeg",
    "/img/premium_photo-1684017834450-21747b64d666.jpeg",
    "/img/premium_photo-1684017834450-21747b64d6661.jpeg",
    "/img/premium_photo-1684017834311-51be41561f48.jpeg",
    "/img/premium_photo-1683733841845-29e325968e27.jpeg",
    "/img/photo-1682695795798-1b31ea040caf.jpeg",
    "/img/photo-1682695795798-1b31ea040caf1.jpeg",
    "/img/photo-1658207951097-96f86cc0a1c8.jpeg",
    "/img/photo-1658207951097-96f86cc0a1c83.jpeg",
    "/img/photo-1658207951097-96f86cc0a1c82.jpeg",
    "/img/photo-1658207951097-96f86cc0a1c81.jpeg",
    "/img/photo-1632765937900-a3bbbfa58d46.jpeg",
    "/img/photo-1613053342692-d0012e0444eb.jpeg",
    "/img/photo-1605170495891-6483b26dd358.jpeg",
    "/img/photo-1603217041431-9a99375beab0.jpeg",
    "/img/photo-1603217041431-9a99375beab01.jpeg",
    "/img/photo-1597075095400-fb3f0de70140.jpeg",
    "/img/photo-1576827471288-0a8f6d6c937b.jpeg",
    "/img/photo-1576827471288-0a8f6d6c937b1.jpeg",
    "/img/photo-1572112686886-5c0b5bc8dacd.jpeg",
    "/img/photo-1572112686886-5c0b5bc8dacd1.jpeg",
    "/img/photo-1522860747050-bb0c1af38ae9.jpeg",
    "/img/download.jpeg",
    "/img/download5.jpeg",
    "/img/download3.jpeg",
    "/img/download2.jpeg",
    "/img/download1.jpeg",
  ];

  // Set image URLs and initialize positions on component mount
  useEffect(() => {
    console.log("Setting up images and positions...");
    const shuffledImages = [...availableImages].sort(() => Math.random() - 0.5);
    setImageUrls(shuffledImages);
  }, []);

  // Initialize target positions when component mounts
  useEffect(() => {
    console.log("Initializing target positions...");
    targetPositions.current = Array(count)
      .fill(0)
      .map((_, i) => {
        const armCount = 6;
        const armIndex = Math.floor(i / (count / armCount));
        const angleOffset = (2 * Math.PI * armIndex) / armCount;

        const progressAlongArm = (i % (count / armCount)) / (count / armCount);
        const radius =
          BOUNDS.minRadius +
          (BOUNDS.maxRadius - BOUNDS.minRadius) *
            Math.pow(progressAlongArm, 0.7);
        const angle = progressAlongArm * 6 * Math.PI + angleOffset;

        const randomOffset = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
        };

        const layerIndex = Math.floor(i / (count / 5));
        const baseHeight = ((layerIndex / 4) * 2 - 1) * BOUNDS.maxHeight;
        const heightFactor =
          Math.sin(progressAlongArm * Math.PI * 2) +
          Math.cos(angle * 0.5) * 0.5 +
          (Math.random() - 0.5) * 0.5;
        const heightVariation =
          baseHeight + heightFactor * (BOUNDS.maxHeight / 3);

        return {
          x: (Math.cos(angle) * radius + randomOffset.x) * 1.2,
          y: heightVariation + randomOffset.y,
          z: (Math.sin(angle) * radius + randomOffset.z) * 1.2,
          radius,
          baseRadius: radius,
          angle,
          armIndex,
          progressAlongArm,
          layerIndex,
          orbitSpeed:
            (0.08 + Math.random() * 0.08) * (Math.random() < 0.5 ? 1 : -1),
          verticalSpeed: Math.random() * 0.02 + 0.01,
        };
      });
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouse]);

  // Create and process sprites when imageUrls changes
  useEffect(() => {
    if (imageUrls.length === 0) {
      console.log("No image URLs available yet");
      return;
    }

    console.log("Starting sprite creation with", imageUrls.length, "images");

    // Create a separate canvas for each image to prevent texture sharing
    const createCanvasTexture = (url: string): Promise<THREE.Texture> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 256;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            const radius = 20;
            ctx.moveTo(radius, 0);
            ctx.lineTo(canvas.width - radius, 0);
            ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
            ctx.lineTo(canvas.width, canvas.height - radius);
            ctx.quadraticCurveTo(
              canvas.width,
              canvas.height,
              canvas.width - radius,
              canvas.height
            );
            ctx.lineTo(radius, canvas.height);
            ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();

            ctx.clip();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            resolve(texture);
          }
        };
        img.onerror = (e) => {
          console.error("Error loading image:", url, e);
          reject(e);
        };
        img.src = url;
      });
    };

    // Process all images in parallel
    Promise.all(imageUrls.map(createCanvasTexture))
      .then((textures) => {
        console.log("Successfully loaded", textures.length, "textures");

        const temp: THREE.Sprite[] = [];
        for (let i = 0; i < count; i++) {
          // Ensure even distribution of images
          const textureIndex = i % textures.length;
          const texture = textures[textureIndex];

          // Create a new material for each sprite to prevent sharing
          const material = new THREE.SpriteMaterial({
            map: texture.clone(), // Clone the texture for each sprite
            transparent: true,
            opacity: 0.8,
          });

          const scatterRadius = Math.random() * 30 + 15;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI * 2;

          const x = scatterRadius * Math.sin(phi) * Math.cos(theta);
          const y = scatterRadius * Math.sin(phi) * Math.sin(theta);
          const z = scatterRadius * Math.cos(phi);

          const sprite = new THREE.Sprite(material);
          sprite.position.set(x, y, z);
          sprite.scale.set(0.5, 0.5, 1);

          sprite.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.04,
            initialPosition: { x, y, z },
            targetPosition: targetPositions.current[i],
            initialScale: 0.5,
            targetScale: 0.5,
            baseScale: 0.5,
            hoverScale: 1.2,
            currentHoverProgress: 0,
            imageIndex: textureIndex,
            ...targetPositions.current[i],
            orbitSpeed:
              (0.08 + Math.random() * 0.08) * (Math.random() < 0.5 ? 1 : -1),
            verticalSpeed: Math.random() * 0.02 + 0.01,
          };

          temp.push(sprite);
        }

        console.log(
          "Created",
          temp.length,
          "sprites with",
          textures.length,
          "different textures"
        );
        spritesRef.current = temp;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating sprites:", error);
        setIsLoading(false);
      });
  }, [imageUrls, count]);

  // Animation frame
  useFrame((state, delta) => {
    if (
      !mesh.current ||
      !light.current ||
      isLoading ||
      spritesRef.current.length === 0
    ) {
      return;
    }

    time.current += delta * 0.8;

    // Update raycaster with current mouse position
    raycaster.setFromCamera(mouse, state.camera);
    const intersects = raycaster.intersectObjects(spritesRef.current);

    // Handle hover effects
    const hoveredObject = intersects[0]?.object as THREE.Sprite | undefined;

    if (hoveredSprite.current && hoveredSprite.current !== hoveredObject) {
      // Smooth scale down when unhovered
      hoveredSprite.current.userData.currentHoverProgress = Math.max(
        0,
        hoveredSprite.current.userData.currentHoverProgress - 0.1
      );
      const scale =
        hoveredSprite.current.userData.baseScale +
        (hoveredSprite.current.userData.hoverScale -
          hoveredSprite.current.userData.baseScale) *
          hoveredSprite.current.userData.currentHoverProgress;
      hoveredSprite.current.scale.set(scale, scale, 1);
      hoveredSprite.current.userData.isHovered = false;
    }

    if (hoveredObject) {
      // Smooth scale up when hovered
      hoveredObject.userData.currentHoverProgress = Math.min(
        1,
        (hoveredObject.userData.currentHoverProgress || 0) + 0.1
      );
      const scale =
        hoveredObject.userData.baseScale +
        (hoveredObject.userData.hoverScale - hoveredObject.userData.baseScale) *
          hoveredObject.userData.currentHoverProgress;
      hoveredObject.scale.set(scale, scale, 1);
      hoveredObject.userData.isHovered = true;
      hoveredSprite.current = hoveredObject;
    }

    // Update sprites
    spritesRef.current.forEach((sprite) => {
      if (!sprite) return;

      if (isInitialAnimation) {
        const { initialPosition, targetPosition, initialScale, targetScale } =
          sprite.userData;

        const progress = Math.min(1, animationProgress.current);
        const easing = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easing(progress);

        sprite.position.x =
          initialPosition.x +
          (targetPosition.x - initialPosition.x) * easedProgress;
        sprite.position.y =
          initialPosition.y +
          (targetPosition.y - initialPosition.y) * easedProgress;
        sprite.position.z =
          initialPosition.z +
          (targetPosition.z - initialPosition.z) * easedProgress;

        const scale =
          initialScale + (targetScale - initialScale) * easedProgress;
        sprite.scale.set(scale, scale, 1);

        sprite.material.opacity = easedProgress * 0.8;
      } else {
        if (sprite.userData.isHovered) return;

        const targetPos = calculateTargetPosition(sprite);
        sprite.position.x += (targetPos.x - sprite.position.x) * 0.15;
        sprite.position.y += (targetPos.y - sprite.position.y) * 0.15;
        sprite.position.z += (targetPos.z - sprite.position.z) * 0.15;

        sprite.material.rotation += sprite.userData.rotationSpeed;
      }
    });

    // Update animation progress
    if (isInitialAnimation) {
      animationProgress.current = Math.min(
        1,
        animationProgress.current + 0.005
      );
      if (animationProgress.current >= 1) {
        setIsInitialAnimation(false);
      }
    }

    // Update light position
    const lightRadius = 8;
    light.current.position.x = Math.sin(time.current * 0.2) * lightRadius;
    light.current.position.z = Math.cos(time.current * 0.2) * lightRadius;
    light.current.position.y =
      Math.sin(time.current * 0.15) * BOUNDS.maxHeight * 0.5;
  });

  const calculateTargetPosition = (sprite: THREE.Sprite) => {
    const {
      baseRadius,
      angle,
      orbitSpeed,
      verticalSpeed,
      armIndex,
      progressAlongArm,
      layerIndex,
    } = sprite.userData;

    const time_offset = time.current + (armIndex * Math.PI * 2) / 6;
    const currentAngle = angle + time_offset * orbitSpeed;

    const spiralRadius = baseRadius * (1 + Math.sin(time_offset * 0.1) * 0.1);
    const x = Math.cos(currentAngle) * spiralRadius * 1.2;
    const z = Math.sin(currentAngle) * spiralRadius * 1.2;

    const baseHeight = ((layerIndex / 4) * 2 - 1) * BOUNDS.maxHeight;
    const heightFactor =
      Math.sin(progressAlongArm * Math.PI * 2) +
      Math.cos(currentAngle * 0.5) * 0.5;
    const verticalOffset =
      Math.sin(time_offset * verticalSpeed) * BOUNDS.verticalOscillation;
    const y =
      baseHeight + heightFactor * (BOUNDS.maxHeight / 3) + verticalOffset;

    return { x, y, z };
  };

  return (
    <>
      <pointLight ref={light} distance={20} intensity={1.5} color="#8B5CF6" />
      <group ref={mesh}>
        {spritesRef.current.map(
          (sprite, i) => sprite && <primitive key={i} object={sprite} />
        )}
      </group>
      <ambientLight intensity={0.2} />
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

  return (
    <main className="relative min-h-screen overflow-hidden cursor-none">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Particle Background - Fixed positioning to cover entire viewport */}
        <div className="fixed inset-0 w-full h-full">
          <Canvas
            className="absolute inset-0"
            camera={{
              position: [0, 0, 25],
              fov: 60,
              near: 0.1,
              far: 1000,
            }}
            style={{ position: "fixed", zIndex: 1 }}
            gl={{ antialias: true }}
          >
            <color attach="background" args={["#0f0817"]} />
            <Environment preset="night" />
            <ParticleField />
            <ambientLight intensity={0.4} />
          </Canvas>
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black/20 pointer-events-none"
            style={{ zIndex: 2 }}
          />
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
                        Hire A Creator
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
