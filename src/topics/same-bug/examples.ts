// Pair from maestrio.ai packages/llm/src/datasets/dedup-judge.json, translated.
export type Report = { title: string; description: string };

export const SAFARI_EXISTING: Report = {
  title: "Loop de redirect no login do Safari",
  description: "Depois de digitar a senha no Safari, volto pra tela de login. No Chrome funciona.",
};

export const SAFARI_NEW: Report = {
  title: "Não consigo logar no Safari do Mac",
  description: "O login no Safari (macOS) fica me mandando de volta pro /login depois que eu envio.",
};

// One word apart, different bugs: nearly identical embeddings, different flows. Illustrative.
export const LOGIN_BUG: Report = {
  title: "Não consigo fazer login",
  description: 'Clico em "Entrar" e nada acontece.',
};

export const LOGOUT_BUG: Report = {
  title: "Não consigo fazer logout",
  description: 'Clico em "Sair" e nada acontece.',
};

// A made-up 2-dimensional model so the vectors fit on a chart. Illustrative values.
export const TOY_EMBEDDINGS = [
  { text: SAFARI_EXISTING.title, short: "login no Safari", vector: [0.85, 0.05] },
  { text: SAFARI_NEW.title, short: "logar no Safari do Mac", vector: [0.82, 0.21] },
  { text: "Adicionar dark mode", short: "dark mode", vector: [0.04, 0.9] },
] as const;

// Maestrio's real cutoff (apps/dashboard/src/data/requests.ts).
export const SIMILARITY_THRESHOLD = 0.85;

export function cosineSimilarity(a: readonly number[], b: readonly number[]): number {
  const dot = a.reduce((sum, value, i) => sum + value * b[i], 0);
  const norm = (v: readonly number[]) => Math.hypot(...v);
  return dot / (norm(a) * norm(b));
}
