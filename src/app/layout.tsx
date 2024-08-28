import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import Navigation from '@/components/app/navigation'
import { generateBaseMetadata } from '@/config'
import Providers from '@/providers/providers'

export const metadata: Metadata = generateBaseMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-US"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Navigation />
            <main className="flex grow">{children}</main>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-HCETR5MWJS" />
    </html>
  )
}
