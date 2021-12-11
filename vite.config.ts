import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    // alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    server: {
        watch: {
            ignored: /node_modules/,
            //https://cn.vitejs.dev/config/#server-watch WSL2需配置
            usePolling: true,
        },
    },
    plugins: [react()]
})
