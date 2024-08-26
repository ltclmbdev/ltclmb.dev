import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@/styles/globals.css'
import config from '@/config'

import Navigation from '@/components/app/navigation'
import Providers from '@/providers/providers'

export const metadata: Metadata = {
  title: config.defaultTitle,
  description: config.defaultDescription,
  alternates: {
    canonical: config.defaultSiteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col min-h-dvh">
            <Navigation />
            <main className="grow flex">{children}</main>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-HCETR5MWJS" />
    </html>
  )
}
