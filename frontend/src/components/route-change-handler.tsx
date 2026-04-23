"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteChangeHandler() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const id = setTimeout(() => {
      targetRef.current?.focus();
    }, 300);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <span
        ref={targetRef}
        id="focus-reset-target"
        tabIndex={-1}
        className="sr-only"
      >
        &nbsp;
      </span>
    </>
  );
}
