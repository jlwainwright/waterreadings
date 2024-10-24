'use client'

import { SessionProvider } from "next-auth/react"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  )
}
