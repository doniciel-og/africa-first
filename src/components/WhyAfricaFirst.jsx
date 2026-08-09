export default function WhyAfricaFirst() {
  const cards = [
    {
      icon: "💼",
      title: "Emplois vérifiés",
      description:
        "Toutes les offres sont vérifiées par Africa First avant leur publication afin de garantir leur authenticité.",
    },
    {
      icon: "🤝",
      title: "Partenariats",
      description:
        "Trouvez facilement des partenaires fiables pour développer votre entreprise ou votre projet.",
    },
    {
      icon: "💰",
      title: "Investissements",
      description:
        "Connectez les porteurs de projets avec des investisseurs sérieux à travers l'Afrique.",
    },
    {
      icon: "🎓",
      title: "Formations",
      description:
        "Développez vos compétences grâce aux formations proposées sur la plateforme.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-green-600 font-bold uppercase tracking-widest">
            Pourquoi Africa First ?
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Une plateforme pensée pour
            <span className="text-green-600"> toute l'Afrique</span>
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
            Africa First réunit les entreprises, les candidats,
            les investisseurs et les entrepreneurs sur une seule
            plateforme afin de créer davantage d'opportunités.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
            >

              <div className="text-6xl">
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {card.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {card.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}