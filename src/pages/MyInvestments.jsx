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

export default function MyInvestments() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    loadInvestments();
  }, []);

  async function loadInvestments() {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "investments"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setInvestments(data);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cet investissement ?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "investments", id));

      setInvestments(
        investments.filter((investment) => investment.id !== id)
      );

      alert("✅ Investissement supprimé.");
    } catch (error) {
      console.log(error);
      alert("Erreur.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            Mes investissements
          </h1>

          <Link
            to="/create-investment"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Publier
          </Link>

        </div>

        <div className="grid gap-6">

          {investments.map((investment) => (

            <div
              key={investment.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {investment.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {investment.country}
              </p>

              <p className="mt-4">
                💰 {investment.amount}
              </p>

              <p className="text-green-600">
                📈 {investment.roi}
              </p>

              <div className="flex gap-4 mt-8">

                <Link
                  to={`/edit-investment/${investment.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Modifier
                </Link>

                <button
                  onClick={() => handleDelete(investment.id)}
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