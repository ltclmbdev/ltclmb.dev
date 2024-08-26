import fs from 'fs'
import path from 'path'
import * as React from 'react'
import type { Metadata } from 'next'
import Image, { StaticImageData } from 'next/image'
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
    canonical: `${config.defaultSiteUrl}/playground`,
  },
  openGraph: {
    title: `${config.defaultTitle} - Playground`,
    description: 'Playground at ltclmb.dev',
    url: `${config.defaultSiteUrl}/playground/`,
    images: [
      {
        url: `${config.defaultSiteUrl}/playground/opengraph-image`,
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
    images: [`${config.defaultSiteUrl}/playground/opengraph-image`],
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
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Playground
      </h1>
      <h2 className="mb-10 text-center text-base font-medium text-muted-foreground md:mb-16 md:text-lg">
        Here is the playground for my dev experiments
      </h2>
      {!isEmpty(entries) && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {entries.map(entry => (
            <Link
              key={entry.slug}
              className="flex overflow-hidden rounded-lg border bg-slate-100 py-4 pr-4 shadow-2xl shadow-gray-500/20 duration-150 hover:bg-white dark:bg-[#31363F] dark:shadow-none hover:dark:bg-white/25"
              href={`/playground/${entry.slug}`}
            >
              <div className="relative aspect-square size-24 shrink-0">
                <Image src={entry.postImage} alt={entry.title} fill />
              </div>
              <div className="grow">
                <h3 className="text-xl font-semibold">{entry.title}</h3>
                {entry.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
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
