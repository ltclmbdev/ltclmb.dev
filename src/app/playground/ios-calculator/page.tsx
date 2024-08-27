import * as React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import GithubButton from '@/components/github-button'
import { Icon } from '@/components/icons'
import Calculator from '@/components/playground/ios-calculator/ios-calculator'
import ShareButton from '@/components/share-button'
import config from '@/config'
import { pageMetadata } from './data'

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: `${config.defaultSiteUrl}/playground/ios-calculator`,
  },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: `${config.defaultSiteUrl}/playground/ios-calculator`,
    images: [
      {
        url: `${config.defaultSiteUrl}/playground/ios-calculator/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'iOS 17 Calculator App clone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.title,
    description: pageMetadata.description,
    images: [
      `${config.defaultSiteUrl}/playground/ios-calculator/opengraph-image`,
    ],
  },
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
