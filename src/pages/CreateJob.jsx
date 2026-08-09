import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/cloudinary";

export default function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [contractType, setContractType] = useState("CDI");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await addDoc(collection(db, "jobRequests"), {
        title,
        company,
        location,
        salary,
        contractType,
        description,
        image: imageUrl,

        userId: auth.currentUser.uid,

        status: "En attente",

        createdAt: new Date(),
      });

      alert(
        "✅ Votre demande a été envoyée à Africa First. Après vérification, elle sera publiée."
      );

      navigate("/jobs");

    } catch (error) {
      console.log(error);
      alert("Erreur lors de la publication.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-3">
          Envoyer une offre d'emploi
        </h1>

        <p className="text-gray-500 mb-8">
          Votre offre sera vérifiée par Africa First avant sa publication.
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
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Entreprise"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Ville"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Salaire"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <div>

            <label className="block font-semibold mb-2">
              Type de contrat
            </label>

            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="w-full border p-4 rounded-xl"
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
              className="w-full border p-4 rounded-xl"
            />

          </div>

          <textarea
            rows="6"
            placeholder="Description de l'offre"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Soumettre une offre d'emploi
          </button>

        </form>

      </div>

    </div>
  );
}