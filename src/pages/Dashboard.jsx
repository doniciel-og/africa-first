import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function Dashboard() {
    const navigate = useNavigate();
const user = auth.currentUser;
  

  const [profile, setProfile] = useState(null);

  const [applications, setApplications] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [partnerships, setPartnerships] = useState(0);
const [jobs, setJobs] = useState(0);
const [trainings, setTrainings] = useState(0);
  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      // Profil
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile(userSnap.data());
      }
if (userSnap.data().accountType === "Entreprise") {
  navigate("/company-dashboard");
  return;
}
      // Candidatures
      const applicationsQuery = query(
        collection(db, "applications"),
        where("userId", "==", user.uid)
      );
      
// Emplois publiés
const jobsQuery = query(
  collection(db, "jobs"),
  where("userId", "==", user.uid)
);

const jobsSnap = await getDocs(jobsQuery);
setJobs(jobsSnap.size);
      const applicationsSnap = await getDocs(applicationsQuery);
      setApplications(applicationsSnap.size);

      // Investissements publiés
      const investmentsQuery = query(
        collection(db, "investments"),
        where("userId", "==", user.uid)
      );

      const investmentsSnap = await getDocs(investmentsQuery);
      setInvestments(investmentsSnap.size);

      // Partenariats publiés
      const partnershipsQuery = query(
        collection(db, "partnerships"),
        where("userId", "==", user.uid)
      );
      
// Formations publiées
const trainingsQuery = query(
  collection(db, "trainings"),
  where("userId", "==", user.uid)
);

const trainingsSnap = await getDocs(trainingsQuery);
setTrainings(trainingsSnap.size);
      const partnershipsSnap = await getDocs(partnershipsQuery);
      setPartnerships(partnershipsSnap.size);
    }

    loadDashboard();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex items-center gap-6">
<div className="mt-10 flex flex-wrap gap-4">
<div className="bg-red-50 rounded-2xl p-6">
  <h2 className="text-4xl font-bold text-red-600">
    📄
  </h2>

  <p className="mt-3 font-semibold">
    Candidatures reçues
  </p>

  <Link
    to="/applications"
    className="text-red-600 font-bold"
  >
    Voir →
  </Link>
</div>
  <Link
    to="/my-jobs"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
  >
    💼 Mes offres
  </Link>
<Link
  to="/my-partnerships"
  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-semibold"
>
  🤝 Mes partenariats
</Link>
  <Link
    to="/my-investments"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
  >
    💰 Mes investissements
  </Link>

</div>
            <img
              src={`https://ui-avatars.com/api/?name=${
                profile?.fullName || "User"
              }&background=16a34a&color=fff&size=128`}
              alt="Profil"
              className="w-28 h-28 rounded-full"
            />

            <div>

              <h1 className="text-4xl font-bold">
                Bienvenue {profile?.fullName || "Utilisateur"} 👋
              </h1>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>📧 {profile?.email}</p>

                <p>🌍 {profile?.country}</p>

                <p>📍 {profile?.city}</p>

                <p>👤 {profile?.accountType}</p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">

            <div className="bg-green-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-green-600">
                {applications}
              </h2>
              <p>Candidatures</p>
            </div>
<div className="bg-indigo-50 rounded-2xl p-6">
  <h2 className="text-4xl font-bold text-indigo-600">
    {jobs}
  </h2>
  <p>Emplois publiés</p>
</div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-blue-600">
                {investments}
              </h2>
              <p>Investissements publiés</p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-yellow-600">
                {partnerships}
              </h2>
              <p>Partenariats publiés</p>
            </div>
<div className="bg-purple-50 rounded-2xl p-6">
  <h2 className="text-4xl font-bold text-purple-600">
    {trainings}
  </h2>
  <p>Formations publiées</p>
</div>
          </div>

        </div>

      </div>
    </div>
  );
}