import React from 'react'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
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
