import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const snapshot = await getDocs(
      collection(db, "applications")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setApplications(data);
  }

  async function updateStatus(id, status) {
    await updateDoc(doc(db, "applications", id), {
      status,
    });

    loadApplications();
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Gestion des candidatures
        </h1>

        <div className="space-y-6">

          {applications.map((app) => (

            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {app.fullName}
              </h2>

              <p className="mt-3">
                <strong>Email :</strong> {app.email}
              </p>

              <p>
                <strong>Téléphone :</strong> {app.phone}
              </p>

              <p>
                <strong>Entreprise :</strong> {app.company}
              </p>

              <p>
                <strong>Offre :</strong> {app.jobTitle}
              </p>

              <p className="mt-4 whitespace-pre-line text-gray-600">
                {app.coverLetter}
              </p>

              <div className="mt-4">
                <a
                  href={app.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-700 font-bold underline"
                >
                  📄 Voir le CV
                </a>
              </div>

              <div className="mt-6">

                <p className="font-semibold mb-3">
                  Statut actuel :
                  <span className="ml-2 text-green-700">
                    {app.status}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Présélectionné")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Présélectionner
                  </button>

                  <Link
                    to={`/admin-schedule-test/${app.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    📅 Planifier le test
                  </Link>

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Test réussi")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Test réussi
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Envoyé à l'entreprise")
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                  >
                    Envoyer
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Recruté")
                    }
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg"
                  >
                    Recruté
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Refusé")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Refuser
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}