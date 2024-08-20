'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icons'
import { cn } from '@/utils/cn'

const FindMeOn: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-wrap gap-2 w-full', className)}>
      <Button
        asChild
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100"
      >
        <a
          rel="noopener noreferrer"
          href="mailto:ltclmb.dev@gmail.com"
          className="space-x-1"
          onClick={e => {
            e.preventDefault()
            window.location.href = 'mailto:ltclmb.dev@gmail.com'
          }}
        >
          <Icon name="Email" size="16" className="text-base" />
          <span>Email</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ltclmbdev"
          className="space-x-1"
        >
          <Icon name="Github" size="16" className="text-base" />
          <span>GitHub</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/yevhen-nahalskyi-693955241/"
          className="space-x-1 group"
        >
          <Icon
            name="Linkedin"
            size="16"
            className="text-base group-hover:text-[#0077B5] duration-300"
          />
          <span>LinkedIn</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.upwork.com/freelancers/evgeniynagalskiy"
          className="space-x-1 group"
        >
          <Icon
            name="Upwork"
            size="16"
            className="text-base group-hover:text-[#14a800] duration-300"
          />
          <span>UpWork</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://x.com/ltclmbdev"
          className="space-x-1"
        >
          <Icon name="X" size="16" className="text-base" />
          <span>Twitter</span>
        </a>
      </Button>
      <Button
        variant="outline"
        className="dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100 space-x-1"
        onClick={() => window.open('/cv/cv-yevhen-nahalskyi.pdf', '_blank')}
      >
        <Icon name="Download" size="16" className="text-base" />
        <span>Download CV</span>
      </Button>
    </div>
  )
}

export default FindMeOn
