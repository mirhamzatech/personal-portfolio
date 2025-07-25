import { useEffect, useRef } from "react";

declare const gsap: any;

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create different types of particles
    const createParticle = (type: 'small' | 'medium' | 'large' | 'glow', index: number) => {
      const particle = document.createElement('div');
      particle.className = `particle particle-${type}`;
      
      let size, gradient, blur, opacity;
      
      switch(type) {
        case 'small':
          size = Math.random() * 3 + 1;
          gradient = `radial-gradient(circle, rgba(0,139,249,0.9) 0%, rgba(54,219,159,0.6) 100%)`;
          blur = `blur(${Math.random() * 1 + 0.5}px)`;
          opacity = Math.random() * 0.8 + 0.2;
          break;
        case 'medium':
          size = Math.random() * 6 + 3;
          gradient = `radial-gradient(circle, rgba(54,219,159,0.8) 0%, rgba(0,139,249,0.5) 100%)`;
          blur = `blur(${Math.random() * 2 + 1}px)`;
          opacity = Math.random() * 0.7 + 0.3;
          break;
        case 'large':
          size = Math.random() * 10 + 5;
          gradient = `radial-gradient(circle, rgba(0,139,249,0.6) 0%, rgba(54,219,159,0.3) 50%, transparent 100%)`;
          blur = `blur(${Math.random() * 3 + 2}px)`;
          opacity = Math.random() * 0.5 + 0.2;
          break;
        case 'glow':
          size = Math.random() * 15 + 10;
          gradient = `radial-gradient(circle, rgba(0,139,249,0.4) 0%, rgba(54,219,159,0.2) 30%, transparent 70%)`;
          blur = `blur(${Math.random() * 5 + 3}px)`;
          opacity = Math.random() * 0.3 + 0.1;
          break;
      }
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${gradient};
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
        opacity: ${opacity};
        filter: ${blur};
        box-shadow: 0 0 ${size * 2}px rgba(0,139,249,0.3);
      `;
      
      containerRef.current!.appendChild(particle);
      return particle;
    };

    // Create mixed particle types
    const particles = Array.from({ length: 80 }, (_, i) => {
      const types = ['small', 'medium', 'large', 'glow'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      return createParticle(type, i);
    });

    // Enhanced particle animations
    particles.forEach((particle, index) => {
      const isLarge = particle.classList.contains('particle-large') || particle.classList.contains('particle-glow');
      const speed = isLarge ? 0.3 : 1;
      
      // Complex orbital movement
      gsap.to(particle, {
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        duration: (Math.random() * 30 + 20) * speed,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 10
      });
      
      // Rotation and scaling
      gsap.to(particle, {
        rotation: 360,
        duration: Math.random() * 40 + 20,
        repeat: -1,
        ease: "none"
      });
      
      // Pulsing effect with varying intensity
      gsap.to(particle, {
        scale: Math.random() * 1.8 + 0.5,
        duration: Math.random() * 4 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 3
      });
      
      // Opacity breathing
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });
    });

    // Advanced mouse interaction with magnetic effects
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const mouseX = clientX / window.innerWidth;
      const mouseY = clientY / window.innerHeight;
      
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - particleX, 2) + Math.pow(clientY - particleY, 2)
        );
        
        const isLarge = particle.classList.contains('particle-large') || particle.classList.contains('particle-glow');
        const interactionRadius = isLarge ? 150 : 80;
        
        if (distance < interactionRadius) {
          const angle = Math.atan2(clientY - particleY, clientX - particleX);
          const force = (interactionRadius - distance) / interactionRadius;
          const intensity = isLarge ? 80 : 60;
          
          // Magnetic attraction/repulsion
          gsap.to(particle, {
            x: Math.cos(angle) * force * intensity,
            y: Math.sin(angle) * force * intensity,
            scale: 1 + force * 0.5,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Enhanced glow on interaction
          gsap.to(particle, {
            filter: `blur(${Math.random() * 3 + 1}px) brightness(${1 + force * 0.5})`,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    };

    // Scroll-based particle movement
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      particles.forEach((particle, index) => {
        const offset = (index % 3) * 0.1;
        const movement = scrollProgress * 50 + offset * 20;
        
        gsap.to(particle, {
          y: `+=${movement}`,
          rotation: `+=${scrollProgress * 180}`,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    };

    // Device orientation effects (for mobile)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma && e.beta) {
        const tiltX = e.gamma / 90; // -1 to 1
        const tiltY = e.beta / 90; // -1 to 1
        
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            x: `+=${tiltX * 30}`,
            y: `+=${tiltY * 30}`,
            duration: 1,
            ease: "power2.out"
          });
        });
      }
    };

    // Particle connections (draw lines between nearby particles)
    const drawConnections = () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'particle-connections';
      canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      `;
      containerRef.current!.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const animate = () => {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle1, i) => {
          particles.slice(i + 1).forEach((particle2) => {
            const rect1 = particle1.getBoundingClientRect();
            const rect2 = particle2.getBoundingClientRect();
            
            const distance = Math.sqrt(
              Math.pow(rect1.left - rect2.left, 2) + Math.pow(rect1.top - rect2.top, 2)
            );
            
            if (distance < 100) {
              const opacity = 1 - (distance / 100);
              ctx!.strokeStyle = `rgba(0, 139, 249, ${opacity * 0.3})`;
              ctx!.lineWidth = 1;
              ctx!.beginPath();
              ctx!.moveTo(rect1.left, rect1.top);
              ctx!.lineTo(rect2.left, rect2.top);
              ctx!.stroke();
            }
          });
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };

    // Initialize effects
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    drawConnections();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      
      const canvas = containerRef.current?.querySelector('.particle-connections');
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}