import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { DashboardLayout } from '@/components/ui/dashboard/DashboardLayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isDashboard = router.pathname.startsWith('/dashboard')

  return (
    <ClerkProvider {...pageProps}>
      {isDashboard ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ClerkProvider>
  )
}
