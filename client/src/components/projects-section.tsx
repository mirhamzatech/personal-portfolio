import { useState, useEffect, useRef } from "react";
import { ArrowRight, ExternalLink, Eye, X, ZoomIn, ZoomOut, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

declare const gsap: any;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

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

  const handleViewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
    if (e.key === '+') {
      handleZoomIn();
    }
    if (e.key === '-') {
      handleZoomOut();
    }
    if (e.key === '0') {
      handleResetZoom();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => {
        window.removeEventListener('keydown', handleKeyDown as any);
      };
    }
  }, [selectedImage, zoomLevel]);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filters = [
    { id: "all", label: "All" },
    { id: "wordpress", label: "WordPress" },
    { id: "ecommerce", label: "Shopify" },
    { id: "Full Stack", label: "Full Stack" },
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
              className=" project-card group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
    border border-gray-200 dark:border-gray-700
    transition-all duration-300 ease-out
    hover:shadow-[0_10px_30px_-5px_rgba(0,139,249,0.3)]
    hover:border-[#008BF9]/30 dark:hover:border-[#008BF9]/50
    hover:bg-[#008BF9]/5 dark:hover:bg-[#0f3567]/10
    hover:-translate-y-1"
              style={{ perspective: "1000px" }}
            >
              <div className="relative overflow-hidden h-48" style={{ transformStyle: "preserve-3d" }}>
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
                    style={{
                      transform: "rotateX(10deg) rotateY(-5deg) translateZ(0)",
                      transformOrigin: "center bottom",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      backfaceVisibility: "hidden",
                    }}
                    loading="lazy"
                  />
                </div>
                <div 
                  className="card-hover-overlay absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-center text-white space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-90 px-4 line-clamp-2">{project.description}</p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handleViewImage(project.image)}
                        className="inline-flex items-center bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Image
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-navy-deep/80 text-white backdrop-blur-sm hover:bg-navy-deep">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      className="bg-primary-blue/10 text-primary-blue border-primary-blue/20 hover:bg-primary-blue/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-lg text-navy-deep dark:text-white mb-2 group-hover:text-primary-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-gray dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Project Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <a 
                    href={project.caseStudyUrl}
                    className="inline-flex items-center text-primary-blue hover:text-accent-green transition-colors text-sm font-medium group"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                  {/* <div className="flex gap-2">
                    <a 
                      href={project.liveUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors"
                      title="View Live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Modal Header with Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                onClick={handleZoomIn}
                variant="outline"
                size="sm"
                className="text-white bg-black/30 hover:bg-black/50 border-white/20"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleZoomOut}
                variant="outline"
                size="sm"
                className="text-white bg-black/30 hover:bg-black/50 border-white/20"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleResetZoom}
                variant="outline"
                size="sm"
                className="text-white bg-black/30 hover:bg-black/50 border-white/20"
                title="Reset Zoom (0)"
              >
                {Math.round(zoomLevel * 100)}%
              </Button>
            </div>
            
            <Button 
              onClick={handleCloseModal}
              variant="outline"
              size="sm"
              className="text-white bg-black/30 hover:bg-black/50 border-white/20"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Image Container */}
          <div 
            className="flex-1 w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <img 
              ref={imageRef}
              src={selectedImage} 
              alt="Full view" 
              className={`transition-transform duration-100 ${isDragging ? 'transition-none' : ''}`}
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                objectPosition: 'top'
              }}
            />
          </div>
          
          {/* Footer with Instructions */}
          <div className="absolute bottom-4 text-white/70 text-sm flex items-center gap-2">
            <Move className="w-4 h-4" />
            <span>Drag to pan when zoomed | + - 0 for zoom controls</span>
          </div>
        </div>
      )}
    </section>
  );
}