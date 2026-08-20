import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import { Link } from "react-router-dom";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      // Toutes les candidatures
      const q = query(
        collection(db, "applications"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setApplications(data);

    } catch (error) {
      console.log(
        "Erreur chargement candidatures :",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // ACCEPTER
  // ==================================================

  async function acceptApplication(application) {
    const confirmation = window.confirm(
      `Voulez-vous accepter la candidature de ${application.fullName} ?`
    );

    if (!confirmation) return;

    try {
      await updateDoc(
        doc(db, "applications", application.id),
        {
          status: "Acceptée",
          reviewedAt: new Date(),
          reviewedBy: auth.currentUser.uid,
        }
      );

      alert("✅ Candidature acceptée.");

      loadApplications();

    } catch (error) {
      console.log(error);

      alert(
        "❌ Erreur lors de l'acceptation."
      );
    }
  }

  // ==================================================
  // REFUSER
  // ==================================================

  async function rejectApplication(application) {
    const reason = window.prompt(
      "Veuillez saisir le motif du refus :"
    );

    if (!reason || !reason.trim()) {
      return;
    }

    try {
      await updateDoc(
        doc(db, "applications", application.id),
        {
          status: "Refusée",
          refusalReason: reason.trim(),
          reviewedAt: new Date(),
          reviewedBy: auth.currentUser.uid,
        }
      );

      alert("❌ Candidature refusée.");

      loadApplications();

    } catch (error) {
      console.log(error);

      alert(
        "Erreur lors du refus de la candidature."
      );
    }
  }

  // ==================================================
  // CHARGEMENT
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-28 flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            Chargement des candidatures...
          </h2>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Candidatures
          </h1>

          <p className="text-gray-600 mt-3">
            Gérez les candidatures reçues par Africa First.
          </p>

        </div>

        {/* STATISTIQUES */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              Total
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {applications.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              En attente
            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-2">
              {
                applications.filter(
                  (application) =>
                    application.status ===
                    "En attente"
                ).length
              }
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <p className="text-gray-500">
              Acceptées
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {
                applications.filter(
                  (application) =>
                    application.status ===
                    "Acceptée"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* AUCUNE CANDIDATURE */}

        {applications.length === 0 && (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📄
            </div>

            <h2 className="text-2xl font-bold">
              Aucune candidature
            </h2>

            <p className="text-gray-500 mt-3">
              Les nouvelles candidatures apparaîtront ici.
            </p>

          </div>

        )}

        {/* LISTE */}

        <div className="space-y-6">

          {applications.map((application) => (

            <div
              key={application.id}
              className="bg-white rounded-3xl shadow-lg p-8"
            >

              {/* HAUT */}

              <div className="flex flex-col lg:flex-row justify-between gap-6">

                <div>

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      👤
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {application.fullName}
                      </h2>

                      <p className="text-gray-500">
                        {application.email}
                      </p>

                    </div>

                  </div>

                </div>

                {/* STATUT */}

                <div>

                  <span
                    className={`px-4 py-2 rounded-full font-bold ${
                      application.status ===
                      "Acceptée"
                        ? "bg-green-100 text-green-700"
                        : application.status ===
                          "Refusée"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {application.status}
                  </span>

                </div>

              </div>

              {/* INFORMATIONS */}

              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-gray-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Offre
                  </p>

                  <p className="font-bold text-lg mt-1">
                    {application.jobTitle}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Entreprise
                  </p>

                  <p className="font-bold text-lg mt-1">
                    {application.company}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Téléphone
                  </p>

                  <p className="font-bold mt-1">
                    {application.phone}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Candidat
                  </p>

                  <p className="font-bold mt-1">
                    {application.fullName}
                  </p>

                </div>

              </div>

              {/* LETTRE */}

              <div className="mt-8">

                <h3 className="text-xl font-bold mb-3">
                  Lettre de motivation
                </h3>

                <div className="bg-gray-50 rounded-2xl p-6">

                  <p className="text-gray-700 whitespace-pre-line leading-7">
                    {application.coverLetter}
                  </p>

                </div>

              </div>

              {/* CV */}

              <div className="mt-6">

                {application.cvUrl && (

                  <a
                    href={application.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    📄 Voir le CV
                  </a>

                )}

              </div>

              {/* MOTIF REFUS */}

              {application.status ===
                "Refusée" &&
                application.refusalReason && (

                  <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5">

                    <h3 className="font-bold text-red-700">
                      Motif du refus
                    </h3>

                    <p className="text-gray-700 mt-2">
                      {application.refusalReason}
                    </p>

                  </div>

                )}

              {/* ACTIONS */}

              <div className="mt-8 flex flex-wrap gap-4">

                {/* CONVERSATION */}

                <Link
                  to={`/messages`}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold"
                >
                  💬 Messagerie
                </Link>

                {/* ACCEPTER */}

                {application.status ===
                  "En attente" && (

                  <button
                    onClick={() =>
                      acceptApplication(
                        application
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    ✅ Accepter
                  </button>

                )}

                {/* REFUSER */}

                {application.status ===
                  "En attente" && (

                  <button
                    onClick={() =>
                      rejectApplication(
                        application
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
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