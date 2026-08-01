import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyApplicationsUser() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function statusColor(status) {
    switch (status) {
      case "Présélectionné":
        return "text-blue-600";
      case "Convoqué":
        return "text-yellow-600";
      case "Test réussi":
        return "text-green-600";
      case "Envoyé à l'entreprise":
        return "text-indigo-600";
      case "Recruté":
        return "text-emerald-700";
      case "Refusé":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Chargement...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Mes candidatures
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10">
            Vous n'avez encore envoyé aucune candidature.
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

                <p className="mt-3 text-gray-600">
                  <strong>Entreprise :</strong> {application.company}
                </p>

                <p className="mt-4">
                  <strong>Statut :</strong>

                  <span className={`ml-2 font-bold ${statusColor(application.status)}`}>
                    {application.status || "En attente"}
                  </span>
                </p>

                {application.testDate && (
                  <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-5">

                    <h3 className="text-xl font-bold text-yellow-700 mb-4">
                      📅 Convocation au test
                    </h3>

                    <p>
                      <strong>Date :</strong> {application.testDate}
                    </p>

                    <p>
                      <strong>Heure :</strong> {application.testTime}
                    </p>

                    <p>
                      <strong>Lieu :</strong> {application.testLocation}
                    </p>

                    <p className="mt-3 whitespace-pre-line">
                      <strong>Instructions :</strong><br />
                      {application.instructions}
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}