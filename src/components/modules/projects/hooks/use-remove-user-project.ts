import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import projectApi from '~/components/api/project-api'
import { useInvalidateProject } from '~/components/modules/projects/hooks/use-project'
import { useInvalidateProjects } from '~/components/modules/projects/hooks/use-projects'

export const useRemoveUserProject = () => {
  const invalidateProject = useInvalidateProject()
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: async (data: { projectId: string; userId: string }) => projectApi.removeUserProject(data),

    onSuccess: () => {
      invalidateProject()
      invalidateProjects()
      message.success('Removed user successfully')
    },

    onError: () => {
      message.error('Failed removed user')
    }
  })
}
