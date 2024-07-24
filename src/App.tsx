import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppProviders from '~/AppProviders'
import ProtectedRoutes from '~/components/protected-route'
import { AuthLayout } from '~/layout/auth-layout'
import DashboardLayout from '~/layout/dashboard-layout'
import RegisterPage from '~/pages/register-page.tsx'

const LoginPage = lazy(() => import('./pages/login-page'))
const DashboardPage = lazy(() => import('./pages/dashboard-page'))
const CreateProjectPage = lazy(() => import('./pages/create-project-page'))
const DetailProjectPage = lazy(() => import('./pages/detail-project-page.tsx'))

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <DashboardLayout>
          <ProtectedRoutes />
        </DashboardLayout>
      ),
      children: [
        {
          path: '/',
          element: <DashboardPage />
        },
        {
          path: '/create',
          element: <CreateProjectPage />
        },
        {
          path: '/board/:id',
          element: <DetailProjectPage />
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
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <RegisterPage />
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
