import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const user = null
  return user ? <Outlet /> : <Navigate to='/login' replace={true} />
}

export default ProtectedRoutes
