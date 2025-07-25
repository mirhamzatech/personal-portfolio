import { useEffect, useState } from "react";
import { Download, Award, Users, Coffee, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiWordpress,
  SiShopify,
  SiWix,
} from "react-icons/si";
import resumePdf from "./Mir-Hamza-Resume.pdf"; // Import the PDF file directly

declare const gsap: any;

const techStack = [
  { name: "WordPress", icon: SiWordpress, color: "text-blue-700", level: 85 },
  { name: "Shopify", icon: SiShopify, color: "text-green-600", level: 88 },
  { name: "Wix", icon: SiWix, color: "text-blue-600", level: 80 },
  { name: "HTML", icon: SiHtml5, color: "text-orange-500", level: 98 },
  { name: "CSS", icon: SiCss3, color: "text-blue-500", level: 95 },
  { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500", level: 90 },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500", level: 92 },
  { name: "React", icon: SiReact, color: "text-blue-400", level: 94 },
];

const stats = [
  { icon: Award, label: "Years Experience", value: "5+" },
  { icon: Users, label: "Happy Clients", value: "50+" },
  { icon: Coffee, label: "Projects Completed", value: "100+" },
  { icon: Code2, label: "Lines of Code", value: "10k+" },
];

export function AboutSection() {
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  useEffect(() => {
    // Animate stats on scroll
    gsap.utils.toArray(".stat-item").forEach((stat: any, index: number) => {
      gsap.fromTo(
        stat,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Tech stack hover effects with enhanced animations
    const techIcons = document.querySelectorAll(".tech-icon");
    techIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", function () {
        gsap.to(this, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
        this.classList.add("glow-effect");
      });

      icon.addEventListener("mouseleave", function () {
        gsap.to(this, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
        this.classList.remove("glow-effect");
      });
    });

    // Animate skill level indicators in tech icons
    gsap.utils.toArray(".tech-icon").forEach((icon: any, index: number) => {
      gsap.fromTo(
        icon.querySelector(".skill-level-indicator"),
        { width: 0 },
        {
          width: `${techStack[index].level}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: icon,
            start: "top 80%",
            toggleActions: "play none none none",
            onStart: () => setSkillsAnimated(true),
          },
        }
      );
    });

    return () => {
      // Cleanup event listeners
      techIcons.forEach((icon) => {
        icon.removeEventListener("mouseenter", () => {});
        icon.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const downloadResume = () => {
    try {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = resumePdf;
      link.download = "Mir-Hamza-Resume.pdf";
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again later.");
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-text-gray dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I'm a passionate Website developer with 5+ years of experience
              creating digital experiences that combine aesthetic appeal with
              robust functionality. I specialize in modern web technologies and
              CMS platforms, always striving for pixel-perfect implementations.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="w-16 h-16 bg-primary-blue/10 dark:bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-blue" />
                </div>
                <div className="text-2xl font-bold text-navy-deep dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-text-gray dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Full-width Tech Stack Icons */}
          <div className="w-full mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-icon group cursor-pointer text-center p-4"
                >
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-primary-blue/10 group-hover:to-accent-green/10 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                      <tech.icon
                        className={`text-3xl ${tech.color} group-hover:text-accent-green transition-all duration-300 group-hover:scale-125`}
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-accent-green/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    <div
                      className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                  <p className="text-sm group-hover:text-accent-green transition-colors font-medium">
                    {tech.name}
                  </p>
                  {/* Skill level indicator */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
                    <div
                      className="skill-level-indicator h-full bg-gradient-to-r from-primary-blue to-accent-green transition-all duration-1000"
                      style={{
                        width: skillsAnimated ? `${tech.level}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="text-center mt-12">
            <Button
              onClick={downloadResume}
              className="magnetic-button bg-dark-navy hover:bg-navy-deep dark:bg-white dark:hover:bg-gray-200 dark:text-dark-navy text-white px-8 py-4 rounded-full font-medium shadow-lg group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}