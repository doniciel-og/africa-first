import heroBanner from "../assets/hero-banner.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center min-h-[85vh]">
<div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl"></div>

<div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl"></div>
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
            les investisseurs et les opportunités afin d'accélérer
            le développement économique du continent africain.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <button className="bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl font-bold shadow-lg">
              Commencer gratuitement
            </button>

            <button className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 rounded-xl">
              Découvrir
            </button>
<div className="flex flex-wrap gap-10 mt-12">

  <div>
    <h2 className="text-4xl font-bold text-green-400">10 000+</h2>
    <p className="text-gray-400">Utilisateurs</p>
  </div>

  <div>
    <h2 className="text-4xl font-bold text-green-400">500+</h2>
    <p className="text-gray-400">Entreprises</p>
  </div>

  <div>
    <h2 className="text-4xl font-bold text-green-400">20+</h2>
    <p className="text-gray-400">Pays africains</p>
  </div>

</div>
          </div>

        </div>

        {/* Image */}
        <div className="flex justify-center">

          <img
            src={heroBanner}
            alt="Africa First"
            className="rounded-3xl shadow-2xl border border-green-500/20 hover:scale-105 transition-all duration-700 animate-pulse"
          />

        </div>

      </div>
    </section>
  );
}