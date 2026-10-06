export type Verdict = "safe" | "unsafe";

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-mono text-sm uppercase tracking-widest ${
        verdict === "unsafe" ? "bg-sev-high-10 text-sev-high" : "bg-brand-10 text-brand"
      }`}
    >
      {verdict}
    </span>
  );
}
