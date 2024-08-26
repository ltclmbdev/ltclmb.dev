import Link from 'next/link'
import { Icon } from '@/components/icons'
import ImageWithBlur from '@/components/image-with-blur'
import MdxContent from '@/components/mdx-content'
import ShareButton from '@/components/share-button'
import { type Post } from '@/lib/posts'
import { formatDate } from '@/utils/format-date'

const PostTemplate: React.FC<{ post: Post }> = async ({ post }) => {
  return (
    <article className="mx-auto flex max-w-3xl flex-col items-center text-pretty">
      <Link
        href="/posts"
        className="mb-10 flex items-center space-x-2 text-sm text-muted-foreground duration-150 hover:text-foreground"
      >
        <Icon name="Left" size="12" />
        <span>Posts</span>
      </Link>
      <h1 className="mb-4 text-balance text-center text-3xl font-bold md:text-4xl">
        {post.title}
      </h1>
      <p className="mb-4 text-center italic text-muted-foreground">
        Published on {formatDate(post.publishedAt)}
      </p>
      {post.mainImage && (
        <div className="my-6 sm:my-8 lg:-mx-10 lg:my-10 xl:-mx-14 2xl:-mx-16">
          <ImageWithBlur
            src={post.mainImage.secure_url}
            alt={post.title}
            width={878}
            height={570}
            className="border-none"
          />
        </div>
      )}
      <div className="prose prose-xl w-full max-w-none dark:prose-dark">
        <MdxContent>{post.body}</MdxContent>
      </div>
      <ShareButton title={post.title} className="mt-10 md:mt-20" />
    </article>
  )
}

export default PostTemplate
