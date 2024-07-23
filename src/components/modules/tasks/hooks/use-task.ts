import { useQuery } from '@tanstack/react-query'
import { taskApi } from '~/components/api/task-api'

export const useTask = (taskId: number) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskApi.getTaskDetail(taskId)
  })
}
