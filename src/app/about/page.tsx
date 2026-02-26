import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Afnan Farid — Product Engineer building AI-powered systems in Malaysia.",
};

const interests = [
  "AI-native product design",
  "Human-in-the-loop systems",
  "Scalable frontend architecture",
  "Intelligent workflow design",
  "State machine-driven UX",
];

const stack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Figma",
  "Python",
  "PostgreSQL",
];

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-24">
      <div className="mb-16 border-b border-border pb-16">
        <p className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
          About
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          Afnan Farid
        </h1>
        <p className="mt-3 text-lg text-muted">
          Product Engineer · Malaysia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-3 space-y-8">
          <div>
            <p className="text-foreground text-lg leading-relaxed">
              I build AI-powered systems where design and engineering operate as
              one integrated process — not as two separate disciplines that hand
              off to each other.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Current Role
            </h2>
            <p className="text-muted leading-relaxed">
              At{" "}
              <span className="text-foreground">Datamicron Systems</span>, I
              serve as the sole UI/UX Designer and Frontend Engineer across
              multiple AI-driven enterprise platforms. I lead interface
              development from workflow architecture and interaction design
              through component system design, React implementation, and
              production deployment.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Leadership
            </h2>
            <p className="text-muted leading-relaxed">
              I&apos;ve mentored frontend interns and guided implementation
              consistency across projects — helping junior engineers understand
              not just how to build, but why the system is structured the way it
              is.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Career Direction
            </h2>
            <p className="text-muted leading-relaxed">
              I&apos;m looking to grow within teams building ambitious
              AI-powered products where hybrid product engineers can contribute
              across design and engineering — globally.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Interests
            </h2>
            <ul className="space-y-2">
              {interests.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded border border-border bg-surface text-muted font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
              Links
            </h2>
            <div className="space-y-2">
              <a
                href="mailto:afnanfarid.dev@gmail.com"
                className="block text-sm text-muted hover:text-accent transition-colors duration-200"
              >
                Email →
              </a>
              <a
                href="https://linkedin.com/in/afnanfarid"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted hover:text-accent transition-colors duration-200"
              >
                LinkedIn →
              </a>
              <a
                href="https://github.com/Arceus1010"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted hover:text-accent transition-colors duration-200"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-12 border-t border-border">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200"
        >
          ← View my work
        </Link>
      </div>
    </div>
  );
}
