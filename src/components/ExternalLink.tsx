export function ExternalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => event.stopPropagation()}
      className="w-fit font-mono text-fg-secondary underline underline-offset-4 hover:text-brand"
    >
      {href}
    </a>
  );
}
