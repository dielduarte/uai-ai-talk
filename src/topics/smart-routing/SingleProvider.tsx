const RISKS = [
  "o provedor cai, seu produto cai junto",
  "rate limit no pico de uso",
  "preço e latência mudam de provedor pra provedor",
  "cada um com sua API, seu SDK e sua chave",
];

export function SingleProvider() {
  return (
    <ul className="flex list-disc flex-col gap-4 pl-8 text-[clamp(1.25rem,2.2vw,2rem)] marker:text-sev-high">
      {RISKS.map((risk) => (
        <li key={risk}>{risk}</li>
      ))}
    </ul>
  );
}
