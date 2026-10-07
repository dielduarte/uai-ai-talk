import type { Topic } from "../../slides";
import { DelimitedPrompt } from "./DelimitedPrompt";
import { EverythingIsText } from "./EverythingIsText";
import { GrayZone } from "./GrayZone";
import { GuardPattern } from "./GuardPattern";
import { Spotlighting } from "./Spotlighting";
import { WhenToProtect } from "./WhenToProtect";

export const promptInjection: Topic = {
  id: "prompt-injection",
  title: "Prompt injection",
  slides: [
    { id: "everything-is-text", title: "Pra um LLM, tudo é texto", steps: 2, Body: EverythingIsText },
    { id: "guard-pattern", steps: 3, centered: true, Body: GuardPattern },
    { id: "delimited-prompt", title: "Use delimiting para resultados melhores", steps: 2, Body: DelimitedPrompt },
    { id: "spotlighting", title: "Spotlighting", Body: Spotlighting },
  ],
  whenToUse: { Body: WhenToProtect },
  bridge: { id: "gray-zone", title: "A zona cinzenta", Body: GrayZone },
};
