import { Suspense } from "react";

import { RequestForm } from "./request-form";

export default function RequestPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8fafc] text-[#0b1220]">
          <div className="mx-auto w-full max-w-[980px] px-5 py-14">
            <div className="rounded-xl border border-[rgba(2,6,23,0.08)] bg-white p-5">
              <div className="text-[14px] font-semibold">Chargement...</div>
            </div>
          </div>
        </main>
      }
    >
      <RequestForm />
    </Suspense>
  );
}
