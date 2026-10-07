import { ReportCard } from "./ReportCard";
import { SAFARI_EXISTING, SAFARI_NEW } from "./examples";

export function SameWords() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-2 gap-4">
      <ReportCard label="segunda-feira" report={SAFARI_EXISTING} />
      <ReportCard label="quarta-feira" report={SAFARI_NEW} />
    </div>
  );
}
