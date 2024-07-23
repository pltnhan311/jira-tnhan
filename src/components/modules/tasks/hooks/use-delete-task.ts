import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { taskApi } from '~/components/api/task-api'
import { useInvalidateProjectParams } from '~/components/modules/projects/hooks/use-project'
import { queryClient } from '~/config/query-client'

export const useDeleteTask = (taskId: number) => {
  const invalidateProject = useInvalidateProjectParams()

  return useMutation({
    mutationFn: () => taskApi.deleteTask(taskId),
    onSuccess: () => {
      invalidateProject()
      queryClient.invalidateQueries({ queryKey: ['task'] })
      message.success('Deleted task successfully')
    },

    onError: () => {
      message.error('Failed to delete task')
    }
  })
}
