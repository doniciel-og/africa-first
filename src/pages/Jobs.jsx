import jobs from "../data/jobs";
import {
  MapPin,
  Heart,
  Building2,
  BadgeDollarSign,
  BriefcaseBusiness,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

;

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Tous");
  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Emplois en Afrique
            </h1>

            <p className="text-gray-600 mt-3">
              Découvrez les meilleures opportunités professionnelles.
            </p>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">
            + Publier une offre
          </button>
        </div>

        <input
  type="text"
  placeholder="Rechercher un emploi..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-4 rounded-xl border mb-10 outline-none focus:ring-2 focus:ring-green-500"
/>
<div className="flex flex-wrap gap-3 mb-10">

  {["Tous", "CDI", "Temps plein"].map((item) => (
    <button
      key={item}
      onClick={() => setType(item)}
      className={`px-5 py-2 rounded-full font-semibold transition ${
        type === item
          ? "bg-green-600 text-white"
          : "bg-white border hover:bg-green-50"
      }`}
    >
      {item}
    </button>
  ))}

</div>

        <div className="grid gap-6">

          {jobs
  .filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((job) =>
    type === "Tous" ? true : job.type === type
  )
  .map((job) => (
            <Link
  key={job.id}
  to={`/jobs/${job.id}`}
  className="block bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>

              <div className="flex items-center gap-2 mb-4">

  <BriefcaseBusiness
    size={18}
    className="text-green-600"
  />

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
    {job.type}
  </span>

</div>

              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 mt-3 text-gray-600">

  <Building2 size={18} />

  <span className="font-semibold">
    {job.company}
  </span>

</div>

              <div className="flex items-center gap-2 text-green-600 font-semibold mt-3">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>

              <p className="text-gray-600 mt-4">
                {job.description}
              </p>

              <div className="flex justify-between items-center mt-6">

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">

  <BadgeDollarSign
    size={18}
    className="text-green-600"
  />

  <span className="font-bold">
    {job.salary}
  </span>

</div>

                  <Heart
                    size={22}
                    className="cursor-pointer text-gray-400 hover:text-red-500 transition"
                  />
                </div>

                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
                  Postuler
                </button>

              </div>

            </Link>
))}

        </div>

      </div>
    </div>
  );
}