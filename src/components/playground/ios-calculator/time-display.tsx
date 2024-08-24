'use client'

import React, { useEffect, useState } from 'react'

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date()
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }

    const now = new Date()
    const delay = (60 - now.getSeconds()) * 1000 // Calculate delay to next full minute

    // Initial update and delay for the first interval to synchronize exactly on the minute
    const timeoutId = setTimeout(() => {
      updateTime()
      setInterval(updateTime, 60000) // Update every minute thereafter
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return <span className="font-sf-pro-semibold text-[12px]">{currentTime}</span>
}

export default TimeDisplay
