'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { Button } from './ui/button'
import { cn } from '@/utils/cn'

interface TweetButtonProps {
  title: string
  className?: string
}

const TweetButton: React.FC<TweetButtonProps> = ({ title, className }) => {
  const pathname = usePathname()
  const url = `${process.env.NEXT_PUBLIC_URL}${pathname}`
  const tweetText = encodeURIComponent(`Check out this post: ${title}`)
  const tweetUrl = encodeURIComponent(url)
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`

  return (
    <Button asChild variant="outline" className={cn(className)}>
      <a
        href={twitterShareUrl}
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

export default TweetButton
