// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_APP_BASE_URL,
  plugins: [
    vue({
      template: {transformAssetUrls}
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/assets/styles/settings.scss',
      },
    }),
  ],
  define: {
    'process.env': {},
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  sourcemap: {
    server: false,
    client: false
  },
  server: {
    // host: true,
    port: 23000,
  },

  build: {
    transpile: ['vuetify']
  },
})
