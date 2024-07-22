import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => optionApi.getAllUsers()
  })
}
