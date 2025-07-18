import { useEffect, useState } from "react";
import { ChevronDown, Star, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

declare const gsap: any;

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Crafting clean code & beautiful interfaces";

  useEffect(() => {
    // Typing effect
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);

    // Scroll progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    // Hero animations with more sophisticated timeline
    const tl = gsap.timeline();
    tl.from("#hero-title", { 
      opacity: 0, 
      y: 50, 
      duration: 1.2, 
      ease: "power3.out",
      delay: 0.3
    })
    .from("#hero-subtitle", { 
      opacity: 0, 
      y: 30, 
      duration: 1, 
      ease: "power2.out" 
    }, "-=0.7")
    .from("#hero-ctas", { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.5")
    .from(".floating-shape", {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.2
    }, "-=0.5");

    // Enhanced floating shapes animation
    gsap.to(".floating-shape", {
      y: -30,
      x: 15,
      rotation: 360,
      duration: 6,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.8
    });

    // Parallax effect for shapes
    gsap.to(".floating-shape", {
      y: -50,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      clearInterval(typeTimer);
      window.removeEventListener('scroll', handleScroll);
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
            Hi, I'm Alex
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
        
        {/* Enhanced floating geometric shapes */}
        <div className="floating-shape absolute top-20 left-20 w-20 h-20 bg-accent-green/20 rounded-full blur-xl"></div>
        <div className="floating-shape absolute bottom-40 right-32 w-32 h-32 bg-primary-blue/20 rounded-full blur-xl"></div>
        <div className="floating-shape absolute top-1/3 right-20 w-16 h-16 bg-navy-deep/20 rounded-full blur-xl"></div>
        
        {/* Additional decorative elements */}
        <div className="floating-shape absolute top-1/2 left-10 w-4 h-4 bg-accent-green/40 rounded-full">
          <Star className="w-4 h-4 text-accent-green animate-pulse" />
        </div>
        <div className="floating-shape absolute bottom-32 left-1/4 w-6 h-6 bg-primary-blue/40 rounded-full">
          <Sparkles className="w-6 h-6 text-primary-blue animate-pulse" />
        </div>
        <div className="floating-shape absolute top-40 right-1/4 w-5 h-5 bg-navy-deep/40 rounded-full">
          <Zap className="w-5 h-5 text-navy-deep dark:text-white animate-pulse" />
        </div>
      </section>
    </>
  );
}
