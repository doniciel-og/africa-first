import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { Link } from "react-router-dom";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "conversations"),
        where(
          "participants",
          "array-contains",
          user.uid
        )
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // IMPORTANT :
        // On affiche uniquement les conversations
        // entre le candidat et Africa First.
        .filter(
          (conversation) =>
            conversation.conversationType ===
            "candidate_admin"
        )
        .sort((a, b) => {
          const dateA =
            a.lastMessageAt?.toDate?.() ||
            a.createdAt?.toDate?.() ||
            new Date(0);

          const dateB =
            b.lastMessageAt?.toDate?.() ||
            b.createdAt?.toDate?.() ||
            new Date(0);

          return dateB - dateA;
        });

      setConversations(data);
    } catch (error) {
      console.log(
        "Erreur chargement conversations :",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // UTILISATEUR NON CONNECTÉ
  // ==================================================

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 pt-28 pb-16 flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <div className="text-5xl mb-4">
            🔐
          </div>

          <h1 className="text-2xl font-bold">
            Connexion requise
          </h1>

          <p className="text-gray-500 mt-3">
            Veuillez vous connecter pour accéder à votre messagerie.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Messagerie
          </h1>

          <p className="text-gray-600 mt-3">
            Communiquez directement avec l'équipe Africa First.
          </p>

        </div>

        {/* INFORMATION */}

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8">

          <div className="flex gap-4">

            <div className="text-3xl">
              🛡️
            </div>

            <div>

              <h2 className="font-bold text-green-800">
                Messagerie Africa First
              </h2>

              <p className="text-green-700 text-sm mt-1">
                Toutes vos candidatures sont traitées par Africa First.
                Vous ne communiquez pas directement avec les entreprises.
              </p>

            </div>

          </div>

        </div>

        {/* CHARGEMENT */}

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="font-semibold mt-5">
              Chargement de vos conversations...
            </p>

          </div>
        )}

        {/* AUCUNE CONVERSATION */}

        {!loading && conversations.length === 0 && (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              💬
            </div>

            <h2 className="text-2xl font-bold">
              Aucune conversation
            </h2>

            <p className="text-gray-500 mt-3">
              Lorsque vous postulerez à une offre,
              une conversation avec Africa First sera créée automatiquement.
            </p>

          </div>

        )}

        {/* CONVERSATIONS */}

        {!loading && conversations.length > 0 && (

          <div className="space-y-4">

            {conversations.map((conversation) => (

              <Link
                key={conversation.id}
                to={`/chat/${conversation.id}`}
                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4">

                    {/* AVATAR AFRICA FIRST */}

                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      🌍
                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        Africa First
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {conversation.jobTitle ||
                          "Candidature"}
                      </p>

                    </div>

                  </div>

                  <span className="text-green-600 font-semibold">
                    →
                  </span>

                </div>

                {/* DERNIER MESSAGE */}

                <div className="mt-5 bg-gray-50 rounded-xl p-4">

                  <p className="text-gray-600">
                    {conversation.lastMessage ||
                      "Commencer la discussion avec Africa First"}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}