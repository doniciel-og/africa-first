import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTraining() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [trainer, setTrainer] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadTraining();
  }, []);

  async function loadTraining() {
    const docRef = doc(db, "trainings", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Formation introuvable.");
      navigate("/my-trainings");
      return;
    }

    const data = docSnap.data();

    if (data.userId !== auth.currentUser.uid) {
      alert("Accès refusé.");
      navigate("/my-trainings");
      return;
    }

    setTitle(data.title || "");
    setTrainer(data.trainer || "");
    setCountry(data.country || "");
    setCity(data.city || "");
    setPrice(data.price || "");
    setDuration(data.duration || "");
    setDescription(data.description || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "trainings", id), {
        title,
        trainer,
        country,
        city,
        price,
        duration,
        description,
      });

      alert("✅ Formation modifiée avec succès !");
      navigate("/my-trainings");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la modification.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Modifier une formation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la formation"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            placeholder="Nom du formateur"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Pays"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ville"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Durée"
            className="w-full border p-4 rounded-xl"
          />

          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-4 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Enregistrer les modifications
          </button>

        </form>

      </div>
    </div>
  );
}