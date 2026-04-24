import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
				},
				'/auth': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
				},
			},
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	};
});
