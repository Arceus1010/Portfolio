import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Project } from "@/data/types";

type Props = {
  overview: Project["overview"];
};

export default function CaseStudyOverview({ overview }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <p className="text-lg text-muted leading-relaxed max-w-[68ch] mb-12">
        {overview.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <SectionLabel label="Role" className="mb-2" />
          <p className="text-sm text-foreground">{overview.role}</p>
        </div>
        <div>
          <SectionLabel label="Duration" className="mb-2" />
          <p className="text-sm text-foreground">{overview.duration}</p>
        </div>
        <div>
          <SectionLabel label="Team" className="mb-2" />
          <p className="text-sm text-foreground">{overview.team}</p>
        </div>
        <div>
          <SectionLabel label="Stack" className="mb-2" />
          <div className="flex flex-wrap gap-1.5">
            {overview.stack.map((tech) => (
              <Tag key={tech} variant="accent">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
