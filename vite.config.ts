import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// A small Vite plugin to intercept Figma asset imports in downloaded code
// and return a transparent 1x1 placeholder image so the build doesn't crash.
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-mock',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return '\0' + id;
      }
    },
    load(id) {
      if (id.startsWith('\0figma:asset/')) {
        const emptyImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        return `export default ${JSON.stringify(emptyImageBase64)};`;
      }
    }
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
