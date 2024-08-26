'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const ThemeToggle: React.FC<{ className?: string }> = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={null}
            size="icon"
            onClick={toggleTheme}
            className="w-auto px-0"
          >
            <div className="rotate-0 scale-100 cursor-pointer text-xl transition-all dark:-rotate-90 dark:scale-0 md:text-2xl">
              <Icon name="Moon" size="20" />
            </div>
            <div className="absolute rotate-90 scale-0 text-xl transition-all dark:rotate-0 dark:scale-100 md:text-2xl">
              <Icon name="Sun" size="20" />
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeToggle
