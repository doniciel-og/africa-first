import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditInvestment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [roi, setRoi] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadInvestment();
  }, []);

  async function loadInvestment() {
    const docRef = doc(db, "investments", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Investissement introuvable.");
      navigate("/my-investments");
      return;
    }

    const data = docSnap.data();

    if (data.userId !== auth.currentUser.uid) {
      alert("Accès refusé.");
      navigate("/my-investments");
      return;
    }

    setTitle(data.title || "");
    setCountry(data.country || "");
    setAmount(data.amount || "");
    setRoi(data.roi || "");
    setDescription(data.description || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "investments", id), {
        title,
        country,
        amount,
        roi,
        description,
      });

      alert("✅ Investissement modifié avec succès.");
      navigate("/my-investments");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la mise à jour.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Modifier un investissement
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
            placeholder="Titre"
          />

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-4 rounded-xl"
            placeholder="Pays"
          />

          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-4 rounded-xl"
            placeholder="Montant"
          />

          <input
            type="text"
            value={roi}
            onChange={(e) => setRoi(e.target.value)}
            className="w-full border p-4 rounded-xl"
            placeholder="ROI"
          />

          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            placeholder="Description"
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