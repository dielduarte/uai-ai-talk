// Names from ai-sdk.dev/docs/reference (AI SDK Core and AI SDK UI), stable APIs only.
const GROUPS = [
  { name: "texto", apis: ["generateText", "streamText", "Output", "smoothStream"] },
  { name: "embeddings", apis: ["embed", "embedMany", "cosineSimilarity"] },
  { name: "mídia", apis: ["generateImage", "generateSpeech", "transcribe"] },
  { name: "tools e agentes", apis: ["tool", "toolSearch", "createMCPClient", "isStepCount", "hasToolCall"] },
  {
    name: "middleware",
    apis: ["wrapLanguageModel", "extractReasoningMiddleware", "extractJsonMiddleware", "defaultSettingsMiddleware"],
  },
  { name: "schemas e provedores", apis: ["jsonSchema", "zodSchema", "createProviderRegistry"] },
  {
    name: "UI",
    apis: ["useChat", "useCompletion", "useObject", "createUIMessageStream", "convertToModelMessages"],
  },
];

export function MoreApis() {
  return (
    <div className="grid w-full max-w-7xl grid-cols-4 gap-x-10 gap-y-8">
      {GROUPS.map(({ name, apis }) => (
        <div key={name} className="flex flex-col gap-2">
          <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">{name}</span>
          <ul className="flex flex-col gap-1 font-mono text-[clamp(0.8rem,1.15vw,1.1rem)] text-brand">
            {apis.map((api) => (
              <li key={api}>{api}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
