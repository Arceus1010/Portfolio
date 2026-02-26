import Link from "next/link";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-layout mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-sm font-medium text-foreground">Afnan Farid</p>
            <p className="text-sm text-muted mt-1">
              Product Engineer · Malaysia
            </p>
          </div>

          <nav className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="mailto:afnan@example.com"
              className="text-sm text-muted hover:text-accent transition-colors duration-200"
            >
              Email
            </a>
            {/* WCAG 2.4.4 — inform screen reader users that these open in a new tab */}
            <a
              href="https://linkedin.com/in/afnanfarid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="text-sm text-muted hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/afnanfarid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)"
              className="text-sm text-muted hover:text-accent transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Afnan Farid. Designed and built from
            scratch.
          </p>
        </div>
      </div>
    </footer>
  );
}
