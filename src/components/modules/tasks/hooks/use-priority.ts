import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const usePriority = () => {
  return useQuery({
    queryKey: ['priority'],
    queryFn: () => optionApi.getAllTaskPriorities()
  })
}
