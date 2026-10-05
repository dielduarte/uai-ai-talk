import { AnimatePresence, motion } from "motion/react";
import { ContentSlide } from "./components/ContentSlide";
import { TitleSlide } from "./components/TitleSlide";
import type { Slide } from "./slides";
import { slides } from "./topics";
import { useDeck } from "./useDeck";

const pad = (n: number) => String(n).padStart(2, "0");
const steps = slides.map((s) => s.steps);

function SlideView({ slide, step }: { slide: Slide; step: number }) {
  switch (slide.kind) {
    case "intro":
      return <TitleSlide eyebrow="Demo" title={slide.title} />;
    case "section":
      return <TitleSlide eyebrow={pad(slide.number)} title={slide.topic.title} />;
    case "content":
      return (
        <ContentSlide
          eyebrow={`${pad(slide.number)} · ${slide.topic.title}`}
          title={slide.title}
          step={step}
          Body={slide.Body}
        />
      );
  }
}

export function App() {
  const { slide: index, step, direction, go } = useDeck(steps);
  const slide = slides[index];

  return (
    <main
      className="bg-stage-radial relative flex h-dvh w-full cursor-pointer select-none flex-col overflow-hidden px-[6vw] py-[5vh]"
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

      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div key={slide.id} custom={direction} initial="enter" animate="center" exit="exit">
            <SlideView slide={slide} step={step} />
          </motion.div>
        </AnimatePresence>
      </div>

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
