
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import mkcert from 'vite-plugin-mkcert'

import partytown from "@astrojs/partytown";

const isDev = process.env.NODE_ENV === 'development';

// https://docs.astro.build/en/guides/routing/#modifying-the-slug-example-for-ssr
// https://www.netlify.com/blog/how-to-deploy-astro/
// https://astro.build/config
export default defineConfig({
  site: "https://article.womynarchive.com",
  integrations: [
    mdx(),
    sitemap(),
    svelte(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: isDev ? [mkcert()] : [],
  },
  redirects: {
    '/type-her-story/share': '/type-her-story'
  }
});
