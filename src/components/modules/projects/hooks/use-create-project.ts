import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import projectApi from '~/components/api/project-api'
import { useInvalidateProjects } from '~/components/modules/projects/hooks/use-projects'
import { IProject } from '~/utils/types'

export const useCreateProject = () => {
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: (data: Partial<IProject>) => projectApi.createProject(data),

    onSuccess: () => {
      invalidateProjects()
      message.success('Project created successfully')
    },

    onError: () => {
      message.error('Failed to create project')
    }
  })
}
