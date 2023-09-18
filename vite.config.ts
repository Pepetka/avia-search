import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			svgr({
				exportAsDefault: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		define: {
			__API__: JSON.stringify(env.VITE_API),
			__API_KEY__: JSON.stringify(env.VITE_API_KEY),
		},
	};
});
