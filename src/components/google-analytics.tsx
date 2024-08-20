'use client'

import { useEffect } from 'react'
import ReactGA from 'react-ga4'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
}

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps): null {
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID)
  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.send({ hitType: 'pageview', page: url })
    }

    handleRouteChange(window.location.pathname)
  }, [])

  return null
}
