import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductBySlug } from "../services/products";

export default function Produto() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    carregarProduto();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />

        <main className="pt-24 min-h-screen flex items-center justify-center bg-[#faf7f3]">
          <h1 className="text-3xl text-[#5E1D1A]">
            Carregando produto...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />

        <main className="pt-24 min-h-screen flex items-center justify-center bg-[#faf7f3]">
          <h1 className="text-4xl">
            Produto não encontrado.
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  const mensagem = `Olá, Bom dia! Gostaria de adquirir com você o produto "${product.nome}".`;

  const whatsapp = `https://wa.me/5532988497252?text=${encodeURIComponent(
    mensagem
  )}`;

  return (
    <>
      <Header />

      <main className="pt-24 bg-[#faf7f3] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <img
              src={product.imagem}
              alt={product.nome}
              className="rounded-3xl shadow-2xl w-full object-cover"
            />

            <div>

              <span className="uppercase tracking-[4px] text-[#8D5A43]">
                {product.categoria}
              </span>

              <h1
                className="text-6xl text-[#5E1D1A] mt-4"
                style={{
                  fontFamily: "Cormorant Garamond",
                }}
              >
                {product.nome}
              </h1>

              <h2 className="text-4xl text-[#B8860B] mt-6 font-bold">
                R$ {Number(product.preco).toFixed(2)}
              </h2>

              <p className="text-gray-600 leading-8 mt-8">
                {product.descricao}
              </p>

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block
                  mt-12
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-10
                  py-5
                  rounded-full
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Quero Comprar
              </a>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}