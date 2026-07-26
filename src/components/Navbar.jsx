import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="Africa First"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h1 className="text-white font-bold text-xl">
              Africa First
            </h1>

            <p className="text-green-400 text-xs tracking-widest uppercase">
              Connect • Invest • Grow
            </p>
          </div>

        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-8">

  <Link
    to="/"
    className="text-white hover:text-green-400 transition"
  >
    Accueil
  </Link>

  <Link
    to="/jobs"
    className="text-white hover:text-green-400 transition"
  >
    Emplois
  </Link>

  <Link
    to="/investments"
    className="text-white hover:text-green-400 transition"
  >
    Investissements
  </Link>

  <Link
    to="/partnerships"
    className="text-white hover:text-green-400 transition"
  >
    Partenariats
  </Link>

  <Link
    to="/training"
    className="text-white hover:text-green-400 transition"
  >
    Formations
  </Link>

</nav>

        {/* Bouton */}
        <div className="hidden lg:block">
          <button className="bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
            Commencer
          </button>
        </div>

        {/* Menu Mobile */}
        <Link
  to="/register"
  className="bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
>
  Commencer
</Link>

      </div>
    </header>
  );
}