import privateClient from '~/config/private-client'
import { IAllCommentTask } from '~/utils/types'

export const commentApi = {
  async getAllCommentOfTask(taskId: string) {
    const { data } = await privateClient.get<{ content: IAllCommentTask[] }>(`/Comment/getAll?taskId=${taskId}`)
    return data.content
  },

  async addCommentToTask(taskId: number, contentComment: string) {
    return await privateClient.post('Comment/insertComment', {
      taskId,
      contentComment
    })
  },

  async updateComment(idCmt: number, commentContent: string) {
    return await privateClient.put(`Comment/updateComment?id=${idCmt}&contentComment=${commentContent}`)
  },

  async deleteComment(id: number) {
    return await privateClient.delete(`Comment/deleteComment?idComment=${id}`)
  }
}
