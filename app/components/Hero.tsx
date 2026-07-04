import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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

    // Use ResizeObserver to dynamically get parent bounds, preventing 0-width loading bugs on initial layouts
    const rect = container.getBoundingClientRect();
    let width = rect.width || 400;
    let height = rect.height || 450;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8A60F1, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x00f0ff, 2, 50);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    // 3D Wireframe Mesh
    const geometry = new THREE.TorusKnotGeometry(1.3, 0.4, 120, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8A60F1,
      wireframe: true,
      emissive: 0x1d0b3a,
      roughness: 0.15,
      metalness: 0.85,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Dynamic Floating Particles
    const particlesCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8A60F1,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

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

    // ResizeObserver tracks container updates and resizes WebGL viewport smoothly
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

      // Rotations
      mesh.rotation.x = elapsedTime * 0.12;
      mesh.rotation.y = elapsedTime * 0.18;
      particles.rotation.y = -elapsedTime * 0.03;

      // Mouse movements
      targetX = targetX * 0.92 + mouseX * 0.08;
      targetY = targetY * 0.92 + mouseY * 0.08;

      mesh.position.x = targetX * 0.7;
      mesh.position.y = targetY * 0.7;

      camera.position.x = targetX * 0.25;
      camera.position.y = targetY * 0.25;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 relative overflow-hidden bg-grid-curved"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8A60F1]/10 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[110px] pointer-events-none" />

      {/* Grid container with clean layouts and padding */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column - Biography details */}
        <div className="lg:col-span-7 space-y-8 text-stone-100">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8A60F1]/10 border border-[#8A60F1]/20 text-xs font-semibold uppercase tracking-wider text-[#8A60F1] shadow-[0_0_15px_rgba(138,96,241,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#8A60F1] animate-pulse" />
            Full-Stack 3D Experiences
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Building Immersive <br />
              <span className="bg-gradient-to-r from-[#8A60F1] via-fuchsia-400 to-[#00f0ff] bg-clip-text text-transparent text-glow-purple">
                Web Ecosystems
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-stone-300 font-normal max-w-xl leading-relaxed"
            >
              I am <span className="font-semibold text-white">Youssef Gamal</span>. I design and engineer interactive 3D web interfaces alongside robust, full-scale ASP.NET Core backend systems.
            </motion.p>
          </div>

          {/* Social Connect Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-5 pt-6 border-t border-white/10"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Connect:
            </span>
            <div className="flex gap-4">
              {[
                { icon: githubIcon, href: "https://github.com", label: "GitHub" },
                { icon: linkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:xyousefjoo@gmail.com", label: "Email" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-[#8A60F1] border border-[#8A60F1]/10 hover:border-[#8A60F1]/40 text-stone-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_15px_rgba(138,96,241,0.3)]"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
