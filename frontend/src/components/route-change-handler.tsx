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
    document.body.focus();
  }, [pathname]);

  return null;
}
