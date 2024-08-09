import React from 'react'
import { client } from '@/sanity/lib/client'
import { SanityDocument } from '@sanity/client'
import Image from 'next/image'
import MdxContent from '@/components/mdx-content'

// Define the Post type
type Post = {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
  }
  mainImage: {
    public_id: string
    secure_url: string
  }
  body: string
  publishedAt: string
}

// Fetch post data from Sanity
async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      author->{name},
      mainImage{
        public_id,
        secure_url
      },
      body,
      publishedAt
    }`,
    { slug },
  )
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  return (
    <div className="container">
      <article className="max-w-3xl mx-auto mt-10 text-pretty pb-40">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          By {post.author.name} on{' '}
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {post.mainImage && (
          <Image
            src={post.mainImage.secure_url}
            alt={post.title}
            width={800}
            height={400}
            className="mb-8 rounded-lg"
          />
        )}
        <MdxContent>{post.body}</MdxContent>
      </article>
    </div>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ slug }`)
  return posts.map((post: SanityDocument) => ({
    slug: post.slug.current,
  }))
}
