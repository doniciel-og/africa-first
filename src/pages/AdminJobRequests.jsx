import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
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

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function publishJob(job) {
    try {
      await addDoc(collection(db, "jobs"), {
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        contractType: job.contractType,
        description: job.description,
        image: job.image || "",

        userId: job.userId,

        createdBy: "admin",
        source: "Entreprise",

        status: "Publié",

        createdAt: new Date(),
      });

      await updateDoc(doc(db, "jobRequests", job.id), {
        status: "Publiée",
        publishedAt: new Date(),
      });

      alert("✅ Offre publiée avec succès.");

      loadRequests();
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  async function refuseJob(job) {
    const reason = prompt(
      "Veuillez saisir le motif du refus :"
    );

    if (!reason) return;

    try {
      await updateDoc(doc(db, "jobRequests", job.id), {
        status: "Refusée",
        refusalReason: reason,
        refusedAt: new Date(),
      });

      alert("❌ Demande refusée.");

      loadRequests();
    } catch (error) {
      console.log(error);
      alert("Erreur.");
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

              <p>
                <strong>Contrat :</strong>{" "}
                {job.contractType || "CDI"}
              </p>

              <p className="mt-4 text-gray-600 whitespace-pre-line">
                {job.description}
              </p>

              {job.image && (
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-64 object-cover rounded-xl mt-6"
                />
              )}

              <p className="mt-6">
                <strong>Statut :</strong>

                <span
                  className={`ml-2 font-bold ${
                    job.status === "Publiée"
                      ? "text-green-600"
                      : job.status === "Refusée"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {job.status}
                </span>
              </p>

              {job.status === "Refusée" &&
                job.refusalReason && (

                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">

                  <p className="font-semibold text-red-700">
                    Motif du refus
                  </p>

                  <p className="mt-2 text-gray-700">
                    {job.refusalReason}
                  </p>

                </div>

              )}

              <div className="mt-6 flex gap-4 flex-wrap">

                {job.status !== "Publiée" && (
                  <button
                    onClick={() => publishJob(job)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                  >
                    ✅ Publier
                  </button>
                )}

                {job.status !== "Refusée" && (
                  <button
                    onClick={() => refuseJob(job)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                  >
                    ❌ Refuser
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}