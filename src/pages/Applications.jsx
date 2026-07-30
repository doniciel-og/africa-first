import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const q = query(
  collection(db, "applications"),
  where("companyUserId", "==", auth.currentUser.uid)
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
    async function updateStatus(id, status) {
  try {
    if (status === "Acceptée") {
  const application = applications.find(
    (a) => a.id === id
  );

  if (application) {
    await addDoc(
      collection(db, "conversations"),
      {
        participants: [
          application.userId,
          application.companyUserId,
        ],

        candidateId: application.userId,
        companyId: application.companyUserId,

        jobId: application.jobId,
        jobTitle: application.jobTitle,

        lastMessage: "",

        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
  }
}
    await updateDoc(
      doc(db, "applications", id),
      {
        status,
      }
    );

    setApplications((prev) =>
      prev.map((application) =>
        application.id === id
          ? { ...application, status }
          : application
      )
    );

    alert("Statut mis à jour !");
  } catch (error) {
    console.log(error);
    alert("Erreur.");
  }
}
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          Candidatures reçues
        </h1>

        <div className="space-y-6">

          {applications.map((application) => (

            <div
              key={application.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold">
                {application.fullName}
              </h2>

              <p className="mt-2">
                📧 {application.email}
              </p>

              <p>
                📞 {application.phone}
              </p>

              <p className="mt-4">
                💼 {application.jobTitle}
              </p>

              <p>
                🏢 {application.company}
              </p>

              <div className="mt-6">

                <h3 className="font-bold">
                  Lettre de motivation
                </h3>

                <p className="text-gray-600 mt-2">
                  {application.coverLetter}
                </p>

              </div>

              <a
                href={application.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Télécharger le CV
              </a>

              <div className="mt-6 flex flex-wrap items-center gap-4">

  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
    {application.status}
  </span>

  <button
    onClick={() =>
      updateStatus(application.id, "Acceptée")
    }
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    ✅ Accepter
  </button>

  <button
    onClick={() =>
      updateStatus(application.id, "Refusée")
    }
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
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