"use client";

import * as React from "react";
import { MotionConfig, motion, useInView, useReducedMotionConfig } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Archive,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileLock2,
  FileText,
  FolderOpen,
  Key,
  ListTodo,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getWhatsAppPhoneDigits } from "@/lib/whatsapp";

const BRAND = {
  name: "MedSync",
  accent: "#0D6EFD",
};

const productModules = [
  {
    title: "File d attente lisible",
    description: "Reception et medecin voient la meme journee, sans appels repetes.",
    icon: ClipboardList,
    color: "#0D6EFD",
  },
  {
    title: "Dossiers patients",
    description: "Historique, constantes, documents et suivi patient retrouves vite.",
    icon: FolderOpen,
    color: "#16a34a",
  },
  {
    title: "Ordonnances PDF",
    description: "Documents propres avec en-tete du cabinet et historique patient.",
    icon: FileText,
    color: "#2563eb",
  },
  {
    title: "Roles securises",
    description: "Medecin, assistant et administrateur avec permissions separees.",
    icon: LockKeyhole,
    color: "#0f766e",
  },
  {
    title: "Staff et planning",
    description: "Gardez une vue claire sur les disponibilites et les postes.",
    icon: UsersRound,
    color: "#9333ea",
  },
  {
    title: "Chat interne",
    description: "Coordonnez assistant, medecin et accueil autour d un patient.",
    icon: MessagesSquare,
    color: "#7c3aed",
  },
  {
    title: "Inventaire",
    description: "Suivez consommables, stock critique et besoins d achat.",
    icon: PackageCheck,
    color: "#f59e0b",
  },
  {
    title: "Taches d equipe",
    description: "Affectez rappels, suivis, documents et actions administratives.",
    icon: ListTodo,
    color: "#0891b2",
  },
  {
    title: "Rapports",
    description: "Analysez rendez-vous, paiements, activite et performance du cabinet.",
    icon: BarChart3,
    color: "#dc2626",
  },
  {
    title: "Assistance WhatsApp",
    description: "Mise en route accompagnee pour les cabinets pilotes.",
    icon: MessageCircle,
    color: "#16a34a",
  },
] as const;

const stats = [
  {
    value: 120,
    suffix: "+",
    label: "Cliniques et cabinets",
    detail: "Structures que MedSync peut accompagner avec un demarrage clair.",
    icon: Building2,
  },
  {
    value: 35000,
    suffix: "+",
    label: "Patients organises",
    detail: "Dossiers, documents et historiques retrouves sans papier disperse.",
    icon: UsersRound,
  },
  {
    value: 300,
    suffix: "+",
    label: "Medecins a servir",
    detail: "Generalistes, specialistes et equipes avec des roles separes.",
    icon: Stethoscope,
  },
] as const;

const testimonials = [
  {
    name: "Dr. Amina B.",
    specialty: "Medecine generale",
    text: "Le parcours reste simple pour un cabinet solo tout en gardant les notes, paiements et suivis bien organises.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Karim M.",
    specialty: "Dentisterie",
    text: "Les rendez-vous, traitements et paiements sont plus faciles a suivre sans passer par plusieurs carnets papier.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Lina H.",
    specialty: "Dermatologie",
    text: "Le dossier patient est pratique. Les observations et les taches de suivi restent au meme endroit.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Dr. Samir A.",
    specialty: "Urologie",
    text: "Une alternative moderne aux logiciels locaux, surtout quand on veut acces web et sauvegarde.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Dr. Nesrine T.",
    specialty: "Cardiologie",
    text: "Le tableau de bord rend la journee plus lisible : visites, taches, paiements et actions patient.",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
  },
] as const;

