import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Navigation } from '@/components/app/navigation'
import Providers from '@/providers/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ltclmb.dev - front-end dev',
  description: "Yevhen Nahalskyi's personal site",
  // TODO: dynamic favicons
  // icons: {
  //   icon: [
  //     {
  //       media: '(prefers-color-scheme: light)',
  //       url: '/favicons/favicon-light.png',
  //       href: '/favicons/favicon-light.png',
  //     },
  //     {
  //       media: '(prefers-color-scheme: dark)',
  //       url: '/favicons/favicon-dark.png',
  //       href: '/favicons/favicon-dark.png',
  //     },
  //   ],
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <div className="grow flex">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
