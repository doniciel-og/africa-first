import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedTypes,
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(
        doc(db, "users", user.uid)
      );

      if (userDoc.exists()) {
        const data = userDoc.data();

        if (allowedTypes.includes(data.accountType)) {
          setAuthorized(true);
        }
      }

      setLoading(false);
    }

    checkAccess();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Vérification des permissions...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}