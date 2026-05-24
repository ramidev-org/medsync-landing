"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle, Send } from "lucide-react";

import { buildLeadMessage, buildWhatsAppUrl, type LeadFormData } from "@/lib/whatsapp";

const PLANS = ["Medecin solo", "Clinique", "Pro"] as const;

function sanitizeText(value: string) {
  return value.trim();
}

export function RequestForm() {
  const params = useSearchParams();
  const initialIntent = (params.get("intent") ?? "test") === "plan" ? "plan" : "test";
  const initialPlan = params.get("plan") ?? "";

  const [status, setStatus] = React.useState<"idle" | "submitted">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<LeadFormData>(() => ({
    fullName: "",
    clinicName: "",
    city: "",
    phone: "",
    email: "",
    intent: initialIntent,
    planName: initialIntent === "plan" ? initialPlan : "",
    notes: "",
  }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullName = sanitizeText(form.fullName);
    const clinicName = sanitizeText(form.clinicName);
    const phone = sanitizeText(form.phone);

    if (!fullName) return setError("Veuillez entrer votre nom complet.");
    if (!clinicName) return setError("Veuillez entrer le nom du cabinet / clinique.");
    if (!phone) return setError("Veuillez entrer un numero de telephone.");
    if (form.intent === "plan" && !sanitizeText(form.planName ?? "")) {
      return setError("Veuillez choisir une offre.");
    }

    const payload: LeadFormData = {
      ...form,
      fullName,
      clinicName,
      phone,
      city: sanitizeText(form.city ?? ""),
      email: sanitizeText(form.email ?? ""),
      notes: sanitizeText(form.notes ?? ""),
      planName: sanitizeText(form.planName ?? ""),
    };

    const message = buildLeadMessage(payload);
    const url = buildWhatsAppUrl(message);

    if (!url) {
      setError("WhatsApp n'est pas configure. Renseignez NEXT_PUBLIC_WHATSAPP_PHONE puis reessayez.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("submitted");
  };

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

        <div className="mt-8 grid gap-6 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <aside className="rounded-xl border border-[rgba(2,6,23,0.08)] bg-white p-5 md:sticky md:top-6">
              <div className="text-xs font-semibold tracking-widest text-[#64748b]">DEMANDE D&apos;ACCES</div>
              <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
                {form.intent === "test" ? "Demander un test" : "Choisir une offre"}
              </h1>
              <p className="mt-3 text-[14px] leading-[22px] text-[#556070]">
                Remplissez vos informations. Nous vous contactons ensuite pour confirmer l&apos;achat, programmer le test
                ou preparer la mise en route.
              </p>

              <div className="mt-5 grid gap-2" aria-label="Type de demande">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, intent: "test", planName: "" }))}
                  className={[
                    "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[13px] font-semibold",
                    form.intent === "test"
                      ? "border-[rgba(13,110,253,0.28)] bg-[rgba(13,110,253,0.08)] text-[#0D6EFD]"
                      : "border-[rgba(2,6,23,0.10)] bg-white text-[#0b1220] hover:bg-[#f8fafc]",
                  ].join(" ")}
                >
                  <span>Demander un test (10 jours)</span>
                  {form.intent === "test" ? <CheckCircle2 className="size-4" /> : null}
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, intent: "plan" }))}
                  className={[
                    "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[13px] font-semibold",
                    form.intent === "plan"
                      ? "border-[rgba(13,110,253,0.28)] bg-[rgba(13,110,253,0.08)] text-[#0D6EFD]"
                      : "border-[rgba(2,6,23,0.10)] bg-white text-[#0b1220] hover:bg-[#f8fafc]",
                  ].join(" ")}
                >
                  <span>Choisir une offre</span>
                  {form.intent === "plan" ? <CheckCircle2 className="size-4" /> : null}
                </button>
              </div>

              <div className="mt-5 rounded-lg border border-[rgba(13,110,253,0.14)] bg-[rgba(13,110,253,0.06)] p-4">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0D6EFD]">
                  <MessageCircle className="size-4" />
                  Contact apres validation
                </div>
                <div className="mt-2 text-[13px] leading-[20px] text-[#556070]">
                  Votre demande est envoyee avec vos coordonnees afin de vous recontacter et confirmer les details.
                </div>
              </div>
            </aside>
          </div>

          <div className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-[rgba(2,6,23,0.08)] bg-white p-5 md:p-6"
            >
              <div className="mb-5">
                <div className="text-xs font-semibold tracking-widest text-[#64748b]">INFORMATIONS CLIENT</div>
                <div className="mt-1 text-[14px] leading-[22px] text-[#556070]">
                  Les champs marques d&apos;un asterisque sont obligatoires.
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Nom complet"
                  required
                  value={form.fullName}
                  onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
                  placeholder="Ex: Dr. Ahmed Benali"
                />
                <Field
                  label="Cabinet / Clinique"
                  required
                  value={form.clinicName}
                  onChange={(v) => setForm((p) => ({ ...p, clinicName: v }))}
                  placeholder="Ex: Cabinet El Amal"
                />
                <Field
                  label="Ville"
                  value={form.city ?? ""}
                  onChange={(v) => setForm((p) => ({ ...p, city: v }))}
                  placeholder="Ex: Alger"
                />
                <Field
                  label="Telephone"
                  required
                  value={form.phone}
                  onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                  placeholder="Ex: +213..."
                />
                <Field
                  label="Adresse e-mail"
                  value={form.email ?? ""}
                  onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  placeholder="Ex: nom@cabinet.com"
                />

                {form.intent === "plan" ? (
                  <div className="grid gap-1.5">
                    <div className="text-[12px] font-semibold text-[#0b1220]">
                      Offre <span className="text-[#0D6EFD]">*</span>
                    </div>
                    <select
                      value={form.planName ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, planName: e.target.value }))}
                      className="h-11 w-full rounded-lg border border-[rgba(2,6,23,0.10)] bg-white px-3 text-[13px] outline-none focus:border-[rgba(13,110,253,0.30)]"
                    >
                      <option value="" disabled>
                        Selectionner une offre
                      </option>
                      {PLANS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>

              <div className="mt-4 grid gap-1.5">
                <div className="text-[12px] font-semibold text-[#0b1220]">Notes (optionnel)</div>
                <textarea
                  value={form.notes ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[rgba(2,6,23,0.10)] bg-white p-3 text-[13px] outline-none focus:border-[rgba(13,110,253,0.30)]"
                  placeholder="Ex: specialite, nombre de postes, besoin de migration..."
                />
              </div>

              {error ? (
                <div className="mt-4 rounded-lg border border-[rgba(220,38,38,0.22)] bg-[rgba(220,38,38,0.06)] px-4 py-3 text-[13px] text-[#b91c1c]">
                  {error}
                </div>
              ) : null}

              {status === "submitted" ? (
                <div className="mt-4 rounded-lg border border-[rgba(34,197,94,0.22)] bg-[rgba(34,197,94,0.06)] px-4 py-3 text-[13px] text-[#166534]">
                  Message WhatsApp ouvert. Si rien ne s&apos;ouvre, verifiez la configuration ou votre navigateur.
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0D6EFD] px-4 py-3 text-[12px] font-semibold tracking-wide text-white hover:bg-[#0B5BDA]"
                >
                  <Send className="size-4" />
                  Envoyer la demande
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg border border-[rgba(2,6,23,0.10)] bg-white px-4 py-3 text-[12px] font-semibold text-[#0b1220] hover:bg-[#f8fafc]"
                >
                  <ArrowLeft className="size-4" />
                  Retour
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="text-[12px] font-semibold text-[#0b1220]">
        {label} {required ? <span className="text-[#0D6EFD]">*</span> : null}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[rgba(2,6,23,0.10)] bg-white px-3 text-[13px] outline-none focus:border-[rgba(13,110,253,0.30)]"
      />
    </div>
  );
}
