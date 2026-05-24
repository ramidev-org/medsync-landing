import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";

const processSteps = [
  {
    title: "Demande initiale",
    text: "Le cabinet choisit un test ou une offre, puis partage ses informations de contact.",
  },
  {
    title: "Validation commerciale",
    text: "Nous confirmons le besoin, le plan adapte, le prix et les etapes de mise en route.",
  },
  {
    title: "Activation accompagnee",
    text: "L'espace est prepare avec les bons roles, les premiers reglages et un canal d'assistance clair.",
  },
] as const;

const principles = [
  "Acces encadre avant toute utilisation reelle",
  "Confirmation humaine avant achat ou activation",
  "Mise en route progressive pour eviter les erreurs de configuration",
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0b1220]">
      <div className="mx-auto w-full max-w-[1040px] px-5 py-8 md:py-12">
        <header className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(2,6,23,0.08)] bg-white px-4 py-3">
          <Link href="/" className="text-[20px] font-semibold text-[#0D6EFD]">
            MedSync
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(2,6,23,0.10)] bg-white px-3.5 py-2.5 text-[12px] font-semibold text-[#0b1220] hover:bg-[#f8fafc]"
          >
            <ArrowLeft className="size-4" />
            Retour au site
          </Link>
        </header>

        <section className="grid gap-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#64748b]">A PROPOS</div>
            <h1 className="mt-3 max-w-[720px] text-balance text-[36px] font-semibold leading-[42px] md:text-[44px] md:leading-[50px]">
              Une solution medicale activee avec accompagnement.
            </h1>
            <p className="mt-4 max-w-[700px] text-[16px] leading-[26px] text-[#475569]">
              MedSync aide les cabinets medicaux a organiser les rendez-vous, les dossiers patients, les
              ordonnances, les paiements et les taches du quotidien. L&apos;acces n&apos;est pas ouvert directement:
              chaque demande passe par une confirmation pour proteger les donnees et preparer une mise en route
              propre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/request?intent=test"
                className="rounded-lg bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold tracking-wide text-white hover:bg-[#0B5BDA]"
              >
                Demander un test
              </Link>
              <Link
                href="/request?intent=plan"
                className="rounded-lg border border-[rgba(2,6,23,0.10)] bg-white px-4 py-3 text-[12px] font-semibold text-[#0b1220] hover:bg-[#f8fafc]"
              >
                Choisir une offre
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-[rgba(2,6,23,0.08)] bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[rgba(13,110,253,0.10)]">
                <ShieldCheck className="size-5 text-[#0D6EFD]" />
              </div>
              <div>
                <div className="text-[15px] font-semibold">Approche privee SaaS</div>
                <div className="mt-1 text-[13px] text-[#64748b]">Test, validation, activation.</div>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {principles.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-[14px] leading-[22px] text-[#334155]">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-xl border border-[rgba(2,6,23,0.08)] bg-white p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#64748b]">PROCESSUS</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Comment nous demarrons avec un cabinet</h2>
            </div>
            <div className="max-w-[420px] text-[13px] leading-[20px] text-[#64748b]">
              Un parcours court, clair, et verifie avant de manipuler des donnees reelles.
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {processSteps.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-[rgba(2,6,23,0.08)] bg-[#f8fafc] p-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(13,110,253,0.10)] text-[13px] font-semibold text-[#0D6EFD]">
                  {index + 1}
                </div>
                <div className="mt-4 text-[15px] font-semibold">{item.title}</div>
                <div className="mt-2 text-[14px] leading-[22px] text-[#475569]">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[rgba(13,110,253,0.18)] bg-[rgba(13,110,253,0.06)] p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#0D6EFD]">
                <MessageCircle className="size-4" />
                Contact accompagne
              </div>
              <p className="mt-2 max-w-[680px] text-[14px] leading-[22px] text-[#475569]">
                Pour un test ou un achat, laissez vos informations. Nous vous recontactons pour confirmer les
                details avant toute activation.
              </p>
            </div>
            <Link
              href="/request?intent=plan"
              className="w-fit rounded-lg bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold text-white hover:bg-[#0B5BDA]"
            >
              Lancer une demande
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

