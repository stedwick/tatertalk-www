// @ts-check
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        mdi: ['*'],
        'simple-icons': ['*'],
        'flat-color-icons': ['*'],
        'icon-park': ['*'],
        'tdesign': ['*'],
        'noto': ['*'],
        'twemoji': ['*']
      }
    })
  ],
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