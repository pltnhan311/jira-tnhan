import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const useStatus = () => {
  return useQuery({
    queryKey: ['status'],
    queryFn: () => optionApi.getAllTaskStatuses()
  })
}
