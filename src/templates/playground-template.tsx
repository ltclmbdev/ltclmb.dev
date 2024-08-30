import Link from 'next/link'
import GithubButton from '@/components/github-button'
import { Icon } from '@/components/icons'
import ImageWithBlur from '@/components/image-with-blur'
import MdxContent from '@/components/mdx-content'
import ShareButton from '@/components/share-button'
import { type Playground } from '@/lib//playground'
import { formatDate } from '@/utils/format-date'

const PlaygroundTemplate: React.FC<{ playground: Playground }> = async ({
  playground,
}) => {
  return (
    <article className="mx-auto flex max-w-3xl flex-col items-center text-pretty">
      <Link
        href="/playground"
        className="mb-10 flex items-center space-x-2 text-sm text-muted-foreground duration-150 hover:text-foreground"
      >
        <Icon name="Left" size="12" />
        <span>Playground</span>
      </Link>
      <h1 className="text-balance text-center text-3xl font-bold md:text-4xl">
        {playground.title}
      </h1>
      {playground.description && (
        <h3 className="mt-8 text-balance text-center text-lg">
          {playground.description}
        </h3>
      )}
      <p className="mt-8 text-center italic text-muted-foreground">
        Published on {formatDate(playground.publishedAt)}
      </p>
      {playground.body && (
        <div className="prose prose-xl mt-20 w-full max-w-none dark:prose-dark">
          <MdxContent>{playground.body}</MdxContent>
        </div>
      )}
      <div className="mt-10 flex flex-nowrap items-center justify-center gap-4 md:mt-20">
        {playground.github && <GithubButton url={playground.github} />}
        <ShareButton title="iOS 17 Calculator App" />
      </div>
    </article>
  )
}

export default PlaygroundTemplate
