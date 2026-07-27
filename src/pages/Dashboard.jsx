import { auth } from "../firebase";

export default function Dashboard() {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex items-center gap-6">

            <img
              src="https://ui-avatars.com/api/?name=User&background=16a34a&color=fff&size=128"
              alt="Profil"
              className="w-28 h-28 rounded-full"
            />

            <div>
              <h1 className="text-4xl font-bold">
                Bienvenue 👋
              </h1>

              <p className="text-gray-500 mt-2">
                {user?.email}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="bg-green-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-green-600">0</h2>
              <p>Candidatures</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-blue-600">0</h2>
              <p>Investissements</p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-yellow-600">0</h2>
              <p>Partenariats</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}