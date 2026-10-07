const OPTIONS = [
  { name: "Bancos dedicados", details: ["Pinecone, Qdrant, Weaviate, Milvus"] },
  { name: "Extensão no banco que você já tem", details: ["pgvector no Postgres (o que o Maestrio usa)"] },
];

export function VectorDb() {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-10">
      <p className="max-w-[34ch] font-display text-[clamp(1.25rem,2.4vw,2.4rem)] font-bold leading-tight">
        Um banco feito pra guardar vetores e <span className="text-brand">buscar por proximidade</span>, rápido, mesmo
        com milhões deles.
      </p>
      <ul className="grid grid-cols-2 gap-12">
        {OPTIONS.map(({ name, details }) => (
          <li key={name} className="flex flex-col gap-2">
            <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-bold">{name}</span>
            <ul className="flex list-disc flex-col gap-1 pl-6 text-[clamp(1rem,1.5vw,1.4rem)] text-fg-secondary marker:text-brand">
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
