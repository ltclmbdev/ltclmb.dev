import * as React from 'react'
import Image, { StaticImageData } from 'next/image'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import config from '@/config'

type PlaygroundEntry = {
  slug: string
  title: string
  description: string | undefined
  postImage: StaticImageData
}

export const metadata: Metadata = {
  title: `${config.defaultTitle} - Playground`,
  description: 'Playground at ltclmb.dev',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/playground/`,
  },
  openGraph: {
    title: `${config.defaultTitle} - Playground`,
    description: 'Playground at ltclmb.dev',
    url: `${process.env.NEXT_PUBLIC_URL}/playground/`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/playground/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'All Posts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.defaultTitle} - Playground`,
    description: 'Playground at ltclmb.dev',
    images: [`${process.env.NEXT_PUBLIC_URL}/playground/opengraph-image`],
  },
}

async function getPlaygroundEntries(): Promise<PlaygroundEntry[]> {
  const playgroundPath = path.join(process.cwd(), 'src', 'app', 'playground')
  const entries = fs
    .readdirSync(playgroundPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'page.tsx')

  const playgroundEntries: PlaygroundEntry[] = await Promise.all(
    entries.map(async entry => {
      const slug = entry.name
      const { pageMetadata } = (await import(`./${slug}/data`)) as {
        pageMetadata: {
          title: string
          description: string
          postImage: StaticImageData
        }
      }
      return {
        slug,
        title: pageMetadata.title,
        description: pageMetadata.description,
        postImage: pageMetadata.postImage,
      }
    }),
  )

  return playgroundEntries
}

export default async function PlaygroundPage() {
  const entries = await getPlaygroundEntries()

  return (
    <div className="container pb-16 md:pb-24 lg:pb-40 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Playground
      </h1>
      <h2 className="text-base text-muted-foreground font-medium md:text-lg mb-10 md:mb-16 text-center">
        Here is the playground for my dev experiments
      </h2>
      {!isEmpty(entries) && (
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {entries.map(entry => (
            <Link
              key={entry.slug}
              className="border py-4 pr-4 rounded-lg flex bg-slate-100 duration-150 dark:bg-[#31363F] hover:bg-white hover:dark:bg-white/25 shadow-2xl shadow-gray-500/20 overflow-hidden dark:shadow-none"
              href={`/playground/${entry.slug}`}
            >
              <div className="shrink-0 aspect-square relative size-24">
                <Image src={entry.postImage} alt={entry.title} fill />
              </div>
              <div className="grow">
                <h3 className="text-xl font-semibold">{entry.title}</h3>
                {entry.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {entry.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
