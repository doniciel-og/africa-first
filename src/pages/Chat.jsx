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
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function Chat() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // ==============================
  // CHARGER LA CONVERSATION
  // ==============================
  useEffect(() => {
    async function loadConversation() {
      try {
        const snap = await getDoc(
          doc(db, "conversations", id)
        );

        if (snap.exists()) {
          setConversation({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.log("Erreur conversation :", error);
      }
    }

    loadConversation();
  }, [id]);

  // ==============================
  // CHARGER LES MESSAGES EN TEMPS RÉEL
  // ==============================
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(
        db,
        "conversations",
        id,
        "messages"
      ),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const data = snapshot.docs.map((messageDoc) => ({
          id: messageDoc.id,
          ...messageDoc.data(),
        }));

        setMessages(data);

        // Marquer automatiquement comme lus
        // les messages reçus
        const unreadMessages = snapshot.docs.filter(
          (messageDoc) => {
            const data = messageDoc.data();

            return (
              data.senderId !== auth.currentUser.uid &&
              data.read === false
            );
          }
        );

        for (const messageDoc of unreadMessages) {
          try {
            await updateDoc(
              doc(
                db,
                "conversations",
                id,
                "messages",
                messageDoc.id
              ),
              {
                read: true,
                readAt: serverTimestamp(),
              }
            );
          } catch (error) {
            console.log(
              "Erreur lecture message :",
              error
            );
          }
        }
      },
      (error) => {
        console.log(
          "Erreur messages :",
          error
        );
      }
    );

    return () => unsubscribe();
  }, [id]);

  // ==============================
  // ÉCOUTER "EN TRAIN D'ÉCRIRE"
  // ==============================
  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      doc(db, "conversations", id),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          if (
            data.typingUserId !==
            auth.currentUser.uid
          ) {
            setIsTyping(
              data.typing === true
            );
          }
        }
      },
      (error) => {
        console.log(
          "Erreur typing :",
          error
        );
      }
    );

    return () => unsubscribe();
  }, [id]);

  // ==============================
  // DESCENDRE AUTOMATIQUEMENT
  // ==============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==============================
  // METTRE À JOUR LE TYPING
  // ==============================
  async function updateTyping(value) {
    if (!auth.currentUser) return;

    try {
      await updateDoc(
        doc(db, "conversations", id),
        {
          typing: value,
          typingUserId:
            auth.currentUser.uid,
        }
      );
    } catch (error) {
      console.log(
        "Erreur typing :",
        error
      );
    }
  }

  // ==============================
  // ENVOYER UN MESSAGE
  // ==============================
  async function sendMessage() {
    if (!auth.currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    if (!message.trim()) return;

    const text = message.trim();

    try {
      // Ajouter le message
      await addDoc(
        collection(
          db,
          "conversations",
          id,
          "messages"
        ),
        {
          senderId:
            auth.currentUser.uid,

          senderName:
            auth.currentUser.displayName ||
            auth.currentUser.email ||
            "Utilisateur",

          text: text,

          // Nouveau message = non lu
          read: false,

          createdAt:
            serverTimestamp(),
        }
      );

      // Mettre à jour la conversation
      await updateDoc(
        doc(db, "conversations", id),
        {
          lastMessage: text,

          lastMessageAt:
            serverTimestamp(),

          typing: false,

          typingUserId:
            auth.currentUser.uid,
        }
      );

      setMessage("");
    } catch (error) {
      console.log(error);

      alert(
        "Erreur lors de l'envoi du message."
      );
    }
  }

  // ==============================
  // UTILISATEUR NON CONNECTÉ
  // ==============================
  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 pt-28 flex items-center justify-center">

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

          <h1 className="text-2xl font-bold">
            Veuillez vous connecter
          </h1>

        </div>

      </div>
    );
  }

  // ==============================
  // INTERFACE
  // ==============================
  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-5xl mx-auto px-4">

        <div className="bg-white rounded-3xl shadow-xl h-[80vh] flex flex-col overflow-hidden">

          {/* =========================
              HEADER
          ========================= */}

          <div className="border-b p-6">

            <div>

              <h1 className="text-2xl font-bold">
                {conversation?.company ||
                  "Conversation"}
              </h1>

              {isTyping ? (

                <p className="text-green-600 text-sm mt-1 animate-pulse">
                  ✍️ En train d'écrire...
                </p>

              ) : (

                <p className="text-gray-500 mt-1">
                  {conversation?.jobTitle ||
                    "Messagerie Africa First"}
                </p>

              )}

            </div>

          </div>

          {/* =========================
              MESSAGES
          ========================= */}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.length === 0 ? (

              <div className="h-full flex items-center justify-center">

                <div className="text-center">

                  <div className="text-5xl mb-4">
                    💬
                  </div>

                  <h2 className="text-xl font-bold">
                    Aucun message
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Commencez la conversation.
                  </p>

                </div>

              </div>

            ) : (

              messages.map((msg) => {

                const isMine =
                  msg.senderId ===
                  auth.currentUser.uid;

                return (

                  <div
                    key={msg.id}
                    className={`flex ${
                      isMine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-md px-5 py-3 rounded-2xl ${
                        isMine
                          ? "bg-green-600 text-white rounded-br-md"
                          : "bg-gray-200 text-gray-900 rounded-bl-md"
                      }`}
                    >

                      {!isMine && (

                        <p className="text-xs font-bold mb-1">
                          {msg.senderName}
                        </p>

                      )}

                      <p className="whitespace-pre-line break-words">
                        {msg.text}
                      </p>

                      {/* HEURE + LECTURE */}

                      <div
                        className={`flex items-center justify-end gap-1 mt-2 ${
                          isMine
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >

                        <p className="text-[11px]">
                          {msg.createdAt?.toDate
                            ? msg.createdAt
                                .toDate()
                                .toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                            : "..."}
                        </p>

                        {isMine && (

                          <span
                            className={`text-xs font-bold ${
                              msg.read
                                ? "text-blue-200"
                                : "text-green-100"
                            }`}
                          >
                            {msg.read
                              ? "✓✓"
                              : "✓"}
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                );
              })

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* =========================
              SAISIE
          ========================= */}

          <div className="border-t p-5">

            <div className="flex gap-4">

              <input
                value={message}

                onChange={(e) => {

                  setMessage(
                    e.target.value
                  );

                  updateTyping(
                    e.target.value.length > 0
                  );

                }}

                onFocus={() =>
                  updateTyping(true)
                }

                onBlur={() => {

                  if (!message.trim()) {
                    updateTyping(false);
                  }

                }}

                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {

                    e.preventDefault();

                    sendMessage();

                  }

                }}

                className="flex-1 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"

                placeholder="Écrire un message..."
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 rounded-xl font-semibold transition"
              >
                Envoyer
              </button>

            </div>

            <p className="text-xs text-gray-400 mt-2">
              Appuyez sur Entrée pour envoyer
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}