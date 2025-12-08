import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { yamlDataPlugin } from './vite-plugins/yaml-data-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    yamlDataPlugin({ dataDir: './data' }),
    tailwindcss(),
    react()
  ],
})
