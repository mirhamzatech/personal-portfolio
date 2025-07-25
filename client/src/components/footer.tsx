import { useEffect } from "react";
import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { SiLinkedin, SiGithub, SiX, SiDribbble } from "react-icons/si";

declare const gsap: any;

export function Footer() {
  useEffect(() => {
    // Animate footer elements on scroll
    gsap.fromTo(".footer-content", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating animation for social icons
    gsap.utils.toArray('.social-icon').forEach((icon: any, index: number) => {
      gsap.to(icon, {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });

    // Back to top button animation
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
      gsap.set(backToTopButton, { scale: 0 });
      
      const handleScroll = () => {
        if (window.scrollY > 500) {
          gsap.to(backToTopButton, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
        } else {
          gsap.to(backToTopButton, { scale: 0, duration: 0.3, ease: "back.in(1.7)" });
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: SiLinkedin, 
      href: "https://linkedin.com/in/mir_hamza", 
      color: "hover:bg-blue-600",
      bgColor: "bg-blue-500"
    },
    { 
      name: "GitHub", 
      icon: SiGithub, 
      href: "https://github.com/mir_hamza", 
      color: "hover:bg-gray-800",
      bgColor: "bg-gray-700"
    },
    { 
      name: "Twitter", 
      icon: SiX, 
      href: "https://twitter.com/mir_hamza", 
      color: "hover:bg-blue-400",
      bgColor: "bg-blue-500"
    },
    { 
      name: "Dribbble", 
      icon: SiDribbble, 
      href: "https://dribbble.com/mir_hamza", 
      color: "hover:bg-pink-500",
      bgColor: "bg-pink-400"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" }
  ];

  const skills = [
    "React & Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL"
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-navy-deep text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-blue/20 to-accent-green/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-green/20 rounded-full blur-3xl"></div>
      </div>

      <div className="footer-content relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-pacifico text-3xl text-white mb-4">
                  Mir Hamza
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Crafting digital experiences that blend creativity with cutting-edge technology. 
                  Let's build something amazing together.
                </p>
              </div>
              
              {/* Contact Info - Updated with clickable links */}
              <div className="space-y-3">
                <a href="mailto:jeehamza09@gmail.com" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-primary-blue/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary-blue" />
                  </div>
                  <span className="text-gray-300">jeehamza09@gmail.com</span>
                </a>
                
                <a href="tel:+923215268662" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-accent-green" />
                  </div>
                  <span className="text-gray-300">+92 321 526 8662</span>
                </a>
                
                <a 
                  href="https://maps.google.com/?q=Lahore,Punjab,Pakistan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">Lahore, Punjab, Pakistan</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-blue transition-colors duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-primary-blue hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-12 h-12 ${social.bgColor} rounded-lg flex items-center justify-center text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Newsletter */}
              <div className="space-y-3">
                <h5 className="text-lg font-medium text-white">Stay Updated</h5>
                <p className="text-gray-300 text-sm">
                  Subscribe to get the latest updates on new projects and insights.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-blue transition-colors"
                  />
                  <button className="px-4 py-2 bg-primary-blue hover:bg-navy-deep rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} Mir Hamza. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>in Lahore, Punjab, Pakistan</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-300">
              <a href="#" className="hover:text-primary-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-blue transition-colors">
                Terms of Service
              </a>
              <span className="text-sm">
                Built with React & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top fixed bottom-8 right-8 w-12 h-12 bg-primary-blue hover:bg-navy-deep text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}