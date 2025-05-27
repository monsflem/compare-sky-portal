import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy"; // 👈 NYTT

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/compare-sky-portal/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html', // 👈 denne kopieres etter build
          dest: '',
          rename: '404.html',
        },
      ],
      hook: 'writeBundle', // 👈 viktig: kopier etter at alt er skrevet
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
