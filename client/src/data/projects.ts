export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  caseStudyUrl: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with interactive charts and reporting features.",
    category: "react",
    tags: ["React", "D3.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  },
  {
    id: "2",
    title: "Fashion Store",
    description: "Modern e-commerce platform with seamless checkout and inventory management.",
    category: "ecommerce",
    tags: ["Next.js", "Shopify", "Tailwind"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  },
  {
    id: "3",
    title: "Corporate Website",
    description: "Professional business website with custom CMS and advanced SEO optimization.",
    category: "wordpress",
    tags: ["WordPress", "PHP", "MySQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  },
  {
    id: "4",
    title: "Task Manager",
    description: "Collaborative productivity app with real-time updates and team management.",
    category: "react",
    tags: ["React", "Redux", "Firebase"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  },
  {
    id: "5",
    title: "Fitness App",
    description: "Cross-platform fitness tracking app with workout planning and progress analytics.",
    category: "react",
    tags: ["React Native", "GraphQL", "MongoDB"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  },
  {
    id: "6",
    title: "Marketplace",
    description: "Multi-vendor marketplace with vendor management and integrated payments.",
    category: "ecommerce",
    tags: ["Vue.js", "Laravel", "Stripe"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    caseStudyUrl: "#"
  }
];
