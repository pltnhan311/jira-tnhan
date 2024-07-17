import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppProviders from '~/AppProviders'
import ProtectedRoutes from '~/components/protected-route'
import { AuthLayout } from '~/layout/auth-layout'

const LoginPage = lazy(() => import('./pages/login-page'))

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: <p>hello '/home'</p>
        },
        {
          path: '/page1',
          element: <p>hello '/page1'</p>
        },
        {
          path: '/page2',
          element: <p>hello '/page2'</p>
        }
      ]
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      )
    }
  ])

  return (
    <AppProviders>
      <RouterProvider router={router}></RouterProvider>
    </AppProviders>
  )
}

export default App
