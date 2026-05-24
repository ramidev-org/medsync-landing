"use client";

import * as React from "react";
import Lenis from "lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}

