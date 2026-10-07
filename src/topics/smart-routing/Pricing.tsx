// From openrouter.ai/pricing and openrouter.ai/docs/faq (checked Oct 2026).
const ITEMS = [
  { name: "Tokens", details: ["mesmo preço do provedor, sem markup"] },
  { name: "Créditos", details: ["5.5% de taxa no cartão (mínimo $0.80)", "5% em cripto"] },
  { name: "Sua própria chave (BYOK)", details: ["sem taxa até US$ 25 mil/mês em uso de tokens", "depois disso, 5% do valor usado"] },
];

export function Pricing() {
  return (
    <ul className="grid w-full max-w-6xl grid-cols-3 gap-x-12">
      {ITEMS.map(({ name, details }) => (
        <li key={name} className="flex flex-col gap-2">
          <span className="font-display text-[clamp(1.4rem,2.4vw,2.25rem)] font-bold">{name}</span>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-[clamp(1rem,1.5vw,1.4rem)] text-fg-secondary marker:text-brand">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
