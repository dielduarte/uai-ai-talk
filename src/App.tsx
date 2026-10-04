import { AnimatePresence, motion } from "motion/react";
import { TitleSlide } from "./components/TitleSlide";
import { slides, type Slide } from "./slides";
import { useDeck } from "./useDeck";

const pad = (n: number) => String(n).padStart(2, "0");

function titleOf(slide: Slide) {
  switch (slide.kind) {
    case "intro":
      return { eyebrow: "Demo", title: slide.title };
    case "section":
      return { eyebrow: pad(slide.number), title: slide.topic.title };
    case "when":
      return { eyebrow: `${pad(slide.number)} · ${slide.topic.title}`, title: "Quando usar?" };
  }
}

export function App() {
  const { index, step, go } = useDeck(slides.length);
  const slide = slides[index];

  return (
    <main
      className="bg-stage-radial relative flex h-dvh w-full cursor-pointer select-none flex-col justify-between overflow-hidden px-[6vw] py-[5vh]"
      onClick={() => go("next")}
      onContextMenu={(event) => {
        event.preventDefault();
        go("prev");
      }}
    >
      <header className="flex items-center justify-between font-mono text-sm uppercase tracking-widest text-fg-muted">
        <span>
          <span className="text-brand">●</span> uai ai · 08 out 2026
        </span>
        <span className="tabular-nums">
          {pad(index + 1)} / {pad(slides.length)}
        </span>
      </header>

      <AnimatePresence mode="wait" custom={step} initial={false}>
        <motion.div key={slide.id} custom={step} initial="enter" animate="center" exit="exit">
          <TitleSlide {...titleOf(slide)} />
        </motion.div>
      </AnimatePresence>

      <footer className="flex gap-1">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`h-1 flex-1 overflow-hidden rounded-full bg-muted-bg ${s.kind === "section" ? "ml-4" : ""}`}
          >
            <motion.div
              className="h-full bg-brand"
              initial={false}
              animate={{ scaleX: i <= index ? 1 : 0 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        ))}
      </footer>
    </main>
  );
}
