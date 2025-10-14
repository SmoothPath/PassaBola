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
      <div className="max-w-6xl mx-auto px-6 py-12 sm:px-12">
        {/* Contato e Redes sociais */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-0">
          {/* Contato */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold">Contato</h3>
            <h2 className="text-3xl font-bold mt-1">Fale com a gente</h2>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Tem alguma dúvida, sugestão, ou quer saber mais sobre o Passa a Bola? Entre em contato, vamos adorar conversar com você.
            </p>

            {/* Informações de contato */}
            <div className="mt-6 space-y-4 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Mail01Icon size={22} color="#F3E8FF" aria-hidden="true" />
                <a
                  href="mailto:contato@passabola.com"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
                  aria-label="Enviar email para contato@passabola.com"
                >
                  contato@passabola.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <TelephoneIcon size={22} color="#F3E8FF" aria-hidden="true" />
                <a
                  href="tel:+5511999999999"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
                  aria-label="Ligar para +55 11 99999 9999"
                >
                  +55 (11) 99999-9999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPinpoint01Icon size={22} color="#F3E8FF" aria-hidden="true" />
                <address className="not-italic">
                  Rua dos Esportes, 123 - São Paulo, SP
                </address>
              </div>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="flex flex-col items-center w-max md:items-end space-y-4">
            <div className="flex space-x-6 text-3xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Instagram"
              >
                <InstagramIcon size={32} color="#F3E8FF" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Twitter"
              >
                <NewTwitterRectangleIcon size={32} color="#F3E8FF" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Facebook"
              >
                <Facebook02Icon size={32} color="#F3E8FF" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <hr className="border-white/30 mt-12" />

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-200 select-none">
          © 2025 Passa a Bola. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
