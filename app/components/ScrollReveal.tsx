import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-in" | "fade-in-up" | "fade-in-down" | "slide-in-left" | "slide-in-right" | "scale-in";
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-in-up",
  delay = 0,
  duration = 1000,
  threshold = 0.05,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        // Start animating slightly before it fully enters the viewport for a smoother feel
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const baseStyles = "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const variantStyles = {
    "fade-in": "opacity-0",
    "fade-in-up": "opacity-0 translate-y-12",
    "fade-in-down": "opacity-0 -translate-y-12",
    "slide-in-left": "opacity-0 -translate-x-12",
    "slide-in-right": "opacity-0 translate-x-12",
    "scale-in": "opacity-0 scale-95",
  };

  const activeStyles = {
    "fade-in": "opacity-100",
    "fade-in-up": "opacity-100 translate-y-0",
    "fade-in-down": "opacity-100 translate-y-0",
    "slide-in-left": "opacity-100 translate-x-0",
    "slide-in-right": "opacity-100 translate-x-0",
    "scale-in": "opacity-100 scale-100",
  };

  const style = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${isVisible ? activeStyles[variant] : variantStyles[variant]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
