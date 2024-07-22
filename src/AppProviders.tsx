import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { PropsWithChildren, Suspense } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { FullscreenFallback } from '~/components/fallbacks'
import { queryClient } from '~/config/query-client'
import { theme } from '~/config/theme'
import { persistor, store } from '~/store/store'

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<FullscreenFallback />}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={<FullscreenFallback />} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ConfigProvider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default AppProviders
