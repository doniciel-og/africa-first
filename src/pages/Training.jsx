import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Training() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const snapshot = await getDocs(collection(db, "trainings"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Formations Professionnelles
            </h1>

            <p className="text-gray-600 mt-3">
              Développez vos compétences grâce aux meilleurs formateurs africains.
            </p>
          </div>

          <Link
            to="/create-training"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Publier une formation
          </Link>

        </div>

        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border mb-10"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses
            .filter((course) =>
              course.title
                ?.toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((course) => (

              <div
                key={course.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >

                <div className="h-40 bg-gradient-to-r from-green-600 to-emerald-400 flex items-center justify-center text-6xl">
                  🎓
                </div>

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {course.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    👨‍🏫 {course.trainer}
                  </p>

                  <p className="text-gray-500">
                    📍 {course.city}, {course.country}
                  </p>

                  <p className="mt-5 text-gray-600">
                    {course.description}
                  </p>

                  <div className="mt-6 space-y-2">

                    <p>
                      <strong>💰 Prix :</strong> {course.price}
                    </p>

                    <p>
                      <strong>⏳ Durée :</strong> {course.duration}
                    </p>

                  </div>

                  <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">
                    S'inscrire
                  </button>

                </div>

              </div>

            ))}

        </div>

      </div>
    </div>
  );
}