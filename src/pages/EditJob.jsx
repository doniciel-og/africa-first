import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadJob();
  }, []);

  async function loadJob() {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.userId !== auth.currentUser.uid) {
        alert("Accès refusé.");
        navigate("/my-jobs");
        return;
      }

      setTitle(data.title);
      setCompany(data.company);
      setLocation(data.location);
      setSalary(data.salary);
      setDescription(data.description);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "jobs", id), {
        title,
        company,
        location,
        salary,
        description,
      });

      alert("✅ Offre modifiée avec succès.");
      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert("Erreur.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Modifier une offre
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            value={salary}
            onChange={(e)=>setSalary(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <textarea
            rows="6"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Enregistrer
          </button>

        </form>

      </div>
    </div>
  );
}