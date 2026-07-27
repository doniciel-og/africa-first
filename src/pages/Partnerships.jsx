import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Partnerships() {
  const [partnerships, setPartnerships] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPartnerships();
  }, []);

  async function loadPartnerships() {
    const snapshot = await getDocs(collection(db, "partnerships"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPartnerships(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Partenariats
            </h1>

            <p className="text-gray-600 mt-3">
              Trouvez des partenaires stratégiques partout en Afrique.
            </p>
          </div>

          <Link
            to="/create-partnership"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Publier un partenariat
          </Link>

        </div>

        <input
          type="text"
          placeholder="Rechercher un partenariat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border mb-10"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {partnerships
            .filter((partner) =>
              partner.title
                ?.toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((partner) => (

              <div
                key={partner.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >

                <div className="h-40 bg-gradient-to-r from-green-600 to-emerald-400 flex items-center justify-center text-6xl">
                  🤝
                </div>

                <div className="p-6">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {partner.type}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {partner.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    🏢 {partner.company}
                  </p>

                  <p className="text-gray-500">
                    📍 {partner.city}, {partner.country}
                  </p>

                  <p className="mt-5 text-gray-600">
                    {partner.description}
                  </p>

                  <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">
                    Contacter
                  </button>

                </div>

              </div>

            ))}

        </div>

      </div>
    </div>
  );
}