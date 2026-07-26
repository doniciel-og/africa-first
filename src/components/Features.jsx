import {
  Handshake,
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Globe,
  Rocket,
} from "lucide-react";

export default function Features() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-24">

          <div>
            <h2 className="text-5xl font-bold text-green-600">500+</h2>
            <p className="text-gray-600 mt-2">Entreprises partenaires</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-600">20+</h2>
            <p className="text-gray-600 mt-2">Pays africains</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-600">10K+</h2>
            <p className="text-gray-600 mt-2">Utilisateurs</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-600">1000+</h2>
            <p className="text-gray-600 mt-2">Opportunités</p>
          </div>

        </div>

        {/* Services */}
        <h2 className="text-4xl font-bold text-center mb-14">
          Nos Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
            <Handshake className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">Partenariats</h3>
            <p className="text-gray-600">
              Développez votre réseau avec des partenaires fiables.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
            <TrendingUp className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">Investissements</h3>
            <p className="text-gray-600">
              Trouvez les investisseurs adaptés à vos projets.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
            <BriefcaseBusiness className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">Emplois</h3>
            <p className="text-gray-600">
              Recrutez les meilleurs talents ou trouvez un emploi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
            <GraduationCap className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">Formations</h3>
            <p className="text-gray-600">
              Développez vos compétences grâce à des formations de qualité.
            </p>
          </div>

        </div>

        {/* Pourquoi choisir */}
        <h2 className="text-4xl font-bold text-center mb-14">
          Pourquoi choisir Africa First ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <Globe className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">
              Réseau Africain
            </h3>
            <p className="text-gray-600">
              Connectez-vous avec des entreprises, investisseurs et talents de tout le continent.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <ShieldCheck className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">
              Plateforme sécurisée
            </h3>
            <p className="text-gray-600">
              Des profils vérifiés et des opportunités fiables.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <Rocket className="text-green-600 mb-5" size={50} />
            <h3 className="text-2xl font-bold mb-3">
              Accélérez votre croissance
            </h3>
            <p className="text-gray-600">
              Trouvez les bonnes opportunités pour développer votre activité.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}