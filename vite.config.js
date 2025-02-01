import vue from '@vitejs/plugin-vue';
import eslint from '@rollup/plugin-eslint';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import path module
import { VitePWA } from 'vite-plugin-pwa';

/**
 * @type {import('vite').UserConfig}
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        // content of manifest
      },
      workbox: {
        // workbox options for generateSW
      },
    }),
    {
      ...eslint({
        include: ['./src/**/*.vue', './src/**/*.js'],
      }),
      enforce: 'pre',
    },
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'), // Now using path correctly
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'highlight.js': ['highlight.js'],
          codemirror: ['codemirror'],
          showdown: ['showdown'],
        },
      },
    },
  },
};
