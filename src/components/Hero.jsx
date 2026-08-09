import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white pt-28">

      {/* Halo lumineux */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">

        {/* Texte */}
        <div>

          <span className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🌍 Plateforme panafricaine
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            L'Afrique des
            <span className="text-green-400"> opportunités </span>
            commence ici.
          </h1>

          <p className="mt-8 text-gray-300 text-lg leading-8">
            Africa First connecte les talents, les entreprises,
            les investisseurs et les opportunités afin
            d'accélérer le développement économique
            du continent africain.
          </p>

          {/* Boutons */}

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl font-bold shadow-lg"
            >
              Créer un compte
            </Link>

            <Link
              to="/jobs"
              className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 rounded-xl"
            >
              Explorer les opportunités
            </Link>

          </div>

          {/* Statistiques */}

          <div className="flex flex-wrap gap-10 mt-12">

            <div>
              <h2 className="text-3xl font-bold text-green-400">💼</h2>
              <p className="text-gray-400">Emploi</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400">🤝</h2>
              <p className="text-gray-400">Partenariat</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400">💰</h2>
              <p className="text-gray-400">Investissement</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400">🎓</h2>
              <p className="text-gray-400">Formation</p>
            </div>

          </div>

        </div>

        {/* Dashboard Premium */}

        <div className="flex justify-center relative">

          <div className="absolute w-96 h-96 bg-green-500/20 blur-3xl rounded-full"></div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md">

            <div className="flex items-center justify-between mb-8">

              <h3 className="text-2xl font-bold">
                Africa First
              </h3>

              <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                En ligne
              </span>

            </div>

            {/* Offre */}

            <div className="bg-white/10 rounded-2xl p-5 mb-5 hover:scale-105 transition-all duration-300">

              <div className="flex justify-between">

                <div>

                  <h4 className="font-bold">
                    💼 Développeur React
                  </h4>

                  <p className="text-gray-300 text-sm">
                    First Bank
                  </p>

                </div>

                <span className="text-green-400 font-bold">
                  1200 $
                </span>

              </div>

            </div>

            {/* Investissement */}

            <div className="bg-white/10 rounded-2xl p-5 mb-5 hover:scale-105 transition-all duration-300">

              <h4 className="font-bold">
                💰 Investissement
              </h4>

              <p className="text-gray-300 mt-2">
                Recherche de partenaires financiers
              </p>

            </div>

            {/* Partenariat */}

            <div className="bg-white/10 rounded-2xl p-5 mb-5 hover:scale-105 transition-all duration-300">

              <h4 className="font-bold">
                🤝 Nouveau partenariat
              </h4>

              <p className="text-gray-300 mt-2">
                Projet agricole disponible
              </p>

            </div>

            {/* Formation */}

            <div className="bg-white/10 rounded-2xl p-5 hover:scale-105 transition-all duration-300">

              <h4 className="font-bold">
                🎓 Formation
              </h4>

              <p className="text-gray-300 mt-2">
                Développement Web & Intelligence Artificielle
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}