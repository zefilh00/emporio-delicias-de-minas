import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Produto from "./pages/Produto";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";

export default function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produto/:slug" element={<Produto />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );

}