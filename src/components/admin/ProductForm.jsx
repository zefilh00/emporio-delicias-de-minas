import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import { FaSave, FaPlus, FaTimes, FaImage, FaEdit } from "react-icons/fa";

export default function ProductForm({ produto = null, atualizarProdutos }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setCategoria(produto.categoria);
      setPreview(produto.imagem);
      setImagem(null);
    } else {
      limparFormulario();
    }
  }, [produto]);

  useEffect(() => {
    if (!imagem) return;

    const url = URL.createObjectURL(imagem);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imagem]);

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
    setImagem(null);
    setPreview("");
  }

  function gerarSlug(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  async function salvarProduto(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let imagemUrl = produto?.imagem || "";

      if (imagem) {
        const nomeArquivo =
          Date.now() +
          "-" +
          imagem.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "_")
            .replace(/[^\w.-]/g, "");

        toast.loading("Enviando imagem...", {
          id: "upload",
        });

        const { error: uploadError } = await supabase.storage
          .from("produtos")
          .upload(nomeArquivo, imagem);

        if (uploadError) throw uploadError;

        imagemUrl = supabase.storage.from("produtos").getPublicUrl(nomeArquivo)
          .data.publicUrl;

        toast.success("Imagem enviada!", {
          id: "upload",
        });
      }

      const dados = {
        nome,
        descricao,
        preco: Number(preco),
        categoria,
        imagem: imagemUrl,
        slug: gerarSlug(nome),
      };

      let error;

      if (produto) {
        ({ error } = await supabase
          .from("products")
          .update(dados)
          .eq("id", produto.id));
      } else {
        ({ error } = await supabase.from("products").insert([dados]));
      }

      if (error) throw error;

      toast.success(
        produto
          ? "Produto atualizado com sucesso!"
          : "Produto cadastrado com sucesso!",
      );

      limparFormulario();

      atualizarProdutos();
    } catch (erro) {
      console.error(erro);

      toast.error(erro.message || "Erro ao salvar produto.");
    }

    setLoading(false);
  }

  function cancelarEdicao() {
    limparFormulario();
    window.location.reload();
  }
  return (
    <form
      onSubmit={salvarProduto}
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 border border-gray-100"
    >
      {produto && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl">
              <FaEdit />
            </div>

            <div>
              <h3 className="font-bold text-yellow-800 text-xl">
                Você está editando um produto
              </h3>

              <p className="text-yellow-700">
                As alterações serão salvas ao clicar em
                <strong> Atualizar Produto</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={cancelarEdicao}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FaTimes />
            Cancelar
          </button>
        </div>
      )}

      <div>
        <h2
          className="text-4xl text-[#5E1D1A]"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          {produto ? "Editar Produto" : "Cadastrar Novo Produto"}
        </h2>

        <p className="text-gray-500 mt-2">Preencha as informações abaixo.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Nome do produto</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Queijo Canastra"
              required
              className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-[#5E1D1A] transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Descrição</label>

            <textarea
              rows={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do produto..."
              required
              className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-[#5E1D1A] transition resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-semibold">Preço</label>

              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="89.90"
                required
                className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-[#5E1D1A] transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Categoria</label>

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-[#5E1D1A] transition"
              >
                <option value="">Selecione</option>
                <option value="Queijos">Queijos</option>
                <option value="Vinhos">Vinhos</option>
                <option value="Kits">Kits</option>
                <option value="Geleias">Geleias</option>
                <option value="Farofas">Farofas</option>
                <option value="Palitos">Palitos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Imagem</label>

          <label
            className="
          flex
          flex-col
          items-center
          justify-center
          border-2
          border-dashed
          border-gray-300
          hover:border-[#5E1D1A]
          rounded-2xl
          h-[350px]
          cursor-pointer
          transition
          overflow-hidden
          bg-gray-50
          "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                <FaImage className="text-6xl mx-auto mb-5" />

                <p className="font-semibold">
                  Clique para selecionar uma imagem
                </p>

                <span className="text-sm">PNG, JPG ou WEBP</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`
      w-full
      rounded-2xl
      py-5
      text-lg
      font-bold
      transition-all
      duration-300
      flex
      items-center
      justify-center
      gap-3

      ${
        produto
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-[#5E1D1A] hover:bg-[#6b211d] text-white"
      }

      hover:scale-[1.02]
      disabled:opacity-60
      disabled:cursor-not-allowed
      `}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity=".3"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Salvando...
          </>
        ) : (
          <>
            {produto ? <FaSave /> : <FaPlus />}

            {produto ? "Atualizar Produto" : "Cadastrar Produto"}
          </>
        )}
      </button>
    </form>
  );
}
