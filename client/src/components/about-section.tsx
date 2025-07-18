import { useEffect, useState } from "react";
import { Download, Award, Users, Coffee, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiReact, SiJavascript, SiNodedotjs, SiPython, SiFigma, SiGit, SiTailwindcss, SiTypescript } from "react-icons/si";

declare const gsap: any;

const techStack = [
  { name: "React", icon: SiReact, color: "text-blue-500", level: 95 },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500", level: 92 },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600", level: 88 },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600", level: 85 },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500", level: 90 },
  { name: "Python", icon: SiPython, color: "text-blue-500", level: 80 },
  { name: "Figma", icon: SiFigma, color: "text-purple-500", level: 87 },
  { name: "Git", icon: SiGit, color: "text-orange-500", level: 93 },
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
    gsap.utils.toArray('.stat-item').forEach((stat: any, index: number) => {
      gsap.fromTo(stat, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Animate skill bars
    gsap.utils.toArray('.skill-bar').forEach((bar: any, index: number) => {
      gsap.fromTo(bar, 
        { width: 0 },
        { 
          width: `${techStack[index].level}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none none",
            onStart: () => setSkillsAnimated(true)
          }
        }
      );
    });

    // Tech stack hover effects with enhanced animations
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        gsap.to(this, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
        this.classList.add('glow-effect');
      });
      
      icon.addEventListener('mouseleave', function() {
        gsap.to(this, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
        this.classList.remove('glow-effect');
      });
    });
  }, []);

  const downloadResume = () => {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'alex-resume.pdf';
    link.click();
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
              I'm a passionate full-stack developer with 5+ years of experience creating digital experiences that combine aesthetic appeal with robust functionality. I specialize in React ecosystems and modern web technologies, always striving for pixel-perfect implementations.
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
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Skills Section */}
            <div>
              <h3 className="font-pacifico text-2xl text-navy-deep dark:text-white mb-6">
                Technical Skills
              </h3>
              <div className="space-y-6">
                {techStack.map((tech, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <tech.icon className={`text-2xl ${tech.color}`} />
                        <span className="font-medium text-navy-deep dark:text-white">
                          {tech.name}
                        </span>
                      </div>
                      <span className="text-text-gray dark:text-gray-300 text-sm">
                        {tech.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`skill-bar h-2 rounded-full bg-gradient-to-r from-primary-blue to-accent-green transition-all duration-300`}
                        style={{ width: skillsAnimated ? `${tech.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Icons */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-icon group cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-bg-light dark:group-hover:bg-gray-700 transition-all duration-300">
                    <tech.icon className={`text-3xl ${tech.color} group-hover:text-accent-green transition-all duration-300`} />
                  </div>
                  <p className="text-sm group-hover:text-accent-green transition-colors">
                    {tech.name}
                  </p>
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
