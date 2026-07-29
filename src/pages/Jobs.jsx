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

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Emplois en Afrique
            </h1>

            <p className="text-gray-600 mt-3">
              Découvrez les meilleures opportunités.
            </p>
          </div>

          <Link
            to="/create-job"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Publier une offre
          </Link>

        </div>

        <input
          type="text"
          placeholder="Rechercher un emploi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border mb-10"
        />

        <div className="grid gap-6">

          {loading ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">
                Chargement des offres...
              </h2>
            </div>
          ) : (
            jobs
              .filter((job) =>
                (job.title || "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
                >
{job.image && (
  <img
    src={job.image}
    alt={job.title}
    className="w-full h-56 object-cover rounded-xl mb-6"
  />
)}
                  <div className="flex items-center gap-2 mb-4">

                    <BriefcaseBusiness
                      size={18}
                      className="text-green-600"
                    />

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      CDI
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold">
                    {job.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-3">

                    <Building2 size={18} />

                    <span>{job.company}</span>

                  </div>

                  <div className="flex items-center gap-2 mt-3 text-green-600">

                    <MapPin size={18} />

                    <span>{job.location}</span>

                  </div>

                  <p className="mt-4 text-gray-600">
                    {job.description}
                  </p>

                  <div className="flex justify-between mt-6">

                    <div className="flex items-center gap-2">

                      <BadgeDollarSign
                        size={18}
                        className="text-green-600"
                      />

                      <span>{job.salary}</span>

                    </div>

                    <Heart
                      size={20}
                      className="text-gray-400"
                    />

                  </div>

                </Link>
              ))
          )}

        </div>

      </div>
    </div>
  );
}