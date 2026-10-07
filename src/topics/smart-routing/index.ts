import type { Part } from "../../slides";
import { AutoRouter } from "./AutoRouter";
import { Gateway } from "./Gateway";
import { ModelFallback } from "./ModelFallback";
import { Pricing } from "./Pricing";
import { ProviderFallback } from "./ProviderFallback";
import { ProviderSort } from "./ProviderSort";
import { SingleProvider } from "./SingleProvider";

export const smartRouting: Part = {
  id: "smart-routing",
  title: "Smart routing com OpenRouter",
  slides: [
    { id: "single-provider", title: "Se você depende de um provedor só", Body: SingleProvider },
    { id: "gateway", title: "O que é o OpenRouter?", Body: Gateway },
    { id: "provider-fallback", title: "Provider fallback", steps: 2, Body: ProviderFallback },
    { id: "model-fallback", title: "Model fallback", Body: ModelFallback },
    { id: "auto-router", title: "Auto Router", Body: AutoRouter },
    { id: "provider-sort", title: "Otimizando o roteamento", Body: ProviderSort },
    { id: "pricing", title: "Quanto custa?", Body: Pricing },
  ],
};
