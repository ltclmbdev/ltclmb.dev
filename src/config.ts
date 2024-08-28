import { Metadata, Viewport } from 'next'
import { env } from '@/env.mjs'
import { getKeywordsArray } from './utils/get-keywords-array'

export const generateBaseMetadata = (route: string = ''): Metadata => {
  const canonicalUrl = new URL(route, env.NEXT_PUBLIC_URL).toString()
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    title: env.NEXT_PUBLIC_SITE_TITLE,
    description: env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
    applicationName: env.NEXT_PUBLIC_APP_NAME,
    authors: [
      {
        name: env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
        url: 'https://x.com/ltclmbdev',
      },
    ],
    generator: 'Next.js',
    keywords: getKeywordsArray(env.NEXT_PUBLIC_SEO_KEYWORDS),
    referrer: 'origin-when-cross-origin',
    creator: env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
    publisher: env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: '/favicons/icon.svg', type: 'image/svg+xml' },
        { url: '/favicons/icon.png', type: 'image/png', sizes: '192x192' },
      ],
      apple: [
        {
          url: '/favicons/apple-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      shortcut: '/favicons/icon.png',
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/favicons/apple-icon.png',
        },
      ],
    },
    openGraph: {
      title: env.NEXT_PUBLIC_SITE_TITLE,
      description: env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
      url: env.NEXT_PUBLIC_URL,
      siteName: env.NEXT_PUBLIC_APP_NAME,
      images: [
        {
          url: '/images/opengraph-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: env.NEXT_PUBLIC_SITE_TITLE,
      description: env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
      creator: env.NEXT_PUBLIC_AUTHOR_X,
      images: ['/images/opengraph-image.png'],
    },
    verification: {
      google:
        'google-site-verification=ETAtrMtrB_9zfwhBziRD7WB10Ldvv53lGy8457_UoAE',
      other: {
        'me:email': `mailto:${env.NEXT_PUBLIC_AUTHOR_EMAIL}`,
        'me:website': env.NEXT_PUBLIC_URL,
      },
    },
    appleWebApp: {
      capable: true,
      title: env.NEXT_PUBLIC_APP_NAME,
      statusBarStyle: 'black-translucent',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    abstract: env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
    category: 'Web Development',
    classification: 'Web Application',
  }
}

export const generateBaseViewport = (): Viewport => {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#fff' },
      { media: '(prefers-color-scheme: dark)', color: '#000' },
    ],
    colorScheme: 'light dark',
  }
}
