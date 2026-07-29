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

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "jobs"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    setJobs(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }
async function handleDelete(id) {
  const confirmDelete = window.confirm(
    "Voulez-vous vraiment supprimer cette offre ?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "jobs", id));

    setJobs(jobs.filter((job) => job.id !== id));

    alert("✅ Offre supprimée.");
  } catch (error) {
    console.log(error);
    alert("Erreur lors de la suppression.");
  }
}
  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          Mes offres d'emploi
        </h1>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            Aucune offre publiée.
          </div>
        ) : (
          <div className="grid gap-6">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg p-8"
              >

                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {job.company}
                </p>

                <p className="mt-2">
                  📍 {job.location}
                </p>

                <p className="mt-2">
                  💰 {job.salary}
                </p>

                <div className="flex gap-4 mt-6">

                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                    Modifier
                  </button>

                  <button
  onClick={() => handleDelete(job.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
>
  Supprimer
</button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}