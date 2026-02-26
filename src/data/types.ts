export type Project = {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  tags: string[];
  overview: {
    description: string;
    role: string;
    duration: string;
    team: string;
    stack: string[];
  };
  problem: {
    summary: string;
    complexity: string;
    aiRelevance: string;
    users: string;
  };
  roleScope: string[];
  decisions: Array<{
    title: string;
    content: string;
  }>;
  engineeringHighlights: Array<{
    title: string;
    content: string;
  }>;
  outcomes: Array<{
    title: string;
    content: string;
  }>;
};

export type ProjectPreview = Pick<
  Project,
  "slug" | "name" | "tagline" | "emoji" | "tags"
>;
