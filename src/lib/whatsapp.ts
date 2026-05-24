const CONTACT = {
  whatsappPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "",
} as const;

export function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function getWhatsAppPhoneDigits() {
  return normalizePhoneNumber(CONTACT.whatsappPhone);
}

export function buildWhatsAppUrl(message: string) {
  const phone = getWhatsAppPhoneDigits();
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildTestMessage() {
  return [
    "Bonjour MedSync,",
    "Je souhaite demander un test (10 jours) pour mon cabinet.",
    "Pouvez-vous me confirmer les etapes de mise en route ?",
  ].join("\n");
}

export function buildPlanMessage(planName: string) {
  return [
    "Bonjour MedSync,",
    `Je souhaite choisir le plan: ${planName}.`,
    "Pouvez-vous me confirmer le prix, l'activation, et les étapes de mise en route ?",
  ].join("\n");
}

export type LeadFormData = {
  fullName: string;
  clinicName: string;
  city?: string;
  phone: string;
  email?: string;
  intent: "test" | "plan";
  planName?: string;
  notes?: string;
};

export function buildLeadMessage(data: LeadFormData) {
  const header =
    data.intent === "test"
      ? "Je souhaite demander un test (10 jours)."
      : `Je souhaite choisir le plan: ${data.planName ?? "-"}.`;

  return [
    "Bonjour MedSync,",
    header,
    "",
    `Nom: ${data.fullName}`,
    `Cabinet/Clinique: ${data.clinicName}`,
    data.city ? `Ville: ${data.city}` : null,
    `Telephone: ${data.phone}`,
    data.email ? `E-mail: ${data.email}` : null,
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
