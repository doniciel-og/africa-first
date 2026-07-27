import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Investments() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const snapshot = await getDocs(collection(db, "investments"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProjects(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Investissements en Afrique
            </h1>

            <p className="text-gray-600 mt-3">
              Découvrez des projets innovants publiés par des investisseurs.
            </p>
          </div>

          <Link
            to="/create-investment"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Publier un projet
          </Link>

        </div>

        <input
          type="text"
          placeholder="Rechercher un projet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border mb-10"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects
            .filter((project) =>
              project.title
                ?.toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((project) => (

              <div
                key={project.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >

                <div className="h-48 bg-gradient-to-r from-green-600 to-emerald-400 flex items-center justify-center text-6xl">
                  💼
                </div>

                <div className="p-6">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.sector}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {project.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    📍 {project.country}
                  </p>

                  <p className="mt-5 text-gray-600">
                    {project.description}
                  </p>

                  <div className="mt-6 space-y-2">

                    <p>
                      <strong>💰 Recherche :</strong> {project.amount}
                    </p>

                    <p>
                      <strong>📈 Rendement :</strong> {project.roi}
                    </p>

                  </div>

                  <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">
                    Investir maintenant
                  </button>

                </div>

              </div>

            ))}

        </div>

      </div>
    </div>
  );
}