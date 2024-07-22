import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectApi from '~/components/api/project-api'
import { queryClient } from '~/config/query-client'

export const useProjectParams = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectApi.getProjectDetails(id as string)
  })
}

export const useInvalidateProject = () => {
  const { id } = useParams()

  return () => {
    return queryClient.invalidateQueries({
      queryKey: ['project', id as string],
      type: 'all'
    })
  }
}
