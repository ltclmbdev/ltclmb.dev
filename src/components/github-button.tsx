'use client'

import React from 'react'
import { Icon } from '@/components/icons'
import { cn } from '@/utils/cn'
import { Button } from './ui/button'

interface GithubButtonProps {
  url: string
  className?: string
}

const GithubButton: React.FC<GithubButtonProps> = ({ url, className }) => {
  return (
    <Button asChild variant="outline" className={cn(className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="space-x-1"
      >
        <Icon name="Github" />
        <span>Check on GitHub</span>
      </a>
    </Button>
  )
}

export default GithubButton
