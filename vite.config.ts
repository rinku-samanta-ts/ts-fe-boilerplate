import path from 'path'
import { defineConfig } from 'vite'
import { z } from 'zod'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    ValidateEnv({
      validator: 'zod',
      schema: {
        VITE_APP_URL: z.string().url('Invalid URL format!'),
        VITE_COOKIE_BASED_AUTHENTICATION: z.enum(["true","false"]),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
