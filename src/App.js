import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Conta from "./Conta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/conta" element={<Conta />} />
      </Routes>
    </Router>
  );
}

export default App;