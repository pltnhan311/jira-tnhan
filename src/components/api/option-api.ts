import { isEmpty } from 'lodash'
import privateClient from '~/config/private-client'
import { ICategory, IUser } from '~/utils/types'

const optionApi = {
  async getAllProjectCategories() {
    const { data } = await privateClient.get<{ content: ICategory[] }>('/ProjectCategory')
    return data.content
  },

  async getAllTaskTypes() {
    return await privateClient.get('/TaskType/getAll')
  },

  async getAllTaskPriorities() {
    return await privateClient.get('/Priority/getAll')
  },

  async getAllTaskStatuses() {
    return await privateClient.get('/Status/getAll')
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
