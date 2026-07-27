import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    }

    loadProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex items-center gap-6">

            <img
              src={`https://ui-avatars.com/api/?name=${
                profile?.fullName || "User"
              }&background=16a34a&color=fff&size=128`}
              alt="Profil"
              className="w-28 h-28 rounded-full"
            />

            <div>

              <h1 className="text-4xl font-bold">
                Bienvenue {profile?.fullName || "Utilisateur"} 👋
              </h1>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>📧 {profile?.email}</p>

                <p>🌍 {profile?.country}</p>

                <p>📍 {profile?.city}</p>

                <p>👤 {profile?.accountType}</p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="bg-green-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-green-600">0</h2>
              <p>Candidatures</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-blue-600">0</h2>
              <p>Investissements</p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-yellow-600">0</h2>
              <p>Partenariats</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}