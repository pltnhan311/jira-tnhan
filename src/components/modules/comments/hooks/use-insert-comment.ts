import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { commentApi } from '~/components/api/comment-api'
import { useInvalidateComments } from '~/components/modules/comments/hooks/use-comments'
import { useInvalidateProjectParams } from '~/components/modules/projects/hooks/use-project'

export const useInsertComment = () => {
  const invalidateComments = useInvalidateComments()
  const invalidateProject = useInvalidateProjectParams()

  return useMutation({
    mutationFn: (data: { taskId: number; contentComment: string }) => {
      return commentApi.addCommentToTask(data.taskId, data.contentComment)
    },

    onSuccess: () => {
      invalidateComments()
      invalidateProject()
      message.success('Add comment successfully')
    }
  })
}
