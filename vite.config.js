import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/adminapi': {
				target: 'http://xxx.xxx.com', // 后端接口
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	// resolve: {
	// 	alias: {
	// 		'@': resolve(__dirname, 'src'),
	// 	},
	// },
});
