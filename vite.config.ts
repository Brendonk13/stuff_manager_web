import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import * as path from "path"

// https://vitejs.dev/config/
// export default defineConfig({
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, ".")

  return {
    plugins: [react()],
    resolve: {
    alias: [{
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      }]
    },
    server: {
      port: env.VITE_PORT,
    },
  }
})
