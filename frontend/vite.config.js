import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.js",
    },
    esbuild: {
      loader: 'jsx',
      include: '/src\//.*\.js$/',
      exclude: [],
    }
  }
});
