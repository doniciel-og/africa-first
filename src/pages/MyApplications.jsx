import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    if (!auth.currentUser) return;

    try {
      // Mes offres d'emploi
      const jobsQuery = query(
        collection(db, "jobs"),
        where("userId", "==", auth.currentUser.uid)
      );

      const jobsSnap = await getDocs(jobsQuery);

      const jobIds = jobsSnap.docs.map((doc) => doc.id);

      if (jobIds.length === 0) return;

      let allApplications = [];

      for (const jobId of jobIds) {
        const appQuery = query(
          collection(db, "applications"),
          where("jobId", "==", jobId)
        );

        const appSnap = await getDocs(appQuery);

        allApplications.push(
          ...appSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }

      setApplications(allApplications);
    } catch (error) {
      console.log(error);
    }
  }
async function updateStatus(id, status) {
  try {
    await updateDoc(doc(db, "applications", id), {
      status,
    });

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );

    alert("Statut mis à jour !");
  } catch (error) {
    console.log(error);
    alert("Erreur lors de la mise à jour.");
  }
}
  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Candidatures reçues
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow">
            Aucune candidature reçue.
          </div>
        ) : (
          <div className="grid gap-6">

            {applications.map((application) => (

              <div
                key={application.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <h2 className="text-2xl font-bold">
                  {application.jobTitle}
                </h2>

                <p className="mt-3">
                  📧 {application.email}
                </p>
                {application.cvUrl && (
  <a
    href={application.cvUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    📄 Voir le CV
  </a>
)}
<p className="mt-3">
  Statut :
  <span
    className={`ml-2 font-bold ${
      application.status === "Acceptée"
        ? "text-green-600"
        : application.status === "Refusée"
        ? "text-red-600"
        : "text-yellow-600"
    }`}
  >
    {application.status}
  </span>
</p>

<div className="flex gap-3 mt-5">

  <button
    onClick={() =>
      updateStatus(application.id, "Acceptée")
    }
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
  >
    Accepter
  </button>

  <button
    onClick={() =>
      updateStatus(application.id, "Refusée")
    }
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Refuser
  </button>

</div>
                <p className="mt-2 text-gray-600">
                  Entreprise : {application.company}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}