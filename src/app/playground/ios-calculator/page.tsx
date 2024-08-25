import * as React from 'react'
import type { Metadata } from 'next'
import Calculator from '@/components/playground/ios-calculator/ios-calculator'
import ShareButton from '@/components/share-button'
import GithubButton from '@/components/github-button'
import { pageMetadata } from './data'

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/playground/ios-calculator`,
  },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: `${process.env.NEXT_PUBLIC_URL}/playground/ios-calculator`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/playground/ios-calculator/opengraph-image`,
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
      `${process.env.NEXT_PUBLIC_URL}/playground/ios-calculator/opengraph-image`,
    ],
  },
}

export default function CalculatorPage() {
  return (
    <div className="container pb-16 md:pb-24 lg:pb-40 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        iOS 17 Calculator App
      </h1>
      <div className="mt-20 flex justify-center">
        <Calculator />
      </div>
      <div className="mt-10 md:mt-20 flex gap-4 justify-center items-center flex-nowrap">
        <GithubButton url="https://github.com/ltclmbdev/ltclmb.dev/tree/main/src/components/playground/ios-calculator" />
        <ShareButton title="iOS 17 Calculator App" />
      </div>
    </div>
  )
}
