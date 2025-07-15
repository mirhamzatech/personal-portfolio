export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Custom web applications with modern frameworks and best practices.",
    icon: "code",
    color: "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
  },
  {
    id: "2",
    title: "Mobile Apps",
    description: "Cross-platform mobile applications with native performance.",
    icon: "smartphone",
    color: "bg-green-100 text-green-600 group-hover:bg-green-200"
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "User-centered design with modern aesthetics and seamless interactions.",
    icon: "figma",
    color: "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
  },
  {
    id: "4",
    title: "SEO Optimization",
    description: "Technical SEO and performance optimization for better rankings.",
    icon: "search",
    color: "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
  }
];
