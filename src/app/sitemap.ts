import { MetadataRoute } from 'next'
import { getAllPosts, type Post } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const posts = await getAllPosts()

  // Posts
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

    url = `${process.env.NEXT_PUBLIC_URL}/posts/${post.slug.current}`
    priority = 0.8
    changeFrequency = 'monthly'

    sitemapEntries.push({
      url,
      lastModified: new Date(post._updatedAt),
      changeFrequency,
      priority,
    })
  })

  // About
  sitemapEntries.unshift({
    url: `${process.env.NEXT_PUBLIC_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  })

  // Homepage
  sitemapEntries.unshift({
    url: `${process.env.NEXT_PUBLIC_URL}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}
