'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/utils/cn'

const MobileMenu = () => {
  const pathname = usePathname()
  const [open, setOpen] = React.useState<boolean>(false)
  const handleCloseSheet = () => {
    setOpen(false)
  }
  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    cn(
      'text-2xl font-medium',
      isLinkActive(href) ? 'opacity-100' : 'opacity-50',
    )
  return (
    <div className="flex sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Icon name="Menu" size="20" />
        </SheetTrigger>
        <SheetContent className="bg-slate-100 pt-16 dark:bg-slate-900">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/posts"
              className={linkClass('/posts')}
              onClick={handleCloseSheet}
            >
              Posts
            </Link>
            <Link
              href="/posts"
              className={linkClass('/playground')}
              onClick={handleCloseSheet}
            >
              Playground
            </Link>
            <Link
              href="/about"
              className={linkClass('/about')}
              onClick={handleCloseSheet}
            >
              About
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
