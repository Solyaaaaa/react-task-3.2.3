

import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/SpaseX-Launches-2020/',
  plugins: [react()],
  test: {
    
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
})