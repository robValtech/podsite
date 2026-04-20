"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteChangeHandler() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (
      document.getElementById("focus-reset-target") as HTMLElement | null
    )?.focus();
  }, [pathname]);

  return null;
}
