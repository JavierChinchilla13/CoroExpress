import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Cambiar a "/" si el proyecto se sirve desde el root
  plugins: [react()],
  build: {
    outDir: "dist", // Carpeta de salida
    assetsDir: "assets", // Carpeta para archivos estáticos
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
