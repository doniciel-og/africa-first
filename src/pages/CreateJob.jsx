import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        salary,
        description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });

      alert("✅ Offre publiée avec succès !");

      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Publier une offre d'emploi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Titre du poste"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Entreprise"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Ville"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Salaire"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            rows="6"
            placeholder="Description de l'offre"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Publier l'offre
          </button>

        </form>

      </div>
    </div>
  );
}