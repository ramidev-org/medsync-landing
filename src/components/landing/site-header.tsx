"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Avis", href: "/#testimonials" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "A propos", href: "/about" },
] as const;

const languageOptions = [
  { code: "fr", label: "Francais", native: "Francais", badge: "FR" },
  { code: "en", label: "English", native: "English", badge: "EN" },
  { code: "ar", label: "Arabic", native: "العربية", badge: "AR" },
] as const;

export function SiteHeader() {
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<(typeof languageOptions)[number]["code"]>("fr");
  const languageRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!languageRef.current) return;
      if (!languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e6edf6] bg-[rgba(255,255,255,0.94)] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/images/medsync-logo.svg"
            alt="MedSync"
            width={220}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-0.5 py-2 text-[14px] font-medium text-[#475569] transition-colors hover:text-[#071225]"
            >
              {item.label}
              <span className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#0D6EFD] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div ref={languageRef} className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((p) => !p)}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#dce5f2] bg-white px-3.5 text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#f6f9fd]"
              aria-label="Changer la langue"
              aria-expanded={languageOpen}
            >
              <Globe className="size-4 text-[#64748b]" />
              <span className="font-semibold uppercase">
                {language.toUpperCase()}
              </span>
              <ChevronDown className="size-4 text-[#94a3b8]" />
            </button>

            {languageOpen ? (
              <div className="absolute right-0 z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-[0_16px_36px_-20px_rgba(2,6,23,0.35)]">
                {languageOptions.map((option) => {
                  const selected = option.code === language;
                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => {
                        setLanguage(option.code);
                        setLanguageOpen(false);
                      }}
                      className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left hover:bg-[#f8fafc]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-[#eff6ff] px-1.5 text-[11px] font-semibold text-[#1d4ed8]">
                          {option.badge}
                        </span>
                        <div>
                          <div className="text-[13px] font-semibold text-[#0f172a]">
                            {option.label}
                          </div>
                          <div className="text-[12px] text-[#64748b]">
                            {option.native}
                          </div>
                        </div>
                      </div>
                      {selected ? (
                        <Check className="size-4 text-[#0D6EFD]" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <Button
            onClick={() => router.push("/request?intent=test")}
            className="h-11 rounded-lg bg-[#0D6EFD] px-4 text-[13px] font-semibold text-white shadow-[0_18px_40px_-24px_rgba(13,110,253,0.9)] hover:bg-[#0B5BDA]"
          >
            Demander un test
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
