import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@/styles/globals.css'

import Navigation from '@/components/app/navigation'
import Providers from '@/providers/providers'

export const metadata: Metadata = {
  title: 'Yevhen Nahalskyi - front end developer',
  description: "Yevhen Nahalskyi's personal site",
  alternates: {
    canonical: 'https://www.ltclmb.dev/',
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
