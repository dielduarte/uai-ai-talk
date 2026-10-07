// From the READMEs of vercel/chat packages/chat (state adapter, dedupeTtlMs)
// and packages/adapter-whatsapp (chunking, card fallback, typing indicator, error codes).
const ROWS = [
  {
    problem: "a plataforma reenvia o mesmo webhook quando você demora pra responder",
    solution: "deduplica as mensagens (5 min por padrão)",
  },
  {
    problem: "duas mensagens chegam juntas na mesma conversa",
    solution: "lock por thread",
  },
  {
    problem: "resposta maior que 4096 caracteres no WhatsApp",
    solution: "quebra em várias mensagens sozinho",
  },
  {
    problem: "card com mais de 3 botões ou texto de botão com mais de 20 caracteres",
    solution: "vira texto formatado sozinho",
  },
  {
    problem: 'mostrar "digitando..." enquanto o bot pensa',
    solution: "thread.startTyping()",
  },
  {
    problem: "cada plataforma tem seus códigos de erro (Meta: 130429)",
    solution: "erro padronizado: RATE_LIMITED",
  },
];

export function WhyChatSdk() {
  return (
    <div className="flex w-full max-w-6xl flex-col divide-y divide-muted-border rounded-xl border border-muted-border bg-muted-bg">
      <div className="grid grid-cols-[3fr_2fr] gap-8 px-8 py-3 font-mono text-sm uppercase tracking-widest text-fg-muted">
        <span>na mão, você lida com</span>
        <span>o Chat SDK já resolve</span>
      </div>
      {ROWS.map(({ problem, solution }) => (
        <div key={problem} className="grid grid-cols-[3fr_2fr] items-baseline gap-8 px-8 py-3 text-[clamp(1rem,1.4vw,1.3rem)]">
          <span className="text-fg-secondary">{problem}</span>
          <span className="text-brand">{solution}</span>
        </div>
      ))}
    </div>
  );
}
