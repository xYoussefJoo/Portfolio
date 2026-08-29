import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useLanguage } from "~/context/LanguageContext";
import { usePortfolioData } from "~/context/PortfolioDataContext";

function getSocialPlatformConfig(platform: string) {
  const p = platform.toLowerCase().trim();
  if (p.includes("behance")) {
    return {
      name: "Behance",
      hoverClass: "hover:text-[#0057ff] hover:border-[#0057ff]/60 hover:bg-[#0057ff]/15 hover:shadow-[0_0_20px_rgba(0,87,255,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.103 0-6.625-3.003-6.625-6.625 0-3.805 2.766-6.625 6.625-6.625 4.316 0 6.223 3.197 5.795 6.625h-9.845c.123 2.148 1.637 3.978 4.05 3.978 1.956 0 3.013-1.02 3.428-2.025l1.673 1.667zm-5.101-7.25c-2.02 0-3.35 1.488-3.525 3.25h6.973c-.098-1.748-1.428-3.25-3.448-3.25zm-14.625 9.25h-4v-14h5.663c2.979 0 4.337 1.668 4.337 3.652 0 1.285-.678 2.456-1.859 3.061 1.638.562 2.359 1.968 2.359 3.51 0 2.339-1.815 3.777-4.5 3.777v-.001zm-1.5-8.25h2.8c1.378 0 2.2-.676 2.2-1.75 0-1.037-.811-1.75-2.2-1.75h-2.8v3.5zm0 6h3.1c1.551 0 2.4-.789 2.4-1.95 0-1.124-.871-1.95-2.4-1.95h-3.1v3.9z" />
        </svg>
      ),
    };
  }
  if (p.includes("instagram")) {
    return {
      name: "Instagram",
      hoverClass: "hover:text-[#e1306c] hover:border-[#e1306c]/60 hover:bg-[#e1306c]/15 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    };
  }
  if (p.includes("linkedin")) {
    return {
      name: "LinkedIn",
      hoverClass: "hover:text-[#0a66c2] hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    };
  }
  if (p.includes("github")) {
    return {
      name: "GitHub",
      hoverClass: "hover:text-white hover:border-white/60 hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    };
  }
  if (p.includes("dribbble")) {
    return {
      name: "Dribbble",
      hoverClass: "hover:text-[#ea4c89] hover:border-[#ea4c89]/60 hover:bg-[#ea4c89]/15 hover:shadow-[0_0_20px_rgba(234,76,137,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.193 11.258c-.286-.027-2.677-.247-5.215.792-.352-.801-.736-1.605-1.156-2.399 2.502-1.332 3.738-3.08 3.864-3.268 1.517 1.347 2.476 3.264 2.507 5.405l-.001-.53zm-3.805-6.386c-.152.213-1.328 1.838-3.708 3.109-1.429-2.585-3.003-4.838-3.224-5.147 1.954-.567 4.043-.434 5.918.497l1.014 1.541zm-8.817-2.68c.209.289 1.761 2.508 3.197 5.061-2.915.938-5.753.947-6.223.947-.042 0-.083-.001-.122-.001.764-2.531 2.42-4.636 4.678-6.007h-1.53zm-7.391 8.358c.039 0 .285 0 .741-.008.577 0 3.79-.043 6.942-1.077.402.771.777 1.554 1.121 2.338-3.324 1.054-6.353 3.659-6.529 3.816-1.411-1.442-2.278-3.385-2.275-5.069zm3.322 6.559c.21-.177 2.92-2.457 6.096-3.483 1.251 3.275 1.791 6.279 1.848 6.621-2.443.706-5.076.326-7.234-1.072l-.71-.941-.001.875zm9.51 1.761c-.074-.469-.607-3.376-1.821-6.571 2.409-1.072 4.638-.908 4.935-.882-.249 2.956-1.636 5.539-3.743 7.453h.629z" />
        </svg>
      ),
    };
  }
  if (p.includes("twitter") || p.includes("x")) {
    return {
      name: "X / Twitter",
      hoverClass: "hover:text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    };
  }
  if (p.includes("artstation")) {
    return {
      name: "Artstation",
      hoverClass: "hover:text-[#13aff0] hover:border-[#13aff0]/60 hover:bg-[#13aff0]/15 hover:shadow-[0_0_20px_rgba(19,175,240,0.4)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M0 17.723l2.027 3.509h.001a2.424 2.424 0 0 0 2.164 1.335h14.391l-3.21-5.568H0v.724zm23.582-3.465l-7.078-12.26a2.423 2.423 0 0 0-2.102-1.282h-.03a2.424 2.424 0 0 0-2.103 1.282L4.316 15.654l2.795 4.842 10.978-.002 5.493-9.513a2.423 2.423 0 0 0 0-2.725z" />
        </svg>
      ),
    };
  }
  return {
    name: platform,
    hoverClass: "hover:text-[#8A60F1] hover:border-[#8A60F1]/60 hover:bg-[#8A60F1]/15 hover:shadow-[0_0_20px_rgba(138,96,241,0.4)]",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const { getSection, socialLinks } = usePortfolioData();

  useEffect(() => {
    setMounted(true);
  }, []);

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
            {getSection("hero_badge", t.hero.badge)}
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)]"
            >
              {getSection("hero_title_line1", t.hero.titleLine1)} <br />
              <span className="bg-gradient-to-r from-[#8A60F1] via-fuchsia-400 to-[#00f0ff] bg-clip-text text-transparent text-glow-purple">
                {getSection("hero_title_gradient", t.hero.titleGradient)}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed"
            >
              {getSection("hero_intro", t.hero.intro)}
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
              {getSection("hero_stat_projects", t.hero.statProjects)}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A60F1]"></span>
              {getSection("hero_stat_adobe", t.hero.statAdobe)}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[var(--pill-bg)] border border-[var(--pill-border)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              {getSection("hero_stat_languages", t.hero.statLanguages)}
            </span>
          </motion.div>

          {/* Action CTAs & Social Media Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2"
          >
            <div className="flex flex-wrap items-center gap-4">
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
            </div>

            {/* Social Media Icons Bar */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] shadow-sm backdrop-blur-md">
                {socialLinks.map((link) => {
                  const config = getSocialPlatformConfig(link.platform);
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[var(--text-secondary)] border border-transparent transition-all duration-300 hover:scale-110 active:scale-95 group relative ${config.hoverClass}`}
                      title={`${t.hero.socialTooltip} ${config.name}`}
                      aria-label={config.name}
                    >
                      {config.icon}
                      {/* Tooltip on hover */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-30 shadow-lg">
                        {config.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
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
