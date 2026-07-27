import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateInvestment() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [roi, setRoi] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    try {
      await addDoc(collection(db, "investments"), {
        title,
        sector,
        country,
        amount,
        roi,
        description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });

      alert("✅ Projet publié avec succès !");

      navigate("/investments");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Publier un projet d'investissement
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Nom du projet"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Secteur (Agriculture, Mine...)"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
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
            placeholder="Montant recherché ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Rendement estimé (%)"
            value={roi}
            onChange={(e) => setRoi(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            rows="6"
            placeholder="Description du projet"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Publier le projet
          </button>

        </form>

      </div>
    </div>
  );
}