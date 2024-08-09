import * as React from 'react'
import Image from 'next/image'

import { cn } from '@/utils/cn'
import config from '@/config'

const Author: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex items-center space-x-2 text-sm', className)}>
      <div className="shrink-0 overflow-hidden rounded-full">
        <Image
          src="/me.jpg"
          alt={config.author || 'Yevhen Nahalskyi'}
          width={40}
          height={40}
        />
      </div>
      <span>{config.author}</span>
    </div>
  )
}

export default Author
