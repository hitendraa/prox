"use client"

import { ThemeProvider } from "./theme-provider"

export function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
