import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { commentApi } from '~/components/api/comment-api'
import { queryClient } from '~/config/query-client'

export const useCommentsOfTask = () => {
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('taskId')

  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => commentApi.getAllCommentOfTask(taskId as string)
  })
}

export const useInvalidateComments = () => {
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('taskId')

  return () => {
    return queryClient.invalidateQueries({
      queryKey: ['comments', taskId as string],
      type: 'all'
    })
  }
}
