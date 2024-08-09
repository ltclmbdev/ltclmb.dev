import React from 'react'
import Image from 'next/image'
import MdxContent from '@/components/mdx-content'
import { type Post } from '@/lib/posts'
import { formatDate } from '@/utils/format-date'

const PostTemplate: React.FC<{ post: Post }> = async ({ post }) => {
  return (
    <div className="container">
      <article className="max-w-3xl mx-auto mt-10 text-pretty pb-40">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-balance">
          {post.title}
        </h1>
        <p className="text-muted-foreground mb-4 text-center italic">
          Published on {formatDate(post.publishedAt)}
        </p>
        {post.mainImage && (
          <div className="lg:-mx-10 xl:-mx-14 2xl:-mx-16 my-8 sm:my-10 lg:my-16">
            <Image
              src={post.mainImage.secure_url}
              alt={post.title}
              width={1079}
              height={700}
              className="mb-8 rounded-lg"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none dark:prose-dark">
          <MdxContent>{post.body}</MdxContent>
        </div>
      </article>
    </div>
  )
}

export default PostTemplate
