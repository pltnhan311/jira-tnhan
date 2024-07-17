import { Suspense } from 'react'
import { FullPageFallback } from '~/components/fallbacks'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<FullPageFallback />}>{children}</Suspense>
}
