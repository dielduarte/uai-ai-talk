import type { Topic } from "../../slides";
import { aiSdk } from "../ai-sdk";
import { chatSdk } from "../chat-sdk";
import { smartRouting } from "../smart-routing";

export const agnostic: Topic = {
  id: "agnostic",
  title: "Como crescer agnóstico, garantir redundância e velocidade no desenvolvimento do seu produto",
  parts: [
    smartRouting,
    aiSdk,
    chatSdk,
  ],
};
