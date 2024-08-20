import React from 'react'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import PostTemplate from '@/templates/post-template'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/posts/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_URL}/posts/${params.slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/posts/${params.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [
        `${process.env.NEXT_PUBLIC_URL}/posts/${params.slug}/opengraph-image`,
      ],
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
    <div className="container pb-40 pt-8 md:pt-12">
      <PostTemplate post={post} />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug.current,
  }))
}
