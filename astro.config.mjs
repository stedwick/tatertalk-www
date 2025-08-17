// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_APP_URL: envField.string({ 
        context: "client", 
        access: "public", 
        default: "https://v2.tatertalk.app" 
      }),
      PUBLIC_YOUTUBE_VIDEO_URL: envField.string({ 
        context: "client", 
        access: "public", 
        default: "https://www.youtube.com/watch?v=zOpNAK2r0F0" 
      })
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});