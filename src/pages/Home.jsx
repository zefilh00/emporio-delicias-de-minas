import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../db/products";
import hero from "../assets/hero.png";
import { FaCheese, FaLeaf, FaAward } from "react-icons/fa";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section
          className="relative min-h-screen bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b0d0b]/95 via-[#2b0d0b]/70 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="uppercase tracking-[6px] text-[#D4B483] text-sm">
                Tradição Mineira
              </span>

              <h1
                className="mt-5 text-5xl md:text-7xl text-white leading-none"
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                Os verdadeiros
                <br />
                sabores de Minas
                <br />
                <span className="text-[#D4B483]">
                  em um só lugar.
                </span>
              </h1>

              <p className="mt-8 text-[#e7ddd7] text-lg leading-8">
                Produtos selecionados para quem aprecia qualidade, tradição e o
                verdadeiro sabor da culinária mineira.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/produtos"
                  className="group bg-[#D4B483] hover:bg-[#e4c79b] transition-all duration-300 hover:scale-105 text-[#471411] font-semibold px-8 py-4 rounded-full shadow-xl"
                >
                  Conheça nossos produtos
                  <span className="inline-block ml-2 transition group-hover:translate-x-2">
                    →
                  </span>
                </Link>

                <Link
                  to="/contato"
                  className="border border-[#D4B483] text-[#D4B483] hover:bg-[#D4B483] hover:text-[#471411] transition px-8 py-4 rounded-full"
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#5E1D1A] py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <FaCheese className="mx-auto text-5xl text-[#D4B483]" />
              <h3 className="text-2xl text-white mt-5">
                Produtos Artesanais
              </h3>
              <p className="text-gray-300 mt-3">
                Seleção de produtos produzidos com tradição e qualidade.
              </p>
            </div>

            <div>
              <FaLeaf className="mx-auto text-5xl text-[#D4B483]" />
              <h3 className="text-2xl text-white mt-5">
                Ingredientes Selecionados
              </h3>
              <p className="text-gray-300 mt-3">
                Trabalhamos apenas com produtos cuidadosamente escolhidos.
              </p>
            </div>

            <div>
              <FaAward className="mx-auto text-5xl text-[#D4B483]" />
              <h3 className="text-2xl text-white mt-5">
                Qualidade Garantida
              </h3>
              <p className="text-gray-300 mt-3">
                Tradição, confiança e excelente atendimento.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#faf7f3]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="uppercase tracking-[5px] text-[#8D5A43] text-sm">
                Quem Somos
              </span>

              <h2
                className="text-5xl mt-4 text-[#5E1D1A]"
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                Muito mais que um empório.
              </h2>

              <p className="mt-8 text-gray-600 leading-8">
                O Empório Delícias de Minas nasceu com o propósito de levar aos
                nossos clientes os sabores mais tradicionais de Minas Gerais.
              </p>

              <p className="mt-6 text-gray-600 leading-8">
                Trabalhamos com queijos artesanais, geleias, kits especiais,
                farofas e diversos produtos cuidadosamente selecionados para
                proporcionar uma experiência única em cada compra.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={products[2].imagem}
                alt="Quem Somos"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase tracking-[5px] text-[#8D5A43] text-sm">
                Destaques
              </span>

              <h2
                className="text-5xl mt-4 text-[#5E1D1A]"
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                Produtos em Destaque
              </h2>

              <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
                Conheça alguns dos produtos mais procurados pelos nossos
                clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-14">
              <Link
                to="/produtos"
                className="bg-[#D4B483] hover:bg-[#e7c998] transition-all duration-300 hover:scale-105 px-10 py-4 rounded-full text-[#471411] font-semibold"
              >
                Ver todos os produtos
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#5E1D1A] py-24">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2
              className="text-5xl text-white"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Venha conhecer o sabor de Minas.
            </h2>

            <p className="text-[#d8c8bb] mt-6 text-lg">
              Faça uma visita ao nosso empório e descubra produtos selecionados
              que unem tradição, qualidade e muito sabor.
            </p>

            <Link
              to="/contato"
              className="inline-block mt-10 bg-[#D4B483] hover:bg-[#e4c79b] transition-all duration-300 hover:scale-105 text-[#471411] px-10 py-4 rounded-full font-semibold"
            >
              Entrar em Contato
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}