export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "L'entreprise soumet une offre",
      description:
        "Les entreprises peuvent soumettre une offre d'emploi directement sur la plateforme ou la transmettre à Africa First.",
    },
    {
      number: "02",
      title: "Africa First vérifie",
      description:
        "Notre équipe contrôle chaque offre afin de garantir sa fiabilité avant sa publication.",
    },
    {
      number: "03",
      title: "Les candidats postulent",
      description:
        "Les candidats envoient leurs candidatures à Africa First, qui centralise tout le processus.",
    },
    {
      number: "04",
      title: "Sélection & recrutement",
      description:
        "Africa First organise les tests, sélectionne les meilleurs profils puis les présente à l'entreprise.",
    },
  ];

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-green-600 font-bold uppercase tracking-widest">
            Notre processus
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Comment fonctionne
            <span className="text-green-600"> Africa First ?</span>
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
            Contrairement aux plateformes classiques, Africa First
            accompagne les entreprises et les candidats jusqu'au recrutement.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-8 mt-20">

          {steps.map((step) => (

            <div
              key={step.number}
              className="relative bg-gray-50 rounded-3xl p-8 hover:bg-green-50 transition-all duration-300 hover:-translate-y-2 shadow-md"
            >

              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}