import * as React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import Author from '@/components/author'
import ImageWithBlur from '@/components/image-with-blur'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import config from '@/config'
import { getAllPosts, type Post } from '@/lib/posts'
import { formatDate } from '@/utils/format-date'

export const metadata: Metadata = {
  title: `${config.defaultTitle} - All Posts`,
  description: 'All posts at ltclmb.dev',
  alternates: {
    canonical: `${config.defaultSiteUrl}/posts`,
  },
  openGraph: {
    title: `${config.defaultTitle} - All Posts`,
    description: 'All posts at ltclmb.dev',
    url: `${config.defaultSiteUrl}/posts/`,
    images: [
      {
        url: `${config.defaultSiteUrl}/posts/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'All Posts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.defaultTitle} - All Posts`,
    description: 'All posts at ltclmb.dev',
    images: [`${config.defaultSiteUrl}/posts/opengraph-image`],
  },
}

const RecentPostPreview: React.FC<{ post: Post }> = ({ post }) => (
  <div className="rounded-lg bg-gradient-to-tr from-[#538392] to-[#76ABAE] shadow-2xl shadow-gray-500/20">
    <Card className="rounded-nonem bg-transparent text-white">
      <Link href={`/posts/${post.slug.current}`} className="block">
        <CardContent className="flex gap-5 pt-6">
          <div className="flex flex-col lg:w-1/2">
            <div className="grow">
              <CardTitle className="line-clamp-2 text-2xl xl:text-3xl">
                {post.title}
              </CardTitle>
              <p className="mt-2 text-white/50 xl:mt-4">
                {formatDate(post.publishedAt)}
              </p>
              <p className="mt-6 line-clamp-5 text-lg xl:mt-8 xl:line-clamp-6">
                {post.description}
              </p>
            </div>
            <Author className="mt-4" />
          </div>
          <div className="hidden w-1/2 lg:block">
            {post.mainImage && (
              <div className="overflow-hidden rounded-lg">
                <ImageWithBlur
                  src={post.mainImage.secure_url}
                  alt={post.title}
                  width={605}
                  height={392}
                  priority
                  className="border-none"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  </div>
)

const PostPreview: React.FC<{ post: Post }> = ({ post }) => (
  <Card className="flex overflow-hidden bg-slate-100 shadow-2xl shadow-gray-500/20 duration-150 hover:bg-white dark:bg-[#31363F] dark:shadow-none hover:dark:bg-white/25">
    <Link href={`/posts/${post.slug.current}`} className="flex w-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p>
        <p className="mt-4 line-clamp-6 md:line-clamp-3 xl:mt-6">
          {post.description}
        </p>
      </CardContent>
      <CardFooter>
        <Author />
      </CardFooter>
    </Link>
  </Card>
)

export default async function PostsPage() {
  const posts = await getAllPosts()
  const sortedPosts: Post[] = posts.sort(
    (a: Post, b: Post) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const recentPost: Post | null = isEmpty(sortedPosts) ? null : sortedPosts[0]
  const restPosts: Post[] = sortedPosts.length > 1 ? sortedPosts.slice(1) : []

  return (
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        All Posts
      </h1>
      <h2 className="mb-10 text-center text-base font-medium text-muted-foreground md:mb-16 md:text-lg">
        Here I post my modest thoughts on front-end development
      </h2>
      {recentPost && <RecentPostPreview post={recentPost} />}
      {!isEmpty(restPosts) && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {restPosts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
