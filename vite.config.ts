import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  plugins: [reactRefresh()]
})
