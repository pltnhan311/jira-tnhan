import { Navigate, Outlet } from 'react-router-dom'
import useLogin from '~/hooks/use-login'

const ProtectedRoutes = () => {
  const user = useLogin()
  return user ? <Outlet /> : <Navigate to='/login' replace={true} />
}

export default ProtectedRoutes
