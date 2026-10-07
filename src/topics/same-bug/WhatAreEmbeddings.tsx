export function WhatAreEmbeddings() {
  return (
    <div className="flex max-w-[42ch] flex-col gap-6 font-display text-[clamp(1.15rem,2vw,2rem)] font-bold leading-tight">
      <p>
        Uma técnica de IA que transforma dados do mundo real (palavras, frases, imagens ou áudios) em sequências de
        números chamadas <span className="text-brand">vetores</span>.
      </p>
      <p>
        Esses números capturam o <span className="text-brand">significado</span> (a semântica) do conteúdo. O objetivo
        principal é fazer com que o computador entenda relações e encontre semelhanças usando matemática simples.
      </p>
      <p className="text-fg-secondary">
        Cada vetor tem centenas ou milhares de números. O text-embedding-3-small, por exemplo, gera 1536.
      </p>
    </div>
  );
}
