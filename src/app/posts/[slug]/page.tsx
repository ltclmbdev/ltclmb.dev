import React from 'react'
import { client } from '@/sanity/lib/client'
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
