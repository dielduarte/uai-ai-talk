import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so the same build works at the root locally and under
  // /uai-ai-talk/ on GitHub Pages.
  base: "./",
  plugins: [react(), tailwindcss()],
});
