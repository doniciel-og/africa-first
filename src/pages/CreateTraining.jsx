import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateTraining() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [trainer, setTrainer] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    try {
      await addDoc(collection(db, "trainings"), {
        title,
        trainer,
        country,
        city,
        price,
        duration,
        description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });

      alert("✅ Formation publiée avec succès !");
      navigate("/training");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Publier une formation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Titre de la formation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Nom du formateur"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
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

          <input
            type="text"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Durée (Ex : 3 mois)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            rows="6"
            placeholder="Description de la formation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Publier la formation
          </button>

        </form>

      </div>
    </div>
  );
}