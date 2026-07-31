import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function AdminJobRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
  try {
    const snapshot = await getDocs(collection(db, "jobRequests"));

    console.log("Nombre de documents :", snapshot.size);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Demandes :", data);

    setRequests(data);
  } catch (error) {
    console.error("Erreur :", error);
  }
}
async function publishJob(job) {
  try {
    await addDoc(collection(db, "jobs"), {
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
      image: job.image || "",

      userId: job.userId,

      createdAt: new Date(),
    });

    await deleteDoc(doc(db, "jobRequests", job.id));

    alert("✅ Offre publiée avec succès.");

    loadRequests();

  } catch (error) {
    console.log(error);
    alert("Erreur lors de la publication.");
  }
}
  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Demandes d'offres d'emploi
        </h1>

        <div className="space-y-6">

          {requests.map((job) => (

            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <p className="mt-2">
                <strong>Entreprise :</strong> {job.company}
              </p>

              <p>
                <strong>Ville :</strong> {job.location}
              </p>

              <p>
                <strong>Salaire :</strong> {job.salary}
              </p>

              <p className="mt-4 text-gray-600 whitespace-pre-line">
                {job.description}
              </p>

              <div className="mt-6 flex gap-4">

                <button
  onClick={() => publishJob(job)}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  ✅ Publier
</button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >
                  ❌ Refuser
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}