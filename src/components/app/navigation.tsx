import Link from 'next/link'

import Logo from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export const Navigation = () => {
  return (
    <header className="py-2">
      <nav className="container max-w-none flex justify-between">
        <Link href="/" className="text-4xl">
          <Logo />
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
