function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#008f5d" }}>🌍 AFRICA FIRST</h2>

      <ul
        style={{
          display: "flex",
          gap: "30px",
          listStyle: "none",
          fontWeight: "bold",
        }}
      >
        <li>Accueil</li>
        <li>Partenariats</li>
        <li>Investissements</li>
        <li>Emplois</li>
        <li>Formations</li>
      </ul>

      <div>
        <button style={{ marginRight: "10px" }}>Connexion</button>
        <button>Créer un compte</button>
      </div>
    </nav>
  );
}

export default Navbar;