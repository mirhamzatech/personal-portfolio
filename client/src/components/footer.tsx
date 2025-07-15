import { SiLinkedin, SiGithub, SiX, SiDribbble } from "react-icons/si";

export function Footer() {
  const socialLinks = [
    { name: "LinkedIn", icon: SiLinkedin, href: "#" },
    { name: "GitHub", icon: SiGithub, href: "#" },
    { name: "X", icon: SiX, href: "#" },
    { name: "Dribbble", icon: SiDribbble, href: "#" },
  ];

  return (
    <footer className="bg-navy-deep dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="font-pacifico text-2xl mb-4">Alex Portfolio</div>
          <p className="text-gray-300 mb-6">Crafting clean code & beautiful interfaces</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-gray-400">
            <p>&copy; 2024 Alex Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
