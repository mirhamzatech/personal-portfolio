import { useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiReact, SiJavascript, SiNodedotjs, SiPython, SiFigma, SiGit } from "react-icons/si";

const techStack = [
  { name: "React", icon: SiReact, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "Python", icon: SiPython, color: "text-blue-500" },
  { name: "Figma", icon: SiFigma, color: "text-purple-500" },
  { name: "Git", icon: SiGit, color: "text-orange-500" },
];

export function AboutSection() {
  useEffect(() => {
    // Tech stack hover effects
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.classList.add('glow-effect');
      });
      
      icon.addEventListener('mouseleave', function() {
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-8">
            About Me
          </h2>
          <p className="text-lg text-text-gray dark:text-gray-300 mb-8 leading-relaxed">
            I'm a passionate full-stack developer with 5+ years of experience creating digital experiences that combine aesthetic appeal with robust functionality. I specialize in React ecosystems and modern web technologies, always striving for pixel-perfect implementations.
          </p>
          
          {/* Tech Stack */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-12">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-icon group cursor-pointer">
                <tech.icon className={`text-4xl ${tech.color} group-hover:text-accent-green transition-all duration-300 transform group-hover:scale-110`} />
                <p className="text-sm mt-2 group-hover:text-accent-green transition-colors">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={downloadResume}
            className="bg-dark-navy hover:bg-navy-deep dark:bg-white dark:hover:bg-gray-200 dark:text-dark-navy text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
