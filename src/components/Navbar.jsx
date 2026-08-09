import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
export default function Navbar() {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState("");
const [notificationCount, setNotificationCount] = useState(0);
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
  let unsubscribeNotifications = null;

  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (unsubscribeNotifications) {
      unsubscribeNotifications();
      unsubscribeNotifications = null;
    }

    if (currentUser) {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.uid),
        where("read", "==", false)
      );

      unsubscribeNotifications = onSnapshot(q, (snapshot) => {
        setNotificationCount(snapshot.size);

setNotifications(
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
);
      });
    } else {
      setNotificationCount(0);
    }
  });
async function markNotificationAsRead(notification) {
  try {
    if (!notification.read) {
      await updateDoc(
        doc(db, "notifications", notification.id),
        {
          read: true,
        }
      );
    }

    setShowNotifications(false);

  } catch (error) {
    console.log(error);
  }
}
  return () => {
    unsubscribeAuth();
    if (unsubscribeNotifications) {
      unsubscribeNotifications();
    }
  };
}, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

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

        </Link>

        {/* Navigation */}
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
            to="/training"
            className="text-white hover:text-green-400 transition"
          >
            Formations
          </Link>

          <Link
            to="/partnerships"
            className="text-white hover:text-green-400 transition"
          >
            Partenariats
          </Link>

        </nav>

        {/* Utilisateur */}
        <div className="hidden lg:flex items-center gap-3">

          {user ? (
            <>
            <div className="relative">

  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative text-white hover:text-green-400 transition"
  >

    <Bell size={24} />

    {notificationCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {notificationCount}
      </span>
    )}

  </button>

  {showNotifications && (

    <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-6 text-center text-gray-500">
            Aucune notification.
          </div>

        ) : (

          notifications.slice(0, 5).map((notification) => (

            <div
  key={notification.id}
  onClick={() => markNotificationAsRead(notification)}
  className={`p-5 border-b cursor-pointer transition ${
    notification.read
      ? "bg-white hover:bg-gray-50"
      : "bg-green-50 hover:bg-green-100"
  }`}
>

              <h3 className="font-bold">
                {notification.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {notification.message}
              </p>

            </div>

          ))

        )}

      </div>

      <Link
        to="/notifications"
        onClick={() => setShowNotifications(false)}
        className="block text-center py-4 bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Voir toutes les notifications →
      </Link>

    </div>

  )}

</div>
              <Link
                to="/dashboard"
                className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Mon Profil
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-green-400"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
              >
                Inscription
              </Link>
            </>
          )}

        </div>

        {/* Mobile */}
        <button className="lg:hidden text-white">
          <Menu size={30} />
        </button>

      </div>
    </header>
  );
}