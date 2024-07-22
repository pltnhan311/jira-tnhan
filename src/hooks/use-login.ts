import { useAppSelector } from '~/store/store'

const useLogin = () => {
  return useAppSelector((store) => store.auth.isLoggedIn)
}

export default useLogin
