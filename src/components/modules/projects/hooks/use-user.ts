import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const useUser = (keyword: string) => {
  return useQuery({
    queryKey: ['user', keyword],
    queryFn: () => optionApi.getUser(keyword)
  })
}
