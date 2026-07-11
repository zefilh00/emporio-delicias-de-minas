import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import {FaSave, FaPlus, FaTimes, FaImage, FaEdit,} from "react-icons/fa";

export default function ProductForm({
  produto = null,
  atualizarProdutos,
  cancelarEdicao,
}) {
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
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9.-]/g, "");

        toast.loading("Enviando imagem...", {
          id: "upload",
        });

        const { error: uploadError } = await supabase.storage
          .from("produtos")
          .upload(nomeArquivo, imagem);

        if (uploadError) throw uploadError;

        imagemUrl = supabase.storage
          .from("produtos")
          .getPublicUrl(nomeArquivo)
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
        ({ error } = await supabase
          .from("products")
          .insert([dados]));
      }

      if (error) throw error;

      toast.success(
        produto
          ? "Produto atualizado com sucesso!"
          : "Produto cadastrado com sucesso!"
      );

      limparFormulario();

      atualizarProdutos();

      if (produto && cancelarEdicao) {
        cancelarEdicao();
      }
    } catch (erro) {
      console.error(erro);

      toast.error(
        erro.message || "Erro ao salvar produto."
      );
    }

    setLoading(false);
  }

  function cancelar() {
    limparFormulario();

    if (cancelarEdicao) {
      cancelarEdicao();
    }
  }

  return (
    <form
  onSubmit={salvarProduto}
  className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
>
  {/* Cabeçalho */}

  <div className="bg-[#5E1D1A] px-8 py-6">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
        {produto ? <FaEdit /> : <FaPlus />}
      </div>

      <div>
        <h2
          className="text-4xl text-white"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          {produto ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        <p className="text-gray-200 mt-1">
          {produto
            ? "Altere as informações do produto."
            : "Cadastre um novo produto para sua loja."}
        </p>
      </div>
    </div>
  </div>

  {/* Aviso de edição */}

  {produto && (
    <div className="mx-8 mt-8 rounded-2xl bg-yellow-50 border border-yellow-300 p-5">
      <div className="flex items-center gap-3">
        <FaEdit className="text-yellow-600 text-xl" />

        <div>
          <h3 className="font-bold text-yellow-700">
            Editando "{produto.nome}"
          </h3>

          <p className="text-yellow-600 text-sm">
            Quando terminar clique em
            <strong> Atualizar Produto</strong>.
          </p>
        </div>
      </div>
    </div>
  )}

  {/* Conteúdo */}

  <div className="p-8">

    <div className="grid lg:grid-cols-2 gap-10">

      {/* Formulário */}

      <div className="space-y-6">

        <div>

          <label className="block font-semibold mb-2">
            Nome do produto
          </label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Queijo Canastra"
            required
            className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-[#5E1D1A] outline-none transition"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Descrição
          </label>

          <textarea
            rows={6}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do produto..."
            required
            className="w-full rounded-xl border-2 border-gray-200 p-4 resize-none focus:border-[#5E1D1A] outline-none transition"
          />

        </div>

        <div className="grid sm:grid-cols-2 gap-5">

          <div>

            <label className="block font-semibold mb-2">
              Preço
            </label>

            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="89.90"
              required
              className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-[#5E1D1A] outline-none transition"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Categoria
            </label>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-[#5E1D1A] outline-none transition"
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

      {/* Imagem */}

      <div>

        <label className="block font-semibold mb-3">
          Imagem do produto
        </label>

        <label
          className="
          group
          border-2
          border-dashed
          border-gray-300
          hover:border-[#5E1D1A]
          rounded-3xl
          h-[380px]
          flex
          items-center
          justify-center
          overflow-hidden
          cursor-pointer
          transition
          bg-gray-50
          "
        >

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

          ) : (

            <div className="text-center">

              <FaImage className="mx-auto text-6xl text-gray-400 mb-6" />

              <h3 className="font-bold text-lg text-gray-700">
                Clique para adicionar uma imagem
              </h3>

              <p className="text-gray-500 mt-2">
                PNG • JPG • WEBP
              </p>

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

    {/* Botões */}

    <div className="flex flex-col sm:flex-row gap-4 mt-10">

      <button
        type="submit"
        disabled={loading}
        className={`
        flex-1
        py-4
        rounded-2xl
        text-white
        font-bold
        flex
        justify-center
        items-center
        gap-3
        transition-all
        duration-300

        ${
          produto
            ? "bg-green-600 hover:bg-green-700"
            : "bg-[#5E1D1A] hover:bg-[#6d211d]"
        }

        hover:scale-[1.02]
        disabled:opacity-60
        `}
      >

        {loading ? (

          "Salvando..."

        ) : (

          <>
            {produto ? <FaSave /> : <FaPlus />}

            {produto
              ? "Atualizar Produto"
              : "Cadastrar Produto"}
          </>

        )}

      </button>

      {produto && (

        <button
          type="button"
          onClick={cancelar}
          className="
          sm:w-52
          py-4
          rounded-2xl
          bg-gray-200
          hover:bg-gray-300
          font-semibold
          transition
          flex
          items-center
          justify-center
          gap-3
          "
        >

          <FaTimes />

          Cancelar

        </button>

      )}

    </div>

  </div>

</form>
  );
}