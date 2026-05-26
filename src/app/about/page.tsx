"use client";

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";

const pillars = [
  {
    title: "Concu pour les cabinets",
    text: "Flux reel de consultation, accueil, ordonnances et paiements dans un seul espace.",
    icon: Stethoscope,
  },
  {
    title: "Collaboration d equipe",
    text: "Medecin, assistant et administration avancent sur la meme journee sans friction.",
    icon: UsersRound,
  },
  {
    title: "Cadre securise",
    text: "Roles, tracabilite et bonne pratique de lancement avant donnees patients reelles.",
    icon: ShieldCheck,
  },
] as const;

const commitments = [
  "Activation accompagnee avant usage production",
  "Parcours simple pour medecin solo et clinique",
  "Support humain pour la mise en route",
] as const;

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="min-h-screen bg-[#f8fafc] text-[#0b1220]">
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-14 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] border border-[rgba(2,6,23,0.08)] bg-white p-7 md:p-10"
        >
          <div className="text-xs font-semibold tracking-widest text-[#64748b]">A PROPOS</div>
          <h1 className="mt-3 max-w-[800px] text-balance text-[38px] font-semibold leading-[44px] tracking-tight md:text-[52px] md:leading-[58px]">
            MedSync aide les cabinets a travailler plus clairement, chaque jour.
          </h1>
          <p className="mt-4 max-w-[860px] text-[16px] leading-[27px] text-[#475569]">
            Notre objectif est simple : offrir une experience moderne pour gerer rendez-vous, dossiers patients,
            ordonnances, paiements et suivi operationnel, sans complexite inutile.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/request?intent=test"
              className="rounded-[12px] bg-[#0D6EFD] px-5 py-3 text-[12px] font-semibold tracking-wide text-white hover:bg-[#0B5BDA]"
            >
              DEMANDER UN TEST
            </Link>
            <Link
              href="/#pricing"
              className="rounded-[12px] border border-[rgba(2,6,23,0.12)] bg-white px-5 py-3 text-[12px] font-semibold tracking-wide text-[#0b1220] hover:bg-[#f8fafc]"
            >
              VOIR LES TARIFS
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] border border-[rgba(2,6,23,0.08)] bg-white p-5"
            >
              <div className="flex size-11 items-center justify-center rounded-[14px] bg-[rgba(13,110,253,0.10)]">
                <item.icon className="size-5 text-[#0D6EFD]" />
              </div>
              <h2 className="mt-4 text-[18px] font-semibold text-[#0b1220]">{item.title}</h2>
              <p className="mt-2 text-[14px] leading-[23px] text-[#556070]">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 rounded-[22px] border border-[rgba(2,6,23,0.08)] bg-white p-5 md:p-6"
        >
          <h3 className="text-[18px] font-semibold text-[#0b1220]">Nos engagements de lancement</h3>
          <div className="mt-4 grid gap-3">
            {commitments.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-[14px] leading-[22px] text-[#334155]">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
    </MotionConfig>
  );
}
