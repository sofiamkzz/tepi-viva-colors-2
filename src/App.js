import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./views/pages/Admin";
import Cadastro from "./views/pages/Cadastro";
import Carrinho from "./views/pages/Carrinho";
import Conta from "./views/pages/Conta";
import Favoritos from "./views/pages/Favoritos";
import FinalizacaoCompra from "./views/pages/FinalizacaoCompra";
import HistoricoCompras from "./views/pages/HistoricoCompras";
import Login from "./views/pages/Login";
import Produtos from "./views/pages/Produtos"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/finalizarCompra" element={<FinalizacaoCompra />} />
        <Route path="/historicoCompras" element={<HistoricoCompras />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;