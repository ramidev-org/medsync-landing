"use client";

import { motion, useReducedMotionConfig } from "framer-motion";
import Image from "next/image";

const testimonials = [
  { name: "Dr. Amina B.", specialty: "Medecine generale", text: "Le parcours reste simple pour un cabinet solo tout en gardant les notes, paiements et suivis bien organises.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Karim M.", specialty: "Dentisterie", text: "Les rendez-vous, traitements et paiements sont plus faciles a suivre sans passer par plusieurs carnets papier.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Lina H.", specialty: "Dermatologie", text: "Le dossier patient est pratique. Les observations et les taches de suivi restent au meme endroit.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
] as const;

export function ReviewsSection() {
  const reduced = useReducedMotionConfig();
  return (
    <section id="testimonials" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[980px] px-5 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <div className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">AVIS MEDECINS</div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#0b1220]">Pense pour les cabinets medicaux en Algerie</h2>
        </motion.div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }} className="rounded-[22px] border border-[rgba(2,6,23,0.10)] bg-[#f8fafc] p-4">
              <div className="mb-3 flex items-center gap-3">
                <Image src={item.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold text-[#0b1220]">{item.name}</div>
                  <div className="text-[12px] text-[#0D6EFD]">{item.specialty}</div>
                </div>
              </div>
              <div className="text-[13px] leading-[20px] text-[#334155]">{item.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
