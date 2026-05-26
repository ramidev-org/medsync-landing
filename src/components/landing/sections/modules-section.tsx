"use client";

import { motion, useReducedMotionConfig } from "framer-motion";
import {
  Activity,
  BarChart3,
  BellRing,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileText,
  FlaskConical,
  FolderOpen,
  Headset,
  ListTodo,
  LockKeyhole,
  MessagesSquare,
  PackageCheck,
  Pill,
  ReceiptText,
  ScanText,
  Syringe,
  UsersRound,
  Wallet,
} from "lucide-react";

const productModules = [
  { title: "File d attente lisible", description: "Reception et medecin voient la meme journee, sans appels repetes.", icon: ClipboardList, color: "#0D6EFD" },
  { title: "Dossiers patients", description: "Historique, constantes, documents et suivi patient retrouves vite.", icon: FolderOpen, color: "#16a34a" },
  { title: "Ordonnances PDF", description: "Documents propres avec en-tete du cabinet et historique patient.", icon: FileText, color: "#2563eb" },
  { title: "Roles securises", description: "Medecin, assistant et administrateur avec permissions separees.", icon: LockKeyhole, color: "#0f766e" },
  { title: "Staff et planning", description: "Gardez une vue claire sur les disponibilites et les postes.", icon: UsersRound, color: "#9333ea" },
  { title: "Chat interne", description: "Coordonnez assistant, medecin et accueil autour d un patient.", icon: MessagesSquare, color: "#7c3aed" },
  { title: "Inventaire", description: "Suivez consommables, stock critique et besoins d achat.", icon: PackageCheck, color: "#f59e0b" },
  { title: "Taches d equipe", description: "Affectez rappels, suivis, documents et actions administratives.", icon: ListTodo, color: "#0891b2" },
  { title: "Rapports", description: "Analysez rendez-vous, paiements, activite et performance du cabinet.", icon: BarChart3, color: "#dc2626" },
  { title: "Assistance WhatsApp", description: "Mise en route accompagnee pour les cabinets pilotes.", icon: Headset, color: "#16a34a" },
  { title: "Analyses medicales", description: "Resultats de laboratoire et comptes rendus classes dans le dossier patient.", icon: FlaskConical, color: "#0284c7" },
  { title: "Paiements", description: "Encaissez les consultations, suivez les reglements et les statuts en temps reel.", icon: Wallet, color: "#ea580c" },
  { title: "Facturation", description: "Generez des factures propres avec historique des actes et montants.", icon: ReceiptText, color: "#334155" },
  { title: "Rappels patients", description: "Envoyez des rappels de rendez-vous et de suivi pour reduire les absences.", icon: BellRing, color: "#d946ef" },
  { title: "Rendez-vous avances", description: "Gerer reports, confirmations et disponibilites medicaux sur la semaine.", icon: CalendarClock, color: "#0f766e" },
  { title: "Documents scannes", description: "Centralisez ordonnances, bilans et pieces administratives numerisees.", icon: ScanText, color: "#1d4ed8" },
  { title: "Signes vitaux", description: "Suivez tension, glycemie et autres constantes dans l evolution du patient.", icon: Activity, color: "#ef4444" },
  { title: "Traitements", description: "Suivi des prescriptions, renouvellements et adherence therapeutique.", icon: Pill, color: "#7c3aed" },
  { title: "Actes infirmiers", description: "Tracez injections, pansements et gestes effectues avec horodatage.", icon: Syringe, color: "#0891b2" },
  { title: "Assurance", description: "Preparez les justificatifs et suivis de prise en charge par organisme payeur.", icon: CreditCard, color: "#16a34a" },
] as const;

export function ModulesSection() {
  const reduced = useReducedMotionConfig();
  return (
    <section id="features" className="scroll-mt-24 bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <div className="w-full text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#0b1220]">Tous les modules utiles du cabinet</h2>
            <p className="mx-auto mt-3 max-w-3xl text-pretty text-[15px] leading-6 text-[#556070]">Agenda, patients, documents, chat, inventaire, taches et rapports restent dans un seul espace clair pour toute l equipe.</p>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productModules.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.04 + index * 0.02, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-[20px] border border-[rgba(2,6,23,0.10)] bg-white p-4 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.18)]">
              <div className="mb-4 inline-flex size-[56px] items-center justify-center rounded-[16px]" style={{ backgroundColor: `${item.color}14`, color: item.color }}>
                <item.icon className="size-[30px]" />
              </div>
              <div className="text-[15px] font-semibold text-[#0b1220]">{item.title}</div>
              <div className="mt-2 text-[13px] leading-[21px] text-[#556070]">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
