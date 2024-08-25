import * as React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import ImageWithBlur from '@/components/image-with-blur'
import { isEmpty } from 'lodash'
import { getAllPosts, type Post } from '@/lib/posts'
import { formatDate } from '@/utils/format-date'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Author from '@/components/author'
import config from '@/config'

export const metadata: Metadata = {
  title: `${config.defaultTitle} - All Posts`,
  description: 'All posts at ltclmb.dev',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/posts/`,
  },
  openGraph: {
    title: `${config.defaultTitle} - All Posts`,
    description: 'All posts at ltclmb.dev',
    url: `${process.env.NEXT_PUBLIC_URL}/posts/`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/posts/opengraph-image`,
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
    images: [`${process.env.NEXT_PUBLIC_URL}/posts/opengraph-image`],
  },
}

const RecentPostPreview: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-gradient-to-tr from-[#538392] to-[#76ABAE] rounded-lg shadow-2xl shadow-gray-500/20">
    <Card className="bg-transparent rounded-nonem text-white">
      <Link href={`/posts/${post.slug.current}`} className="block">
        <CardContent className="flex gap-5 pt-6">
          <div className="lg:w-1/2 flex flex-col">
            <div className="grow">
              <CardTitle className="text-2xl xl:text-3xl line-clamp-2">
                {post.title}
              </CardTitle>
              <p className="text-white/50 mt-2 xl:mt-4">
                {formatDate(post.publishedAt)}
              </p>
              <p className="mt-6 xl:mt-8 line-clamp-5 xl:line-clamp-6 text-lg">
                {post.description}
              </p>
            </div>
            <Author className="mt-4" />
          </div>
          <div className="hidden lg:block w-1/2">
            {post.mainImage && (
              <div className="rounded-lg overflow-hidden">
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
  <Card className="bg-slate-100 duration-150 dark:bg-[#31363F] hover:bg-white hover:dark:bg-white/25 shadow-2xl shadow-gray-500/20 overflow-hidden dark:shadow-none flex">
    <Link href={`/posts/${post.slug.current}`} className="flex flex-col w-full">
      <CardHeader className="pb-3">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p>
        <p className="mt-4 xl:mt-6 line-clamp-6 md:line-clamp-3">
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
    <div className="container pb-16 md:pb-24 lg:pb-40 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        All Posts
      </h1>
      <h2 className="text-base text-muted-foreground font-medium md:text-lg mb-10 md:mb-16 text-center">
        Here I post my modest thoughts on front-end development
      </h2>
      {recentPost && <RecentPostPreview post={recentPost} />}
      {!isEmpty(restPosts) && (
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {restPosts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
