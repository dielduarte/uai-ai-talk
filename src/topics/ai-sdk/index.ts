import type { Part } from "../../slides";
import { MoreApis } from "./MoreApis";
import { SWAP_PROVIDER_STEPS, SwapProvider } from "./SwapProvider";
import { WhatIsAiSdk } from "./WhatIsAiSdk";

export const aiSdk: Part = {
  id: "ai-sdk",
  title: "AI SDK",
  slides: [
    { id: "what-is-ai-sdk", title: "O que é o AI SDK?", Body: WhatIsAiSdk },
    { id: "swap-provider", title: "Trocar de provedor é trocar uma linha", steps: SWAP_PROVIDER_STEPS, Body: SwapProvider },
    { id: "more-apis", title: "E muito mais", Body: MoreApis },
  ],
};
