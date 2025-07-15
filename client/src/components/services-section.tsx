import { useEffect } from "react";
import { Code, Smartphone, Search } from "lucide-react";
import { SiFigma } from "react-icons/si";
import { services } from "@/data/services";

declare const gsap: any;

const iconMap = {
  code: Code,
  smartphone: Smartphone,
  figma: SiFigma,
  search: Search,
};

export function ServicesSection() {
  useEffect(() => {
    // Service card animations
    gsap.utils.toArray('.service-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <section id="services" className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-4">
            Services
          </h2>
          <p className="text-text-gray dark:text-gray-300 text-lg">
            What I can do for you
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <div 
                key={service.id}
                className="service-card group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:bg-bg-light dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
              >
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-pacifico text-xl text-navy-deep dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-text-gray dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
