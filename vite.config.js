import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit to 1000 kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunking strategy to split vendor code
        manualChunks: {
          // React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI and Animation libraries
          'ui-vendor': ['framer-motion', 'react-helmet'],

          // Chart libraries (often large)
          'charts': ['recharts'],

          // Icon libraries (can be large)
          'icons': ['react-icons', 'lucide-react'],

          // Stripe libraries
          'stripe-vendor': ['@stripe/react-stripe-js', '@stripe/stripe-js'],

          // HTTP client
          'http-vendor': ['axios'],
        },
      },
    },
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'axios',
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
