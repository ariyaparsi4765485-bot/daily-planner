import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Daily Planner",
        short_name: "Planner",
        description: "مدیریت برنامه روزانه شخصی",
        theme_color: "#064e3b",
        background_color: "#022c22",
        display: "standalone",
        direction: "rtl",
        lang: "fa",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});