import Link from 'next/link'

import Logo from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export const Navigation = () => {
  return (
    <header className="py-2">
      <nav className="container max-w-none flex justify-between">
        <Link href="/" className="w-32 md:w-auto">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/posts">Posts</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
