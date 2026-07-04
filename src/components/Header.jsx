import { useState } from "react";
import { Link } from "react-router-dom";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import logo from "../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-all duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Header */}

      <header className="fixed top-0 left-0 w-full z-50">

        <div className="backdrop-blur-xl bg-[#471411]/70 border-b border-[#ffffff15]">

          <div className="max-w-7xl mx-auto h-20 px-6 lg:px-8 flex items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="Empório"
                className="w-12 transition duration-300 group-hover:rotate-6"
              />

              <div>

                <h1
                  className="text-[#E8C9A7] text-3xl leading-none"
                  style={{
                    fontFamily: "Cormorant Garamond",
                  }}
                >
                  EMPÓRIO
                </h1>

                <span className="uppercase tracking-[4px] text-[10px] text-[#D4B483]">
                  Delícias de Minas
                </span>

              </div>

            </Link>

            {/* Desktop */}

            <nav className="hidden md:flex items-center gap-10">

              {[
                {
                  nome: "Início",
                  link: "/",
                },
                {
                  nome: "Produtos",
                  link: "/produtos",
                },
                {
                  nome: "Contato",
                  link: "/contato",
                },
              ].map((item) => (
                <Link
                  key={item.nome}
                  to={item.link}
                  className="
                    relative
                    text-[#f5ede6]
                    font-medium
                    transition
                    hover:text-[#D4B483]

                    after:absolute
                    after:left-0
                    after:-bottom-2
                    after:h-[2px]
                    after:w-0
                    after:bg-[#D4B483]
                    after:transition-all

                    hover:after:w-full
                  "
                >
                  {item.nome}
                </Link>
              ))}

            </nav>

            {/* Botão Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden
                text-[#E8C9A7]
                text-4xl
                transition
                hover:scale-110
              "
            >
              {open ? <IoClose /> : <HiOutlineMenuAlt3 />}
            </button>

          </div>

        </div>

      </header>

      {/* Menu Mobile */}

      <aside
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-72
          bg-[#471411]
          z-50
          shadow-2xl

          transition-transform
          duration-500

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        <div className="flex items-center justify-between px-6 h-20 border-b border-[#ffffff10]">

          <span
            className="text-[#E8C9A7] text-2xl"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            Menu
          </span>

          <button
            onClick={() => setOpen(false)}
            className="text-[#E8C9A7] text-3xl"
          >
            <IoClose />
          </button>

        </div>

        <nav className="flex flex-col mt-8">

          {[
            {
              nome: "Início",
              link: "/",
            },
            {
              nome: "Produtos",
              link: "/produtos",
            },
            {
              nome: "Contato",
              link: "/contato",
            },
          ].map((item) => (
            <Link
              key={item.nome}
              to={item.link}
              onClick={() => setOpen(false)}
              className="
                px-8
                py-5
                text-[#F5EDE6]
                text-lg
                transition-all
                hover:bg-[#D4B483]
                hover:text-[#471411]
              "
            >
              {item.nome}
            </Link>
          ))}

        </nav>

      </aside>
    </>
  );
}