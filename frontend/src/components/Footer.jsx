import React from "react";
import {
  NewTwitterRectangleIcon,
  Facebook02Icon,
  InstagramIcon,
  TelephoneIcon,
  MapPinpoint01Icon,
  Mail01Icon,
} from "hugeicons-react";

const Footer = () => {
  return (
    <footer className="bg-[#7D1FA6] text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Títulos */}
        <h3 className="text-lg font-semibold">Contato</h3>
        <h2 className="text-2xl font-bold mt-1">Fale com a gente</h2>
        <p className="text-gray-200 mt-3 max-w-2xl">
          Tem alguma dúvida, sugestão, ou quer saber mais sobre o Passa a Bola?
          Entre em contato, vamos adorar conversar com você.
        </p>

        {/* Informações de contato */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail01Icon size={22} color="#F3E8FF" />
            <a
              href="mailto:contato@passabola.com"
              className="hover:underline"
            >
              contato@passabola.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <TelephoneIcon size={22} color="#F3E8FF" />
            <a href="tel:+5511999999999" className="hover:underline">
              +55 (11) 99999-9999
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPinpoint01Icon size={22} color="#F3E8FF" />
            <p>Rua dos Esportes, 123 - São Paulo, SP</p>
          </div>
        </div>

        {/* Redes sociais */}
        <div className="mt-8 flex space-x-6 text-2xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <InstagramIcon size={28} color="#F3E8FF" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <NewTwitterRectangleIcon size={28} color="#F3E8FF" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Facebook02Icon size={28} color="#F3E8FF" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-gray-200">
          © 2025 Passa a Bola. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
