'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { Button } from './ui/button'
import { cn } from '@/utils/cn'

interface ShareButtonProps {
  title: string
  className?: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, className }) => {
  const pathname = usePathname()
  const url = `${process.env.NEXT_PUBLIC_URL}${pathname}`
  const shareText = encodeURIComponent(`Check out this post: ${title}`)
  const shareUrl = encodeURIComponent(url)
  const intentUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`

  return (
    <Button asChild variant="outline" className={cn(className)}>
      <a
        href={intentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="space-x-1"
      >
        <Icon name="X" />
        <span>Tweet</span>
      </a>
    </Button>
  )
}

export default ShareButton
