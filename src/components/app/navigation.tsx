'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/logo'
import ThemeToggle from '@/components/theme-toggle'
import { cn } from '@/utils/cn'
import MobileMenu from './mobile-menu'

const Navigation = () => {
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    cn(
      'hidden sm:block duration-150 hover:opacity-80',
      isLinkActive(href) ? 'opacity-100 hover:opacity-100' : 'opacity-50',
    )

  return (
    <header className="py-2">
      <nav className="container flex max-w-none justify-between">
        <Link href="/" className="w-32 md:w-auto">
          <Logo />
        </Link>
        <div className="flex items-center gap-5 sm:gap-4">
          <Link href="/posts" className={linkClass('/posts')}>
            Posts
          </Link>
          <Link href="/playground" className={linkClass('/playground')}>
            Playground
          </Link>
          <Link href="/about" className={linkClass('/about')}>
            About
          </Link>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navigation
