import privateClient from '~/config/private-client'
import { ITaskDeTail } from '~/utils/types'

export const taskApi = {
  async getTaskDetail(taskId: number) {
    const { data } = await privateClient.get<{ content: ITaskDeTail }>(`/Project/getTaskDetail?taskId=${taskId}`)
    return data.content
  },

  async createTask(task: Partial<ITaskDeTail>) {
    return await privateClient.post('/Project/createTask', task)
  },

  async updateTask(task: Partial<ITaskDeTail>) {
    return await privateClient.post('/Project/updateTask', task)
  },

  async deleteTask(taskId: number) {
    return await privateClient.delete(`/Project/removeTask?taskId=${taskId}`)
  },

  async assignUserTask({ taskId, userId }: { taskId: number; userId: number[] }) {
    const data = { taskId, userId }
    return await privateClient.post('/Project/assignUserTask', data)
  }
}
