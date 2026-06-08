"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
};

const FAILSAFE_MS = 800;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type RevealState = "idle" | "hidden" | "visible";

export default function Reveal({
  children,
  delay = 0,
  threshold = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setState("visible");
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setState("visible");
      return;
    }

    setState("hidden");

    let delayTimer = 0;
    const triggerVisible = () => {
      if (delay) {
        delayTimer = window.setTimeout(() => setState("visible"), delay);
      } else {
        setState("visible");
      }
    };

    const failsafe = window.setTimeout(triggerVisible, FAILSAFE_MS);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(failsafe);
          triggerVisible();
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px 80px 0px" }
    );
    obs.observe(node);

    return () => {
      obs.disconnect();
      window.clearTimeout(failsafe);
      window.clearTimeout(delayTimer);
    };
  }, [delay, threshold]);

  const stateClass =
    state === "hidden"
      ? "reveal-hidden"
      : state === "visible"
      ? "reveal-visible"
      : "";

  return (
    <div ref={ref} className={`${stateClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
