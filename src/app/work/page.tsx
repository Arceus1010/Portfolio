import { getAllProjects, getAllTags } from "@/lib/utils";
import TagFilter from "@/components/work/TagFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected AI-powered systems designed and engineered by Afnan Farid.",
};

export default function WorkPage() {
  const projects = getAllProjects();
  const tags = getAllTags();

  const previews = projects.map(({ slug, name, tagline, emoji, tags }) => ({
    slug,
    name,
    tagline,
    emoji,
    tags,
  }));

  return (
    <div className="max-w-layout mx-auto px-6 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
          Selected Work
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          AI-powered systems I&apos;ve designed and engineered.
        </h1>
      </div>

      <TagFilter projects={previews} tags={tags} />
    </div>
  );
}
