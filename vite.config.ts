

import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  base: '/react-task-3.2.3/',
  test: {
    
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
})