import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = {
  name: string;
  tagline: string;
  emoji: string;
  tags: string[];
};

export default function CaseStudyHero({ name, tagline, emoji, tags }: Props) {
  return (
    <section className="pt-16 pb-16 border-b border-border">
      <SectionLabel label="Case Study" />
      <div className="flex items-start gap-6">
        {/* WCAG 1.1.1 — role="img" + aria-label gives the emoji a reliable accessible name */}
        <span role="img" aria-label={name} className="text-5xl">{emoji}</span>
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            {name}
          </h1>
          <p className="mt-3 text-lg text-muted">{tagline}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
