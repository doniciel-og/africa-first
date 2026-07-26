import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid md:grid-cols-4 gap-12">

        <div>
          <h2 className="text-3xl font-bold text-green-400">
            Africa First
          </h2>

          <p className="mt-4 text-gray-400">
            Connecter les talents, les entreprises et les investisseurs
            partout en Afrique.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-5">
            Plateforme
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Emplois</li>
            <li>Investissements</li>
            <li>Partenariats</li>
            <li>Formations</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex gap-3 items-center">
              <Mail size={18} />
              contact@africafirst.com
            </div>

            <div className="flex gap-3 items-center">
              <Phone size={18} />
              +243 XXX XXX XXX
            </div>

          </div>

        </div>

        <div>

          <h3 className="font-bold mb-5">
            Réseaux
          </h3>

          <div className="flex gap-5 text-gray-400">
  <span>Instagram</span>
  <span>LinkedIn</span>
</div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2026 Africa First — Tous droits réservés.
      </div>

    </footer>
  );
}