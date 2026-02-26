import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/data/types";

type Props = {
  decisions: Project["decisions"];
};

export default function DecisionsSection({ decisions }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <SectionLabel label="03 — Key Design & Engineering Decisions" />
      <div className="space-y-10">
        {decisions.map((decision, i) => (
          <div key={i} className="pl-5 border-l border-accent/30">
            <h3 className="text-base font-semibold text-foreground mb-3">
              {decision.title}
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              {decision.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
