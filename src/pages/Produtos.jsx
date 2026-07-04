import { useMemo, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { products } from "../db/products";

export default function Produtos() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [pesquisa, setPesquisa] = useState("");

  const categorias = [
    "Todos",
    ...new Set(products.map((p) => p.categoria)),
  ];

  const produtosFiltrados = useMemo(() => {
    return products.filter((produto) => {
      const categoriaOk =
        categoriaSelecionada === "Todos" ||
        produto.categoria === categoriaSelecionada;

      const pesquisaOk =
        produto.nome
          .toLowerCase()
          .includes(pesquisa.toLowerCase());

      return categoriaOk && pesquisaOk;
    });
  }, [categoriaSelecionada, pesquisa]);

  return (
    <>
      <Header />

      <main className="pt-28 bg-[#faf7f3] min-h-screen">

        {/* HERO */}

        <section className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[5px] text-[#8D5A43]">
            Catálogo
          </span>

          <h1
            className="text-6xl text-[#5E1D1A] mt-4"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            Nossos Produtos
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Conheça nossa seleção de queijos artesanais,
            kits especiais, geleias e diversos produtos
            cuidadosamente escolhidos para você.
          </p>

        </section>

        {/* Pesquisa */}

        <section className="max-w-7xl mx-auto px-6 mt-14">

          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="
              w-full
              rounded-full
              border
              border-gray-300
              px-6
              py-4
              outline-none
              focus:border-[#8D5A43]
            "
          />

        </section>

        {/* Categorias */}

        <section className="max-w-7xl mx-auto px-6 mt-8">

          <div className="flex flex-wrap gap-4 justify-center">

            {categorias.map((categoria) => (

              <button
                key={categoria}
                onClick={() => setCategoriaSelecionada(categoria)}
                className={`
                  px-6
                  py-3
                  rounded-full
                  transition

                  ${
                    categoriaSelecionada === categoria
                      ? "bg-[#5E1D1A] text-white"
                      : "bg-white hover:bg-[#5E1D1A] hover:text-white"
                  }
                `}
              >
                {categoria}
              </button>

            ))}

          </div>

        </section>

        {/* Produtos */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {produtosFiltrados.map((produto) => (

              <ProductCard
                key={produto.id}
                product={produto}
              />

            ))}

          </div>

          {produtosFiltrados.length === 0 && (

            <div className="text-center py-20 text-gray-500">

              Nenhum produto encontrado.

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}