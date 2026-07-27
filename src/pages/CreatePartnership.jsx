import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreatePartnership() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    try {
      await addDoc(collection(db, "partnerships"), {
        title,
        company,
        country,
        city,
        type,
        description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });

      alert("✅ Partenariat publié avec succès !");
      navigate("/partnerships");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Publier une opportunité de partenariat
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Titre du partenariat"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Entreprise / Organisation"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Pays"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          >
            <option value="">Choisir un type</option>
            <option>Commercial</option>
            <option>Financier</option>
            <option>Technologique</option>
            <option>Événementiel</option>
            <option>Éducation</option>
            <option>Autre</option>
          </select>

          <textarea
            rows="6"
            placeholder="Description du partenariat"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Publier le partenariat
          </button>

        </form>

      </div>
    </div>
  );
}