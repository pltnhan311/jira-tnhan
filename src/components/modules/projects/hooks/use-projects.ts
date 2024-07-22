import { useQuery } from '@tanstack/react-query'
import projectApi from '~/components/api/project-api'
import { queryClient } from '~/config/query-client'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.getAllProjects()
  })
}

export const useInvalidateProjects = () => {
  return () => {
    return queryClient.invalidateQueries({
      queryKey: ['projects'],
      type: 'all'
    })
  }
}
