import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { commentApi } from '~/components/api/comment-api'
import { useInvalidateComments } from '~/components/modules/comments/hooks/use-comments'
import { useInvalidateProjectParams } from '~/components/modules/projects/hooks/use-project'

export const useDeleteComment = () => {
  const invalidateComments = useInvalidateComments()
  const invalidateProject = useInvalidateProjectParams()

  return useMutation({
    mutationFn: (idComment: number) => {
      return commentApi.deleteComment(idComment)
    },

    onSuccess: () => {
      invalidateComments()
      invalidateProject()
      message.success('Delete comment successfully')
    }
  })
}
