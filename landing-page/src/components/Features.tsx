"use client";

import { useEffect, useRef } from "react";
import FeatureCard, { type Feature } from "./FeatureCard";

const FEATURES: Feature[] = [
  {
    icon: "analytics",
    title: "Grade Management",
    description:
      "Track weighted averages across all semesters. Predictive analytics help you know exactly what you need on that final exam.",
  },
  {
    icon: "calendar_month",
    title: "Smart Scheduling",
    description:
      "Sync your syllabus with a dynamic calendar that alerts you to overlapping deadlines and provides optimal study blocks.",
  },
  {
    icon: "priority_high",
    title: "Task Priority",
    description:
      "AI-driven prioritization based on due dates, project weight, and your historical productivity patterns.",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-triggered fade-in, replacing the original vanilla-JS IntersectionObserver.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-section-gap px-margin-mobile bg-surface">
      <div
        ref={containerRef}
        className="max-w-container-max mx-auto transition-all duration-700 opacity-0 translate-y-8"
      >
        <div className="text-center mb-24">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-base">Precision Tools for Success</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Built by educators and designers to streamline the cognitive load of student life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
