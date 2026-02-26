import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/data/types";

type Props = {
  problem: Project["problem"];
};

export default function ProblemSection({ problem }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <SectionLabel label="01 — Problem Context" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-foreground leading-relaxed">
            {problem.summary}
          </p>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-2">
              Why it was complex
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {problem.complexity}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-2">
              Why AI mattered
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {problem.aiRelevance}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-2">
              Users
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {problem.users}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
