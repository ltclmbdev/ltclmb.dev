import ImageWithBlur from '@/components/image-with-blur'
import Link from 'next/link'
import MdxContent from '@/components/mdx-content'
import { type Post } from '@/lib/posts'
import { formatDate } from '@/utils/format-date'
import { Icon } from '@/components/icons'
import ShareButton from '@/components/share-button'

const PostTemplate: React.FC<{ post: Post }> = async ({ post }) => {
  return (
    <article className="max-w-3xl mx-auto text-pretty flex flex-col items-center">
      <Link
        href="/posts"
        className="mb-10 flex items-center space-x-2 text-sm duration-150 text-muted-foreground hover:text-foreground"
      >
        <Icon name="Left" size="12" />
        <span>Posts</span>
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-balance">
        {post.title}
      </h1>
      <p className="text-muted-foreground mb-4 text-center italic">
        Published on {formatDate(post.publishedAt)}
      </p>
      {post.mainImage && (
        <div className="lg:-mx-10 xl:-mx-14 2xl:-mx-16 my-6 sm:my-8 lg:my-10">
          <ImageWithBlur
            src={post.mainImage.secure_url}
            alt={post.title}
            width={878}
            height={570}
            className="border-none"
          />
        </div>
      )}
      <div className="prose prose-xl max-w-none dark:prose-dark w-full">
        <MdxContent>{post.body}</MdxContent>
      </div>
      <ShareButton title={post.title} className="mt-10 md:mt-20" />
    </article>
  )
}

export default PostTemplate
