import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Afnan Farid.",
};

const links = [
  {
    label: "Email",
    value: "afnanfarid.dev@gmail.com",
    href: "mailto:afnan@example.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/afnanfarid",
    href: "https://linkedin.com/in/afnanfarid",
  },
  {
    label: "GitHub",
    value: "github.com/afnanfarid",
    href: "https://github.com/afnanfarid",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-24">
      <div className="mb-16 border-b border-border pb-16">
        <p className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
          Contact
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          Let&apos;s Talk
        </h1>
        <p className="mt-6 text-lg text-muted max-w-[55ch] leading-relaxed">
          I&apos;m open to opportunities in AI-focused product teams globally.
          If you&apos;re building something ambitious, I&apos;d like to hear
          about it.
        </p>
      </div>

      {/* WCAG 1.3.1 — semantic list; each contact method is a discrete list item */}
      <ul className="space-y-0 list-none">
        {links.map((link, i) => {
          const isExternal = !link.href.startsWith("mailto");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                /* WCAG 2.4.4 — descriptive label; flags new-tab for external links */
                aria-label={
                  isExternal
                    ? `${link.label}: ${link.value} (opens in new tab)`
                    : `${link.label}: ${link.value}`
                }
                className={`group flex items-center justify-between py-8 ${
                  i < links.length - 1 ? "border-b border-border" : ""
                } hover:bg-surface -mx-6 px-6 transition-colors duration-200`}
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted font-mono mb-1">
                    {link.label}
                  </p>
                  <p className="text-foreground">{link.value}</p>
                </div>
                {/* WCAG 1.1.1 — decorative arrow, hidden from assistive technology */}
                <span aria-hidden="true" className="text-muted group-hover:text-accent transition-colors duration-200 text-lg">
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
