import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({

            email,
            password,

        });

        setLoading(false);

        if (error) {

            alert("Email ou senha inválidos.");

            return;

        }

        navigate("/admin");

    };

    return (

        <div className="min-h-screen bg-[#faf7f3] flex items-center justify-center px-6">

            <form
                onSubmit={handleLogin}
                className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md"
            >

                <h1
                    className="text-5xl text-center text-[#5E1D1A]"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >
                    Área Administrativa
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Faça login para continuar
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-[#8D5A43]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full border rounded-xl p-4 mb-8 outline-none focus:border-[#8D5A43]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-[#5E1D1A] text-white rounded-xl p-4 hover:bg-[#7b2b27] transition"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>

        </div>

    );

}