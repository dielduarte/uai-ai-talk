import { Chip } from "../../components/Chip";

// Official adapters in github.com/vercel/chat/tree/main/packages (checked Oct 2026).
const PLATFORMS = [
  "Slack",
  "Microsoft Teams",
  "Google Chat",
  "Discord",
  "Telegram",
  "WhatsApp",
  "Messenger",
  "Instagram",
  "X",
  "Gmail",
  "Twilio",
  "Linear",
  "Notion",
  "Web",
  "GitHub",
];
const STATE = ["Redis", "ioredis", "Postgres", "memória"];
const MAESTRIO = "GitHub";

export function Platforms() {
  return (
    <div className="grid w-full max-w-7xl grid-cols-[auto_1fr] items-center gap-16">
      <div className="flex flex-col gap-4">
        <span className="font-display text-[clamp(5rem,11vw,10rem)] font-bold leading-none text-brand">
          {PLATFORMS.length}
        </span>
        <span className="text-[clamp(1.1rem,1.7vw,1.6rem)]">adapters de plataforma</span>
        <span className="font-mono text-fg-secondary">
          + {STATE.length} de estado: {STATE.join(", ")}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {PLATFORMS.map((name) => (
          <Chip key={name} name={name} state={name === MAESTRIO ? "served" : "idle"} />
        ))}
      </div>
    </div>
  );
}
