import Link from 'next/link'

import Logo from '@/components/logo'
import ThemeToggle from '@/components/theme-toggle'
import MobileMenu from './mobile-menu'

const Navigation = () => {
  return (
    <header className="py-2">
      <nav className="container max-w-none flex justify-between">
        <Link href="/" className="w-32 md:w-auto">
          <Logo />
        </Link>
        <div className="flex items-center gap-5 sm:gap-4">
          <Link href="/posts" className="hidden sm:block">
            Posts
          </Link>
          <Link href="/about" className="hidden sm:block">
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
