"use client";

import * as React from "react";
import { MotionConfig, motion, useInView, useReducedMotionConfig } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileLock2,
  FolderOpen,
  Heart,
  Image as ImageIcon,
  Key,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BRAND = {
  name: "MedSync",
  accent: "#0D6EFD",
};

const navItems = [
  { label: "Fonctionnalites", id: "features" },
  { label: "Avis medecins", id: "testimonials" },
  { label: "Tarifs", id: "pricing" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
] as const;

const productScreens = [
  {
    title: "Agenda et file d attente",
    subtitle: "Vue reception + medecin pour la journee en cours",
    accent: "#0D6EFD",
    metrics: ["18 rendez-vous", "4 patients en attente", "2 rappels envoyes"],
  },
  {
    title: "Dossier patient complet",
    subtitle: "Constantes, antecedents, consultation et documents",
    accent: "#16a34a",
    metrics: ["Antecedents", "Mesures vitales", "Ordonnances PDF"],
  },
  {
    title: "Paiements et services",
    subtitle: "Facturation simple avec suivi des actes et recus",
    accent: "#f59e0b",
    metrics: ["6 paiements recus", "2 impayes", "Journal du jour"],
  },
] as const;

const features = [
  {
    title: "Agenda du medecin",
    description:
      "Une vue claire pour les rendez-vous, les passages spontanes et les suivis.",
    icon: Calendar,
  },
  {
    title: "Dossiers patients",
    description:
      "Historique, constantes, consultations et documents retrouves rapidement.",
    icon: FolderOpen,
  },
  {
    title: "Facturation simple",
    description:
      "Suivez les actes, factures, paiements recus et montants en attente.",
    icon: Building2,
  },
  {
    title: "Ordonnances PDF",
    description: "Imprimez ordonnances, lettres et documents avec en-tete du cabinet.",
    icon: FileLock2,
  },
] as const;

const specialties = [
  "Medecine generale",
  "Pediatrie",
  "Orthopedie",
  "Ophtalmologie",
  "Cardiologie",
  "Urologie",
  "Dermatologie",
  "Neurologie",
] as const;

const specialtyCards = [
  {
    title: "Dentisterie",
    description: "Suivi soins, actes, odontogramme et historique de traitement.",
    icon: Stethoscope,
    tags: ["Odontogramme", "Actes", "Historique"],
  },
  {
    title: "Dermatologie",
    description: "Photos, suivi de lesions et comparaisons avant/apres.",
    icon: ImageIcon,
    tags: ["Photos", "Suivi lesions", "Comparaison"],
  },
  {
    title: "Cardiologie",
    description: "Observations cliniques, suivi tension et consultation structuree.",
    icon: Heart,
    tags: ["Constantes", "Observation", "Suivi"],
  },
  {
    title: "Gynecologie",
    description: "Formulaires specialises, historique et parcours de consultation.",
    icon: BadgeCheck,
    tags: ["Formulaire", "Historique", "Parcours"],
  },
] as const;

const stats = [
  { value: 120, suffix: "+", label: "Cabinets cibles" },
  { value: 35000, suffix: "+", label: "Patients organises" },
  { value: 300, suffix: "+", label: "Medecins a servir" },
] as const;

const testimonials = [
  {
    name: "Dr. Amina B.",
    specialty: "Medecine generale",
    text: "Le workflow reste simple pour un cabinet solo tout en gardant les notes, paiements et suivis bien organises.",
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
    specialty: "Urology",
    text: "Une alternative moderne aux logiciels locaux, surtout quand on veut acces web et sauvegarde.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Dr. Nesrine T.",
    specialty: "Cardiology",
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
      "Support prioritaire",
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
  { label: "Support + onboarding", values: ["WhatsApp", "Prioritaire", "Prioritaire + migration", "Guide"] },
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
      "Oui. Le lancement doit inclure une configuration guidee et un support WhatsApp pour les cabinets pilotes.",
  },
  {
    question: "Est-ce reserve aux grandes cliniques ?",
    answer:
      "Non. Le workflow principal est pense d abord pour un medecin seul dans un cabinet prive.",
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

type NavId = (typeof navItems)[number]["id"];

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
      className="h-12 rounded-xl bg-[#0D6EFD] px-[18px] text-[12px] font-semibold tracking-wide text-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] hover:bg-[#0B5BDA]"
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
      className="h-12 rounded-xl border-[rgba(2,6,23,0.10)] bg-white px-[18px] text-[12px] font-semibold tracking-wide text-[#0b1220] hover:bg-[#f8fafc]"
    >
      {children}
    </Button>
  );
}

export function LandingPage() {
  const [activeNav, setActiveNav] = React.useState<NavId>("features");
  const sectionsRef = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    for (const el of elements) sectionsRef.current[el.id] = el;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveNav(visible.target.id as NavId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.05, 0.1, 0.2] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <MotionConfig reducedMotion="never">
      <div className="min-h-full bg-white text-[#0b1220]">
        <Header activeNav={activeNav} onNav={scrollToSection} />

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
          <BottomCTA onClick={() => scrollToSection("pricing")} />
        </div>
      </div>
    </MotionConfig>
  );
}

