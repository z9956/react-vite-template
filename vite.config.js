import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// const BASE_URL = 'http://47.102.155.141:9000';
// const BASE_URL = 'http://106.15.102.27:9000';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					// rewrite: (path) => path.replace(/^\/api/, ''),
				},
				'/auth': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					// rewrite: (path) => path.replace(/^\/auth/, ''),
				},
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		// 如果你想在代码中通过环境变量定义一些全局常量
		// define: {
		// 	__APP_ENV__: JSON.stringify(env.APP_ENV),
		// },
	};
});
