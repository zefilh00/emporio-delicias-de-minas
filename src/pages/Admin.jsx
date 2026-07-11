import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductForm from "../components/admin/ProductForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaTag,
  FaDollarSign,
} from "react-icons/fa";

export default function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar produtos.");
      return;
    }

    setProdutos(data || []);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function excluirProduto(id) {
    const confirmar = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Erro ao excluir produto.");
      return;
    }

    toast.success("Produto excluído com sucesso!");

    if (produtoEditando?.id === id) {
      setProdutoEditando(null);
    }

    carregarProdutos();
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div>
              <h1
                className="text-5xl text-[#5E1D1A]"
                style={{ fontFamily: "Cormorant Garamond" }}
              >
                Painel Administrativo
              </h1>

              <p className="text-gray-500 mt-2">
                Gerencie todos os produtos do Empório Delícias de Minas.
              </p>
            </div>

            <Link
              to="/"
              className="
                flex
                items-center
                justify-center
                gap-3
                bg-white
                border
                border-[#5E1D1A]
                text-[#5E1D1A]
                px-6
                py-3
                rounded-2xl
                font-semibold
                shadow-md
                hover:bg-[#5E1D1A]
                hover:text-white
                transition-all
                duration-300
                hover:scale-105
              "
            >
              <FaArrowLeft />
              Voltar ao Site
            </Link>
          </div>

          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Gerencie todos os produtos da loja.
          </p>
        </div>

        <ProductForm
          key={produtoEditando?.id || "novo"}
          produto={produtoEditando}
          atualizarProdutos={carregarProdutos}
          cancelarEdicao={() => setProdutoEditando(null)}
        />

        <section className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#5E1D1A]">
                Produtos cadastrados
              </h2>

              <p className="text-gray-500 mt-1">
                {produtos.length} produto
                {produtos.length !== 1 && "s"} cadastrado
                {produtos.length !== 1 && "s"}.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {produtos.length === 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <FaBoxOpen className="text-6xl mx-auto text-gray-300 mb-6" />

                <h3 className="text-2xl font-bold text-gray-700">
                  Nenhum produto encontrado
                </h3>

                <p className="text-gray-500 mt-3">
                  Cadastre seu primeiro produto utilizando o formulário acima.
                </p>
              </div>
            )}

            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  overflow-hidden
                  border
                  border-gray-100
                "
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-72 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-110
                      "
                    />
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="
                          bg-[#5E1D1A]
                          text-white
                          px-4
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                        >
                          {produto.categoria}
                        </span>

                        <span
                          className="
                          bg-green-100
                          text-green-700
                          px-4
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                        >
                          Ativo
                        </span>
                      </div>

                      <h3
                        className="text-3xl mt-5 text-[#5E1D1A]"
                        style={{
                          fontFamily: "Cormorant Garamond",
                        }}
                      >
                        {produto.nome}
                      </h3>

                      <p className="text-gray-600 leading-7 mt-4">
                        {produto.descricao}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                            w-12
                            h-12
                            rounded-xl
                            bg-[#f6ede8]
                            flex
                            items-center
                            justify-center
                          "
                          >
                            <FaDollarSign className="text-[#5E1D1A]" />
                          </div>

                          <div>
                            <p className="text-gray-400 text-sm">Preço</p>

                            <strong className="text-xl text-[#5E1D1A]">
                              R$ {Number(produto.preco).toFixed(2)}
                            </strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className="
                            w-12
                            h-12
                            rounded-xl
                            bg-[#f6ede8]
                            flex
                            items-center
                            justify-center
                          "
                          >
                            <FaTag className="text-[#5E1D1A]" />
                          </div>

                          <div>
                            <p className="text-gray-400 text-sm">Categoria</p>

                            <strong className="text-[#5E1D1A]">
                              {produto.categoria}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                      "
                      >
                        <button
                          onClick={() => {
                            setProdutoEditando(produto);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-yellow-500
                            hover:bg-yellow-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                          "
                        >
                          <FaEdit />
                          Editar
                        </button>

                        <button
                          onClick={() => excluirProduto(produto.id)}
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                          "
                        >
                          <FaTrash />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
