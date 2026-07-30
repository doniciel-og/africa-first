import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
export default function Messages() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setConversations(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Messagerie
        </h1>

        <div className="space-y-4">

          {conversations.map((conversation) => (

            <Link
  key={conversation.id}
  to={`/chat/${conversation.id}`}
  className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
>

  <h2 className="text-xl font-bold">
    {conversation.jobTitle}
  </h2>

  <p className="text-gray-500 mt-2">
    {conversation.lastMessage || "Commencer la discussion"}
  </p>

</Link>

          ))}

        </div>

      </div>

    </div>
  );
}