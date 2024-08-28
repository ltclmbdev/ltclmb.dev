import React from 'react'
import { Metadata } from 'next'
import config from '@/config'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import PostTemplate from '@/templates/post-template'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: `${config.defaultSiteUrl}/posts/${params.slug}`,
    },
    openGraph: {
      title: post?.title,
      description: post?.description,
      type: 'article',
      url: `${config.defaultSiteUrl}/posts/${params.slug}`,
      images: [
        {
          url: `${config.defaultSiteUrl}/posts/${params.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.description,
      images: [`${config.defaultSiteUrl}/posts/${params.slug}/opengraph-image`],
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
