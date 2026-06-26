import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev runs at root ('/'); production build is served from the GitHub Pages
// project subpath ('/portfolio/'). Runtime asset URLs use import.meta.env.BASE_URL.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/portfolio/' : '/',
}))
