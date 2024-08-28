import * as React from 'react'
import Image from 'next/image'
import { env } from '@/env.mjs'
import { cn } from '@/utils/cn'

const Author: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex items-center space-x-2 text-sm', className)}>
      <div className="shrink-0 overflow-hidden rounded-full">
        <Image
          src="/images/me.jpg"
          alt={env.NEXT_PUBLIC_AUTHOR_FULL_NAME}
          width={40}
          height={40}
        />
      </div>
      <span>{env.NEXT_PUBLIC_AUTHOR_FULL_NAME}</span>
    </div>
  )
}

export default Author
