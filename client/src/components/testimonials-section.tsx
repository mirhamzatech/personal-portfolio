import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-carousel relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-slide text-center ${
                  index === currentSlide ? 'active' : ''
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex justify-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name} avatar`}
                      className="w-20 h-20 rounded-full object-cover" 
                    />
                  </div>
                  <blockquote className="text-lg text-text-gray dark:text-gray-300 italic mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="text-navy-deep dark:text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-text-gray dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-primary-blue' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
