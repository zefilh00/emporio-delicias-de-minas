import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Produto from "./pages/Produto";
import Contato from "./pages/Contato";
import Error404 from "./pages/Error404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produto/:slug" element={<Produto />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}