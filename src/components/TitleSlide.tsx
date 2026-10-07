import { AnimatedTitle, Eyebrow } from "./AnimatedTitle";

// Beyond this many characters the display size would push the title off screen.
const LONG_TITLE = 48;

export function TitleSlide({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="flex flex-col gap-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <AnimatedTitle
        text={title}
        className={`leading-[1.05] ${
          title.length > LONG_TITLE ? "max-w-[26ch] text-[clamp(2.25rem,4.5vw,4.75rem)]" : "max-w-[18ch] text-[clamp(3rem,7vw,7.5rem)]"
        }`}
      />
    </section>
  );
}