const pricingPlans = [
  {
    name: "Medecin solo",
    price: "9 900 DA",
    cadence: "/ an",
    description: "Pour un cabinet prive gere par un seul medecin.",
    icon: User,
    featured: false,
    features: [
      "Agenda et rendez-vous",
      "Dossiers patients",
      "Consultations et constantes",
      "Ordonnances et lettres",
      "Paiements simples",
    ],
  },
  {
    name: "Clinique",
    price: "26 000 DA",
    cadence: "/ an",
    description: "Pour cabinet avec assistant, equipe ou plusieurs postes.",
    icon: Building2,
    featured: false,
    features: [
      "Tout le plan solo",
      "Medecins et assistants",
      "Services et facturation",
      "Taches partagees",
      "Assistance prioritaire",
    ],
  },
  {
    name: "Pro",
    price: "35 000 DA",
    cadence: "/ an",
    description:
      "Pour les cliniques structurees avec plus d operations, de supervision et d accompagnement.",
    icon: Sparkles,
    featured: true,
    features: [
      "Tout le plan clinique",
      "Multi-postes et suivi d equipe avance",
      "Rapports mensuels et annuels",
      "Journal d activite et supervision",
      "Accompagnement prioritaire au lancement",
    ],
  },
  {
    name: "Test",
    price: "0 DA",
    cadence: "10 jours",
    description: "Essai accompagne avant activation reelle du cabinet.",
    icon: Key,
    featured: false,
    features: [
      "Demonstration complete",
      "Donnees exemple",
      "Configuration guidee",
      "Retour metier",
      "Sans engagement",
    ],
  },
] as const;

const comparisonRows = [
  { label: "Agenda + file d attente", values: ["Oui", "Oui", "Oui", "Demo"] },
  { label: "Dossiers patients + documents", values: ["Oui", "Oui", "Oui", "Demo"] },
  { label: "Utilisateurs / postes", values: ["1", "2-3", "Illimites", "Guide"] },
  { label: "Paiements + factures", values: ["Essentiel", "Complet", "Complet + exports", "Apercu"] },
  { label: "Rapports", values: ["Basique", "Standard", "Avances", "-"] },
  { label: "Assistance + mise en route", values: ["WhatsApp", "Prioritaire", "Prioritaire + migration", "Guide"] },
] as const;

const comparisonPlans = ["Solo", "Clinique", "Pro", "Test"] as const;

const faqItems = [
  {
    question: "Mes donnees patients sont-elles securisees ?",
    answer:
      "Le lancement production doit inclure acces strict par cabinet, sauvegardes et journal audit avant les vrais patients.",
  },
  {
    question: "Est-ce que je peux etre accompagne ?",
    answer:
      "Oui. Le lancement doit inclure une configuration guidee et une assistance WhatsApp pour les cabinets pilotes.",
  },
  {
    question: "Est-ce reserve aux grandes cliniques ?",
    answer:
      "Non. Le parcours principal est pense d abord pour un medecin seul dans un cabinet prive.",
  },
  {
    question: "Que se passe-t-il si je change ordinateur ?",
    answer:
      "En mode reel, les donnees du cabinet sont liees au compte et non a une seule machine.",
  },
] as const;

const complianceHighlights = [
  {
    title: "Acces par role",
    description:
      "Medecin, assistant et administrateur avec permissions separees pour limiter les erreurs et proteger les dossiers.",
    icon: ShieldCheck,
  },
  {
    title: "Sauvegardes et tracabilite",
    description:
      "Journal d actions, sauvegardes planifiees et reprise plus simple avant mise en production reelle.",
    icon: Archive,
  },
  {
    title: "Hebergement et confidentialite",
    description:
      "Preparation du cadre de confidentialite, des conditions d utilisation et des engagements de traitement des donnees.",
    icon: FileLock2,
  },
] as const;

const trustLinks = [
  "Politique de confidentialite",
  "Conditions d utilisation",
  "Traitement des donnees",
] as const;

function useMotionSettings() {
  const reduced = useReducedMotionConfig();
  return React.useMemo(() => {
    const ease = ([0.22, 1, 0.36, 1] as const);
    return { duration: reduced ? 0 : 0.65, ease, offsetY: 14 };
  }, [reduced]);
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { duration, ease, offsetY } = useMotionSettings();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("w-full", center ? "text-center" : "text-left")}>
      {eyebrow ? (
        <div className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#0b1220]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-pretty text-[15px] leading-6 text-[#556070]",
            center && "mx-auto max-w-3xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className="min-h-12 rounded-xl bg-[#0D6EFD] px-5 text-[12px] font-semibold tracking-wide text-white shadow-lg shadow-blue-500/15 hover:bg-[#0B5BDA]"
    >
      {children}
    </Button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="min-h-12 rounded-xl border-slate-200 bg-white px-5 text-[12px] font-semibold tracking-wide text-[#0b1220] hover:bg-[#f8fafc]"
    >
      {children}
    </Button>
  );
}

export function LandingPage() {
  const router = useRouter();

  const scrollToSection = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <MotionConfig reducedMotion="never">
      <div className="min-h-full bg-white text-[#0b1220]">
        <main>
          <Hero onNav={scrollToSection} />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <FooterContact />
        </main>

        <div className="md:hidden">
          <BottomCTA onClick={() => router.push("/request?intent=test")} />
        </div>
      </div>
    </MotionConfig>
  );
}

