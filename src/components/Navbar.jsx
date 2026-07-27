import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


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
        <div className="hidden lg:flex items-center gap-4">

 {user ? (
  <div className="hidden lg:flex items-center gap-4">

    <span className="text-white font-semibold">
      <Link
  to="/dashboard"
  className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl font-semibold"
>
  👤 Mon compte
</Link>
    </span>

    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
    >
      Déconnexion
    </button>

  </div>
) : (
  <div className="hidden lg:flex items-center gap-4">

    <Link
      to="/login"
      className="text-white hover:text-green-400"
    >
      Connexion
    </Link>

    <Link
      to="/register"
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
    >
      Inscription
    </Link>

  </div>
)}

</div>

        

      </div>
    </header>
  );
}