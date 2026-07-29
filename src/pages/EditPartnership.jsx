import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPartnership() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadPartnership();
  }, []);

  async function loadPartnership() {
    const docRef = doc(db, "partnerships", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Partenariat introuvable.");
      navigate("/my-partnerships");
      return;
    }

    const data = docSnap.data();

    if (data.userId !== auth.currentUser.uid) {
      alert("Accès refusé.");
      navigate("/my-partnerships");
      return;
    }

    setCompany(data.company || "");
    setSector(data.sector || "");
    setCountry(data.country || "");
    setDescription(data.description || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "partnerships", id), {
        company,
        sector,
        country,
        description,
      });

      alert("✅ Partenariat modifié avec succès !");
      navigate("/my-partnerships");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la modification.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Modifier un partenariat
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Entreprise"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Secteur"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Pays"
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