function Hero({ onNav }: { onNav: (id: string) => void }) {
  const router = useRouter();
  return (
    <section className="bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:py-16">
        <div className="grid items-center gap-9 md:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="inline-flex max-w-full items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-[#0D6EFD]">
              Agenda - Patients - Ordonnances - Paiements
            </div>

            <h1 className="mt-5 text-[38px] font-semibold leading-[44px] tracking-tight text-[#0b1220] md:text-[54px] md:leading-[60px]">
              Gerez votre cabinet medical,
              <br />
              simplement.
            </h1>

            <p className="mt-3.5 max-w-[560px] text-[16px] leading-[26px] text-[#556070]">
              Une experience moderne pour les medecins en Algerie : rendez-vous,
              dossiers patients, consultations, ordonnances, paiements et taches
              dans un seul espace.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => router.push("/request?intent=test")}>
                DEMANDER UN TEST
              </PrimaryButton>
              <SecondaryButton onClick={() => onNav("features")}>
                VOIR LES FONCTIONNALITES
              </SecondaryButton>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Prise en main rapide", "Acces securise", "Assistance WhatsApp"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2"
                >
                  <span className="size-[7px] rounded-full bg-[#22c55e]" />
                  <span className="text-[12px] font-semibold text-[#334155]">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ClinicHeroIllustration />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClinicHeroIllustration() {
  const { duration, ease } = useMotionSettings();
  const rows = [
    {
      title: "Accueil du jour",
      value: "18 rendez-vous",
      meta: "4 patients en attente",
      icon: ClipboardList,
      tone: "#0D6EFD",
    },
    {
      title: "Patients suivis",
      value: "124 dossiers actifs",
      meta: "Documents et constantes",
      icon: FolderOpen,
      tone: "#16a34a",
    },
    {
      title: "Paiements",
      value: "6 recus aujourd hui",
      meta: "2 factures a verifier",
      icon: FileText,
      tone: "#f59e0b",
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, ease }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-blue-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[15px] font-semibold text-[#0b1220]">
                Ecran principal du cabinet
              </div>
              <div className="mt-1 text-[13px] leading-5 text-[#64748b]">
                Une interface unifiee pour l accueil, la consultation, les
                documents et les paiements.
              </div>
            </div>
            <div className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700 sm:block">
              En ligne
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {rows.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease, delay: 0.08 + idx * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${item.tone}14`, color: item.tone }}
                >
                  <item.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[#0b1220]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[12px] text-[#64748b]">
                    {item.meta}
                  </div>
                </div>
                <div className="text-right text-[13px] font-semibold text-[#0b1220]">
                  {item.value}
                </div>
              </div>
            </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-start gap-2 md:justify-end">
            {["Accueil", "Dossiers", "Paiements"].map((item) => (
              <div
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-[#0b1220]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <SectionHeader
            center
            title="Tous les modules utiles du cabinet"
            description="Agenda, patients, documents, chat, inventaire, taches et rapports restent dans un seul espace clair pour toute l equipe."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productModules.map((item, index) => (
            <Reveal key={item.title} delay={0.08 + index * 0.06}>
              <div className="h-full rounded-[20px] border border-[rgba(2,6,23,0.10)] bg-white p-4 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.18)]">
                <div
                  className="mb-4 inline-flex size-[44px] items-center justify-center rounded-[15px]"
                  style={{ backgroundColor: `${item.color}14`, color: item.color }}
                >
                  <item.icon className="size-[21px]" />
                </div>
                <div className="text-[15px] font-semibold text-[#0b1220]">
                  {item.title}
                </div>
                <div className="mt-2 text-[13px] leading-[21px] text-[#556070]">
                  {item.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUpNumber({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix?: string;
  start: boolean;
}) {
  const reduced = useReducedMotionConfig();
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    if (reduced) return;
    const durationMs = 900;
    const startT = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startT) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, start, value]);

  return (
    <>
      {(reduced && start ? value : display).toLocaleString("fr-DZ")}
      {suffix ?? ""}
    </>
  );
}

function StatsSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#0D6EFD]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14">
        <Reveal>
          <div className="mx-auto mb-8 max-w-[720px] text-center">
            <div className="text-[12px] font-semibold tracking-widest text-[rgba(255,255,255,0.75)]">
              IMPACT CABINET
            </div>
            <h2 className="mt-2 text-[30px] font-semibold leading-[36px] text-white md:text-[38px] md:leading-[44px]">
              Une base claire pour organiser patients, equipes et cliniques.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={0.1 + idx * 0.06}>
              <div className="h-full rounded-[22px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.10)] p-5 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-[16px] bg-white text-[#0D6EFD]">
                  <s.icon className="size-[22px]" />
                </div>
                <div className="mt-4 text-[44px] font-semibold leading-none text-white">
                  <CountUpNumber value={s.value} suffix={s.suffix} start={inView} />
                </div>
                <div className="mt-2 text-[15px] font-semibold text-white">
                  {s.label}
                </div>
                <div className="mx-auto mt-2 max-w-[260px] text-[13px] leading-[20px] text-[rgba(255,255,255,0.82)]">
                  {s.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[980px] px-5 py-16">
        <Reveal>
          <SectionHeader center eyebrow="AVIS MEDECINS" title="Pense pour les cabinets medicaux en Algerie" />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.name}
                className="rounded-[22px] border border-[rgba(2,6,23,0.10)] bg-[#f8fafc] p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-[#0b1220]">{item.name}</div>
                    <div className="text-[12px]" style={{ color: BRAND.accent }}>
                      {item.specialty}
                    </div>
                  </div>
                </div>

                <div className="text-[13px] leading-[20px] text-[#334155]">{item.text}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingSection() {
  const router = useRouter();
  return (
    <section id="pricing" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <SectionHeader
            center
            eyebrow="TARIFS"
            title="Des offres simples pour demarrer"
            description="Facturation annuelle pour les plans actifs, avec un essai accompagne pour valider le parcours avant activation."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-5 w-fit rounded-full border border-[rgba(13,110,253,0.14)] bg-[rgba(13,110,253,0.08)] px-3.5 py-2 text-[12px] font-semibold text-[#0D6EFD]">
            Tarifs annuels • activation et mise en route incluses
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-6 w-full max-w-[860px] rounded-[20px] border border-[rgba(2,6,23,0.08)] bg-[#f8fafc] p-[18px]">
            <div className="text-[15px] font-semibold text-[#0b1220]">
              Promesse de mise en route
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {["Configuration initiale guidee", "Aide migration des donnees", "Assistance WhatsApp"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[rgba(13,110,253,0.12)] bg-white px-3 py-2.5 text-[12px] font-semibold text-[#0D6EFD]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {pricingPlans.map((plan, idx) => (
            <Reveal key={plan.name} delay={0.14 + idx * 0.06}>
              <div
                className={cn(
                  "flex w-full max-w-[320px] flex-col rounded-[22px] border p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.22)]",
                  "md:w-[272px]",
                  plan.featured
                    ? "border-[rgba(13,110,253,0.35)] bg-[#0D6EFD] text-white"
                    : "border-[rgba(2,6,23,0.10)] bg-[#f8fafc] text-[#0b1220]",
                )}
                style={{ minHeight: 460 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-[46px] items-center justify-center rounded-[16px]",
                      plan.featured ? "bg-[rgba(255,255,255,0.16)]" : "bg-[rgba(13,110,253,0.10)]",
                    )}
                  >
                    <plan.icon className={cn("size-[22px]", plan.featured ? "text-white" : "text-[#0D6EFD]")} />
                  </div>
                  <div className="flex-1">
                    <div className={cn("text-[16px] font-semibold", plan.featured ? "text-white" : "text-[#0b1220]")}>
                      {plan.name}
                    </div>
                    <div className={cn("mt-1 text-[12px]", plan.featured ? "text-[rgba(255,255,255,0.82)]" : "text-[#64748b]")}>
                      {plan.description}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-end gap-2">
                  <div className={cn("text-[34px] font-semibold leading-none", plan.featured ? "text-white" : "text-[#0b1220]")}>
                    {plan.price}
                  </div>
                  <div className={cn("pb-1 text-[12px] font-semibold", plan.featured ? "text-[rgba(255,255,255,0.82)]" : "text-[#64748b]")}>
                    {plan.cadence}
                  </div>
                </div>

                <div className="mt-4 grid flex-1 gap-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className={cn("size-4", plan.featured ? "text-white" : "text-[#16a34a]")} />
                      <div className={cn("text-[13px]", plan.featured ? "text-[rgba(255,255,255,0.92)]" : "text-[#334155]")}>
                        {f}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => {
                      if (plan.name === "Test") router.push("/request?intent=test");
                      else router.push(`/request?intent=plan&plan=${encodeURIComponent(plan.name)}`);
                    }}
                    className={cn(
                      "w-full rounded-[14px] border px-4 py-3 text-[14px] font-semibold",
                      plan.featured
                        ? "border-transparent bg-white text-[#0D6EFD]"
                        : "border-[rgba(13,110,253,0.20)] bg-[#0D6EFD] text-white",
                    )}
                  >
                    {plan.name === "Test" ? "DEMANDER UN TEST" : "CHOISIR CE PLAN"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-9">
          <SectionHeader
            center
            eyebrow="COMPARAISON"
            title="Comparer les plans"
            description="Une vue rapide pour choisir le bon niveau de demarrage pour le cabinet."
          />

          <div className="mt-6 grid gap-3 md:hidden">
            {comparisonPlans.map((planName, planIndex) => (
              <div
                key={planName}
                className={cn(
                  "rounded-[22px] border px-4 py-4 shadow-[0_18px_46px_-36px_rgba(15,23,42,0.16)]",
                  planName === "Clinique"
                    ? "border-[rgba(13,110,253,0.35)] bg-[#0D6EFD] text-white"
                    : "border-[rgba(2,6,23,0.10)] bg-white text-[#0b1220]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-semibold">{planName}</div>
                  {planName === "Clinique" ? (
                    <div className="rounded-full bg-[rgba(255,255,255,0.16)] px-3 py-1 text-[11px] font-semibold text-[rgba(255,255,255,0.92)]">
                      Le plus choisi
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 grid gap-2">
                  {comparisonRows.map((row, rowIndex) => (
                    <div
                      key={`${planName}-${row.label}`}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-[16px] border px-3.5 py-3",
                        planName === "Clinique"
                          ? "border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.10)]"
                          : rowIndex % 2 === 0
                            ? "border-[rgba(2,6,23,0.06)] bg-white"
                            : "border-[rgba(2,6,23,0.06)] bg-[#f8fafc]",
                      )}
                    >
                      <div className={cn("text-[13px] font-semibold", planName === "Clinique" ? "text-white" : "text-[#0b1220]")}>
                        {row.label}
                      </div>
                      <div className={cn("text-[13px]", planName === "Clinique" ? "text-[rgba(255,255,255,0.92)]" : "text-[#334155]")}>
                        {row.values[planIndex]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 hidden md:block">
            <div className="overflow-x-auto rounded-[24px] border border-[rgba(2,6,23,0.08)] bg-white p-3 shadow-[0_18px_46px_-34px_rgba(15,23,42,0.22)]">
              <table className="w-full min-w-[860px] border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="w-[260px] border border-[rgba(2,6,23,0.10)] bg-[#eff6ff] px-4 py-3 text-left font-semibold text-[#0b1220]">
                      Fonction
                    </th>
                    {comparisonPlans.map((head) => (
                      <th
                        key={head}
                        className={cn(
                          "border border-[rgba(2,6,23,0.10)] px-4 py-3 text-left font-semibold",
                          head === "Clinique" ? "bg-[#0D6EFD] text-white" : "bg-[#f8fafc] text-[#0b1220]",
                        )}
                      >
                        <div>{head}</div>
                        {head === "Clinique" ? (
                          <div className="mt-1 text-[11px] font-semibold text-[rgba(255,255,255,0.82)]">Le plus choisi</div>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIndex) => (
                    <tr key={row.label} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}>
                      <td className="border border-[rgba(2,6,23,0.08)] px-4 py-3 font-semibold text-[#0b1220]">
                        {row.label}
                      </td>
                      {row.values.map((value, valueIndex) => {
                        const planName = comparisonPlans[valueIndex];
                        return (
                          <td
                            key={`${row.label}-${valueIndex}`}
                            className={cn(
                              "border border-[rgba(2,6,23,0.08)] px-4 py-3 text-[#334155]",
                              planName === "Clinique" && "bg-[rgba(13,110,253,0.08)]",
                            )}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.34} className="mt-9">
          <SectionHeader
            center
            eyebrow="CONFORMITE"
            title="Preparer un lancement serieux"
            description="Avant les vrais patients, vous avez besoin d un cadre clair : roles, sauvegardes et confidentialite."
          />

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            {complianceHighlights.map((c, idx) => (
              <Reveal key={c.title} delay={0.36 + idx * 0.06}>
                <div className="w-full max-w-[320px] rounded-[22px] border border-[rgba(2,6,23,0.08)] bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-[16px] bg-[rgba(13,110,253,0.10)]">
                      <c.icon className="size-[18px] text-[#0D6EFD]" />
                    </div>
                    <div className="text-[16px] font-semibold text-[#0b1220]">{c.title}</div>
                  </div>
                  <div className="mt-2.5 text-[14px] leading-[22px] text-[#556070]">
                    {c.description}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [active, setActive] = React.useState<number | null>(0);
  const { duration, ease } = useMotionSettings();

  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Les reponses avant la demo."
            description="Un cabinet medical a besoin de confiance avant de mettre ses vrais patients dans un outil."
          />
          <div className="mt-6 rounded-[20px] border border-[rgba(2,6,23,0.08)] bg-[#f8fafc] p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#0D6EFD]" />
              <div className="text-[14px] font-semibold text-[#0b1220]">
                Roles, sauvegardes et confidentialite
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-[22px] text-[#556070]">
              Gardez un cadre clair pour le lancement, avec des acces separes et
              une mise en route accompagnee.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3">
          {faqItems.map((f, idx) => {
            const open = active === idx;
            return (
              <Reveal key={f.question} delay={0.04 + idx * 0.04}>
                <div className="overflow-hidden rounded-[20px] border border-[rgba(2,6,23,0.10)] bg-white">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setActive(open ? null : idx)}
                  >
                    <div className="text-[15px] font-semibold text-[#0b1220]">
                      {f.question}
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-[#64748b] transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: open ? "auto" : 0,
                      opacity: open ? 1 : 0,
                    }}
                    transition={{ duration: duration ? 0.25 : 0, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-[14px] leading-[22px] text-[#556070]">
                      {f.answer}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterContact() {
  const whatsappPhone = getWhatsAppPhoneDigits();
  return (
    <footer id="contact" className="scroll-mt-24 bg-[#0b1220] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="text-[26px] font-semibold">MyDoctor</div>
              <div className="mt-3 max-w-[520px] text-[14px] leading-[22px] text-[#94a3b8]">
                Une experience moderne pour les medecins : agenda, dossiers, ordonnances et paiements.
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="text-[20px] font-semibold">Contact</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "WhatsApp",
                        value: whatsappPhone ? `+${whatsappPhone}` : "Renseigner NEXT_PUBLIC_WHATSAPP_PHONE",
                      },
                      { label: "E-mail", value: "Adresse commerciale a renseigner" },
                      { label: "Onboarding", value: "Contact mise en route a renseigner" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3.5 py-3"
                      >
                        <div className="text-[12px] font-semibold text-white">{item.label}</div>
                        <div className="mt-1 text-[13px] text-[#94a3b8]">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => (window.location.href = "/request?intent=test")}
                      className="rounded-[14px] bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold text-white"
                    >
                      Demander un test
                    </button>
                    <button
                      onClick={() => (window.location.href = "/request?intent=plan&plan=Pro")}
                      className="rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-[12px] font-semibold text-white"
                    >
                      Demander activation (Pro)
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[14px] font-semibold">Liens</div>
                  <div className="mt-3 grid gap-2">
                    {trustLinks.map((name) => (
                      <div
                        key={name}
                        className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-[12px] font-semibold text-[#cbd5e1]"
                      >
                        {name}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-[14px] font-semibold">Reseaux</div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {["Facebook", "Instagram", "X"].map((name) => (
                      <div
                        key={name}
                        className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(13,110,253,0.18)] px-3 py-2 text-[12px] font-semibold text-white"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-6 text-[13px] text-[#94a3b8]">
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <div>© 2026 MyDoctor. Tous droits reserves.</div>
            <div className="text-[#cbd5e1]">Besoin d un devis ? Ecrivez-nous sur WhatsApp.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BottomCTA({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(11,18,32,0.96)] p-3 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold">Activez votre cabinet</div>
          <div className="mt-1 text-[12px] text-[rgba(255,255,255,0.72)]">
            Demandez un essai et commencez votre mise en route.
          </div>
        </div>
        <button
          onClick={onClick}
          className="rounded-[12px] bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold"
        >
          DEMANDER TEST
        </button>
      </div>
    </div>
  );
}
