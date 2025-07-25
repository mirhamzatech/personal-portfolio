import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from "lucide-react";
import { SiLinkedin, SiGithub, SiX, SiDribbble } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

declare const gsap: any;

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Animate contact cards on scroll
    gsap.utils.toArray('.contact-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSuccess(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const socialLinks = [
    { name: "LinkedIn", icon: SiLinkedin, href: "#", color: "hover:bg-blue-600" },
    { name: "GitHub", icon: SiGithub, href: "#", color: "hover:bg-gray-800" },
    { name: "X", icon: SiX, href: "#", color: "hover:bg-black" },
    { name: "Dribbble", icon: SiDribbble, href: "#", color: "hover:bg-pink-500" },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-text-gray dark:text-gray-300 text-lg">
            Ready to start your project? Let's chat!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-bg-light dark:bg-gray-800 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-navy-deep dark:text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary-blue"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-navy-deep dark:text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary-blue"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectType" className="text-navy-deep dark:text-white">
                    Project Type
                  </Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                    <SelectTrigger className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary-blue">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="seo-optimization">SEO Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-navy-deep dark:text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary-blue"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg ${
                    isSuccess 
                      ? 'bg-accent-green text-white' 
                      : 'bg-gradient-to-r from-primary-blue to-navy-deep hover:from-navy-deep hover:to-primary-blue text-white'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="contact-card text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-primary-blue" />
                </div>
                <h3 className="font-semibold text-navy-deep dark:text-white mb-2">Email</h3>
                <p className="text-text-gray dark:text-gray-300">jeehamza09@gmail.com</p>
              </div>
              
              <div className="contact-card text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-accent-green" />
                </div>
                <h3 className="font-semibold text-navy-deep dark:text-white mb-2">Phone</h3>
                <p className="text-text-gray dark:text-gray-300">+92 321 5268662</p>
              </div>
              
              <div className="contact-card text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-navy-deep dark:text-white mb-2">Location</h3>
                <p className="text-text-gray dark:text-gray-300">Lahore, Punjab, Pakistan</p>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6 pt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:text-white transition-all transform hover:scale-110 shadow-lg hover:shadow-xl ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
