import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/helpers": "/src/helpers",
      "@/interfaces": "/src/interfaces",
      "@/types": "/src/types"
    }
  }
})
