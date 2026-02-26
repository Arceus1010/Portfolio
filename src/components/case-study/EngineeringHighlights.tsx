import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/data/types";

type Props = {
  highlights: Project["engineeringHighlights"];
};

export default function EngineeringHighlights({ highlights }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <SectionLabel label="04 — Engineering Highlights" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <span className="text-xs font-mono text-accent mb-3 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {item.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
