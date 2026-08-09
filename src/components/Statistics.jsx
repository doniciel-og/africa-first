import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Statistics() {
  const [stats, setStats] = useState({
    users: 12678,
    companies: 678,
    jobs: 462,
    trainings: 156,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const usersSnap = await getDocs(collection(db, "users"));
    const jobsSnap = await getDocs(collection(db, "jobs"));
    const trainingsSnap = await getDocs(collection(db, "trainings"));

    let companies = 0;

    usersSnap.forEach((doc) => {
      if (doc.data().accountType === "Entreprise") {
        companies++;
      }
    });

    setStats({
      users: usersSnap.size,
      companies,
      jobs: jobsSnap.size,
      trainings: trainingsSnap.size,
    });
  }

  const cards = [
  {
    value: stats.companies,
    title: "Entreprises",
    icon: "🏢",
  },
  {
    value: stats.jobs,
    title: "Offres publiées",
    icon: "💼",
  },
  {
    value: stats.trainings,
    title: "Formations",
    icon: "🎓",
  },
];

  return (
    <section className="py-24 bg-gradient-to-r from-green-600 to-green-800 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Africa First en chiffres
          </h2>

          <p className="mt-5 text-green-100 text-lg">
            Une communauté qui grandit chaque jour.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {cards.map((card) => (

            <div
              key={card.title}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:scale-105 transition duration-300"
            >

              <div className="text-5xl">
                {card.icon}
              </div>

              <h3 className="text-5xl font-bold mt-5">
                {card.value}
              </h3>

              <p className="mt-3 text-green-100">
                {card.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}