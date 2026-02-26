import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/data/types";

type Props = {
  outcomes: Project["outcomes"];
};

export default function OutcomesSection({ outcomes }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <SectionLabel label="05 — Outcomes & Learnings" />
      <div className="space-y-8">
        {outcomes.map((outcome, i) => (
          <div key={i} className="flex items-start gap-6">
            {/* WCAG 1.1.1 — purely decorative counter, hidden from assistive technology */}
            <span aria-hidden="true" className="text-4xl font-semibold text-accent/20 font-mono leading-none shrink-0 select-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {outcome.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {outcome.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
