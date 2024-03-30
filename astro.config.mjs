import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";

import partytown from "@astrojs/partytown";

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
});
