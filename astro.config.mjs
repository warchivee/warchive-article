import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";

// https://www.netlify.com/blog/how-to-deploy-astro/
// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), svelte()],
  output: "server",
  adapter: netlify(),
});
