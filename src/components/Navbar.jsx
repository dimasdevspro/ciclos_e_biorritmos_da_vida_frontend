import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-blue-100">
      <div className="flex justify-between items-center py-4">
        {/* H1 com 20px da borda esquerda */}
        <h1 className="font-bold text-4xl ml-[30px] m-0 leading-tight">
          Ciclos e Biorritmos da Vida
        </h1>

        {/* Nav com 20px da borda direita */}
        <nav className="flex gap-4 mr-[30px] text-2xl items-center">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/sobre" className="hover:text-blue-500">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
