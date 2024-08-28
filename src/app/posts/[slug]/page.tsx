import React from 'react'
import { Metadata } from 'next'
import { generateBaseMetadata } from '@/config'
import { env } from '@/env.mjs'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import PostTemplate from '@/templates/post-template'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  const baseMetadata: Metadata = generateBaseMetadata(`/posts/${params.slug}`)

  return {
    ...baseMetadata,
    title: `${post?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: `${post?.description}`,
    openGraph: {
      title: `${post?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      url: `/posts/${params.slug}`,
      images: [
        {
          url: `/posts/${params.slug}/opengraph-image`,
        },
      ],
    },
    twitter: {
      title: `${post?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      description: `${post?.description}`,
      images: [`/posts/${params.slug}/opengraph-image`],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  return (
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      {post && <PostTemplate post={post} />}
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug.current,
  }))
}
