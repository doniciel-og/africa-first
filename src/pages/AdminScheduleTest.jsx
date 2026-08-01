import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function AdminScheduleTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    loadApplication();
  }, []);

  async function loadApplication() {
    const snap = await getDoc(doc(db, "applications", id));

    if (snap.exists()) {
      const data = snap.data();

      setApplication(data);

      setDate(data.testDate || "");
      setTime(data.testTime || "");
      setLocation(data.testLocation || "");
      setInstructions(data.instructions || "");
    }
  }

  async function saveSchedule(e) {
    e.preventDefault();

    await updateDoc(doc(db, "applications", id), {
      status: "Convoqué",
      testDate: date,
      testTime: time,
      testLocation: location,
      instructions,
    });

    alert("✅ Convocation enregistrée.");

    navigate("/admin-applications");
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-3">
          Planifier un test
        </h1>

        <p className="text-gray-500 mb-8">
          {application.fullName}
        </p>

        <form
          onSubmit={saveSchedule}
          className="space-y-5"
        >

          <div>

            <label className="font-semibold">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl p-4 mt-2"
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Heure
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-xl p-4 mt-2"
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Lieu
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lieu du test"
              className="w-full border rounded-xl p-4 mt-2"
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Instructions
            </label>

            <textarea
              rows="5"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Informations pour le candidat..."
              className="w-full border rounded-xl p-4 mt-2"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Enregistrer la convocation
          </button>

        </form>

      </div>

    </div>
  );
}