import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // import 할 때 "@/..." = "src/..." (예: import Main from "@/pages/Main")
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
