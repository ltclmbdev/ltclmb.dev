import * as React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generateBaseMetadata } from '@/config'
import { env } from '@/env.mjs'
import { getAllPlaygroundItems, type Playground } from '@/lib/playground'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = generateBaseMetadata('/playground')

  return {
    ...baseMetadata,
    title: `Playground | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: 'Playground at ltclmb.dev',
    openGraph: {
      title: `Playground | ${env.NEXT_PUBLIC_APP_NAME}`,
      url: '/playground',
      images: [
        {
          url: '/playground/opengraph-image',
        },
      ],
    },
    twitter: {
      title: `Playground | ${env.NEXT_PUBLIC_APP_NAME}`,
      description: 'Playground at ltclmb.dev',
      images: ['/playground/opengraph-image'],
    },
  }
}

const PlaygroundPreview: React.FC<{ playground: Playground }> = ({
  playground,
}) => (
  <Link
    className="flex overflow-hidden rounded-lg border bg-slate-100 px-4 py-4 shadow-2xl shadow-gray-500/20 duration-150 hover:bg-white dark:bg-[#31363F] dark:shadow-none hover:dark:bg-white/25"
    href={`/playground/${playground.slug.current}`}
  >
    <div className="relative aspect-square size-24 shrink-0">
      <Image
        src={playground.mainImage.secure_url}
        alt={playground.title}
        fill
      />
    </div>
    <div className="grow pl-4">
      <h3 className="text-xl font-semibold">{playground.title}</h3>
      {playground.description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {playground.description}
        </p>
      )}
    </div>
  </Link>
)

export default async function PlaygroundPage() {
  const playgroundItems = await getAllPlaygroundItems()
  const sortedPlaygroundItems: Playground[] = playgroundItems.sort(
    (a: Playground, b: Playground) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <div className="container flex flex-col items-center pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Playground
      </h1>
      <h2 className="mb-10 text-center text-base font-medium text-muted-foreground md:mb-16 md:text-lg">
        Here is the playground for my dev experiments
      </h2>
      {sortedPlaygroundItems.length > 0 && (
        <div className="grid max-w-5xl gap-5 md:grid-cols-2">
          {sortedPlaygroundItems.map(playground => (
            <PlaygroundPreview key={playground._id} playground={playground} />
          ))}
        </div>
      )}
    </div>
  )
}
