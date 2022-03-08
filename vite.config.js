import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  proxy: { // 代理配置
    '/api': 'http://node.atoz.ac.cn:3001/v1/'
  },
})
