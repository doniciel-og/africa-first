import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const user = auth.currentUser;

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [accountType, setAccountType] = useState("Candidat");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFullName(data.fullName || "");
        setCountry(data.country || "");
        setCity(data.city || "");
        setAccountType(data.accountType || "Candidat");
      }
    }

    loadProfile();
  }, [user]);

  async function handleSave() {
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        fullName,
        country,
        city,
        accountType,
      });

      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la mise à jour.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={`https://ui-avatars.com/api/?name=${user?.email || "User"}&background=16a34a&color=fff&size=200`}
            alt="Profil"
            className="w-36 h-36 rounded-full"
          />

          <div>

            <h1 className="text-4xl font-bold">
              Mon Profil
            </h1>

            <p className="text-gray-500 mt-2">
              {user?.email}
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div>
            <label className="font-semibold">
              Nom complet
            </label>

            <input
  type="text"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full border p-4 rounded-xl mt-2"
/>
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border p-4 rounded-xl mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Pays
            </label>

            <input
  type="text"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  className="w-full border p-4 rounded-xl mt-2"
/>
          </div>

          <div>
            <label className="font-semibold">
              Ville
            </label>

            <input
  type="text"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className="w-full border p-4 rounded-xl mt-2"
/>
          </div>

          <div>
            <label className="font-semibold">
              Type de compte
            </label>

            <select
  value={accountType}
  onChange={(e) => setAccountType(e.target.value)}
  className="w-full border p-4 rounded-xl mt-2"
>
              <option>Candidat</option>
              <option>Entreprise</option>
              <option>Investisseur</option>
              <option>Formateur</option>
            </select>
          </div>

        </div>

        <button
  onClick={handleSave}
  className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
>
          Enregistrer les modifications
        </button>

      </div>
    </div>
  );
}