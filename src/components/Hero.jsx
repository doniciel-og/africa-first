import heroBanner from "../assets/hero-banner.png";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-900 via-black to-black text-white min-h-screen flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-green-400 font-semibold uppercase tracking-widest mb-4">
            AFRICA FIRST
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Connecter les talents,
            <br />
            les entreprises
            <br />
            et les investisseurs africains.
          </h1>

          <p className="mt-8 text-xl text-gray-300">
            Une plateforme moderne réunissant les opportunités
            d'emploi, les investissements, les partenariats et les
            formations partout en Afrique.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-xl font-semibold">
              Commencer
            </button>

            <button className="border border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl">
  Découvrir
</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
  src={heroBanner}
  alt="Africa First"
  className="w-full rounded-3xl shadow-2xl"
/>
        </div>

      </div>
    </section>
  );
}