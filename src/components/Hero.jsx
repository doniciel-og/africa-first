function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "100px 20px",
        background: "#f4f7fa",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          maxWidth: "900px",
          margin: "0 auto 20px",
          lineHeight: "1.2",
        }}
      >
        Les opportunités africaines réunies sur une seule plateforme.
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#555",
          marginBottom: "40px",
        }}
      >
        Partenariats • Investissements • Emplois • Formations
      </p>

      <button
        style={{
          padding: "18px 45px",
          background: "#008f5d",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Commencer
      </button>
    </section>
  );
}

export default Hero;