import * as React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import GithubButton from '@/components/github-button'
import { Icon } from '@/components/icons'
import Calculator from '@/components/playground/ios-calculator/ios-calculator'
import ShareButton from '@/components/share-button'
import { generateBaseMetadata } from '@/config'
import { env } from '@/env.mjs'
import { pageMetadata } from './data'

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = generateBaseMetadata(
    `/playground/${pageMetadata.slug}`,
  )

  return {
    ...baseMetadata,
    title: `${pageMetadata.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: `${pageMetadata.description}`,
    openGraph: {
      title: `${pageMetadata.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      url: `/playground/${pageMetadata.slug}`,
      images: [
        {
          url: `/playground/${pageMetadata.slug}/opengraph-image`,
        },
      ],
    },
    twitter: {
      title: `${pageMetadata.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      description: `${pageMetadata.description}`,
      images: [`/playground/${pageMetadata.slug}/opengraph-image`],
    },
  }
}

export default function CalculatorPage() {
  return (
    <article className="container flex flex-col items-center pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <Link
        href="/playground"
        className="mb-10 flex items-center space-x-2 text-sm text-muted-foreground duration-150 hover:text-foreground"
      >
        <Icon name="Left" size="12" />
        <span>Playground</span>
      </Link>
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        {pageMetadata.title}
      </h1>
      <div className="mt-20 flex justify-center">
        <Calculator />
      </div>
      <div className="mt-10 flex flex-nowrap items-center justify-center gap-4 md:mt-20">
        <GithubButton url="https://github.com/ltclmbdev/ltclmb.dev/tree/main/src/components/playground/ios-calculator" />
        <ShareButton title="iOS 17 Calculator App" />
      </div>
    </article>
  )
}
