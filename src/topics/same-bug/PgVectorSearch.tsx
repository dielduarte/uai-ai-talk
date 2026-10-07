import { CodeBlock } from "../../components/CodeBlock";

// Example in the shape of maestrio.ai's dedup query (apps/dashboard/src/data/requests.ts),
// with named placeholders matching the parameters slide.
export function PgVectorSearch() {
  return (
    <CodeBlock
      emphasize={[":vetor", ":threshold", ":top_k"]}
      code={`SELECT id, title, 1 - (embedding <=> :vetor) AS similarity
FROM tableName
WHERE 1 - (embedding <=> :vetor) >= :threshold
ORDER BY embedding <=> :vetor
LIMIT :top_k;`}
    />
  );
}
