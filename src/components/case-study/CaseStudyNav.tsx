import Link from "next/link";
import { getAdjacentProjects } from "@/lib/utils";

type Props = {
  currentSlug: string;
};

export default function CaseStudyNav({ currentSlug }: Props) {
  const { prev, next } = getAdjacentProjects(currentSlug);

  return (
    // WCAG 1.3.1 — nav landmark instead of generic section for case study pagination
    <nav aria-label="Case study navigation" className="py-16">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1">
          {prev && (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-1"
              aria-label={`Previous case study: ${prev.name}`}
            >
              {/* WCAG 1.1.1 — arrow is a decorative directional indicator */}
              <span aria-hidden="true" className="text-xs uppercase tracking-widest text-muted font-mono group-hover:text-accent transition-colors duration-200">
                ← Previous
              </span>
              <span className="text-sm text-foreground">
                <span role="img" aria-hidden="true">{prev.emoji}</span>{" "}
                {prev.name}
              </span>
            </Link>
          )}
        </div>

        <Link
          href="/work"
          className="text-xs uppercase tracking-widest text-muted font-mono hover:text-foreground transition-colors duration-200 shrink-0"
        >
          All Work
        </Link>

        <div className="flex-1 flex justify-end">
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col gap-1 text-right"
              aria-label={`Next case study: ${next.name}`}
            >
              {/* WCAG 1.1.1 — arrow is a decorative directional indicator */}
              <span aria-hidden="true" className="text-xs uppercase tracking-widest text-muted font-mono group-hover:text-accent transition-colors duration-200">
                Next →
              </span>
              <span className="text-sm text-foreground">
                <span role="img" aria-hidden="true">{next.emoji}</span>{" "}
                {next.name}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
