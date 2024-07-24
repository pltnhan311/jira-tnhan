import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { commentApi } from '~/components/api/comment-api'
import { useInvalidateComments } from '~/components/modules/comments/hooks/use-comments'
import { useInvalidateProjectParams } from '~/components/modules/projects/hooks/use-project'

export const useUpdateComment = () => {
  const invalidateComments = useInvalidateComments()
  const invalidateProject = useInvalidateProjectParams()

  return useMutation({
    mutationFn: (data: { id: number; contentComment: string }) => {
      return commentApi.updateComment(data.id, data.contentComment)
    },

    onSuccess: () => {
      invalidateComments()
      invalidateProject()
      message.success('Updated comment successfully')
    }
  })
}
