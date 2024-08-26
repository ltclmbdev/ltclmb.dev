'use client'

import * as React from 'react'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const FindMeOn: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex w-full flex-wrap gap-2', className)}>
      <Button
        asChild
        variant="outline"
        className="bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
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
        className="bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
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
        className="bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/yevhen-nahalskyi-693955241/"
          className="group space-x-1"
        >
          <Icon
            name="Linkedin"
            size="16"
            className="text-base duration-300 group-hover:text-[#0077B5]"
          />
          <span>LinkedIn</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.upwork.com/freelancers/evgeniynagalskiy"
          className="group space-x-1"
        >
          <Icon
            name="Upwork"
            size="16"
            className="text-base duration-300 group-hover:text-[#14a800]"
          />
          <span>UpWork</span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
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
        className="space-x-1 bg-zinc-50 duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800"
        onClick={() => window.open('/cv/cv-yevhen-nahalskyi.pdf', '_blank')}
      >
        <Icon name="Download" size="16" className="text-base" />
        <span>Download CV</span>
      </Button>
    </div>
  )
}

export default FindMeOn
