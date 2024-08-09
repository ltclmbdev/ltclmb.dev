import React from 'react'
import { client } from '@/sanity/lib/client'
import { SanityDocument } from '@sanity/client'
import Image from 'next/image'
import MdxContent from '@/components/mdx-content'
import { getAllPosts, getPostBySlug, type Post } from '@/lib/posts'
import PostTemplate from '@/templates/post-template'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  return <PostTemplate post={post} />
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post: SanityDocument) => ({
    slug: post.slug.current,
  }))
}
