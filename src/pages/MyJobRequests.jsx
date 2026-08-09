import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyJobRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    if (job.status === "Publiée") {
  alert("Cette demande a déjà été publiée.");
  return;
}
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, "jobRequests"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  }

  function statusColor(status) {
    switch (status) {
      case "Publiée":
        return "text-green-600";

      case "Refusée":
        return "text-red-600";

      default:
        return "text-yellow-600";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Mes demandes d'emploi
        </h1>

        {requests.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">
            Vous n'avez encore envoyé aucune demande.
          </div>

        ) : (

          <div className="grid gap-6">

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

                <p className="mt-2">
                  📍 {job.location}
                </p>

                <p className="mt-2">
                  💰 {job.salary}
                </p>

                <p className="mt-5 text-gray-600 whitespace-pre-line">
                  {job.description}
                </p>

                <div className="mt-6">

                  <span className="font-semibold">
                    Statut :
                  </span>

                  <span
                    className={`ml-3 font-bold ${statusColor(job.status)}`}
                  >
                    {job.status}
                    {job.status === "Refusée" && job.refusalReason && (
  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
    <h3 className="font-bold text-red-700">
      Motif du refus
    </h3>

    <p className="mt-2 text-gray-700">
      {job.refusalReason}
    </p>
  </div>
)}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}