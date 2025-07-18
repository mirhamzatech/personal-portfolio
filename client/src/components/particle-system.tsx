import { useEffect, useRef } from "react";

declare const gsap: any;

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    const particles = Array.from({ length: 50 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, rgba(0,139,249,0.8) 0%, rgba(54,219,159,0.4) 100%);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
        opacity: ${Math.random() * 0.7 + 0.3};
        box-shadow: 0 0 10px rgba(0,139,249,0.5);
      `;
      
      containerRef.current!.appendChild(particle);
      
      // Animate particle
      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 5
      });
      
      // Pulsing effect
      gsap.to(particle, {
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
      
      return particle;
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - particleX, 2) + Math.pow(clientY - particleY, 2)
        );
        
        if (distance < 100) {
          const angle = Math.atan2(clientY - particleY, clientX - particleX);
          const force = (100 - distance) / 100;
          
          gsap.to(particle, {
            x: Math.cos(angle) * force * 50,
            y: Math.sin(angle) * force * 50,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}