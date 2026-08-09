import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/cloudinary";

export default function AdminCreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
const [contractType, setContractType] = useState("CDI");
const [featured, setFeatured] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        salary,
        featured,
        description,
        image: imageUrl,
contractType,

        // Informations de publication
        createdBy: "Africa First",
        publishedBy: "Africa First",
        source: "admin",
        isAdminPost: true,

        // Statut
        status: "Publié",

        // Date
        createdAt: new Date(),
      });

      alert("✅ Offre publiée avec succès.");

      navigate("/jobs");

    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
<div className="flex items-center gap-3">

  <input
    type="checkbox"
    id="featured"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
    className="w-5 h-5"
  />

  <label
    htmlFor="featured"
    className="font-semibold"
  >
    ⭐ Mettre cette offre à la une
  </label>

</div>
        <h1 className="text-4xl font-bold mb-2">
          Publier une offre
        </h1>

        <p className="text-gray-500 mb-8">
          Publication directe par Africa First
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Titre du poste"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="text"
            placeholder="Entreprise"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="text"
            placeholder="Ville"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="text"
            placeholder="Salaire"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />
<div>

  <label className="block font-semibold mb-2">
    Type de contrat
  </label>

  <select
    value={contractType}
    onChange={(e) => setContractType(e.target.value)}
    className="w-full border rounded-xl p-4"
  >
    <option>CDI</option>
    <option>CDD</option>
    <option>Stage</option>
    <option>Freelance</option>
    <option>Temps partiel</option>
  </select>

</div>
          <div>
            <label className="block font-semibold mb-2">
              Image de l'offre
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-xl p-4"
            />
          </div>

          <textarea
            rows="6"
            placeholder="Description de l'offre"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            🚀 Publier l'offre
          </button>

        </form>

      </div>

    </div>
  );
}