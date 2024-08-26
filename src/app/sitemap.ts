import { MetadataRoute } from 'next'
import { getAllPosts, type Post } from '@/lib/posts'
import config from '@/config'
import fs from 'fs'
import path from 'path'

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
  const playgroundSlugs = await getPlaygroundSlugs()

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

    url = `${config.defaultSiteUrl}/posts/${post.slug.current}`
    priority = 0.8
    changeFrequency = 'monthly'

    sitemapEntries.push({
      url,
      lastModified: new Date(post._updatedAt),
      changeFrequency,
      priority,
    })
  })

  // Playground pages
  playgroundSlugs.forEach((slug: string) => {
    sitemapEntries.push({
      url: `${config.defaultSiteUrl}/playground/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Posts index
  sitemapEntries.push({
    url: `${config.defaultSiteUrl}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  })

  // Playground index
  sitemapEntries.push({
    url: `${config.defaultSiteUrl}/playground`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  })

  // About
  sitemapEntries.push({
    url: `${config.defaultSiteUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  })

  // Homepage
  sitemapEntries.unshift({
    url: `${config.defaultSiteUrl}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}
