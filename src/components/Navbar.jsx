import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="Africa First"
    className="w-12 h-12 rounded-full"
  />

  <div>
    <h1 className="text-xl font-bold text-white">
      AFRICA FIRST
    </h1>

    <p className="text-green-400 text-sm">
      Connect. Invest. Grow.
    </p>
  </div>
</div>

        <nav className="hidden md:flex items-center gap-8 text-white">

          <a href="#" className="hover:text-green-400 transition">
            Accueil
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Partenariats
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Investissements
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Emplois
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Formations
          </a>

        </nav>

        <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl text-white font-semibold">
          Commencer
        </button>

      </div>
    </header>
  );
}