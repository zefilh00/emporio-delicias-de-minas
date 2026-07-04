import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#3D100E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-14">

          <div>
            <div className="flex items-center gap-4">
              <img src={logo} alt="Empório" className="w-16" />

              <div>
                <h2
                  className="text-3xl text-[#E8C9A7]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                  }}
                >
                  EMPÓRIO
                </h2>

                <span className="uppercase tracking-[3px] text-xs text-[#D4B483]">
                  Delícias de Minas
                </span>
              </div>
            </div>

            <p className="mt-6 leading-7 text-[#d9c9bb]">
              Produtos artesanais cuidadosamente selecionados para levar o
              verdadeiro sabor de Minas Gerais até você.
            </p>
          </div>

          <div>
            <h3 className="text-xl text-[#E8C9A7] mb-6">Navegação</h3>

            <nav className="flex flex-col gap-4">
              <Link to="/" className="hover:text-[#D4B483] transition">
                Início
              </Link>

              <Link to="/produtos" className="hover:text-[#D4B483] transition">
                Produtos
              </Link>

              <Link to="/contato" className="hover:text-[#D4B483] transition">
                Contato
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xl text-[#E8C9A7] mb-6">Contato</h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <FaPhoneAlt className="text-[#D4B483] mt-1" />

                <a
                  href="https://wa.me/5532988497252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4B483] transition"
                >
                  (32) 98849-7252
                </a>
              </div>

              <div className="flex gap-5 mt-6 text-2xl">
                <a
                  href="https://www.instagram.com/deliciasdeminas.queijosmuriae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-12
                    h-12
                    rounded-full
                    border border-[#D4B483]
                    flex items-center justify-center
                    transition-all
                    duration-300
                    hover:bg-[#D4B483]
                    hover:text-[#471411]
                    hover:scale-110
                  "
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://wa.me/5532988497252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-12
                    h-12
                    rounded-full
                    border border-[#D4B483]
                    flex items-center justify-center
                    transition-all
                    duration-300
                    hover:bg-[#D4B483]
                    hover:text-[#471411]
                    hover:scale-110
                "
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ffffff10]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-sm text-[#bda999]">
            © {new Date().getFullYear()} Empório Delícias de Minas. Todos os
            direitos reservados.
          </span>

          <span className="text-sm text-[#bda999]">
            Desenvolvido por José Filho.
          </span>
        </div>
      </div>
    </footer>
  );
}
