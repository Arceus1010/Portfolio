import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "eagle-eye",
    name: "Eagle Eye",
    tagline: "AI-Powered Investigation Platform",
    emoji: "🦅",
    tags: ["Enterprise", "AI", "Data Visualization", "Investigation", "React"],
    overview: {
      description:
        "A high-density investigation platform built for enterprise security analysts. Eagle Eye surfaces AI-generated reasoning chains alongside structured case data, enabling faster, more defensible investigative decisions.",
      role: "Product Engineer (UI/UX + Frontend)",
      duration: "8 months",
      team: "4 engineers, 1 AI researcher, stakeholders",
      stack: ["React", "TypeScript", "Next.js", "Python", "PostgreSQL"],
    },
    problem: {
      summary:
        "Enterprise investigation teams were drowning in unstructured signals. Analysts spent the majority of their time correlating data across multiple disconnected tools before they could begin actual analysis — the real work.",
      complexity:
        "The platform needed to surface AI-generated reasoning while remaining auditable. Every insight required a traceable evidence chain that could hold up to scrutiny. Confidence levels, source attributions, and alternative hypotheses all had to coexist without overwhelming the analyst.",
      aiRelevance:
        "AI reasoning visualization was the core UX challenge. Showing confidence levels, evidence sources, and alternative hypotheses without overwhelming the analyst required an entirely custom visualization layer — off-the-shelf charts could not represent the multi-dimensional relationships between evidence nodes.",
      users:
        "Tier-1 enterprise security operations centers, fraud investigation teams, and compliance officers across financial services clients.",
    },
    roleScope: [
      "Architected the AI reasoning visualization system from scratch",
      "Designed the investigation workflow state machine",
      "Built the high-density data grid with virtualized rendering for large datasets",
      "Led API contract design between the Python inference layer and the React frontend",
      "Established component library standards adopted across the platform",
      "Mentored frontend interns on component architecture and state management",
    ],
    decisions: [
      {
        title: "Custom visualization layer over off-the-shelf chart libraries",
        content:
          "Standard charting libraries could not represent the multi-dimensional relationships between evidence nodes, confidence intervals, and temporal sequences simultaneously. We built a lightweight SVG-based reasoning graph that encoded relationship type, confidence weight, and temporal ordering in a single view — reducing analyst context-switching significantly. The decision to own this layer entirely gave us the precision the domain required.",
      },
      {
        title: "Virtualized rendering for high-density data tables",
        content:
          "The investigation workspace needed to display tens of thousands of rows without pagination, preserving analyst flow state. We implemented windowed rendering with a custom scroll sync layer between the data grid and the reasoning panel, maintaining sub-16ms frame budgets even on constrained enterprise hardware.",
      },
      {
        title: "Optimistic UI for investigation actions",
        content:
          "Analyst actions — flagging, annotating, escalating — needed to feel instant despite round-trips to the inference server. We implemented an optimistic update pattern with a local action queue and conflict resolution strategy for concurrent multi-analyst sessions. This made the interface feel native, not web.",
      },
      {
        title: "XState for investigation workflow management",
        content:
          "Managing the 12 distinct investigation states and 34 valid transitions with useState would have produced impossible-to-reason-about code. The XState state machine made valid transitions explicit, made invalid states unrepresentable, and made the investigation lifecycle auditable at the event level — a direct compliance requirement.",
      },
    ],
    engineeringHighlights: [
      {
        title: "AI Reasoning Graph Component",
        content:
          "Custom SVG component rendering directed acyclic graphs of evidence relationships. Nodes encode entity type and confidence score visually; edges encode relationship strength and temporal direction. Fully interactive — analysts can expand, collapse, and annotate nodes inline without leaving the investigation context.",
      },
      {
        title: "Investigation State Machine",
        content:
          "XState-based workflow engine managing 12 distinct investigation states with 34 valid transitions. Eliminated an entire class of impossible UI states and made investigation lifecycle auditable at the event level.",
      },
      {
        title: "Real-time Collaboration Layer",
        content:
          "WebSocket-based presence system showing which analysts are viewing which entities, with conflict-aware annotation merging for concurrent edits. Analysts could see each other's cursors and annotations in real time without interfering with each other's work.",
      },
    ],
    outcomes: [
      {
        title: "Investigation time reduced substantially across pilot clients",
        content:
          "Analysts completed investigations significantly faster on average compared to the prior multi-tool workflow, freeing time for higher-order analysis rather than data correlation.",
      },
      {
        title: "Zero audit failures in initial deployment period",
        content:
          "The evidence chain architecture passed all client legal discovery requests without modification during the initial deployment period — a direct result of the auditable state machine design.",
      },
      {
        title: "Platform expanded to multiple enterprise clients in first quarter",
        content:
          "Grew from a single pilot to multiple paying enterprise clients within 90 days of launch, driven by referrals from the initial pilot team.",
      },
    ],
  },

  {
    slug: "phoenix-ai",
    name: "Phoenix AI Analytics",
    tagline: "AI Reasoning & Dashboarding Platform",
    emoji: "🔥",
    tags: ["AI", "Dashboard", "Data Platform", "React", "Design System"],
    overview: {
      description:
        "A next-generation analytics platform that layers AI-generated insights directly into configurable dashboards. Phoenix replaces static BI reporting with living, reasoning-aware data surfaces that suggest, explain, and adapt.",
      role: "Product Engineer (UI/UX + Frontend)",
      duration: "6 months",
      team: "3 engineers, 1 AI researcher, 1 PM",
      stack: ["React", "TypeScript", "D3.js", "FastAPI", "ClickHouse"],
    },
    problem: {
      summary:
        "Existing BI tools treated AI insights as a bolt-on feature — a sidebar annotation on otherwise static charts. Users could not act on insights within the context where the insight appeared, creating constant context-switching and degraded trust in AI suggestions.",
      complexity:
        "Dashboards needed to be dynamically reconfigurable by AI suggestions while remaining user-controllable. The tension between AI autonomy and user agency was the central design challenge — too much AI control feels alarming, too little feels useless.",
      aiRelevance:
        "AI insight layering needed to feel like a collaborator, not an autocomplete. Insights appear contextually, with reasoning exposed on demand and one-click actions that apply the suggested change — the AI proposes, the human disposes.",
      users:
        "Data-forward product teams, growth analysts, and operational leads at mid-market companies.",
    },
    roleScope: [
      "Designed and implemented the dynamic dashboard layout system",
      "Built the AI insight overlay architecture",
      "Created the drag-and-drop layout engine with constraint-aware placement",
      "Implemented real-time data refresh with stale-while-revalidate patterns",
      "Established the cross-widget communication event bus",
      "Defined the interaction model for AI insight acceptance and dismissal",
    ],
    decisions: [
      {
        title: "Native CSS Grid layout engine over a drag-and-drop library",
        content:
          "Third-party drag-and-drop dashboard libraries imposed layout constraints incompatible with AI-suggested widget reordering. We built a constraint-aware layout engine on native CSS Grid that could accept both user drag inputs and programmatic AI placement commands through the same API — a single source of truth for layout state.",
      },
      {
        title: "AI insights as a separate render layer",
        content:
          "AI insights are rendered in a dedicated overlay layer above the chart canvas rather than modifying chart components directly. This architecture allowed insights to reference multiple widgets simultaneously, be dismissed without re-rendering underlying charts, and be versioned independently of chart data.",
      },
      {
        title: "Stale-while-revalidate for dashboard data freshness",
        content:
          "Dashboard data needed to feel live without hammering the ClickHouse backend. We implemented SWR with per-widget refresh intervals calibrated to data volatility — high-frequency metrics refresh every 30 seconds, summary metrics every 5 minutes. Users see fresh data without the UI flickering on every poll.",
      },
    ],
    engineeringHighlights: [
      {
        title: "Dynamic Layout Engine",
        content:
          "A constraint-solving layout system that accepts declarative widget placement commands from both user interactions and the AI suggestion pipeline. Handles collision detection, responsive breakpoint adaptation, and layout history for undo/redo.",
      },
      {
        title: "AI Insight Overlay System",
        content:
          "A composited rendering layer that positions insight cards relative to their target widgets using IntersectionObserver and ResizeObserver, maintaining correct positioning across scroll, zoom, and layout reflow.",
      },
      {
        title: "Cross-Widget Event Bus",
        content:
          "A typed event bus enabling widgets to broadcast state changes to each other — selection in one widget filters data in related widgets — without prop-drilling or global state coupling.",
      },
    ],
    outcomes: [
      {
        title: "Dashboard creation time cut significantly",
        content:
          "Users scaffolded new dashboards in a fraction of the time compared to the prior tool, with AI-suggested layouts accounting for a substantial portion of new dashboard sessions.",
      },
      {
        title: "AI insight acceptance rate validated the contextual model",
        content:
          "Over a third of AI-suggested layout and metric changes were accepted by users, validating the hypothesis that contextual, in-situ suggestions outperform modal or sidebar AI interactions.",
      },
    ],
  },

  {
    slug: "newss2",
    name: "NEWSS 2.0",
    tagline: "National Data Survey Platform",
    emoji: "🏛️",
    tags: ["GovTech", "Data Systems", "Forms", "Validation", "React"],
    overview: {
      description:
        "A ground-up rebuild of a national survey infrastructure platform, handling structured data collection at scale across government agencies with strict validation, audit trails, and accessibility requirements.",
      role: "Product Engineer (UI/UX + Frontend)",
      duration: "10 months",
      team: "6 engineers, 2 PMs, government stakeholders",
      stack: ["React", "TypeScript", "Next.js", "PostgreSQL", "Prisma"],
    },
    problem: {
      summary:
        "The existing survey system was a decade-old monolith with no type safety, minimal test coverage, and a data model that could not represent the structural complexity of modern government survey instruments. Field officers were submitting data that required weeks of manual correction.",
      complexity:
        "Government survey forms can contain conditional logic 8–10 levels deep, with cross-section validation rules that span thousands of fields. The validation engine alone took three months to design correctly. Every design decision carried compliance weight.",
      aiRelevance:
        "AI was used narrowly but critically: detecting anomalous response patterns that indicated data entry errors before submission, reducing correction cycles from weeks to hours. The AI layer needed to be explainable — field officers needed to understand why a response was flagged.",
      users:
        "Field data collection officers across government agencies, central data analysts, and survey administrators.",
    },
    roleScope: [
      "Redesigned the core data model for survey instrument representation",
      "Built the conditional logic engine for multi-level branching forms",
      "Implemented the cross-section validation rule system",
      "Created the audit trail and change history architecture",
      "Led accessibility audit and remediation to WCAG 2.1 AA compliance",
      "Designed the anomaly detection UI for AI-flagged responses",
    ],
    decisions: [
      {
        title: "JSON Schema for survey instrument definition",
        content:
          "Survey instruments are defined as versioned JSON Schema documents rather than database-modeled form builders. This allows instruments to be version-controlled, diffed, and validated against a known schema before deployment — critical for government audit requirements. Any instrument change produces a diff that is reviewable by non-engineers.",
      },
      {
        title: "Server-side validation as the source of truth",
        content:
          "Despite implementing rich client-side validation for UX responsiveness, all validation rules execute server-side before any data is persisted. This design was non-negotiable given the legal standing of submitted data. Client validation is purely a user experience layer.",
      },
      {
        title: "Progressive disclosure for complex conditional forms",
        content:
          "Showing all possible fields at once — even hidden ones — created cognitive overload for field officers. We implemented progressive disclosure where conditional sections reveal only when their trigger conditions are met, reducing the perceived complexity of long survey instruments dramatically.",
      },
    ],
    engineeringHighlights: [
      {
        title: "Conditional Logic Engine",
        content:
          "A recursive expression evaluator that resolves multi-level conditional dependencies across survey sections. Handles circular dependency detection, short-circuit evaluation, and real-time recalculation as field values change — without blocking the main thread.",
      },
      {
        title: "Immutable Audit Trail",
        content:
          "Every field change is recorded as an immutable event in a separate audit schema, with cryptographic hashing of event sequences to detect tampering — a direct requirement from the government security review.",
      },
      {
        title: "AI Anomaly Detection Interface",
        content:
          "A review interface surfacing AI-flagged responses with confidence scores, the specific rule that triggered the flag, and one-click resolution actions. Designed to be usable by non-technical field supervisors with zero ML background.",
      },
    ],
    outcomes: [
      {
        title: "Data correction cycles reduced from weeks to hours",
        content:
          "Anomaly detection at submission time caught the vast majority of historical correction-worthy errors before they entered the central database, transforming the correction workflow from reactive to proactive.",
      },
      {
        title: "WCAG 2.1 AA compliance achieved",
        content:
          "The first survey platform in the agency network to achieve formal accessibility certification, opening the platform to a broader range of field officers including those using assistive technology.",
      },
      {
        title: "Scalable to new survey instruments without engineering changes",
        content:
          "The JSON Schema approach enabled survey administrators to define new instruments entirely through configuration — no engineering involvement required for new survey types after initial deployment.",
      },
    ],
  },

  {
    slug: "orbit",
    name: "Orbit",
    tagline: "AI-Powered Project Management",
    emoji: "🪐",
    tags: ["AI-Native", "Personal Project", "Product Design", "React"],
    overview: {
      description:
        "An exploratory personal project reimagining project management from an AI-native perspective. Orbit treats tasks as context objects for an AI collaborator rather than items in a list — the AI has persistent, structured knowledge of the project.",
      role: "Solo Product Engineer (Design + Engineering)",
      duration: "Ongoing",
      team: "Solo",
      stack: ["Next.js", "TypeScript", "Vercel AI SDK", "Supabase"],
    },
    problem: {
      summary:
        "Existing project management tools were designed for human-to-human coordination. None treated the AI as a first-class participant with persistent context about the project. Every AI interaction started from zero — the AI had no memory of prior decisions, constraints, or team conventions.",
      complexity:
        "The core design challenge: how do you give an AI enough context about a project to be genuinely useful, without requiring the user to re-explain that context on every interaction? The answer required rethinking the data model, not just the UI.",
      aiRelevance:
        "AI is the interface, not a feature. Orbit is built around the premise that natural language should be the primary way to create, update, and reason about work — and that the AI should remember what it learns about your project.",
      users:
        "Personal use, with design exploration targeting solo practitioners and small product teams.",
    },
    roleScope: [
      "Full product design — information architecture, interaction design, visual design",
      "Full engineering — frontend, backend, AI integration",
      "Defined the context model for persistent AI memory across a project",
      "Designed the natural language task creation and decomposition flow",
      "Implemented streaming AI responses inline in the task view",
    ],
    decisions: [
      {
        title: "Context graph over a flat task list",
        content:
          "Tasks in Orbit are nodes in a context graph, not rows in a list. Each task carries metadata about its dependencies, relevant decisions, and team context. This graph is the structured input to the AI layer, enabling genuinely contextual suggestions rather than generic responses. The data model is the innovation — the UI is just its surface.",
      },
      {
        title: "Streaming AI responses inline in the task view",
        content:
          "Rather than a separate AI chat panel, AI responses stream directly into the relevant task context. This keeps the user spatially anchored in their work rather than switching mental frames to a chat interface. The AI collaborates where the work is, not in a sidebar.",
      },
      {
        title: "Structured output for task decomposition",
        content:
          "When the AI decomposes a task, it outputs structured JSON rather than prose — the breakdown arrives as interactive task nodes, not text to copy-paste. This required careful prompt engineering and streaming JSON parsing to handle partial output correctly.",
      },
    ],
    engineeringHighlights: [
      {
        title: "Persistent Context Model",
        content:
          "Each project maintains a structured context document that accumulates decisions, constraints, and history. This document is injected into AI requests as a system-level context, enabling the AI to reference prior decisions without the user re-explaining them.",
      },
      {
        title: "Streaming Task Decomposition",
        content:
          "Using the Vercel AI SDK streaming API, task breakdown suggestions appear token-by-token in the task view, with structured output parsing that converts streamed tokens into interactive task nodes as they arrive — not after the full response completes.",
      },
      {
        title: "Optimistic Task Graph Updates",
        content:
          "Task creation, status changes, and relationship modifications update the graph UI immediately before the database write confirms. This makes the interface feel native-app responsive while remaining eventually consistent with the server state.",
      },
    ],
    outcomes: [
      {
        title: "Validated the persistent context model in practice",
        content:
          "In personal use, the context model eliminated nearly all re-prompting overhead — the AI reliably referenced prior decisions and constraints without reminding. This validated the core hypothesis that the data model, not the prompt, is the right place to solve AI context.",
      },
      {
        title: "Interaction patterns applied to client work",
        content:
          "The inline streaming and structured output patterns developed in Orbit directly influenced the AI interaction design on subsequent client projects, compressing the design exploration phase significantly.",
      },
    ],
  },
];
