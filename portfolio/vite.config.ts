import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mro_portfolio/",
  plugins: [react()],
});
