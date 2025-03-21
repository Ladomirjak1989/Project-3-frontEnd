import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4010',
        // target: {`${process.env.BACKEND_URL}/auth/google`},
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
