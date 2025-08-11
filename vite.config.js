import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  },
  optimizeDeps: {
    include: ['crypto-browserify']
  }
});
