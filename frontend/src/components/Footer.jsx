import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Passa a Bola. Todos os direitos reservados.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="mailto:contato@passabola.com" className="hover:text-gray-300 transition">Email</a>
          <a href="tel:+5511999999999" className="hover:text-gray-300 transition">Telefone</a>
          <a href="#" className="hover:text-gray-300 transition">Redes Sociais</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
