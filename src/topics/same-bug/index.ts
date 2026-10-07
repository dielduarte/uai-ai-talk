import type { Topic } from "../../slides";
import { Concepts } from "./Concepts";
import { CosineSimilarity } from "./CosineSimilarity";
import { DedupFlow } from "./DedupFlow";
import { DedupJudge } from "./DedupJudge";
import { EmbeddingIntro } from "./EmbeddingIntro";
import { MeaningAsPosition } from "./MeaningAsPosition";
import { PgVectorSearch } from "./PgVectorSearch";
import { PgVectorStore } from "./PgVectorStore";
import { WhatAreEmbeddings } from "./WhatAreEmbeddings";
import { WhenToUse } from "./WhenToUse";
import { WhatIsLlmJudge } from "./WhatIsLlmJudge";
import { WhatIsSimilaritySearch } from "./WhatIsSimilaritySearch";
import { SameWords } from "./SameWords";
import { SearchParameters } from "./SearchParameters";
import { SimilarIsNotSame } from "./SimilarIsNotSame";
import { VectorDb } from "./VectorDb";

export const sameBug: Topic = {
  id: "same-bug-twice",
  title: "Como evitar resolver o mesmo bug duas vezes",
  slides: [
    { id: "same-words", title: "Mesmo bug, palavras diferentes", Body: SameWords },
    { id: "concepts", Body: Concepts },
    { id: "what-are-embeddings", title: "O que são embeddings?", Body: WhatAreEmbeddings },
    { id: "embedding-intro", title: "Embeddings", steps: 2, Body: EmbeddingIntro },
    { id: "meaning-as-position", title: "Significado vira posição", Body: MeaningAsPosition },
    { id: "vector-db", title: "O que é um vector DB?", Body: VectorDb },
    { id: "pgvector-store", title: "pgvector", Body: PgVectorStore },
    { id: "what-is-similarity-search", title: "O que é similarity search?", Body: WhatIsSimilaritySearch },
    { id: "cosine-similarity", title: "Similaridade de cosseno", steps: 2, Body: CosineSimilarity },
    { id: "search-parameters", title: "Parâmetros da busca", Body: SearchParameters },
    { id: "pgvector-search", title: "SQL example", Body: PgVectorSearch },
    { id: "what-is-llm-judge", title: "O que é LLM as a judge?", Body: WhatIsLlmJudge },
    { id: "similar-is-not-same", title: "Parecido não é igual", Body: SimilarIsNotSame },
    { id: "dedup-judge", title: "dedup-judge", Body: DedupJudge },
    { id: "dedup-flow", centered: true, steps: 4, Body: DedupFlow },
  ],
  whenToUse: { Body: WhenToUse },
};
