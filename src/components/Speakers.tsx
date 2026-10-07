// Photos are saved locally so the deck works offline.
const SPEAKERS = [
  { name: "Diel Duarte", handle: "dielduarte", photo: `${import.meta.env.BASE_URL}speakers/dielduarte.jpg` },
  { name: "Charles Assunção", handle: "assuncaocharles", photo: `${import.meta.env.BASE_URL}speakers/assuncaocharles.jpg` },
];

export function Speakers() {
  return (
    <ul className="flex gap-12">
      {SPEAKERS.map(({ name, handle, photo }) => (
        <li key={handle} className="flex flex-col items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="size-[min(28vh,16rem)] rounded-2xl border border-brand-border object-cover"
          />
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold">{name}</span>
            <span className="font-mono text-fg-secondary">@{handle}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