function Header({
  activeNav,
  onNav,
}: {
  activeNav: string;
  onNav: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)] backdrop-blur-[10px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[22px] font-semibold" style={{ color: BRAND.accent }}>
            {BRAND.name}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  className={cn(
                    "rounded-full border px-2.5 py-2 text-[13px] font-semibold transition-colors",
                    isActive
                      ? "border-[rgba(13,110,253,0.18)] bg-[rgba(13,110,253,0.10)] text-[#0D6EFD]"
                      : "border-transparent bg-transparent text-[#334155] hover:bg-[#f8fafc]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="w-2.5" />

            <SecondaryButton onClick={() => {}}>CONNEXION</SecondaryButton>
            <PrimaryButton onClick={() => {}}>ESSAI GRATUIT</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section className="bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <div className="flex flex-col items-center gap-7 md:flex-row">
          <Reveal className="w-full flex-1">
            <div className="inline-flex items-center rounded-full border border-[rgba(13,110,253,0.20)] bg-[rgba(13,110,253,0.10)] px-3 py-2 text-xs font-semibold text-[#0D6EFD]">
              Agenda - Patients - Ordonnances - Paiements
            </div>

            <h1 className="mt-4 text-[40px] font-semibold leading-[46px] tracking-tight text-[#0b1220] md:text-[52px] md:leading-[58px]">
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
              <PrimaryButton onClick={() => {}}>OBTENIR UNE CLE ESSAI</PrimaryButton>
              <SecondaryButton onClick={() => onNav("features")}>
                VOIR LES FONCTIONNALITES
              </SecondaryButton>
            </div>

            <div className="mt-5 flex flex-wrap gap-[18px]">
              {["Prise en main rapide", "Acces securise", "Support WhatsApp"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-full border border-[rgba(2,6,23,0.06)] bg-[rgba(2,6,23,0.04)] px-2.5 py-2"
                >
                  <span className="size-[7px] rounded-full bg-[#22c55e]" />
                  <span className="text-[12px] font-semibold text-[#334155]">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="w-full flex-1">
            <ClinicHeroIllustration />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClinicHeroIllustration() {
  const { duration, ease } = useMotionSettings();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, ease }}
      className="w-full"
    >
      <div className="relative rounded-[22px] border border-[rgba(2,6,23,0.10)] bg-white p-[18px] shadow-[0_20px_50px_-35px_rgba(0,0,0,0.25)]">
        <div className="text-[15px] font-semibold text-[#0b1220]">
          Ecran principal du cabinet
        </div>
        <div className="mt-1.5 text-[13px] text-[#64748b]">
          Une interface unifiee pour l accueil, la consultation, les documents et
          les paiements.
        </div>

        <div className="mt-4 grid gap-3">
          {[
            { title: "Accueil du jour", value: "18 rendez-vous", tone: "#0D6EFD" },
            { title: "Patients suivis", value: "124 dossiers actifs", tone: "#16a34a" },
            { title: "Paiements", value: "6 recus aujourd hui", tone: "#f59e0b" },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease, delay: 0.08 + idx * 0.06 }}
              className="rounded-[16px] border border-[rgba(2,6,23,0.08)] bg-[rgba(248,250,252,0.96)] p-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-[#0b1220]">
                  {item.title}
                </div>
                <div
                  className="size-[10px] rounded-full"
                  style={{ backgroundColor: item.tone }}
                />
              </div>
              <div className="mt-2 text-[12px] text-[#64748b]">{item.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-[rgba(13,110,253,0.10)] blur-2xl md:block" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full bg-[rgba(34,197,94,0.10)] blur-2xl md:block" />

        <div className="mt-4 flex justify-start gap-2 md:justify-end">
          <div className="rounded-full border border-[rgba(2,6,23,0.06)] bg-white px-3 py-2 text-[12px] font-semibold text-[#0b1220]">
            Accueil
          </div>
          <div className="rounded-full border border-[rgba(2,6,23,0.06)] bg-white px-3 py-2 text-[12px] font-semibold text-[#0b1220]">
            Dossiers
          </div>
          <div className="rounded-full border border-[rgba(2,6,23,0.06)] bg-white px-3 py-2 text-[12px] font-semibold text-[#0b1220]">
            Paiements
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
            title="Better than a simple desktop cabinet tool"
            description="Keep the familiar clean design, but add the cloud workflow, solo-doctor focus, and launch-ready operations your market needs."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {productScreens.map((item, index) => (
            <Reveal key={item.title} delay={0.08 + index * 0.06}>
              <div className="rounded-[24px] border border-[rgba(2,6,23,0.08)] bg-white p-[18px] shadow-[0_16px_36px_-28px_rgba(0,0,0,0.22)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[16px] font-semibold text-[#0b1220]">
                        {item.title}
                      </div>
                      <div className="mt-1 text-[12px] text-[#64748b]">
                        {item.subtitle}
                      </div>
                    </div>
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.accent }} />
                  </div>

                  <div className="mt-[18px] grid gap-2.5 rounded-[20px] border border-[rgba(2,6,23,0.06)] bg-[#f8fafc] p-4">
                    {item.metrics.map((metric, metricIndex) => (
                      <div
                        key={metric}
                        className={cn(
                          "rounded-[14px] border border-[rgba(2,6,23,0.06)] px-3 py-2.5 text-[12px] font-semibold text-[#0b1220]",
                          metricIndex === 0 ? "bg-[rgba(13,110,253,0.08)]" : "bg-white",
                        )}
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          {features.map((f, idx) => (
            <Reveal key={f.title} delay={0.12 + idx * 0.06}>
              <div className="w-[292px] rounded-[20px] border border-[rgba(2,6,23,0.10)] bg-white p-4 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.22)]">
                <div className="mb-3 inline-flex size-[42px] items-center justify-center rounded-[14px] border border-[rgba(13,110,253,0.18)] bg-[rgba(13,110,253,0.10)]">
                  <f.icon className="size-[21px]" style={{ color: BRAND.accent }} />
                </div>
                <div className="text-[16px] font-semibold text-[#0b1220]">
                  {f.title}
                </div>
                <div className="mt-2 text-[14px] leading-[22px] text-[#556070]">
                  {f.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.36} className="mt-9">
          <SectionHeader
            center
            eyebrow="SPECIALITES"
            title="Adapte aux specialites courantes"
            description="Le meme workflow de base, avec des espaces specialises quand le cabinet en a besoin."
          />

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {specialties.map((s) => (
              <div
                key={s}
                className="rounded-full border border-[rgba(13,110,253,0.14)] bg-[rgba(13,110,253,0.08)] px-3.5 py-2.5 text-[13px] font-semibold text-[#0D6EFD]"
              >
                {s}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.42} className="mt-9">
          <SectionHeader
            center
            eyebrow="APERCUS"
            title="Previews specialises"
            description="Chaque specialite garde le meme socle produit, avec les outils dont la consultation a besoin."
          />

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            {specialtyCards.map((card, idx) => (
              <Reveal key={card.title} delay={0.44 + idx * 0.06}>
                <div className="w-full max-w-[320px] rounded-[22px] border border-[rgba(2,6,23,0.08)] bg-white p-5 md:w-[272px]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[18px] font-semibold text-[#0b1220]">
                      {card.title}
                    </div>
                    <div className="inline-flex size-10 items-center justify-center rounded-[16px] bg-[rgba(13,110,253,0.10)]">
                      <card.icon className="size-[18px] text-[#0D6EFD]" />
                    </div>
                  </div>
                  <div className="mt-2.5 text-[14px] leading-[22px] text-[#556070]">
                    {card.description}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <div
                        key={t}
                        className="rounded-full border border-[rgba(2,6,23,0.08)] bg-[#f8fafc] px-3 py-2 text-[12px] font-semibold text-[#0b1220]"
                      >
                        {t}
                      </div>
                    ))}
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
      <div className="mx-auto w-full max-w-[1200px] px-5 py-12">
        <div className="flex flex-wrap justify-around gap-6">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={0.1 + idx * 0.06}>
              <div className="text-center">
                <div className="text-[44px] font-semibold leading-none text-white">
                  <CountUpNumber value={s.value} suffix={s.suffix} start={inView} />
                </div>
                <div className="mt-2 text-[14px] text-[rgba(255,255,255,0.92)]">
                  {s.label}
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
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);

  const [step, setStep] = React.useState(352 + 12);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-testimonial-card]");
    if (!firstCard) return;

    const measure = () => {
      const width = Math.round(firstCard.getBoundingClientRect().width);
      if (width) setStep(width + 12);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(firstCard);
    return () => ro.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    const next = Math.max(0, Math.min(index, testimonials.length - 1));
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: next * step, behavior: "smooth" });
    setActive(next);
  };

  return (
    <section id="testimonials" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <SectionHeader center eyebrow="AVIS MEDECINS" title="Pense pour les cabinets medicaux en Algerie" />
        </Reveal>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-[13px] text-[#64748b]">
            Parcourez les retours des medecins avec les fleches ou en glissant horizontalement.
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              className={cn(
                "flex size-[42px] items-center justify-center rounded-full border border-[rgba(2,6,23,0.10)]",
                active === 0 ? "bg-[#f8fafc] text-[#94a3b8]" : "bg-white text-[#0b1220]",
              )}
            >
              <ArrowLeft className="size-[18px]" />
            </button>
            <button
              onClick={() => scrollTo(active + 1)}
              disabled={active === testimonials.length - 1}
              className={cn(
                "flex size-[42px] items-center justify-center rounded-full border",
                active === testimonials.length - 1
                  ? "border-[rgba(2,6,23,0.10)] bg-[#f8fafc] text-[#94a3b8]"
                  : "border-[rgba(13,110,253,0.20)] bg-[#0D6EFD] text-white",
              )}
            >
              <ArrowRight className="size-[18px]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onScroll={(e) => {
            const x = (e.target as HTMLDivElement).scrollLeft;
            const next = Math.round(x / step);
            if (next !== active) setActive(next);
          }}
        >
          <div className="flex w-max gap-3 pr-2">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={0.12 + index * 0.06}>
                <div
                  data-testimonial-card
                  className={cn(
                    "rounded-[24px] border border-[rgba(2,6,23,0.10)] bg-[#f8fafc] p-5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.22)]",
                    "w-[352px] md:w-[432px]",
                  )}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-semibold text-[#0b1220]">
                        {item.name}
                      </div>
                      <div className="text-[13px]" style={{ color: BRAND.accent }}>
                        {item.specialty}
                      </div>
                    </div>
                  </div>

                  <div className="text-[14px] leading-[22px] text-[#334155]">
                    {item.text}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((t, index) => (
              <button
                key={t.name}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  active === index ? "w-7 bg-[#0D6EFD]" : "w-2 bg-[rgba(13,110,253,0.22)]",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <SectionHeader
            center
            eyebrow="TARIFS"
            title="Des offres simples pour demarrer"
            description="Facturation annuelle pour les plans actifs, avec un essai accompagne pour valider le workflow avant activation."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-5 w-fit rounded-full border border-[rgba(13,110,253,0.14)] bg-[rgba(13,110,253,0.08)] px-3.5 py-2 text-[12px] font-semibold text-[#0D6EFD]">
            Tarifs annuels • activation et onboarding inclus
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-6 w-full max-w-[860px] rounded-[20px] border border-[rgba(2,6,23,0.08)] bg-[#f8fafc] p-[18px]">
            <div className="text-[15px] font-semibold text-[#0b1220]">
              Promesse onboarding
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {["Setup initial guide", "Aide migration des donnees", "Support WhatsApp"].map((item) => (
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
            <div className="rounded-[24px] border border-[rgba(2,6,23,0.08)] bg-white p-3 shadow-[0_18px_46px_-34px_rgba(15,23,42,0.22)]">
              <div className="mb-2 flex gap-2.5">
                {["Fonction", ...comparisonPlans].map((head, index) => (
                  <div
                    key={head}
                    className={cn(
                      "rounded-[18px] border px-3.5 py-4",
                      index === 0 ? "w-[260px]" : "w-[150px]",
                      head === "Clinique"
                        ? "border-[rgba(13,110,253,0.35)] bg-[#0D6EFD] text-white"
                        : "border-[rgba(2,6,23,0.08)] bg-[#f8fafc] text-[#0b1220]",
                      index === 0 && "bg-[#eff6ff]",
                    )}
                  >
                    <div className="text-[13px] font-semibold">{head}</div>
                    {head === "Clinique" ? (
                      <div className="mt-1 text-[11px] text-[rgba(255,255,255,0.82)]">Le plus choisi</div>
                    ) : null}
                  </div>
                ))}
              </div>

              {comparisonRows.map((row, rowIndex) => (
                <div key={row.label} className={cn("flex gap-2.5", rowIndex === 0 ? "" : "mt-2.5")}>
                  <div
                    className={cn(
                      "w-[260px] rounded-[18px] border border-[rgba(2,6,23,0.06)] px-3.5 py-4",
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                    )}
                  >
                    <div className="text-[13px] font-semibold text-[#0b1220]">{row.label}</div>
                  </div>
                  {row.values.map((value, valueIndex) => (
                    <div
                      key={`${row.label}-${valueIndex}`}
                      className={cn(
                        "w-[150px] rounded-[18px] border border-[rgba(2,6,23,0.06)] px-3.5 py-4",
                        rowIndex % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                      )}
                    >
                      <div className="text-[13px] text-[#334155]">{value}</div>
                    </div>
                  ))}
                </div>
              ))}
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
    <section id="faq" className="scroll-mt-24 bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16">
        <Reveal>
          <SectionHeader
            center
            eyebrow="FAQ"
            title="Questions frequentes"
            description="Les reponses essentielles avant de demarrer."
          />
        </Reveal>

        <div className="mx-auto mt-8 grid w-full max-w-[860px] gap-3">
          {faqItems.map((f, idx) => {
            const open = active === idx;
            return (
              <div
                key={f.question}
                className="rounded-[20px] border border-[rgba(2,6,23,0.10)] bg-white"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setActive(open ? null : idx)}
                >
                  <div className="text-[15px] font-semibold text-[#0b1220]">
                    {f.question}
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 text-[#64748b] transition-transform",
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterContact() {
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
                      { label: "WhatsApp", value: "Numero onboarding a renseigner" },
                      { label: "Email", value: "Email commercial a renseigner" },
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
            Demandez un essai et commencez votre onboarding.
          </div>
        </div>
        <button
          onClick={onClick}
          className="rounded-[12px] bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold"
        >
          ESSAI GRATUIT
        </button>
      </div>
    </div>
  );
}
