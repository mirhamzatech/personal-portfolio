import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

declare const gsap: any;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
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
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-navy-deep text-white hover:bg-dark-navy"
                  : "bg-gray-200 text-navy-deep hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
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
              className="project-card group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover" 
              />
              <div className="card-hover-overlay absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{project.description}</p>
                  <a 
                    href={project.caseStudyUrl}
                    className="inline-flex items-center text-accent-green hover:text-white transition-colors"
                  >
                    View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} className="bg-primary-blue text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-lg text-navy-deep dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-text-gray dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
