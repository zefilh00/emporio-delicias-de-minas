import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    return (

        <article
            className="
            group
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
            "
        >

            <div className="overflow-hidden">

                <img
                    src={product.imagem}
                    alt={product.nome}
                    className="
                    h-72
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    "
                />

            </div>

            <div className="p-6">

                <h3
                    className="
                    text-3xl
                    text-[#5E1D1A]
                    "
                    style={{
                        fontFamily: "Cormorant Garamond"
                    }}
                >
                    {product.nome}
                </h3>

                <p
                    className="
                    mt-3
                    text-gray-600
                    text-sm
                    leading-6
                    min-h-[70px]
                    "
                >
                    {product.descricao}
                </p>

                <div className="mt-6 flex justify-between items-center">

                    <span
                        className="
                        text-2xl
                        font-bold
                        text-[#8D5A43]
                        "
                    >
                        {product.preco}
                    </span>

                    <Link
                        to={`/produto/${product.slug}`}
                        className="
                        bg-[#5E1D1A]
                        text-white
                        px-5
                        py-2.5
                        rounded-full
                        transition-all
                        duration-300
                        hover:bg-[#7a2b26]
                        hover:scale-105
                        "
                    >
                        Ver mais
                    </Link>

                </div>

            </div>

        </article>

    );

}