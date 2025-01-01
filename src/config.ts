import { getCollection, type CollectionEntry } from 'astro:content'

export interface TagType {
  tag: string
  count: number
  pages: CollectionEntry<'blog'>[]
}

export const SiteMetadata = {
  title: 'Earn Money Online',
  description: 'Ultimate guide to earn money online free, quick or easy. Find trending side hustles, passive income ideas, cash injections online jobs & more',
  author: {
    name: 'Dejuan Jones',
    twitter: '@moneyonline_fre',
    url: 'https://earnonlinemoney.org/dejuan-jones',
    email: 'jonesdejuan24@gmail.com',
    summary: 'Want to stay up to date with the latest trends to make money online and offline? Follow us on social media.'
  },
  org: {
    name: 'Earn Money Online',
    twitter: '@moneyonline_fre',
    url: 'https://earnonlinemoney.org',
    email: 'jonesdejuan24@gmail.com',
    summary:
      'Ultimate guide to earn money online free, quick or easy. Find trending side hustles, passive income ideas, cash injections online jobs & more.'
  },
  location: 'Rivendell, Middle Earth',
  latlng: [-33.86785, 151.20732] as [number, number],
  repository: 'https://github.com/Juan-Jones/adablog',
  buildTime: new Date()
}

export { default as Logo } from '/public/favicon.svg'
export { default as LogoImage } from '/public/favicon.svg'
export { default as FeaturedSVG } from './assets/gallery/images/digital-income.svg'
export { default as DefaultSVG } from './assets/gallery/images/digital-income.svg'
export { default as DefaultImage } from './assets/gallery/images/digital-income.svg'

export const NavigationLinks = [
  { name: 'Home', href: '' },
  { name: 'Earn Digital Income', href: 'blog/digital-income-ideas' },
  { name: 'Creative Side Hustles', href: 'blog/creative-side-hustles' },
  { name: 'Passive Income Investments', href: 'blog/passive-income-investments' },
  { name: 'Blog', href: 'blog' },
]

export const PAGE_SIZE = 10

export const GITHUB_EDIT_URL = `https://github.com/Juan-Jones/adablog`

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`

export type Sidebar = Record<string, { text: string; link: string }[]>

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
  return posts.sort((a, b) =>
    a.data.pubDate && b.data.pubDate ? +b.data.pubDate - +a.data.pubDate : 0
  )
}

