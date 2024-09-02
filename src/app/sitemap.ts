import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { env } from '@/env.mjs'
import { getAllPlaygroundItems, type Playground } from '@/lib/playground'
import { getAllPosts, type Post } from '@/lib/posts'

async function getPlaygroundSlugs(): Promise<string[]> {
  const playgroundPath = path.join(process.cwd(), 'src', 'app', 'playground')
  const entries = fs
    .readdirSync(playgroundPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'page.tsx')
    .map(dirent => dirent.name)

  return entries
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const posts = await getAllPosts()
  const playgroundItems = await getAllPlaygroundItems()

  // Posts index
  sitemapEntries.push({
    url: `${env.NEXT_PUBLIC_URL}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  })

  // Individual Posts
  posts.forEach((post: Post) => {
    let url: string
    let priority: number
    let changeFrequency:
      | 'yearly'
      | 'monthly'
      | 'weekly'
      | 'daily'
      | 'hourly'
      | 'always'
      | 'never'

    url = `${env.NEXT_PUBLIC_URL}/posts/${post.slug.current}`
    priority = 0.8
    changeFrequency = 'monthly'

    sitemapEntries.push({
      url,
      lastModified: new Date(post._updatedAt),
      changeFrequency,
      priority,
    })
  })

  // Playground index
  sitemapEntries.push({
    url: `${env.NEXT_PUBLIC_URL}/playground`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  })

  // Individual Playgrounds
  playgroundItems.forEach((playground: Playground) => {
    let url: string
    let priority: number
    let changeFrequency:
      | 'yearly'
      | 'monthly'
      | 'weekly'
      | 'daily'
      | 'hourly'
      | 'always'
      | 'never'

    url = `${env.NEXT_PUBLIC_URL}/playground/${playground.slug.current}`
    priority = 0.8
    changeFrequency = 'daily'

    sitemapEntries.push({
      url,
      lastModified: new Date(playground._updatedAt),
      changeFrequency,
      priority,
    })
  })

  // About
  sitemapEntries.push({
    url: `${env.NEXT_PUBLIC_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  })

  // Homepage
  sitemapEntries.unshift({
    url: `${env.NEXT_PUBLIC_URL}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}
