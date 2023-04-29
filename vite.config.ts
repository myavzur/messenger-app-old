import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src"),
      "@/app": path.resolve(__dirname, "src/app"),
      "@/processes": path.resolve(__dirname, "src/processes"),
      "@/screens": path.resolve(__dirname, "src/screens"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/widgets": path.resolve(__dirname, "src/widgets"),
      "@/features": path.resolve(__dirname, "src/features"),
      "@/entities": path.resolve(__dirname, "src/entities"),
      "@/shared": path.resolve(__dirname, "src/shared")
    },
  },
  plugins: [react()],
})
