import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useLanguage } from "~/context/LanguageContext";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const githubIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const linkedinIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const rect = container.getBoundingClientRect();
    let width = rect.width || 400;
    let height = rect.height || 450;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0x8A60F1, 4, 30);
    purplePointLight.position.set(4, 4, 4);
    scene.add(purplePointLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3.5, 30);
    cyanPointLight.position.set(-4, -4, 4);
    scene.add(cyanPointLight);

    const mouseSpotLight = new THREE.PointLight(0xffffff, 2, 25);
    mouseSpotLight.position.set(0, 0, 5);
    scene.add(mouseSpotLight);

    // Root 3D Logo Group
    const logo3DGroup = new THREE.Group();
    scene.add(logo3DGroup);

    // Dynamic Floating Background Particles
    const particlesCount = 120;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8A60F1,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Vector Orbit Rings (Representing Pen Tool & Vector Paths)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x8A60F1,
      emissive: 0x8A60F1,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    logo3DGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    logo3DGroup.add(ring2);

    // Vector Anchor Point Cubes (Graphic Designer Pen Tool Handles)
    const handleGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x8A60F1,
      emissiveIntensity: 0.8,
    });

    const anchorNodes: THREE.Mesh[] = [];
    const numAnchors = 4;
    for (let i = 0; i < numAnchors; i++) {
      const anchor = new THREE.Mesh(handleGeo, handleMat);
      logo3DGroup.add(anchor);
      anchorNodes.push(anchor);
    }

    // Load and process Keso3DLogo to create clean transparent cutout texture and 3D extruded layers
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/img/Keso3DLogo.jpeg";

    const planeGeo = new THREE.PlaneGeometry(3.4, 3.4);
    const meshesToDispose: THREE.Material[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [ring1Geo, ring2Geo, handleGeo, planeGeo, particlesGeometry];

    img.onload = () => {
      // Offscreen canvas for chroma-keying black background to transparent
      const offscreenCanvas = document.createElement("canvas");
      const imgW = img.width;
      const imgH = img.height;
      offscreenCanvas.width = imgW;
      offscreenCanvas.height = imgH;
      const ctx = offscreenCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, imgW, imgH);
      const data = imgData.data;

      // Clean chroma keying with perimeter boundary clearance to completely eliminate edge/border artifacts
      const borderMargin = 8;

      for (let y = 0; y < imgH; y++) {
        for (let x = 0; x < imgW; x++) {
          const idx = (y * imgW + x) * 4;

          // Clear outer perimeter pixels to prevent texture edge clamp bleed
          if (x < borderMargin || x >= imgW - borderMargin || y < borderMargin || y >= imgH - borderMargin) {
            data[idx + 3] = 0;
            continue;
          }

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxVal = Math.max(r, g, b);

          // Clean cutoff for dark background & compression artifacts
          if (maxVal < 42) {
            data[idx + 3] = 0;
          } else if (maxVal < 80) {
            const factor = (maxVal - 42) / 38;
            data[idx + 3] = Math.floor(factor * factor * 255);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const transparentTexture = new THREE.CanvasTexture(offscreenCanvas);
      transparentTexture.colorSpace = THREE.SRGBColorSpace;
      transparentTexture.minFilter = THREE.LinearFilter;
      transparentTexture.magFilter = THREE.LinearFilter;
      transparentTexture.wrapS = THREE.ClampToEdgeWrapping;
      transparentTexture.wrapT = THREE.ClampToEdgeWrapping;

      // Create 3D Extruded Relief Layers along Z axis without edge clipping
      const layerCount = 8;
      const totalDepth = 0.24;

      for (let i = 0; i < layerCount; i++) {
        const z = -totalDepth / 2 + (i / (layerCount - 1)) * totalDepth;
        const isFront = i === layerCount - 1;
        const isBack = i === 0;
        const isOuter = isFront || isBack;

        const layerMat = new THREE.MeshStandardMaterial({
          map: transparentTexture,
          transparent: true,
          alphaTest: 0.08,
          opacity: isOuter ? 1.0 : 0.9,
          roughness: isOuter ? 0.2 : 0.5,
          metalness: isOuter ? 0.5 : 0.8,
          emissive: isOuter ? 0x221133 : 0x442266,
          emissiveIntensity: isOuter ? 0.35 : 0.6,
          side: THREE.DoubleSide,
          depthWrite: isOuter,
        });

        const layerMesh = new THREE.Mesh(planeGeo, layerMat);
        layerMesh.position.z = z;
        logo3DGroup.add(layerMesh);
        meshesToDispose.push(layerMat);
      }

      // Backglow Halo Plane
      const haloMat = new THREE.MeshBasicMaterial({
        map: transparentTexture,
        transparent: true,
        alphaTest: 0.05,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        color: 0x8A60F1,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const haloMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), haloMat);
      haloMesh.position.z = -0.04;
      logo3DGroup.add(haloMesh);
      meshesToDispose.push(haloMat);
    };

    // Mouse Parallax coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      mouseX = ((event.clientX - bounds.left) / (bounds.width || 400) - 0.5) * 1.5;
      mouseY = -((event.clientY - bounds.top) / (bounds.height || 450) - 0.5) * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width || container.clientWidth || 400;
        const h = entry.contentRect.height || container.clientHeight || 450;
        
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Floating & Subtle 3D Tumbling Oscillations
      const floatY = Math.sin(elapsedTime * 1.2) * 0.15;
      const baseRotY = Math.sin(elapsedTime * 0.6) * 0.35;
      const baseRotX = Math.cos(elapsedTime * 0.8) * 0.2;

      // Rotate Orbit Rings
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;

      // Position Anchor Nodes around the rings
      anchorNodes.forEach((node, index) => {
        const angle = elapsedTime * 0.4 + (index * Math.PI) / 2;
        const radius = 2.3;
        node.position.x = Math.cos(angle) * radius * Math.cos(Math.PI / 6);
        node.position.y = Math.sin(angle) * radius * Math.sin(Math.PI / 3);
        node.position.z = Math.sin(angle) * radius * Math.cos(Math.PI / 3);
        node.rotation.x = elapsedTime;
        node.rotation.y = elapsedTime;
      });

      // Background particle drift
      particles.rotation.y = -elapsedTime * 0.02;

      // Interactive Mouse Smoothing
      targetX = targetX * 0.9 + mouseX * 0.1;
      targetY = targetY * 0.9 + mouseY * 0.1;

      // Apply 3D Transforms
      logo3DGroup.position.y = floatY + targetY * 0.5;
      logo3DGroup.position.x = targetX * 0.5;
      logo3DGroup.rotation.y = baseRotY + targetX * 0.8;
      logo3DGroup.rotation.x = baseRotX - targetY * 0.8;

      // Dynamic light tracking mouse
      mouseSpotLight.position.x = targetX * 6;
      mouseSpotLight.position.y = targetY * 6;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Dynamic Theme Listener for 3D Studio lighting
    const handleThemeChanged = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      const isLight = customEvent.detail === "light";
      ambientLight.intensity = isLight ? 1.1 : 0.7;
      particlesMaterial.color.setHex(isLight ? 0x7038e8 : 0x8A60F1);
      particlesMaterial.opacity = isLight ? 0.85 : 0.6;
    };

    window.addEventListener("themeChanged", handleThemeChanged);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("themeChanged", handleThemeChanged);
      resizeObserver.disconnect();
      geometriesToDispose.forEach((g) => g.dispose());
      meshesToDispose.forEach((m) => m.dispose());
      ring1Mat.dispose();
      ring2Mat.dispose();
      handleMat.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 relative overflow-hidden bg-grid-curved transition-colors duration-350"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8A60F1]/10 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[110px] pointer-events-none" />

      {/* Grid container with clean layouts and padding */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column - Biography details */}
        <div className="lg:col-span-7 space-y-8 text-[var(--text-primary)]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A60F1]/10 border border-[#8A60F1]/20 text-xs font-semibold uppercase tracking-wider text-[#8A60F1] shadow-[0_0_15px_rgba(138,96,241,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#8A60F1] animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)]"
            >
              {t.hero.titleLine1} <br />
              <span className="bg-gradient-to-r from-[#8A60F1] via-fuchsia-400 to-[#00f0ff] bg-clip-text text-transparent text-glow-purple">
                {t.hero.titleGradient}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed"
            >
              {t.hero.intro}
            </motion.p>
          </div>

          {/* Quick Stat Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2.5 pt-2"
          >
            <span className="px-3.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t.hero.statProjects}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A60F1]"></span>
              {t.hero.statAdobe}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              {t.hero.statLanguages}
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(138,96,241,0.5)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover-bg)] border border-[var(--pill-border)] hover:border-[#8A60F1]/50 text-[var(--text-primary)] font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
            >
              {t.hero.ctaContact}
            </a>
          </motion.div>
        </div>

        {/* Right Column - 3D Visual Mesh container with WebGL canvas */}
        <div
          ref={containerRef}
          className="lg:col-span-5 flex justify-center items-center w-full h-[350px] md:h-[450px] relative cursor-pointer"
        >
          {mounted ? (
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full outline-none pointer-events-auto" />
          ) : (
            <div className="w-48 h-48 rounded-full border-4 border-t-[#8A60F1] border-white/10 animate-spin" />
          )}
          <div className="absolute w-60 h-60 rounded-full bg-[#8A60F1]/5 blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
