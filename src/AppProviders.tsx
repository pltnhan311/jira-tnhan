import { ConfigProvider } from 'antd'
import { PropsWithChildren, Suspense } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { FullscreenFallback } from '~/components/fallbacks'
import { theme } from '~/config/theme'
import { persistor, store } from '~/store/store'

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<FullscreenFallback />}>
      <ConfigProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<FullscreenFallback />} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </Suspense>
  )
}

export default AppProviders
