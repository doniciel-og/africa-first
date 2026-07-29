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

export default function MyTrainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    loadTrainings();
  }, []);

  async function loadTrainings() {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "trainings"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTrainings(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette formation ?")) return;

    await deleteDoc(doc(db, "trainings", id));

    setTrainings(
      trainings.filter((training) => training.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            Mes formations
          </h1>

          <Link
            to="/create-training"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            + Publier
          </Link>

        </div>

        <div className="grid gap-6">

          {trainings.map((training) => (

            <div
              key={training.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {training.title}
              </h2>

              <p className="mt-2">
                👨‍🏫 {training.trainer}
              </p>

              <p>
                📍 {training.country} • {training.city}
              </p>

              <p>
                ⏳ {training.duration}
              </p>

              <p>
                💰 {training.price}
              </p>

              <div className="flex gap-4 mt-8">

                <Link
                  to={`/edit-training/${training.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Modifier
                </Link>

                <button
                  onClick={() => handleDelete(training.id)}
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