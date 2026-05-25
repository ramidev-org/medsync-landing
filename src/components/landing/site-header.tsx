"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Produit", href: "/#features" },
  { label: "Avis", href: "/#testimonials" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e6edf6] bg-[rgba(255,255,255,0.94)] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-[#0D6EFD] text-[15px] font-semibold text-white">
            M
          </span>
          <span className="text-[21px] font-semibold tracking-tight text-[#071225]">
            MedSync
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors",
                isHome && item.href === "/#features"
                  ? "bg-[#eef5ff] text-[#0D6EFD]"
                  : "text-[#475569] hover:bg-[#f6f9fd] hover:text-[#071225]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="ghost"
            className="h-10 rounded-lg px-3 text-[13px] font-semibold text-[#475569] hover:bg-[#f6f9fd]"
          >
            <Link href="/about">A propos</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-lg border-[#dce5f2] bg-white px-4 text-[13px] font-semibold text-[#071225] hover:bg-[#f6f9fd]"
          >
            <Link href="/#pricing">Voir les tarifs</Link>
          </Button>
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
