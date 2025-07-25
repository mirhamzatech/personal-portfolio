import { useEffect, useState } from "react";
import { ChevronDown, Star, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

declare const gsap: any;

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Crafting clean code & beautiful interfaces";

  useEffect(() => {
    // Typing effect with more realistic timing
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
      }
    }, 50);

    // Enhanced scroll progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);
      
      // Update progress bar with smooth animation
      gsap.to(".progress-bar", {
        width: `${progress}%`,
        duration: 0.1,
        ease: "none"
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hero animations with more sophisticated timeline
    const tl = gsap.timeline();
    tl.from("#hero-title", { 
      opacity: 0, 
      y: 60, 
      scale: 0.8,
      duration: 1.5, 
      ease: "power3.out",
      delay: 0.5
    })
    .from("#hero-subtitle", { 
      opacity: 0, 
      y: 40, 
      duration: 1.2, 
      ease: "power2.out" 
    }, "-=0.8")
    .from("#hero-ctas", { 
      opacity: 0, 
      y: 30, 
      scale: 0.9,
      duration: 1, 
      ease: "power2.out" 
    }, "-=0.6")
    .from(".floating-shape", {
      opacity: 0,
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.3
    }, "-=0.8");

    // Enhanced floating shapes animation with more complex motion
    gsap.to(".floating-shape", {
      y: -40,
      x: 20,
      rotation: 360,
      duration: 8,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Parallax effect for shapes
    gsap.to(".floating-shape", {
      y: -80,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // Add mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      gsap.to(".floating-shape", {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(typeTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <section className="hero-section relative h-screen gradient-mesh flex items-center justify-center overflow-hidden">
        <div className="text-center z-10 px-6">
          <h1 
            id="hero-title"
            className="font-pacifico text-5xl md:text-6xl lg:text-7xl text-navy-deep dark:text-white mb-6"
          >
            Hi, I'm Mir Hamza CH.
          </h1>
          <p 
            id="hero-subtitle"
            className="text-xl md:text-2xl text-text-gray dark:text-gray-300 mb-8 min-h-[3rem]"
          >
            {typedText}
            <span className="typing-effect"></span>
          </p>
          <div 
            id="hero-ctas"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={scrollToProjects}
              className="magnetic-button bg-primary-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              View Projects
            </Button>
            <Button 
              onClick={scrollToContact}
              variant="outline"
              className="glass-effect border-2 border-dark-navy dark:border-white text-dark-navy dark:text-white hover:bg-dark-navy hover:text-white dark:hover:bg-white dark:hover:text-dark-navy px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Hire Me
            </Button>
          </div>
        </div>
        
        <div 
          className="scroll-indicator floating cursor-pointer"
          onClick={scrollToAbout}
        >
          <div className="text-primary-blue text-sm mb-2">Scroll</div>
          <ChevronDown className="w-6 h-6 text-primary-blue animate-bounce" />
        </div>
        
        {/* Advanced Floating Shapes & Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Morphing Blobs */}
          <div className="floating-shape absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-primary-blue/30 to-accent-green/30 rounded-full opacity-40 animate-pulse blur-xl"></div>
          <div className="floating-shape absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-accent-green/40 to-purple-500/40 rounded-full opacity-50 blur-lg" style={{ clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)' }}></div>
          <div className="floating-shape absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full opacity-35 blur-lg" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}></div>
          <div className="floating-shape absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-r from-pink-500/25 to-primary-blue/25 rounded-full opacity-30 blur-xl"></div>
          
          {/* Geometric Shapes */}
          <div className="floating-shape absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-r from-primary-blue/20 to-accent-green/20 opacity-25 transform rotate-45 blur-sm"></div>
          <div className="floating-shape absolute top-80 right-1/3 w-12 h-12 bg-gradient-to-r from-accent-green/30 to-purple-500/30 opacity-40 rounded-lg transform rotate-12 blur-sm"></div>
          
          {/* Animated Lines */}
          <div className="floating-shape absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent opacity-50"></div>
          <div className="floating-shape absolute top-1/3 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent-green/30 to-transparent opacity-40"></div>
          
          {/* Orbiting Elements */}
          <div className="floating-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border border-primary-blue/10 rounded-full animate-spin" style={{ animationDuration: '60s' }}>
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary-blue/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-accent-green/50 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Icon Elements */}
          <div className="floating-shape absolute top-1/3 left-10 w-8 h-8 bg-accent-green/30 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-accent-green animate-pulse" />
          </div>
          <div className="floating-shape absolute bottom-1/3 right-1/4 w-10 h-10 bg-primary-blue/30 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-blue animate-pulse" />
          </div>
          <div className="floating-shape absolute top-2/3 left-1/3 w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center">
            <Zap className="w-3 h-3 text-purple-400 animate-pulse" />
          </div>
          
          {/* Animated Gradient Orbs */}
          <div className="floating-shape absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-primary-blue/10 to-accent-green/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="floating-shape absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-accent-green/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>
    </>
  );
}
