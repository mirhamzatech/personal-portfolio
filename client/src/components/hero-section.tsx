import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

declare const gsap: any;

export function HeroSection() {
  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    tl.to("#hero-title", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .to("#hero-subtitle", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5")
      .to("#hero-ctas", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

    // Floating shapes animation
    gsap.set(".floating-shape", { y: 0 });
    gsap.to(".floating-shape", {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    });
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
    <section className="relative h-screen gradient-mesh flex items-center justify-center overflow-hidden">
      <div className="text-center z-10 px-6">
        <h1 
          id="hero-title"
          className="font-pacifico text-5xl md:text-6xl text-navy-deep dark:text-white mb-6 opacity-0 transform translate-y-4"
        >
          Hi, I'm Alex
        </h1>
        <p 
          id="hero-subtitle"
          className="text-xl md:text-2xl text-text-gray dark:text-gray-300 mb-8 opacity-0 transform translate-y-4"
        >
          Crafting clean code & beautiful interfaces
        </p>
        <div 
          id="hero-ctas"
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-4"
        >
          <Button 
            onClick={scrollToProjects}
            className="bg-primary-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            View Projects
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline"
            className="border-2 border-dark-navy dark:border-white text-dark-navy dark:text-white hover:bg-dark-navy hover:text-white dark:hover:bg-white dark:hover:text-dark-navy px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105"
          >
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
      
      {/* Floating geometric shapes */}
      <div className="floating-shape absolute top-20 left-20 w-20 h-20 bg-accent-green/20 rounded-full blur-xl"></div>
      <div className="floating-shape absolute bottom-40 right-32 w-32 h-32 bg-primary-blue/20 rounded-full blur-xl"></div>
      <div className="floating-shape absolute top-1/3 right-20 w-16 h-16 bg-navy-deep/20 rounded-full blur-xl"></div>
    </section>
  );
}
