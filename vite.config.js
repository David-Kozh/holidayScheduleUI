import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const testEntry = './EmployeeTable.test.jsx'; // Test file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  test: {
    // Specify the entry point for testing
    entry: testEntry,
  },

  // Add Vite's testing configuration
  build: {
    rollupOptions: {
      input: './src/main.jsx', // Adjust the path to entry point
    },
  },
  server: {
    proxy: {
      // Proxy configuration if needed
    },
  },
});