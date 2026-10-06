const TOKEN = /("[^"]*"|\/\/.*$)/gm;

function highlight(line: string) {
  return line.split(TOKEN).map((part, i) =>
    part.startsWith("//") ? (
      <span key={i} className="text-fg-secondary">
        {part}
      </span>
    ) : part.startsWith('"') ? (
      <span key={i} className="text-brand">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function CodeBlock({ code, label, dense = false }: { code: string; label?: string; dense?: boolean }) {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-3">
      {label && <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">{label}</span>}
      <pre
        className={`overflow-hidden rounded-xl border border-muted-border bg-muted-bg px-8 py-6 font-mono leading-normal text-fg1 ${
          dense ? "text-[clamp(0.75rem,1vw,1.05rem)]" : "text-[clamp(0.85rem,1.2vw,1.25rem)]"
        }`}
      >
        {code.split("\n").map((line, i) => (
          <div key={i} className="min-h-[1lh]">{highlight(line)}</div>
        ))}
      </pre>
    </div>
  );
}
