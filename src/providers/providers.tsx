import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}

export default Providers
