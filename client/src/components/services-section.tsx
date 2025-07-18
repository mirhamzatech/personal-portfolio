import { useEffect } from "react";
import { Code, Smartphone, Palette, Zap, Globe, Database, Layers, Settings } from "lucide-react";

declare const gsap: any;

export function ServicesSection() {
  useEffect(() => {
    // Animate service cards on scroll
    gsap.utils.toArray('.service-card').forEach((card: any, index: number) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          delay: index * 0.1
        }
      );
    });

    // Floating animation for service icons
    gsap.utils.toArray('.service-icon').forEach((icon: any) => {
      gsap.to(icon, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    });

    // Add hover effects
    gsap.utils.toArray('.service-card').forEach((card: any) => {
      const icon = card.querySelector('.service-icon');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { rotation: 360, duration: 0.6, ease: "power2.out" });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { rotation: 0, duration: 0.6, ease: "power2.out" });
      });
    });
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies and best practices for optimal performance.",
      features: ["React/Next.js", "TypeScript", "Tailwind CSS", "API Integration"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications that provide seamless user experiences across all devices.",
      features: ["React Native", "Flutter", "iOS/Android", "PWA"],
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces designed with user experience and accessibility in mind.",
      features: ["Figma", "Prototyping", "User Research", "Design Systems"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Robust server-side solutions with scalable architectures and secure data management.",
      features: ["Node.js", "PostgreSQL", "API Design", "Cloud Deployment"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Globe,
      title: "SEO Optimization",
      description: "Comprehensive SEO strategies to improve your website's visibility and search rankings.",
      features: ["Technical SEO", "Content Strategy", "Performance", "Analytics"],
      gradient: "from-teal-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your applications with advanced optimization techniques and best practices.",
      features: ["Core Web Vitals", "Caching", "Code Splitting", "CDN Setup"],
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Layers,
      title: "Full-Stack Solutions",
      description: "Complete end-to-end development services from concept to deployment and maintenance.",
      features: ["Architecture", "DevOps", "CI/CD", "Monitoring"],
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: Settings,
      title: "Consulting & Support",
      description: "Expert technical guidance and ongoing support to help your projects succeed.",
      features: ["Code Review", "Tech Stack", "Mentoring", "Maintenance"],
      gradient: "from-pink-500 to-purple-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-pacifico text-navy-deep dark:text-white mb-6">
            Services
          </h2>
          <p className="text-xl text-text-gray dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to bring your vision to life with cutting-edge technology and creative expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="service-icon relative z-10 w-16 h-16 mx-auto mb-4">
                  <div className={`w-full h-full bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-navy-deep dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-gray dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center justify-center space-x-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                        <span className="text-sm text-text-gray dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            </div>
            <span className="text-navy-deep dark:text-white font-medium">
              Ready to start your project?
            </span>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary-blue to-navy-deep text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}