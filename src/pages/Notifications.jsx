import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    setNotifications(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  async function markAsRead(id) {
    await updateDoc(doc(db, "notifications", id), {
      read: true,
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          Mes notifications
        </h1>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 shadow text-center">
            Aucune notification.
          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((notification) => (

              <div
                key={notification.id}
                className={`rounded-2xl shadow p-6 cursor-pointer transition ${
                  notification.read
                    ? "bg-white"
                    : "bg-green-50 border-l-4 border-green-600"
                }`}
                onClick={() => markAsRead(notification.id)}
              >

                <h2 className="text-xl font-bold">
                  {notification.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {notification.message}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}