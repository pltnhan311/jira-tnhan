import { useAppSelector } from '~/store/store'

const useInfo = () => {
  return useAppSelector((store) => store.auth.data)
}

export default useInfo
