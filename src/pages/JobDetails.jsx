import { useEffect, useState } from "react";
import { uploadCV } from "../utils/uploadCV";
import { useParams } from "react-router-dom";
import {
    
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db, auth } from "../firebase";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
const [cv, setCv] = useState(null);
  useEffect(() => {
    loadJob();
  }, []);
if (!cv) {
  alert("Veuillez sélectionner votre CV.");
  return;
}
  async function loadJob() {
    try {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Chargement...
        </h1>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Offre introuvable
        </h1>
      </div>
    );
  }

  async function handleApply() {
    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }
const cvUrl = await uploadCV(cv);
    try {
      await addDoc(collection(db, "applications"), {
  userId: auth.currentUser.uid,
  email: auth.currentUser.email,
  jobId: job.id,
  cvUrl,
  jobTitle: job.title,
  company: job.company,
  status: "En attente",
  createdAt: new Date(),
});

      alert("✅ Candidature envoyée avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">
{job.image && (
  <img
    src={job.image}
    alt={job.title}
    className="w-full h-96 object-cover rounded-2xl mb-8"
  />
)}
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Emploi
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {job.title}
          </h1>

          <p className="text-xl text-gray-500 mt-3">
            {job.company}
          </p>

          <div className="mt-8 space-y-4 text-lg">

            <p>📍 {job.location}</p>

            <p>💰 Salaire : {job.salary}</p>

          </div>

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-4">
              Description
            </h2>

            <p className="text-gray-600 leading-8">
              {job.description}
            </p>

          </div>

          <button
            onClick={handleApply}
            className="mt-12 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
          >
            Postuler maintenant
          </button>
<div className="mt-10">
  <label className="block font-semibold mb-2">
    Joindre votre CV (PDF)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setCv(e.target.files[0])}
    className="w-full border p-4 rounded-xl"
  />
</div>
        </div>

      </div>
    </div>
  );
}