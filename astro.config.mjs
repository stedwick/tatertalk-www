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
        'twemoji': ['*'],
        'logos': ['*']
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
      }),
      PUBLIC_TWITTER_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://x.com/stedwick"
      }),
      PUBLIC_GITHUB_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://github.com/stedwick"
      }),
      PUBLIC_YOUTUBE_CHANNEL_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://www.youtube.com/@PhilipBrocoum"
      }),
      PUBLIC_FACEBOOK_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://www.facebook.com/philip.brocoum/"
      }),
      PUBLIC_PERSONAL_WEBSITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://philipbrocoum.com"
      }),
      PUBLIC_PHILS_APP_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://phils.app"
      }),
      PUBLIC_LINKEDIN_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://www.linkedin.com/in/philipbrocoum/"
      }),
      PUBLIC_PRIVACY_POLICY_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://phils.app/blog/privacy/"
      }),
      PUBLIC_MAILTO_URL: envField.string({
        context: "client",
        access: "public",
        default: "mailto:tatertalk@googlegroups.com"
      })
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});