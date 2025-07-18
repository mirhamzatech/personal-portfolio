import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

declare const gsap: any;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const handleFilterChange = (filterId: string) => {
    if (filterId === activeFilter) return;
    
    setIsFiltering(true);
    
    // Animate out current cards
    gsap.to('.project-card', {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setActiveFilter(filterId);
        
        // Animate in new cards after a brief delay
        setTimeout(() => {
          gsap.fromTo('.project-card', 
            { opacity: 0, y: 30, scale: 0.9 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              onComplete: () => setIsFiltering(false)
            }
          );
        }, 100);
      }
    });
  };

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filters = [
    { id: "all", label: "All" },
    { id: "react", label: "React" },
    { id: "wordpress", label: "WordPress" },
    { id: "ecommerce", label: "E-commerce" },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-text-gray dark:text-gray-300 text-lg">
            A selection of my recent work
          </p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              disabled={isFiltering}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                activeFilter === filter.id
                  ? "bg-navy-deep text-white hover:bg-dark-navy shadow-lg"
                  : "bg-gray-200 text-navy-deep hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              } ${isFiltering ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="project-card group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="card-hover-overlay absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-90 px-4">{project.description}</p>
                    <div className="flex gap-4 justify-center">
                      <a 
                        href={project.caseStudyUrl}
                        className="inline-flex items-center bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </a>
                      <a 
                        href="#"
                        className="inline-flex items-center bg-primary-blue hover:bg-primary-blue/90 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-navy-deep/80 text-white backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-lg text-navy-deep dark:text-white mb-2 group-hover:text-primary-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-gray dark:text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Project Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <a 
                    href={project.caseStudyUrl}
                    className="inline-flex items-center text-primary-blue hover:text-accent-green transition-colors text-sm font-medium"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
