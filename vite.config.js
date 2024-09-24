import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactCssModules from '@vitejs/plugin-react-css-modules';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactCssModules()],
  build: {
    rollupOptions: {
      external: ['mapbox-gl', '@mapbox/gl']
    }
  }
})
