import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the site lives at https://<user>.github.io/<repo>/ so the
// build needs that subpath baked into asset URLs. Locally (npm run dev) the
// base is just "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Engineering-Economy-Project/' : '/',
  server: { port: 5173, open: true },
}));
