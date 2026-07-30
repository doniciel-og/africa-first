import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";

import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Chat() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
const messagesEndRef = useRef(null);
  useEffect(() => {
  const q = query(
    collection(db, "conversations", id, "messages"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
    setMessages(data);
  });

  return () => unsubscribe();
}, [id]);

  async function loadMessages() {
    const q = query(
      collection(db, "conversations", id, "messages"),
      orderBy("createdAt", "asc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMessages(data);
  }

  async function sendMessage() {
    if (!message.trim()) return;

    await addDoc(
  collection(db, "conversations", id, "messages"),
  {
    senderId: auth.currentUser.uid,
    senderName: auth.currentUser.displayName || auth.currentUser.email,
    text: message,
    createdAt: serverTimestamp(),
  }
);;

    setMessage("");

    
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl h-[80vh] flex flex-col">

          <div className="border-b p-6">

            <h1 className="text-2xl font-bold">
              Conversation
            </h1>

          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === auth.currentUser.uid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
<div ref={messagesEndRef}></div>
                <div
                  className={`max-w-md px-5 py-3 rounded-2xl ${
                    msg.senderId === auth.currentUser.uid
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
<p className="text-xs font-bold mb-1">
  {msg.senderName}
</p>
                  {msg.text}
<p className="text-[11px] opacity-70 mt-2 text-right">
  {msg.createdAt?.toDate().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>
                </div>

              </div>

            ))}

          </div>

          <div className="border-t p-5 flex gap-4">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-xl p-4"
              placeholder="Écrire un message..."
            />
onKeyDown={(e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
}}
            <button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl"
            >
              Envoyer
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}