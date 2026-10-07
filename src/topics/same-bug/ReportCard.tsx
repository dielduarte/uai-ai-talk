import type { Report } from "./examples";

export function ReportCard({ report, label }: { report: Report; label?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-muted-border bg-muted-bg p-8">
      {label && <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">{label}</span>}
      <span className="font-display text-2xl font-bold">{report.title}</span>
      <span className="text-fg-secondary">{report.description}</span>
    </div>
  );
}
