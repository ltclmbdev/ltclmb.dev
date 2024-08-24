'use client'

import * as React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const MobileMenu = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const handleCloseSheet = () => {
    setOpen(false)
  }
  return (
    <div className="sm:hidden flex">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Icon name="Menu" size="20" />
        </SheetTrigger>
        <SheetContent className="pt-16 bg-slate-100">
          <div className="gap-6 flex flex-col items-start">
            <Link
              href="/posts"
              className="text-2xl font-medium"
              onClick={handleCloseSheet}
            >
              Posts
            </Link>
            <Link
              href="/about"
              className="text-2xl font-medium"
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
