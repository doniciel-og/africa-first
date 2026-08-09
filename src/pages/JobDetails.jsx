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

// ======================================================
// COMPTE ADMINISTRATEUR AFRICA FIRST
// ======================================================
// Remplace cette valeur par l'UID Firebase du compte
// administrateur officiel d'Africa First.
const AFRICA_FIRST_ADMIN_UID = "REMPLACE_PAR_UID_ADMIN";

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
  }, [id]);

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

  async function handleApply() {
    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    // Vérification importante
    if (
      !AFRICA_FIRST_ADMIN_UID ||
      AFRICA_FIRST_ADMIN_UID === "REMPLACE_PAR_UID_ADMIN"
    ) {
      alert(
        "Le compte administrateur Africa First n'est pas encore configuré."
      );
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
      // ==================================================
      // 1. ENVOYER LE CV
      // ==================================================

      const cvUrl = await uploadFile(cv);

      // ==================================================
      // 2. ENREGISTRER LA CANDIDATURE
      // ==================================================

      await addDoc(collection(db, "applications"), {
        // Candidat
        userId: auth.currentUser.uid,

        fullName,
        phone,
        email: auth.currentUser.email,

        // Candidature
        coverLetter,
        cvUrl,

        // Offre
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,

        // IMPORTANT :
        // L'entreprise reste enregistrée comme destination
        // finale de la candidature, mais elle n'est PAS
        // l'interlocuteur du candidat.
        companyUserId: job.userId,

        // Africa First traite d'abord la candidature.
        status: "En attente",

        createdAt: new Date(),
      });

      // ==================================================
      // 3. CRÉER LA CONVERSATION AVEC AFRICA FIRST
      // ==================================================

      const conversationQuery = query(
        collection(db, "conversations"),
        where("jobId", "==", job.id),
        where(
          "candidateId",
          "==",
          auth.currentUser.uid
        )
      );

      const conversationSnapshot = await getDocs(
        conversationQuery
      );

      if (conversationSnapshot.empty) {
        await addDoc(collection(db, "conversations"), {
          // Offre concernée
          jobId: job.id,
          jobTitle: job.title,

          // Entreprise concernée
          company: job.company,
          companyId: job.userId,

          // Candidat
          candidateId: auth.currentUser.uid,

          // ADMIN AFRICA FIRST
          adminId: AFRICA_FIRST_ADMIN_UID,

          // ==================================================
          // IMPORTANT
          // Le candidat communique UNIQUEMENT avec Africa First.
          // L'entreprise n'est PAS dans participants.
          // ==================================================
          participants: [
            auth.currentUser.uid,
            AFRICA_FIRST_ADMIN_UID,
          ],

          conversationType: "candidate_admin",

          lastMessage: "",

          createdAt: new Date(),
        });
      }

      // ==================================================
      // 4. NOTIFICATION DE SUCCÈS
      // ==================================================

      alert(
        "✅ Candidature envoyée à Africa First avec succès !\n\n" +
        "Africa First va examiner votre candidature. " +
        "Vous pouvez maintenant communiquer avec notre équipe."
      );

      // ==================================================
      // 5. VIDER LE FORMULAIRE
      // ==================================================

      setFullName("");
      setPhone("");
      setCoverLetter("");
      setCv(null);

    } catch (error) {
      console.log("Erreur candidature :", error);

      alert(
        "❌ Une erreur est survenue lors de l'envoi de votre candidature."
      );
    }
  }

  // ======================================================
  // CHARGEMENT
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">

          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="mt-6 text-2xl font-bold">
            Chargement de l'offre...
          </h2>

        </div>
      </div>
    );
  }

  // ======================================================
  // OFFRE INTROUVABLE
  // ======================================================

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

          <h1 className="text-4xl font-bold mb-4">
            Offre introuvable
          </h1>

          <p className="text-gray-500">
            Cette offre n'existe plus ou a été supprimée.
          </p>

        </div>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">

      {/* HERO */}

      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                Offre d'emploi
              </span>

              <h1 className="text-5xl font-extrabold mt-6">
                {job.title}
              </h1>

              <p className="text-xl mt-4 opacity-90">
                {job.company}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <div className="bg-white/10 px-5 py-3 rounded-xl">
                  📍 {job.location}
                </div>

                <div className="bg-white/10 px-5 py-3 rounded-xl">
                  💰 {job.salary}
                </div>

                {job.source && (
                  <div className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
                    ⭐ {job.source}
                  </div>
                )}

              </div>

            </div>

            <div>

              {job.image ? (

                <img
                  src={job.image}
                  alt={job.title}
                  className="rounded-3xl shadow-2xl w-full h-[380px] object-cover"
                />

              ) : (

                <div className="bg-white/10 rounded-3xl h-[380px] flex items-center justify-center text-8xl">
                  💼
                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* CONTENU */}

      <div className="max-w-7xl mx-auto px-6 mt-12">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* DESCRIPTION */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg p-10">

              <h2 className="text-3xl font-bold mb-6">
                Description du poste
              </h2>

              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {job.description}
              </p>

            </div>

          </div>

          {/* CANDIDATURE */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">

              <h2 className="text-2xl font-bold">
                Postuler
              </h2>

              <p className="text-gray-500 mt-2 mb-6">
                Votre candidature sera examinée par Africa First avant toute transmission à l'entreprise.
              </p>

              {/* INFORMATION IMPORTANTE */}

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">

                <p className="font-semibold text-green-800">
                  🛡️ Processus Africa First
                </p>

                <p className="text-sm text-green-700 mt-2">
                  Votre candidature est d'abord reçue et vérifiée par Africa First.
                  Vous communiquerez uniquement avec notre équipe.
                </p>

              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Nom complet"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full border rounded-xl p-4"
                />

                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border rounded-xl p-4"
                />

                <input
                  type="email"
                  disabled
                  value={
                    auth.currentUser?.email || ""
                  }
                  className="w-full border rounded-xl p-4 bg-gray-100"
                />

                <textarea
                  rows="6"
                  placeholder="Lettre de motivation"
                  value={coverLetter}
                  onChange={(e) =>
                    setCoverLetter(e.target.value)
                  }
                  className="w-full border rounded-xl p-4"
                />

                <div>

                  <label className="font-semibold block mb-2">
                    CV (PDF)
                  </label>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setCv(e.target.files[0])
                    }
                    className="w-full border rounded-xl p-4"
                  />

                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl font-bold text-lg"
                >
                  Envoyer ma candidature
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}