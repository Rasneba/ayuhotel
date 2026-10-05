"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Lightweight IntersectionObserver-driven scroll reveal.
 * Falls back to visible content when JavaScript is disabled or motion is reduced.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : direction === "scale"
          ? "reveal-scale"
          : "";

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${dirClass} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
