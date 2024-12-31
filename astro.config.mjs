import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import alpinejs from '@astrojs/alpinejs';
import robotsTxt from 'astro-robots-txt';
import remarkMath from 'remark-math';
import remarkEmoji from 'remark-emoji';
import rehypeKatex from 'rehype-katex';
import remarkPlantUML from '@akebifiky/remark-simple-plantuml';
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs';
import { remarkDiagram } from './remark-plugins/remark-diagram.mjs';
import icon from "astro-icon";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: 'https://earnonlinemoney.org',
  vite: {
    ssr: {
      external: ['svgo'],
      noExternal: ['swiper', 'leaflet']
    }
  },
  build: {
    format: 'directory', // Ensures clean URLs (no index.html in the route)
  },
  integrations: [
    icon(),
    tailwind(),
    sitemap({
      entryLimit: 50000, // Forces a single sitemap unless more than 50,000 URLs exist
      filter: (url) => !url.includes('/search') 
                   && !url.includes('/privacy-policy') 
                   && !url.includes('/404')
                   && !url.includes('/blog/page/'),
    }),
    mdx(),
    alpinejs(),
    robotsTxt(),
    markdoc(),
  ],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      remarkReadingTime,
      remarkMath,
      remarkPlantUML,
      remarkDiagram,
      remarkEmoji,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  scopedStyleStrategy: "where",
});
