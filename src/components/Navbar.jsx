import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, Bell, X } from "lucide-react";
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
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setShowMobileMenu(false);
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
            snapshot.docs.map((notificationDoc) => ({
              id: notificationDoc.id,
              ...notificationDoc.data(),
            }))
          );
        });
      } else {
        setNotificationCount(0);
        setNotifications([]);
      }
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    };
  }, []);

  const markNotificationAsRead = async (notification) => {
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
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 sm:gap-3 min-w-0"
        >
          <img
            src={logo}
            alt="Africa First"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />

          <div className="min-w-0">
            <h1 className="text-white font-bold text-base sm:text-xl truncate">
              Africa First
            </h1>

            <p className="text-green-400 text-[9px] sm:text-xs tracking-widest uppercase whitespace-nowrap">
              Connect • Invest • Grow
            </p>
          </div>
        </Link>

        {/* Navigation Desktop */}
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

        {/* Utilisateur Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowNotifications(!showNotifications)
                  }
                  className="relative text-white hover:text-green-400 transition"
                  aria-label="Notifications"
                >
                  <Bell size={24} />

                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-[calc(100vw-2rem)] max-w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">
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
                            onClick={() =>
                              markNotificationAsRead(notification)
                            }
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

        {/* Bouton Mobile */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden text-white p-2"
          aria-label="Ouvrir le menu"
        >
          {showMobileMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {showMobileMenu && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-green-500/20">
          <nav className="px-4 py-5 flex flex-col gap-2">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-white hover:text-green-400 px-4 py-3 rounded-lg transition"
            >
              Accueil
            </Link>

            <Link
              to="/jobs"
              onClick={closeMobileMenu}
              className="text-white hover:text-green-400 px-4 py-3 rounded-lg transition"
            >
              Emplois
            </Link>

            <Link
              to="/investments"
              onClick={closeMobileMenu}
              className="text-white hover:text-green-400 px-4 py-3 rounded-lg transition"
            >
              Investissements
            </Link>

            <Link
              to="/training"
              onClick={closeMobileMenu}
              className="text-white hover:text-green-400 px-4 py-3 rounded-lg transition"
            >
              Formations
            </Link>

            <Link
              to="/partnerships"
              onClick={closeMobileMenu}
              className="text-white hover:text-green-400 px-4 py-3 rounded-lg transition"
            >
              Partenariats
            </Link>

            <div className="border-t border-white/10 my-2" />

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="bg-white text-black px-4 py-3 rounded-lg font-semibold text-center"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold text-center"
                >
                  Mon Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-green-400 px-4 py-3 rounded-lg text-center"
                >
                  Connexion
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold text-center"
                >
                  Inscription
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}