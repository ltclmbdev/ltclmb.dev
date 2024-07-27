import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Navigation } from '@/components/app/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yevhen Nahalskyi - Frontend Dev',
  description: 'The Personal Site of Yevhen Nahalskyi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <Navigation />
          <div className="grow">{children}</div>
        </div>
      </body>
    </html>
  )
}
