"use client";

import * as React from "react";
import { MotionConfig, motion, useInView, useReducedMotionConfig } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Archive,
  BarChart3,
  Building2,
  CircleMinus,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FlaskConical,
  FileLock2,
  FileText,
  CreditCard,
  Wallet,
  ReceiptText,
  BellRing,
  CalendarClock,
  ScanText,
  Activity,
  Pill,
  Syringe,
  FolderOpen,
  Headset,
  Key,
  ListTodo,
  LockKeyhole,
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
import { ModulesSection } from "@/components/landing/sections/modules-section";
import { ReviewsSection } from "@/components/landing/sections/reviews-section";
import { PricingSectionStandalone } from "@/components/landing/sections/pricing-section";

const BRAND = {
  name: "MedSync",
  accent: "#0D6EFD",
};


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
          <ModulesSection />
          <StatsSection />
          <ReviewsSection />
          <PricingSectionStandalone />
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
              <Image
                src="/assets/images/medsync-logo.svg"
                alt="MedSync"
                width={220}
                height={56}
                className="h-12 w-auto"
              />
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
            <div>Â© 2026 MedSync. Tous droits reserves.</div>
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
