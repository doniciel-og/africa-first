import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uploadFile } from "../utils/cloudinary";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

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

    if (!fullName.trim()) {
      alert("Veuillez saisir votre nom complet.");
      return;
    }

    if (!phone.trim()) {
      alert("Veuillez saisir votre numéro de téléphone.");
      return;
    }

    if (!coverLetter.trim()) {
      alert("Veuillez écrire une lettre de motivation.");
      return;
    }

    if (!cv) {
      alert("Veuillez sélectionner votre CV.");
      return;
    }

    try {
      const cvUrl = await uploadFile(cv);

      // Enregistrer la candidature
await addDoc(collection(db, "applications"), {
  companyUserId: job.userId,
  userId: auth.currentUser.uid,

  fullName,
  phone,
  email: auth.currentUser.email,

  coverLetter,
  cvUrl,

  jobId: job.id,
  jobTitle: job.title,
  company: job.company,

  status: "En attente",

  createdAt: new Date(),
});

// Vérifier si une conversation existe déjà
const q = query(
  collection(db, "conversations"),
  where("jobId", "==", job.id),
  where("candidateId", "==", auth.currentUser.uid)
);

const snapshot = await getDocs(q);

if (snapshot.empty) {
  await addDoc(collection(db, "conversations"), {
    jobId: job.id,
    jobTitle: job.title,

    company: job.company,

    companyId: job.userId,
    candidateId: auth.currentUser.uid,

    participants: [
      job.userId,
      auth.currentUser.uid,
    ],

    lastMessage: "",
    createdAt: new Date(),
  });
}

alert("✅ Candidature envoyée avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi.");
    }
  }
  // Le return sera ajouté dans la partie 2
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

          <div className="mt-8 space-y-3">
            <p>📍 <strong>Lieu :</strong> {job.location}</p>
            <p>💰 <strong>Salaire :</strong> {job.salary}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4">
              Description
            </h2>

            <p className="text-gray-600 leading-8 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="mt-12 border-t pt-10">

            <h2 className="text-3xl font-bold mb-6">
              Postuler à cette offre
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="email"
                value={auth.currentUser?.email || ""}
                disabled
                className="w-full border rounded-xl p-4 bg-gray-100"
              />

              <textarea
                rows="6"
                placeholder="Lettre de motivation"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border rounded-xl p-4"
              />

              <div>
                <label className="block font-semibold mb-2">
                  Joindre votre CV (PDF)
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setCv(e.target.files[0])}
                  className="w-full border rounded-xl p-4"
                />
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
              >
                Envoyer ma candidature
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}