import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

declare const gsap: any;

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    // Animate testimonial cards on scroll
    gsap.utils.toArray('.testimonial-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl text-navy-deep dark:text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-text-gray dark:text-gray-300 text-lg">
            Testimonials from satisfied customers
          </p>
          <div className="flex justify-center mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="testimonial-carousel relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-slide text-center ${
                  index === currentSlide ? 'active' : ''
                }`}
              >
                <div className="testimonial-card glass-effect bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg relative">
                  <div className="absolute top-6 left-6">
                    <Quote className="w-8 h-8 text-primary-blue/20" />
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={`${testimonial.name} avatar`}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-blue/20" 
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-text-gray dark:text-gray-300 italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="text-navy-deep dark:text-white font-semibold text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-text-gray dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-primary-blue" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-primary-blue w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-blue/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-primary-blue" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
