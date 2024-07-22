import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import projectApi from '~/components/api/project-api'
import { useInvalidateProject } from '~/components/modules/projects/hooks/use-project'
import { useInvalidateProjects } from '~/components/modules/projects/hooks/use-projects'

export const useAssignUserProject = () => {
  const invalidateProject = useInvalidateProject()
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: async (data: { projectId: string; userId: string }) => projectApi.assignUserProject(data),

    onSuccess: () => {
      invalidateProject()
      invalidateProjects()
      message.success('Assigned user successfully')
    },

    onError: () => {
      message.error('Failed assigned user')
    }
  })
}
