function Features() {
  const services = [
    {
      titre: "🤝 Partenariats",
      texte: "Trouvez des partenaires fiables pour développer votre entreprise."
    },
    {
      titre: "💰 Investissements",
      texte: "Présentez vos projets et trouvez des investisseurs."
    },
    {
      titre: "💼 Emplois",
      texte: "Publiez des offres d'emploi ou trouvez votre prochain poste."
    },
    {
      titre: "🎓 Formations",
      texte: "Accédez à des formations de qualité pour développer vos compétences."
    }
  ];

  return (
    <section
      style={{
        padding: "80px 40px",
        background: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "50px",
        }}
      >
        Nos services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>{service.titre}</h3>
            <p>{service.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;