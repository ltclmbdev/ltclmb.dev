import * as React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DirectoryEntry = {
  name: string
}

const PostPreview: React.FC<{ post: any }> = ({ post }) => (
  <Card className="shadow-2xl shadow-gray-500/20 overflow-hidden dark:shadow-none flex">
    <Link
      href={`/posts/${post.slug.current}`}
      className="bg-slate-100 duration-150 dark:bg-[#31363F] hover:bg-white hover:dark:bg-white/25 flex flex-col w-full"
    >
      <CardHeader className="pb-3">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {/* <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p> */}
        <p className="mt-4 xl:mt-6 line-clamp-6 md:line-clamp-3">
          {post.description}
        </p>
      </CardContent>
      {/* <CardFooter>
        <Author />
      </CardFooter> */}
    </Link>
  </Card>
)

const PlaygroundPage: React.FC = () => {
  const playgroundPath: string = path.join(
    process.cwd(),
    'src',
    'app',
    'playground',
  )

  const directories: DirectoryEntry[] = fs
    .readdirSync(playgroundPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'page.tsx')
    .map(dirent => ({
      name: dirent.name,
    }))

  return (
    <div className="container pb-40 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Playground
      </h1>
      <h2 className="text-base text-muted-foreground font-medium md:text-lg mb-10 md:mb-16 text-center">
        Here I post my dev experiments
      </h2>
      {!isEmpty(directories) && (
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {/* {restPosts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))} */}
          {directories.map(dir => (
            <div key={dir.name}>
              <Link href={`/playground/${dir.name}`}>{dir.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlaygroundPage
