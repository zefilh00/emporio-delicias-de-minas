import { Link } from "react-router-dom";
import { FaCheese, FaHome } from "react-icons/fa";

export default function Error404() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#5E1D1A] to-[#471411] flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        <div className="flex justify-center mb-8 animate-bounce">

          <FaCheese
            size={90}
            className="text-[#E8C9A7]"
          />

        </div>

        <h1
          className="text-8xl md:text-9xl text-[#E8C9A7]"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          404
        </h1>

        <h2
          className="text-4xl md:text-5xl text-white mt-6"
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          O queijo sumiu...
        </h2>

        <p className="text-[#E8D8CA] mt-6 text-lg leading-8">
          Parece que essa página não existe ou foi removida.
          Que tal voltar para a página inicial e conhecer nossos deliciosos
          produtos mineiros?
        </p>

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-3
            mt-12
            bg-[#D4B483]
            text-[#471411]
            px-8
            py-4
            rounded-full
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#E8C9A7]
            shadow-xl
          "
        >
          <FaHome />
          Voltar para o início
        </Link>

      </div>

    </main>
  );
}