import {defineConfig, loadEnv} from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __API__: JSON.stringify(env.VITE_API),
      __API_KEY__: JSON.stringify(env.VITE_API_KEY),
    },
  }
});