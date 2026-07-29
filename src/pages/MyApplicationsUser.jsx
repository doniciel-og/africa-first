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
                  Entreprise : {application.company}
                </p>

                <p className="mt-4">
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

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}