export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechCorp",
    content: "Mir Hamza delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization were outstanding.",
    avatar: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Founder",
    company: "DesignStudio",
    content: "Working with Mir was a game-changer for our startup. The React application was delivered on time and perfectly matched our vision.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "GrowthCo",
    content: "The mobile app Mir Hamza developed for us has been instrumental in our growth. Clean code, beautiful design, and excellent support.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e59c21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  }
];
