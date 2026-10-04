import { AnimatePresence, motion } from "motion/react";
import { TitleSlide } from "./components/TitleSlide";
import { slides } from "./slides";
import { useDeck } from "./useDeck";

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
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </header>

      <AnimatePresence mode="wait" custom={step} initial={false}>
        <motion.div key={slide.id} custom={step} initial="enter" animate="center" exit="exit">
          <TitleSlide slide={slide} number={index + 1} />
        </motion.div>
      </AnimatePresence>

      <footer className="flex gap-2">
        {slides.map((s, i) => (
          <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-muted-bg">
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
