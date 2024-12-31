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
      filter: (page) => {
        // Match paginated paths like dejuan-jones/1, blog/1, etc.
        const isPaginatedPath = page.match(/\/(dejuan-jones|blog)\/\d+\/?$/);
        const excludedPaths = [
          'https://earnonlinemoney.org/search/',
          'https://earnonlinemoney.org/privacy-policy/',
          'https://earnonlinemoney.org/404/',
        ];
        return !isPaginatedPath && !excludedPaths.includes(page);
      },
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
