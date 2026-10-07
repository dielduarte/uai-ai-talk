import type { Part } from "../../slides";
import { BotFlow } from "./BotFlow";
import { MaestrioBot } from "./MaestrioBot";
import { Platforms } from "./Platforms";
import { WhatIsChatSdk } from "./WhatIsChatSdk";
import { WhyChatSdk } from "./WhyChatSdk";

export const chatSdk: Part = {
  id: "chat-sdk",
  title: "Chat SDK",
  slides: [
    { id: "what-is-chat-sdk", title: "O que é o Chat SDK?", Body: WhatIsChatSdk },
    { id: "platforms", title: "Um bot, 15 plataformas", Body: Platforms },
    { id: "maestrio-bot", title: "Exemplo", steps: 2, Body: MaestrioBot },
    { id: "why-chat-sdk", title: "Por que não fazer na mão?", Body: WhyChatSdk },
    { id: "bot-flow", centered: true, steps: 3, Body: BotFlow },
  ],
};
