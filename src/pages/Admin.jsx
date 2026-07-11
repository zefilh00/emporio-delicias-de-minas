import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductForm from "../components/admin/ProductForm";

export default function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  async function carregarProdutos() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProdutos(data || []);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function excluirProduto(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    carregarProdutos();
  }

  return (
    <main className="min-h-screen bg-[#faf7f3] py-12 px-6">

      <div className="max-w-6xl mx-auto">

        <h1
          className="text-5xl text-[#5E1D1A] mb-10"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          Painel Administrativo
        </h1>

        <ProductForm
          produto={produtoEditando}
          atualizarProdutos={carregarProdutos}
        />

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Produtos cadastrados
          </h2>

          <div className="space-y-6">

            {produtos.map((produto) => (

              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>

                    <h3 className="text-xl font-bold">
                      {produto.nome}
                    </h3>

                    <p className="text-gray-600">
                      R$ {Number(produto.preco).toFixed(2)}
                    </p>

                    <p className="text-sm text-gray-500">
                      {produto.categoria}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() => setProdutoEditando(produto)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirProduto(produto.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Excluir
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}