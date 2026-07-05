import { useState } from "react";
import { Link } from "react-router-dom";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import logo from "../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
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
  ];

  return (
    <>
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

      <header className="fixed top-0 left-0 w-full z-50">

        <div className="bg-[#471411]/95 backdrop-blur-md border-b border-[#ffffff10] shadow-xl">

          <div className="max-w-7xl mx-auto h-24 px-6 lg:px-8 flex items-center justify-between">

            <Link
              to="/"
              className="flex items-center gap-4 group"
            >
              <img
                src={logo}
                alt="Empório Delícias de Minas"
                className="w-14 md:w-16 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
              />

              <div>

                <h1
                  className="text-[#E8C9A7] text-4xl leading-none"
                  style={{
                    fontFamily: "Cormorant Garamond",
                  }}
                >
                  EMPÓRIO
                </h1>

                <span className="uppercase tracking-[4px] text-xs text-[#D4B483]">
                  Delícias de Minas
                </span>

              </div>

            </Link>

            <nav className="hidden md:flex items-center gap-10">

              {links.map((item) => (
                <Link
                  key={item.nome}
                  to={item.link}
                  className="
                    relative
                    text-[#F5EDE6]
                    font-medium
                    transition-all
                    duration-300
                    hover:text-[#D4B483]

                    after:absolute
                    after:left-0
                    after:-bottom-2
                    after:h-[2px]
                    after:w-0
                    after:bg-[#D4B483]
                    after:transition-all
                    after:duration-300

                    hover:after:w-full
                  "
                >
                  {item.nome}
                </Link>
              ))}

            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden
                text-[#E8C9A7]
                text-4xl
                transition
                duration-300
                hover:scale-110
              "
            >
              {open ? <IoClose /> : <HiOutlineMenuAlt3 />}
            </button>

          </div>

        </div>

      </header>

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

        <div className="flex items-center justify-between px-6 h-24 border-b border-[#ffffff10]">

          <span
            className="text-[#E8C9A7] text-3xl"
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

          {links.map((item) => (
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
                duration-300
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