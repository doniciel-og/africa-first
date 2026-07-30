import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState(0);
  const [applications, setApplications] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const user = auth.currentUser;

    if (!user) return;

    // Nombre d'offres publiées
    const jobsQuery = query(
      collection(db, "jobs"),
      where("userId", "==", user.uid)
    );

    const jobsSnap = await getDocs(jobsQuery);

    setJobs(jobsSnap.size);

    // Toutes les candidatures de cette entreprise
    const applicationsQuery = query(
      collection(db, "applications"),
      where("companyUserId", "==", user.uid)
    );

    const applicationsSnap = await getDocs(applicationsQuery);

    setApplications(applicationsSnap.size);

    // Acceptées
    const acceptedQuery = query(
      collection(db, "applications"),
      where("companyUserId", "==", user.uid),
      where("status", "==", "Acceptée")
    );

    const acceptedSnap = await getDocs(acceptedQuery);

    setAccepted(acceptedSnap.size);

    // Refusées
    const rejectedQuery = query(
      collection(db, "applications"),
      where("companyUserId", "==", user.uid),
      where("status", "==", "Refusée")
    );

    const rejectedSnap = await getDocs(rejectedQuery);

    setRejected(rejectedSnap.size);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold">
          Tableau de bord Entreprise
        </h1>

        <p className="text-gray-600 mt-3">
          Gérez vos recrutements.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-green-600">
              {jobs}
            </h2>

            <p className="mt-3">
              Offres publiées
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-blue-600">
              {applications}
            </h2>

            <p className="mt-3">
              Candidatures reçues
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-green-700">
              {accepted}
            </h2>

            <p className="mt-3">
              Acceptées
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-red-600">
              {rejected}
            </h2>

            <p className="mt-3">
              Refusées
            </p>
          </div>
<div className="mt-12">

  <a
    href="/messages"
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
  >
    Ouvrir la messagerie
  </a>

</div>
        </div>

      </div>

    </div>
  );
}