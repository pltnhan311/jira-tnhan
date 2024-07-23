import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { taskApi } from '~/components/api/task-api'
import { useInvalidateProject } from '~/components/modules/projects/hooks/use-project'
import { queryClient } from '~/config/query-client'

export const useAssignUserTask = () => {
  const invalidateProject = useInvalidateProject()

  return useMutation({
    mutationFn: async (data: { taskId: number; userId: number[] }) => taskApi.assignUserTask(data),

    onSuccess: () => {
      invalidateProject()
      queryClient.invalidateQueries({ queryKey: ['task'] })
      message.success('Assigned user successfully')
    },

    onError: () => {
      message.error('Failed assigned user')
    }
  })
}
