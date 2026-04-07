import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* MOBILE (abaixo de 640px) */}
      <header className="block sm:hidden bg-blue-100 p-4">
        <h1 className="text-center font-bold text-2xl">
          Ciclos e Biorritmos da Vida
        </h1>

        <nav className="flex justify-center gap-4 mt-3 text-lg">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/sobre" className="hover:text-blue-500">
            Sobre
          </Link>
        </nav>
      </header>

      {/* DESKTOP (acima de 640px) */}
      <header className="hidden sm:flex justify-between items-center bg-blue-100 py-4 px-8">
        <h1 className="font-bold text-4xl">Ciclos e Biorritmos da Vida</h1>

        <nav className="flex gap-6 text-xl">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/sobre" className="hover:text-blue-500">
            Sobre
          </Link>
        </nav>
      </header>
    </>
  );
}
