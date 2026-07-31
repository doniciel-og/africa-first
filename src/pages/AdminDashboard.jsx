import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [applications, setApplications] = useState(0);
  const [partnerships, setPartnerships] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [trainings, setTrainings] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    const usersSnap = await getDocs(collection(db, "users"));
    setUsers(usersSnap.size);

    const jobsSnap = await getDocs(collection(db, "jobs"));
    setJobs(jobsSnap.size);

    const applicationsSnap = await getDocs(collection(db, "applications"));
    setApplications(applicationsSnap.size);

    const partnershipsSnap = await getDocs(collection(db, "partnerships"));
    setPartnerships(partnershipsSnap.size);

    const investmentsSnap = await getDocs(collection(db, "investments"));
    setInvestments(investmentsSnap.size);

    const trainingsSnap = await getDocs(collection(db, "trainings"));
    setTrainings(trainingsSnap.size);

    let companyCount = 0;

    usersSnap.forEach((doc) => {
      if (doc.data().accountType === "Entreprise") {
        companyCount++;
      }
    });

    setCompanies(companyCount);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold">
          Africa First - Administration
        </h1>

        <p className="text-gray-600 mt-3">
          Tableau de bord général de la plateforme.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-green-600">
              {users}
            </h2>
            <p className="mt-3">Utilisateurs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-blue-600">
              {companies}
            </h2>
            <p className="mt-3">Entreprises</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-yellow-600">
              {jobs}
            </h2>
            <p className="mt-3">Offres d'emploi</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-red-600">
              {applications}
            </h2>
            <p className="mt-3">Candidatures</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-purple-600">
              {partnerships}
            </h2>
            <p className="mt-3">Partenariats</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-indigo-600">
              {investments}
            </h2>
            <p className="mt-3">Investissements</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-pink-600">
              {trainings}
            </h2>
            <p className="mt-3">Formations</p>
          </div>

        </div>

      </div>
<div className="mt-14">

  <h2 className="text-3xl font-bold mb-6">
    Administration
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    <Link
      to="/admin-create-job"
      className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 shadow-lg"
    >
      <h3 className="text-2xl font-bold">
        ➕ Publier une offre
      </h3>

      <p className="mt-3">
        Créer directement une offre pour une entreprise partenaire.
      </p>
    </Link>

    <Link
      to="/admin-job-requests"
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-lg"
    >
      <h3 className="text-2xl font-bold">
        📄 Demandes d'offres
      </h3>

      <p className="mt-3">
        Valider ou refuser les offres proposées par les entreprises.
      </p>
    </Link>

    <Link
      to="/admin-applications"
      className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-8 shadow-lg"
    >
      <h3 className="text-2xl font-bold">
        👥 Candidatures
      </h3>

      <p className="mt-3">
        Consulter toutes les candidatures reçues.
      </p>
    </Link>

  </div>

</div>
    </div>
  );
}