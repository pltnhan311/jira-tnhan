import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { taskApi } from '~/components/api/task-api'
import { useInvalidateProjectParams } from '~/components/modules/projects/hooks/use-project'
import { queryClient } from '~/config/query-client'
import { ITaskDeTail } from '~/utils/types'

export const useUpdateTask = () => {
  const invalidateProject = useInvalidateProjectParams()

  return useMutation({
    mutationFn: (task: Partial<ITaskDeTail>) => taskApi.updateTask(task),

    onSuccess: () => {
      invalidateProject()
      queryClient.invalidateQueries({ queryKey: ['task'] })
      message.success('Updated task successfully')
    },

    onError: () => {
      message.error('Failed to update task')
    }
  })
}
