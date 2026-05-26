"use client";

import { motion, useReducedMotionConfig } from "framer-motion";
import { Building2, CheckCircle2, CircleMinus, Key, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type ServiceStatus = "yes" | "partial" | "no";

const pricingServices = [
  { id: "agenda", label: "Agenda et file d attente" },
  { id: "patients", label: "Dossiers patients" },
  { id: "documents", label: "Ordonnances et documents" },
  { id: "billing", label: "Paiements et facturation" },
  { id: "reports", label: "Rapports" },
  { id: "users", label: "Utilisateurs et postes" },
  { id: "support", label: "Assistance" },
  { id: "onboarding", label: "Migration / onboarding" },
] as const;

type PricingServiceId = (typeof pricingServices)[number]["id"];
type ServiceStatusMap = Record<PricingServiceId, ServiceStatus>;

const pricingPlans = [
  {
    name: "Medecin solo",
    price: "9 900 DA",
    cadence: "/ an",
    icon: User,
    featured: false,
    services: {
      agenda: "no",
      patients: "yes",
      documents: "yes",
      billing: "partial",
      reports: "no",
      users: "partial",
      support: "yes",
      onboarding: "no",
    } satisfies ServiceStatusMap,
    highlight: "Essentiel pour demarrer vite avec un seul praticien.",
  },
  {
    name: "Clinique",
    price: "26 000 DA",
    cadence: "/ an",
    icon: Building2,
    featured: false,
    services: {
      agenda: "yes",
      patients: "yes",
      documents: "yes",
      billing: "yes",
      reports: "partial",
      users: "yes",
      support: "yes",
      onboarding: "partial",
    } satisfies ServiceStatusMap,
    highlight: "Ajoute facturation complete, equipe et gestion collaborative.",
  },
  {
    name: "Pro",
    price: "35 000 DA",
    cadence: "/ an",
    icon: Sparkles,
    featured: true,
    services: {
      agenda: "yes",
      patients: "yes",
      documents: "yes",
      billing: "yes",
      reports: "yes",
      users: "yes",
      support: "yes",
      onboarding: "yes",
    } satisfies ServiceStatusMap,
    highlight: "Inclut rapports avances, supervision et accompagnement prioritaire.",
  },
  {
    name: "Test",
    price: "0 DA",
    cadence: "10 jours",
    icon: Key,
    featured: false,
    services: {
      agenda: "partial",
      patients: "partial",
      documents: "partial",
      billing: "no",
      reports: "no",
      users: "no",
      support: "yes",
      onboarding: "yes",
    } satisfies ServiceStatusMap,
    highlight: "Parfait pour valider le parcours avant activation.",
  },
] as const;

export function PricingSectionStandalone() {
  const router = useRouter();
  const reduced = useReducedMotionConfig();

  return (
    <section id="pricing" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <div className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">TARIFS</div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#0b1220]">Des offres simples pour demarrer</h2>
          <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-6 text-[#556070]">Facturation annuelle pour les plans actifs, avec un essai accompagne pour valider le parcours avant activation.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-5 w-fit rounded-full border border-[rgba(13,110,253,0.14)] bg-[rgba(13,110,253,0.08)] px-3.5 py-2 text-[12px] font-semibold text-[#0D6EFD]">
          Tarifs annuels • activation et mise en route incluses
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {pricingPlans.map((plan, idx) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }} className={cn("flex w-full max-w-[320px] flex-col rounded-[22px] border p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.22)]", "md:w-[272px]", plan.featured ? "border-[rgba(13,110,253,0.35)] bg-[#0D6EFD] text-white" : "border-[rgba(2,6,23,0.10)] bg-[#f8fafc] text-[#0b1220]")} style={{ minHeight: 460 }}>
              <div className="flex items-center gap-3">
                <div className={cn("flex size-[46px] items-center justify-center rounded-[16px]", plan.featured ? "bg-[rgba(255,255,255,0.16)]" : "bg-[rgba(13,110,253,0.10)]")}>
                  <plan.icon className={cn("size-[22px]", plan.featured ? "text-white" : "text-[#0D6EFD]")} />
                </div>
                <div className="flex-1">
                  <div className={cn("text-[28px] font-semibold leading-none", plan.featured ? "text-white" : "text-[#0b1220]")}>{plan.name}</div>
                </div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className={cn("text-[34px] font-semibold leading-none", plan.featured ? "text-white" : "text-[#0b1220]")}>{plan.price}</div>
                <div className={cn("pb-1 text-[12px] font-semibold", plan.featured ? "text-[rgba(255,255,255,0.82)]" : "text-[#64748b]")}>{plan.cadence}</div>
              </div>

              <div className="mt-4 grid flex-1 gap-2.5">
                {pricingServices.map((service) => {
                  const status = plan.services[service.id];
                  return (
                    <div key={`${plan.name}-${service.id}`} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {status === "yes" ? (
                          <CheckCircle2 className={cn("size-4", plan.featured ? "text-white" : "text-[#16a34a]")} />
                        ) : (
                          <CircleMinus className={cn("size-4", plan.featured ? "text-[rgba(255,255,255,0.85)]" : "text-[#94a3b8]")} />
                        )}
                        <div className={cn("text-[13px]", plan.featured ? "text-[rgba(255,255,255,0.92)]" : "text-[#334155]")}>{service.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={cn("mt-4 border-t pt-3 text-[12px]", plan.featured ? "border-[rgba(255,255,255,0.22)] text-[rgba(255,255,255,0.9)]" : "border-[rgba(2,6,23,0.10)] text-[#475569]")}>{plan.highlight}</div>

              <div className="mt-5">
                <button onClick={() => {
                  if (plan.name === "Test") router.push("/request?intent=test");
                  else router.push(`/request?intent=plan&plan=${encodeURIComponent(plan.name)}`);
                }} className={cn("w-full rounded-[14px] border px-4 py-3 text-[14px] font-semibold", plan.featured ? "border-transparent bg-white text-[#0D6EFD]" : "border-[rgba(13,110,253,0.20)] bg-[#0D6EFD] text-white")}>
                  {plan.name === "Test" ? "DEMANDER UN TEST" : "CHOISIR CE PLAN"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
