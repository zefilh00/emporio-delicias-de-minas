import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Contato() {
  return (
    <>
      <Header />

      <main className="min-h-screen">

        <section className="bg-[#651C18] pt-20">

          <div className="max-w-7xl mx-auto px-6 py-24 text-center">

            <span className="uppercase tracking-[6px] text-[#D4B483]">
              CONTATO
            </span>

            <h1
              className="text-5xl md:text-7xl text-white mt-5"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Fale Conosco
            </h1>

            <p className="mt-8 text-[#E8D8CA] text-lg max-w-2xl mx-auto leading-8">
              Estamos sempre prontos para tirar suas dúvidas, apresentar nossos
              produtos e atender você da melhor forma possível.
            </p>

          </div>

        </section>

        <section className="bg-[#faf7f3] py-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="grid md:grid-cols-2 gap-10">

              {/* WhatsApp */}
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <FaWhatsapp size={50} className="text-green-600" />
                </div>

                <h2
                  className="text-4xl mt-8 text-[#5E1D1A]"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  WhatsApp
                </h2>

                <p className="mt-5 text-gray-600 leading-7">
                  Tire dúvidas, faça pedidos e fale diretamente com nossa equipe.
                </p>

                <p className="mt-8 text-2xl font-semibold text-[#5E1D1A]">
                  (32) 98849-7252
                </p>

                <a
                  href="https://wa.me/5532988497252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Conversar Agora
                </a>

              </div>

              <div className="bg-white rounded-3xl shadow-xl p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                  <FaInstagram size={50} className="text-pink-600" />
                </div>

                <h2
                  className="text-4xl mt-8 text-[#5E1D1A]"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  Instagram
                </h2>

                <p className="mt-5 text-gray-600 leading-7">
                  Acompanhe nossos produtos, novidades e promoções.
                </p>

                <p className="mt-8 text-xl font-semibold text-[#5E1D1A] break-all">
                  @deliciasdeminas.queijosmuriae
                </p>

                <a
                  href="https://www.instagram.com/deliciasdeminas.queijosmuriae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Visitar Perfil
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}