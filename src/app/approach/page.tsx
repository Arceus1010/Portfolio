import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Afnan Farid approaches building AI-powered products — from system thinking to scalable engineering.",
};

const principles = [
  {
    number: "01",
    title: "Design the system before the interface.",
    body: "Before any wireframe, I map the workflow. What decisions does the user need to make? What data informs each decision? What happens when the AI is wrong? Interfaces that skip this step feel disconnected from the work they're supposed to support. I start with information architecture, decision states, and system boundaries — the UI is the last thing I design.",
  },
  {
    number: "02",
    title: "Integrate engineering early.",
    body: "The moment I understand the data model and AI layer, I start thinking in components. Not UI components — semantic units of the system. What are the primitives? What varies, what's fixed? Early engineering integration means I'm not designing interactions that are impossible to implement, and I'm not building component trees that collapse under real data. Design and engineering inform each other from day one.",
  },
  {
    number: "03",
    title: "Keep humans in control.",
    body: "AI systems that feel like black boxes erode trust quickly, especially in enterprise contexts where decisions have consequences. I design for inspectability: confidence indicators, evidence chains, alternative hypotheses on demand. Users should always be able to understand why the AI suggested something, override it, and know that their override was recorded. The AI proposes. The human decides.",
  },
  {
    number: "04",
    title: "Build for iteration.",
    body: "AI products are not finished at launch. Models improve, capabilities expand, user mental models evolve. Interfaces need to be architected for change — modular component systems, typed state machines, separation between data logic and presentation. I treat the initial build as version 1.0 of an ongoing system, not a final deliverable.",
  },
];

export default function ApproachPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-24">
      <div className="mb-16 border-b border-border pb-16">
        <p className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
          Approach
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          My Approach to Building AI Products
        </h1>
        <p className="mt-6 text-lg text-muted max-w-[60ch] leading-relaxed">
          I operate at the intersection of product thinking and engineering
          precision. These are the principles that shape how I work.
        </p>
      </div>

      <div className="space-y-0">
        {principles.map((p, i) => (
          <div
            key={p.number}
            className={`py-14 ${i < principles.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-start gap-8">
              <span className="text-xs font-mono text-accent mt-1.5 shrink-0 w-6">
                {p.number}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-5">
                  {p.title}
                </h2>
                <p className="text-muted leading-relaxed max-w-[60ch]">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
