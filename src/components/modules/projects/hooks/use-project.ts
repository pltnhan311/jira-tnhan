import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import projectApi from '~/components/api/project-api'
import { queryClient } from '~/config/query-client'

export const useProject = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectApi.getProjectDetails(id as string)
  })
}

export const useInvalidateProject = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  return () => {
    return queryClient.invalidateQueries({
      queryKey: ['project', id as string],
      type: 'all'
    })
  }
}

export const useInvalidateProjectParams = () => {
  const { id } = useParams()
  return () => {
    return queryClient.invalidateQueries({
      queryKey: ['project', id as string],
      type: 'all'
    })
  }
}
