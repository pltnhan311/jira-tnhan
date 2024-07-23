import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const useTaskType = () => {
  return useQuery({
    queryKey: ['task-type'],
    queryFn: () => optionApi.getAllTaskTypes()
  })
}
