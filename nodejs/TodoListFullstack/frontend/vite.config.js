import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',  // Expose the frontend on all network interfaces
    port: 3000        // Set the port to 5173
  },
  define: {
    // Pass the backend URL as an environment variable
    'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000')
  }
})
