const PARAMETERS = [
  { name: "vetor", meaning: "o embedding do texto novo" },
  { name: "top-k", meaning: "quantos resultados mais próximos trazer" },
  { name: "threshold", meaning: "a similaridade mínima pra considerar parecido" },
];

export function SearchParameters() {
  return (
    <ul className="flex w-full max-w-5xl flex-col divide-y divide-muted-border rounded-xl border border-muted-border bg-muted-bg">
      <li className="grid grid-cols-[12rem_1fr] gap-8 px-8 py-4 font-mono text-sm uppercase tracking-widest text-fg-muted">
        <span>parâmetro</span>
        <span>o que é</span>
      </li>
      {PARAMETERS.map(({ name, meaning }) => (
        <li key={name} className="grid grid-cols-[12rem_1fr] items-baseline gap-8 px-8 py-6 text-[clamp(1.05rem,1.6vw,1.5rem)]">
          <span className="font-mono text-brand">{name}</span>
          <span>{meaning}</span>
        </li>
      ))}
    </ul>
  );
}
