import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function MyPartnerships() {
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    loadPartnerships();
  }, []);

  async function loadPartnerships() {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "partnerships"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPartnerships(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce partenariat ?")) return;

    await deleteDoc(doc(db, "partnerships", id));

    setPartnerships(
      partnerships.filter((partner) => partner.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            Mes partenariats
          </h1>

          <Link
            to="/create-partnership"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            + Publier
          </Link>

        </div>

        <div className="grid gap-6">

          {partnerships.map((partner) => (

            <div
              key={partner.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {partner.company}
              </h2>

              <p className="text-gray-500 mt-2">
                {partner.sector}
              </p>

              <p className="mt-4">
                📍 {partner.country}
              </p>

              <p className="mt-4">
                {partner.description}
              </p>

              <div className="flex gap-4 mt-8">

                <Link
                  to={`/edit-partnership/${partner.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Modifier
                </Link>

                <button
                  onClick={() => handleDelete(partner.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Supprimer
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}