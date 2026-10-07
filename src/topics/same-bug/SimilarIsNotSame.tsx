import { ReportCard } from "./ReportCard";
import { LOGIN_BUG, LOGOUT_BUG, SIMILARITY_THRESHOLD } from "./examples";

// The similarity is illustrative: high enough to pass Maestrio's real threshold.
const SIMILARITY = 0.94;

export function SimilarIsNotSame() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <ReportCard report={LOGIN_BUG} />
        <ReportCard report={LOGOUT_BUG} />
      </div>
      <p className="font-mono text-[clamp(1rem,1.5vw,1.4rem)] text-fg-secondary">
        similaridade <span className="text-fg1">{SIMILARITY}</span> ≥ threshold {SIMILARITY_THRESHOLD}, mas{" "}
        <span className="text-sev-high">não é o mesmo bug</span>
      </p>
    </div>
  );
}
