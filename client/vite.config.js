import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 5500 은 VS Code Live Server 가 써서 겹치지 않게 3000 으로 고정해요
  // (카카오맵을 쓰려면 카카오 개발자 콘솔에 http://localhost:3000 을 등록해야 해요)
  server: { port: 3000, strictPort: true },
  resolve: {
    // "@/constants" 처럼 쓰면 src/constants 를 가리켜요
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
