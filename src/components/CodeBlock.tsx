const BASE_TOKENS = [String.raw`"[^"]*"`, String.raw`\/\/.*$`];

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlight(line: string, token: RegExp, emphasized: Set<string>) {
  return line.split(token).map((part, i) =>
    part.startsWith("//") ? (
      <span key={i} className="text-fg-secondary">
        {part}
      </span>
    ) : part.startsWith('"') || emphasized.has(part) ? (
      <span key={i} className="text-brand">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type Props = {
  code: string;
  label?: string;
  dense?: boolean;
  emphasize?: string[];
};

export function CodeBlock({ code, label, dense = false, emphasize = [] }: Props) {
  const token = new RegExp(`(${[...emphasize.map(escape), ...BASE_TOKENS].join("|")})`, "gm");
  const emphasized = new Set(emphasize);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-3">
      {label && <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">{label}</span>}
      <pre
        className={`overflow-hidden rounded-xl border border-muted-border bg-muted-bg px-8 py-6 font-mono leading-normal text-fg1 ${
          dense ? "text-[clamp(0.75rem,1vw,1.05rem)]" : "text-[clamp(0.85rem,1.2vw,1.25rem)]"
        }`}
      >
        {code.split("\n").map((line, i) => (
          <div key={i} className="min-h-[1lh]">
            {highlight(line, token, emphasized)}
          </div>
        ))}
      </pre>
    </div>
  );
}
