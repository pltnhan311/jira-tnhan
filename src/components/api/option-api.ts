import { isEmpty } from 'lodash'
import privateClient from '~/config/private-client'
import { ICategory, IPriority, IStatus, ITaskType, IUser } from '~/utils/types'

const optionApi = {
  async getAllProjectCategories() {
    const { data } = await privateClient.get<{ content: ICategory[] }>('/ProjectCategory')
    return data.content
  },

  async getAllTaskTypes() {
    const { data } = await privateClient.get<{ content: ITaskType[] }>('/TaskType/getAll')
    return data.content
  },

  async getAllTaskPriorities() {
    const { data } = await privateClient.get<{ content: IPriority[] }>('/Priority/getAll')
    return data.content
  },

  async getAllTaskStatuses() {
    const { data } = await privateClient.get<{ content: IStatus[] }>('/Status/getAll')
    return data.content
  },

  async getUser(keyword: string) {
    const endpoint = !isEmpty(keyword) ? `/Users/getUser?keyword=${keyword}` : '/Users/getUser'
    const { data } = await privateClient.get<{ content: IUser[] }>(endpoint)
    return data.content
  },

  async getAllUsers() {
    const { data } = await privateClient.get<{ content: IUser[] }>('/Users/getUser')
    return data.content
  }
}

export default optionApi
