import { CodeBlock } from "../../components/CodeBlock";

// Simplified from maestrio.ai apps/dashboard/drizzle/0011_split_dedup_schema.sql.
export function PgVectorStore() {
  return (
    <CodeBlock
      code={`CREATE EXTENSION vector;

ALTER TABLE requests ADD COLUMN embedding vector(1536);`}
    />
  );
}
