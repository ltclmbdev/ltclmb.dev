// import { DefaultSeoProps } from '@skillrecordings/next-seo'

// const config: DefaultSeoProps & { author: string } = {
const config = {
  defaultTitle: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
  author: process.env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
  // additionalLinkTags: [
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '180x180',
  //     href: `${process.env.NEXT_PUBLIC_URL}/favicons/apple-touch-icon.png`,
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '32x32',
  //     href: `${process.env.NEXT_PUBLIC_URL}/favicons/favicon-32x32.png`,
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '16x16',
  //     href: `${process.env.NEXT_PUBLIC_URL}/favicons/favicon-16x16.png`,
  //   },
  //   {
  //     rel: 'manifest',
  //     href: `${process.env.NEXT_PUBLIC_URL}/favicons/site.webmanifest`,
  //   },
  //   {
  //     rel: 'shortcut icon',
  //     href: `${process.env.NEXT_PUBLIC_URL}/favicons/favicon.ico`,
  //   },
  // ],
  additionalMetaTags: [
    {
      property: 'author',
      content: process.env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
    },
    {
      property: 'keywords',
      content: process.env.NEXT_PUBLIC_SEO_KEYWORDS,
    },
  ],
  twitter: {
    cardType: 'summary_large_image',
    handle: process.env.NEXT_PUBLIC_AUTHOR_TWITTER,
  },
  openGraph: {
    type: 'website',
    site_name: process.env.NEXT_PUBLIC_SITE_TITLE,
    profile: {
      firstName: process.env.NEXT_PUBLIC_AUTHOR_FIRST_NAME,
      lastName: process.env.NEXT_PUBLIC_AUTHOR_LAST_NAME,
    },
    // images: [
    //   {
    //     url: `${process.env.NEXT_PUBLIC_URL}/og-images/og-image@2x.jpg`,
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
}

export default config
