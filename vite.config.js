import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8000', // 后端接口
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	// resolve: {
	// 	alias: {
	// 		'@': resolve(__dirname, 'src'),
	// 	},
	// },
});
