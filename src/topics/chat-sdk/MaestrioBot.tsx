import { CodeBlock } from "../../components/CodeBlock";
import type { StepProps } from "../../slides";

// Simplified from maestrio.ai packages/chat-bot/src/index.ts (createMaestroBot).
// The Slack lines follow @chat-adapter/slack's README: no arguments, config from env vars.
export function MaestrioBot({ step }: StepProps) {
  const withSlack = step >= 1;

  return (
    <CodeBlock
      emphasize={withSlack ? ["createSlackAdapter", "@chat-adapter/slack"] : []}
      code={`import { Chat } from "chat";
import { createGitHubAdapter } from "@chat-adapter/github";${
        withSlack ? `\nimport { createSlackAdapter } from "@chat-adapter/slack";` : ""
      }
import { createRedisState } from "@chat-adapter/state-redis";

const bot = new Chat({
  userName: "maestrio",
  adapters: {
    github: createGitHubAdapter({ appId, privateKey, webhookSecret }),${withSlack ? `\n    slack: createSlackAdapter(),` : ""}
  },
  state: createRedisState({ url: redisUrl }),
});

bot.onNewMention(async (thread, message) => { ... });`}
    />
  );
}
