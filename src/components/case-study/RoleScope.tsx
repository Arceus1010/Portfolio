import SectionLabel from "@/components/ui/SectionLabel";

type Props = {
  roleScope: string[];
};

export default function RoleScope({ roleScope }: Props) {
  return (
    <section className="py-16 border-b border-border">
      <SectionLabel label="02 — My Role & Scope" />
      <ul className="space-y-4">
        {roleScope.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="text-xs font-mono text-accent mt-0.5 w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
