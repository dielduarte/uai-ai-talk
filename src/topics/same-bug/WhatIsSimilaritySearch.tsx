export function WhatIsSimilaritySearch() {
  return (
    <div className="flex max-w-[42ch] flex-col gap-6 font-display text-[clamp(1.15rem,2vw,2rem)] font-bold leading-tight">
      <p>
        Um <span className="text-brand">algoritmo de busca</span>: dado um vetor novo, encontra os vetores mais próximos
        dele. Perto no espaço significa parecido no significado.
      </p>
      <p>
        A medida mais usada é a <span className="text-brand">similaridade de cosseno</span>: compara a direção dos
        vetores. Quanto mais perto de 1, mais parecidos.
      </p>
    </div>
  );
}
