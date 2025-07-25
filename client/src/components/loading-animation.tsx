import { useEffect, useState } from "react";
import { Code, Sparkles, Zap } from "lucide-react";

declare const gsap: any;

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Enhanced loading animations
    gsap.to(".loading-orb", {
      scale: 1.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

    gsap.to(".loading-ring", {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".loading-particle", {
      y: -20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.1
    });

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#fff5bf] z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-blue to-accent-green rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-accent-green to-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main Loading Animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="loading-ring absolute inset-0 border-4 border-primary-blue/20 rounded-full">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary-blue rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Inner Ring */}
          <div className="loading-ring absolute inset-4 border-4 border-accent-green/30 rounded-full" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent-green rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Center Orb */}
          <div className="loading-orb absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-primary-blue to-accent-green rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
          
          {/* Floating Particles */}
          <div className="loading-particle absolute top-2 right-2 w-2 h-2 bg-primary-blue rounded-full"></div>
          <div className="loading-particle absolute bottom-2 left-2 w-2 h-2 bg-accent-green rounded-full"></div>
          <div className="loading-particle absolute top-1/2 right-0 w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
          <div className="loading-particle absolute top-1/2 left-0 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Code className="w-5 h-5 text-primary-blue animate-pulse" />
            <span className="text-2xl font-pacifico text-navy-deep dark:text-white">
              Mir Hamza
            </span>
            <Sparkles className="w-5 h-5 text-accent-green animate-pulse" />
          </div>
          
          <p className="text-text-gray dark:text-gray-300 text-sm">
            Crafting premium experiences...
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-blue to-accent-green transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="mt-2 text-xs text-text-gray dark:text-gray-400">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="loading-particle absolute top-1/4 left-1/4 p-2 bg-primary-blue/10 rounded-full">
            <Code className="w-4 h-4 text-primary-blue" />
          </div>
          <div className="loading-particle absolute top-1/3 right-1/4 p-2 bg-accent-green/10 rounded-full">
            <Sparkles className="w-4 h-4 text-accent-green" />
          </div>
          <div className="loading-particle absolute bottom-1/4 left-1/3 p-2 bg-purple-500/10 rounded-full">
            <Zap className="w-4 h-4 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}