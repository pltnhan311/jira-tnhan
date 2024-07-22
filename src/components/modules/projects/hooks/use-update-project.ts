import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import projectApi from '~/components/api/project-api'
import { useInvalidateProject } from '~/components/modules/projects/hooks/use-project'
import { useInvalidateProjects } from '~/components/modules/projects/hooks/use-projects'
import { IProject } from '~/utils/types'

export const useUpdateProject = () => {
  const invalidateProject = useInvalidateProject()
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: (data: Partial<IProject>) => projectApi.updateProject(data),

    onSuccess: () => {
      invalidateProject()
      invalidateProjects()
      message.success('Project updated successfully')
    },

    onError: () => {
      message.error('Failed to update project')
    }
  })
}
