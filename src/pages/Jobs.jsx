import {
  MapPin,
  Heart,
  Building2,
  BadgeDollarSign,
  BriefcaseBusiness,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
const [contract, setContract] = useState("");
const [salary, setSalary] = useState("");
const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);
  function getPublishedDate(createdAt) {
  if (!createdAt) return "";

  const date = createdAt.seconds
    ? new Date(createdAt.seconds * 1000)
    : new Date(createdAt);

  const today = new Date();

  const diffTime = today - date;

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "Publié aujourd'hui";

  if (diffDays === 1) return "Publié hier";

  if (diffDays < 7)
    return `Publié il y a ${diffDays} jours`;

  return date.toLocaleDateString("fr-FR");
}


  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-900 via-green-700 to-emerald-600 text-white p-10 lg:p-14 mb-10 shadow-2xl">

  {/* Effets d'arrière-plan */}
  <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

  <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">

    <div>

      <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
        🌍 AFRICA FIRST JOBS
      </span>

      <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
        Trouvez votre prochain
        <br />
        emploi en Afrique.
      </h1>

      <p className="mt-6 text-green-100 text-lg max-w-2xl leading-8">
        Des opportunités vérifiées publiées directement par les entreprises
        ainsi que par Africa First pour accélérer votre carrière partout
        sur le continent.
      </p>

      <div className="flex flex-wrap gap-10 mt-8">

        <div>
          <h2 className="text-3xl font-bold">
            500+
          </h2>
          <p className="text-green-100">
            Offres disponibles
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            20+
          </h2>
          <p className="text-green-100">
            Pays africains
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            100%
          </h2>
          <p className="text-green-100">
            Offres vérifiées
          </p>
        </div>

      </div>

    </div>

    <div className="flex flex-col gap-4">

      <Link
        to="/create-job"
        className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-center shadow-lg transition"
      >
        Publier une offre
      </Link>

      <Link
        to="/register"
        className="border border-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-2xl font-bold text-center transition"
      >
        Créer un compte
      </Link>

    </div>

  </div>

</div>

        {/* RECHERCHE */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

    <input
      type="text"
      placeholder="Rechercher..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-xl p-4"
    />

    <input
      type="text"
      placeholder="Pays ou ville"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="border rounded-xl p-4"
    />

    <select
      value={contract}
      onChange={(e) => setContract(e.target.value)}
      className="border rounded-xl p-4"
    >
      <option value="">Tous les contrats</option>
      <option>CDI</option>
      <option>CDD</option>
      <option>Stage</option>
      <option>Freelance</option>
      <option>Temps partiel</option>
    </select>

    <input
      type="text"
      placeholder="Salaire minimum"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="border rounded-xl p-4"
    />

  </div>

  <div className="mt-5 flex justify-end">

    <button
      onClick={() => {
        setSearch("");
        setCountry("");
        setContract("");
        setSalary("");
      }}
      className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl font-semibold"
    >
      Réinitialiser les filtres
    </button>

  </div>

</div>

        {/* LISTE */}
        <p className="text-gray-600 font-medium mb-6">
  {jobs.filter((job) => {
    const matchSearch =
      (job.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (job.company || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCountry =
      country === "" ||
      (job.location || "")
        .toLowerCase()
        .includes(country.toLowerCase());

    const matchContract =
      contract === "" ||
      (job.contractType || "CDI") === contract;

    const jobSalary = parseInt(
      String(job.salary || "").replace(/\D/g, "")
    );

    const minSalary =
      salary === "" ? 0 : parseInt(salary);

    const matchSalary =
      salary === "" || jobSalary >= minSalary;

    return (
      matchSearch &&
      matchCountry &&
      matchContract &&
      matchSalary
    );
  }).length}{" "}
  offre(s) trouvée(s)
  <div className="flex justify-end mb-6">

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border rounded-xl px-4 py-3 bg-white shadow-sm"
  >
    <option value="recent">🆕 Plus récentes</option>
    <option value="salaryHigh">💰 Salaire le plus élevé</option>
    <option value="salaryLow">💵 Salaire le plus bas</option>
    <option value="az">🔤 A → Z</option>
  </select>

</div>
</p>
        <div className="grid gap-8">

          {loading ? (

            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">
                Chargement des offres...
              </h2>
            </div>

          ) : (

            jobs
  .sort((a, b) => {

    if (sortBy === "az") {
      return (a.title || "").localeCompare(b.title || "");
    }

    if (sortBy === "salaryHigh") {
      return (
        parseInt(String(b.salary || "").replace(/\D/g, "")) -
        parseInt(String(a.salary || "").replace(/\D/g, ""))
      );
    }

    if (sortBy === "salaryLow") {
      return (
        parseInt(String(a.salary || "").replace(/\D/g, "")) -
        parseInt(String(b.salary || "").replace(/\D/g, ""))
      );
    }

    // Plus récentes
    return (
      new Date(b.createdAt?.seconds ? b.createdAt.seconds * 1000 : b.createdAt) -
      new Date(a.createdAt?.seconds ? a.createdAt.seconds * 1000 : a.createdAt)
    );

  })
  .map((job) => (

                <div
                  key={job.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                >

                  {/* IMAGE */}
                  {job.image && (
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-64 object-cover"
                    />
                  )}

                  <div className="p-8">

                    {/* BADGES */}
                    <div className="flex flex-wrap gap-3 mb-5">
{job.featured && (
  <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
    ⭐ Offre à la une
  </span>
)}
                      {job.isAdminPost ? (
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                          🌍 Publié par Africa First
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                          🏢 Entreprise vérifiée
                        </span>
                      )}

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
  {job.contractType || "CDI"}
</span>

                    </div>

                    {/* TITRE */}
                    <h2 className="text-3xl font-bold">
                      {job.title}
                    </h2>

                    {/* ENTREPRISE */}
                    <div className="flex items-center gap-2 mt-5">
                      <Building2
                        size={18}
                        className="text-gray-500"
                      />

                      <span className="font-semibold">
                        {job.company}
                      </span>
                    </div>

                    {/* VILLE */}
                    <div className="flex items-center gap-2 mt-3 text-green-700">

                      <MapPin size={18} />

                      <span>{job.location}</span>

                    </div>

                    {/* SALAIRE */}
                    <div className="flex items-center gap-2 mt-3">

                      <BadgeDollarSign
                        size={18}
                        className="text-green-600"
                      />

                      <span className="font-semibold">
                        {job.salary}
                      </span>

                    </div>

                    {/* DESCRIPTION */}
                    <p className="mt-6 text-gray-600 leading-7">
                      {job.description?.length > 180
                        ? job.description.substring(0, 180) + "..."
                        : job.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-5">
  🕒 {getPublishedDate(job.createdAt)}
</p>

                    {/* BAS */}
                    <div className="flex justify-between items-center mt-8">

                      <Link
                        to={`/jobs/${job.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        Voir les détails →
                      </Link>

                      <Heart
                        size={22}
                        className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                      />

                    </div>

                  </div>

                </div>

              ))

          )}

        </div>

      </div>
    </div>
  );
}